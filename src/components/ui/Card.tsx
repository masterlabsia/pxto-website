import { cn } from "@/lib/cn";

/**
 * Used only where elevation communicates real hierarchy. Otherwise group with a
 * divider or with space (DESIGN_SYSTEM.md Part II).
 *
 * radius-none, border-defined. Hover shifts the border, it never adds a shadow:
 * elevation is communicated by border and ground shift, and layered shadow
 * reads as SaaS template (PRD 33).
 */
export function Card({
  tone = "bordered",
  interactive = false,
  className,
  children,
}: {
  tone?: "bordered" | "subtle";
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "p-5 md:p-6",
        tone === "bordered" ? "border border-rule" : "bg-ground-subtle",
        interactive &&
          "transition-colors duration-fast hover:border-rule-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}
