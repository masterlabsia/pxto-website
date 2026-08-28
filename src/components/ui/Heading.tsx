import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;
type Size = "display" | "section" | "sub" | "card";

/**
 * Semantic level is set independently of visual size, so a heading is never
 * chosen for how big it looks. DESIGN_SYSTEM.md Part II.
 */
const sizes: Record<Size, string> = {
  display: "text-4xl md:text-5xl font-semibold text-balance",
  section: "text-3xl md:text-4xl font-semibold text-balance",
  sub: "text-xl md:text-2xl font-semibold",
  card: "text-lg font-medium",
};

export function Heading({
  level,
  size,
  id,
  className,
  children,
}: {
  level: Level;
  size: Size;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={cn(sizes[size], "text-ink", className)}>
      {children}
    </Tag>
  );
}
