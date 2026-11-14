import { serverEnv } from "@/lib/env";

/**
 * Fixed-window limit per client, for the contact Server Action.
 *
 * WHAT IT PROTECTS. The CRM and the Notion API. It does NOT reduce Netlify
 * cost: by the time this runs, the function has already been invoked and
 * billed. Stopping that needs a limit in front of the platform, which the
 * generic netlify.app URL does not allow.
 *
 * Counters live in Upstash Redis through its REST API with plain fetch, so no
 * npm dependency is added (CLAUDE.md 8.9). Serverless instances do not share
 * memory, which is why an in-process counter would not work.
 *
 * FAILS OPEN. If Upstash is unconfigured, slow or down, the submission goes
 * through. Losing a real lead because the limiter is unavailable is worse than
 * letting a spam message through.
 */

const WINDOW_SECONDS = 60 * 60;
const MAX_PER_WINDOW = 5;

/** The address is hashed before it reaches Upstash: no raw IP is stored (LGPD). */
async function clientKey(ip: string): Promise<string> {
  const bytes = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  return `contact:${hex.slice(0, 32)}`;
}

/** True when this client is over the limit. */
export async function isRateLimited(ip: string | null): Promise<boolean> {
  const url = serverEnv.UPSTASH_REDIS_REST_URL;
  const token = serverEnv.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !ip) return false;

  try {
    const key = await clientKey(ip);
    const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, WINDOW_SECONDS, "NX"],
      ]),
      signal: AbortSignal.timeout(2000),
      cache: "no-store",
    });
    if (!response.ok) return false;

    const results: unknown = await response.json();
    const count = Array.isArray(results) ? (results[0] as { result?: unknown } | undefined)?.result : undefined;
    return typeof count === "number" && count > MAX_PER_WINDOW;
  } catch {
    return false;
  }
}
