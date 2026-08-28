import { cn } from "@/lib/cn";

type Width = "prose" | "content" | "wide";

const widths: Record<Width, string> = {
  prose: "max-w-prose",
  content: "max-w-content",
  wide: "max-w-wide",
};

/**
 * Constrains and centres content width. Layout only: no background, no border,
 * no vertical spacing. DESIGN_SYSTEM.md Part I.8.
 */
export function Container({
  width = "content",
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-4 md:px-6 lg:px-8", widths[width], className)}>
      {children}
    </div>
  );
}
