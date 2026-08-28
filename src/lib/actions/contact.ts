"use server";

import { ContactSchema, contactCopy, type ContactInput } from "@/content/contact";

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

  const destination = process.env.CONTACT_TO_EMAIL;
  if (!destination) {
    return { status: "error", message: contactCopy.error.notConfigured };
  }

  try {
    await deliverLead(parsed.data, destination);
    return { status: "success" };
  } catch {
    return { status: "error", message: contactCopy.error.generic };
  }
}

/**
 * Single delivery seam. Email, CRM webhook, or both. Swapping the destination
 * is a change to this function only.
 * BLOCKED: no provider chosen (TECHNICAL_ARCHITECTURE.md Part IV.1).
 */
async function deliverLead(
  input: ContactInput,
  destination: string,
): Promise<void> {
  throw new Error(
    `Lead delivery is not implemented. Would deliver a ${input.necessidade ?? "geral"} enquiry to ${destination}: no provider configured.`,
  );
}
