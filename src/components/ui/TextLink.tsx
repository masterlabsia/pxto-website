import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

/**
 * Underline offset keeps descenders legible. Colour is never the only
 * affordance in prose. DESIGN_SYSTEM.md Part II.
 */
export function TextLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-accent underline decoration-1 underline-offset-4",
        "transition-colors duration-fast hover:text-accent-hover",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Standalone directional link used to close a section. */
export function ArrowLink({
  href,
  className,
  analyticsLocation,
  children,
}: {
  href: string;
  className?: string;
  analyticsLocation?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(analyticsLocation
        ? { "data-analytics": "cta", "data-analytics-location": analyticsLocation }
        : {})}
      className={cn(
        "group inline-flex items-center gap-2 py-1 text-sm font-medium text-ink",
        "transition-colors duration-fast hover:text-accent",
        className,
      )}
    >
      <span className="underline decoration-rule decoration-1 underline-offset-4 group-hover:decoration-accent">
        {children}
      </span>
      <ArrowRightIcon
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5"
      />
    </Link>
  );
}
