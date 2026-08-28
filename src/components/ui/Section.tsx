import { cn } from "@/lib/cn";

/**
 * The only component permitted to own page vertical spacing.
 * `interval` applies the oversized gap between major argument movements.
 */
export function Section({
  id,
  tone = "ground",
  interval = false,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: "ground" | "subtle";
  interval?: boolean;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-14 md:py-16 lg:py-20",
        tone === "subtle" && "bg-ground-subtle",
        interval && "pxto-interval",
        className,
      )}
    >
      {children}
    </section>
  );
}
