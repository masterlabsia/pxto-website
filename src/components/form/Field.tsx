import { cn } from "@/lib/cn";

/**
 * Label above, control, helper below, error below (PRD 39, DESIGN_SYSTEM II).
 * A persistent visible label is mandatory: placeholder as label is banned
 * (WCAG 3.3.2). Errors bind by aria-describedby and are never signalled by
 * colour alone.
 */
export function Field({
  id,
  label,
  helper,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (aria: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: true;
    required?: boolean;
  }) => React.ReactNode;
}) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-ink-secondary"> (obrigatório)</span>
        ) : null}
      </label>

      {children({
        id,
        "aria-describedby": describedBy,
        ...(error ? { "aria-invalid": true as const } : {}),
        ...(required ? { required: true } : {}),
      })}

      {helper ? (
        <p id={helperId} className="text-xs text-ink-secondary">
          {helper}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
