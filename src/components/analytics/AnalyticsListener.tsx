"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated click listener for every CTA on the site.
 *
 * The alternative is wrapping each button and link in a client component, which
 * would convert most of the tree into client components for the sake of one
 * event. A single listener keeps buttons, links and cards as Server Components
 * and costs a few hundred bytes.
 *
 * Elements opt in with data attributes:
 *   data-analytics="cta"
 *   data-analytics-location="hero"
 */
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const el = target.closest<HTMLElement>('[data-analytics="cta"]');
      if (!el) return;

      const anchor = el.closest("a");
      track("cta_click", {
        location: el.dataset.analyticsLocation ?? "unknown",
        label: (el.textContent ?? "").trim().slice(0, 60),
        destination: anchor?.getAttribute("href") ?? "",
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
