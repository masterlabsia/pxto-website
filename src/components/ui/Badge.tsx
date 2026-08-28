import { cn } from "@/lib/cn";

/**
 * Mono label for a capability or category. Text only: no fill, no status dot,
 * no colour coding, never overlaid on an image. DESIGN_SYSTEM.md Part II.
 */
export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-rule px-2 py-0.5",
        "font-mono text-2xs uppercase text-ink-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
