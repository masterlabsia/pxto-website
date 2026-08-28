/** Minimal class joiner. Avoids a dependency for a three-line utility. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
