import { cn } from "@/lib/cn";

/**
 * The only component permitted to own page vertical spacing.
 * `interval` applies the oversized gap between major argument movements.
 */
export function Section({
  id,
  tone = "ground",
  interval = false,
  spacing = "default",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: "ground" | "subtle";
  interval?: boolean;
  /** `page`: o ritmo da Home (margem de 20px e 96/128px), usado nas páginas internas. */
  spacing?: "default" | "page";
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        spacing === "page" ? "px-4 py-24 md:px-5 md:py-32" : "py-14 md:py-16 lg:py-20",
        tone === "subtle" && "bg-ground-subtle",
        interval && "pxto-interval",
        className,
      )}
    >
      {children}
    </section>
  );
}
