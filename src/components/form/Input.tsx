import { cn } from "@/lib/cn";

/**
 * radius-sm, border rule-strong. Placeholder contrast is validated: a light
 * grey placeholder on a near-white field is an accessibility failure.
 * Height is 44px so the touch target rule is met without a media query.
 */
const control =
  "h-11 w-full rounded-sm border border-rule-strong bg-surface px-3 text-base text-ink " +
  "placeholder:text-ink-secondary transition-colors duration-fast " +
  "hover:border-ink focus:border-accent " +
  "aria-[invalid=true]:border-danger " +
  "disabled:text-ink-disabled";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({
  className,
  rows = 5,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={cn(control, "h-auto resize-y py-3 leading-relaxed", className)}
      {...props}
    />
  );
}

/**
 * A native select is the right control for one field with five options: more
 * accessible on mobile, no JavaScript, and it is what the PRD's simple form
 * asks for. This is why shadcn/ui is not needed here.
 */
export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(control, "pr-8", className)} {...props}>
      {children}
    </select>
  );
}
