import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

/**
 * radius-sm, never pill. Active state translates 1px for tactile feedback.
 * No gradient, no glow. Every variant is contrast-validated against its ground.
 */
const base =
  "inline-flex items-center justify-center rounded-sm font-medium whitespace-nowrap " +
  "transition-colors duration-fast ease-out active:translate-y-px " +
  "disabled:pointer-events-none disabled:text-ink-disabled";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary:
    "border border-rule-strong text-ink hover:border-ink hover:bg-ground-subtle",
  ghost: "text-ink hover:bg-ground-subtle",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}
