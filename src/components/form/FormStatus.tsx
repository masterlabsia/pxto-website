import { cn } from "@/lib/cn";

/**
 * Live region so a status change is announced. Colour is never the only
 * signal: the message text carries the meaning.
 */
export function FormStatus({
  tone,
  heading,
  children,
}: {
  tone: "success" | "error";
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "border-l-2 pl-4",
        tone === "success" ? "border-success" : "border-danger",
      )}
    >
      {heading ? (
        <p className="text-base font-medium text-ink">{heading}</p>
      ) : null}
      <p className="mt-1 text-sm text-ink-secondary">{children}</p>
    </div>
  );
}
