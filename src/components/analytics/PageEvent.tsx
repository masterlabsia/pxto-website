"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Fires one view event when the page mounts. Used by solution pages
 * (service_view) and project pages (project_view), per PRD 38.
 *
 * A ref guards against double firing under React strict mode in development.
 */
export function PageEvent<E extends Extract<AnalyticsEvent, { name: "service_view" | "project_view" }>>({
  name,
  props,
}: {
  name: E["name"];
  props: E["props"];
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(name, props);
  }, [name, props]);

  return null;
}
