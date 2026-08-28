import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

/**
 * radius-sm, never pill. Active state translates 1px for tactile feedback.
 * No gradient, no glow. Every variant is contrast-validated against its ground.
 */
const base =
  // whitespace-nowrap only from sm up. A long approved label such as
  // "Quero conversar sobre meu projeto" cannot fit 320px on one line, and the
  // no-wrap rule is a desktop rule.
  "inline-flex items-center justify-center rounded-sm font-medium text-center sm:whitespace-nowrap " +
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
  md: "h-10 px-3 text-sm sm:px-4",
  lg: "min-h-12 px-4 py-2 text-base sm:px-6",
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
  analyticsLocation,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /**
   * Opts this CTA into `cta_click` (PRD 38). The event is collected by the
   * single delegated listener, so the component stays a Server Component.
   */
  analyticsLocation?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={classes(variant, size, className)}
      {...(analyticsLocation
        ? { "data-analytics": "cta", "data-analytics-location": analyticsLocation }
        : {})}
    >
      {children}
    </Link>
  );
}
