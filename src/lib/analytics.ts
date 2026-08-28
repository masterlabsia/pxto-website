/**
 * Analytics wrapper. PRD 38.
 *
 * The provider sits behind this module so it can be swapped without touching a
 * single component (TECHNICAL_ARCHITECTURE 12). The provider itself is a PXTO
 * decision that has not been made, so tracking is OFF unless
 * NEXT_PUBLIC_ANALYTICS names one. Nothing is sent by default.
 *
 * Funnel (PRD 38):
 *   Page View -> CTA Click -> Project View -> Contact Form Start
 *   -> Contact Form Submit -> Lead
 *
 * NO PERSONAL DATA IN ANY PAYLOAD. `contact_form_submit` carries the selected
 * category only, never the name, the email or the message (PRD 44).
 */

export type AnalyticsEvent =
  | { name: "cta_click"; props: { location: string; label: string; destination: string } }
  | { name: "service_view"; props: { solution: string } }
  | { name: "project_view"; props: { slug: string } }
  | { name: "contact_form_start"; props: Record<string, never> }
  | { name: "contact_form_submit"; props: { need: string } };

type Provider = "vercel" | "none";

function provider(): Provider {
  const configured = process.env.NEXT_PUBLIC_ANALYTICS;
  return configured === "vercel" ? "vercel" : "none";
}

/** True when a provider is configured. Used to avoid mounting dead scripts. */
export const analyticsEnabled = provider() !== "none";

type VercelWindow = Window & {
  va?: (event: "event", payload: { name: string; data?: Record<string, unknown> }) => void;
};

/**
 * Fire an event. Silently does nothing when no provider is configured, which is
 * the current state. Never throws: analytics must not be able to break a page.
 */
export function track<E extends AnalyticsEvent>(name: E["name"], props: E["props"]): void {
  if (typeof window === "undefined") return;
  if (provider() === "none") return;

  try {
    const w = window as VercelWindow;
    w.va?.("event", { name, data: props });
  } catch {
    // Analytics failures are never surfaced to the visitor.
  }
}
