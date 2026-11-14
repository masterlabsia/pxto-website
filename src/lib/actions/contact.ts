"use server";

import { contactCopy } from "@/content/contact";
import { ContactSchema, type ContactInput } from "@/content/contactSchema";
import { headers } from "next/headers";
import { serverEnv } from "@/lib/env";
import { isRateLimited } from "@/lib/rateLimit";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

/**
 * Server Action rather than an API route: one endpoint, one consumer, no
 * external caller (TECHNICAL_ARCHITECTURE.md 13).
 *
 * Anti-spam, cheapest layer first: a honeypot field and a submission-timing
 * check. Turnstile is not added preemptively.
 *
 * BLOCKED: the lead destination is undefined (PRD 39.7). Rather than pretend a
 * submission succeeded, the action reports that delivery is not configured.
 * Silently returning success would lose real leads with no error anywhere.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: hidden from users and from assistive technology.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success" };
  }

  // Timing, measured from the first field interaction rather than from page
  // load. Measuring from load would discard a genuine fast submission, for
  // example one completed by browser autofill, and a silently discarded lead is
  // the worst possible failure for this form.
  //
  // When no interaction was recorded the check is skipped rather than failing
  // closed, so a visitor without JavaScript is never dropped.
  const firstInteraction = Number(formData.get("interactedAt") ?? 0);
  if (firstInteraction > 0 && Date.now() - firstInteraction < 1500) {
    return { status: "success" };
  }

  const parsed = ContactSchema.safeParse({
    nome: formData.get("nome") ?? "",
    empresa: formData.get("empresa") ?? "",
    email: formData.get("email") ?? "",
    telefone: formData.get("telefone") ?? "",
    necessidade: formData.get("necessidade") || undefined,
    mensagem: formData.get("mensagem") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", message: contactCopy.error.generic, fieldErrors };
  }

  // Netlify sets this header itself, so the visitor cannot forge it the way
  // they can x-forwarded-for.
  const clientIp = (await headers()).get("x-nf-client-connection-ip");
  if (await isRateLimited(clientIp)) {
    return { status: "error", message: contactCopy.error.rateLimited };
  }

  const { NOTION_API_KEY: apiKey, NOTION_DATABASE_ID: databaseId } = serverEnv;
  if (!apiKey || !databaseId) {
    return { status: "error", message: contactCopy.error.notConfigured };
  }

  try {
    await deliverLead(parsed.data, apiKey, databaseId);
    return { status: "success" };
  } catch (error) {
    // The visitor sees a generic message. The cause goes to the function log,
    // which is the only place a failed delivery is visible. The submitted
    // fields are never logged (PRD 44).
    console.error("Lead delivery failed:", error instanceof Error ? error.message : "unknown");
    return { status: "error", message: contactCopy.error.generic };
  }
}

/** Notion rejects a single rich_text object longer than 2000 characters. */
const NOTION_TEXT_LIMIT = 2000;

function richText(value: string) {
  const chunks: string[] = [];
  for (let i = 0; i < value.length; i += NOTION_TEXT_LIMIT) {
    chunks.push(value.slice(i, i + NOTION_TEXT_LIMIT));
  }
  return chunks.map((content) => ({ text: { content } }));
}

/**
 * Single delivery seam (TECHNICAL_ARCHITECTURE.md 13). Creates one row in the
 * Notion leads database. Plain `fetch` against the REST API: no SDK, so no new
 * runtime dependency.
 *
 * Property names and types must match the database exactly, including the
 * Notion type: `Status` is a Notion "status" property, not a select. The
 * expected schema is documented in TECHNICAL_ARCHITECTURE.md 13.
 */
async function deliverLead(
  input: ContactInput,
  apiKey: string,
  databaseId: string,
): Promise<void> {
  const receivedAt = new Date().toISOString();
  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Nome: { title: richText(input.nome) },
        Empresa: { rich_text: richText(input.empresa) },
        Email: { email: input.email },
        Telefone: { phone_number: input.telefone === "" ? null : input.telefone },
        Necessidade: input.necessidade
          ? { select: { name: input.necessidade } }
          : { select: null },
        Mensagem: { rich_text: richText(input.mensagem) },
        Status: { status: { name: "Lead" } },
        "Origem do Lead": { select: { name: "Site" } },
        "Recebido em": { date: { start: receivedAt } },
        "Data de entrada": { date: { start: receivedAt } },
      },
    }),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });

  if (!response.ok) {
    // Status code only. The response body can echo submitted content.
    throw new Error(`Notion responded ${response.status}`);
  }
}
