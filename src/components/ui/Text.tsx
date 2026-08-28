import { cn } from "@/lib/cn";

type Variant = "lead" | "body" | "small" | "caption" | "mono";

const variants: Record<Variant, string> = {
  lead: "text-lg text-ink",
  body: "text-base text-ink",
  small: "text-sm text-ink-secondary",
  caption: "text-xs text-ink-secondary",
  mono: "font-mono text-2xs uppercase text-ink-secondary",
};

export function Text({
  variant = "body",
  as: Tag = "p",
  className,
  children,
}: {
  variant?: Variant;
  as?: "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
}
