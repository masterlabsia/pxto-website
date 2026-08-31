import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

/**
 * Região viva, para que a mudança de estado seja anunciada.
 *
 * A cor nunca é o único sinal: o texto carrega o significado e o ícone adiciona
 * uma pista redundante que não depende nem de cor nem de leitura (WCAG 1.4.1).
 * O ícone é aria-hidden porque repete o que o texto já diz.
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
  const Icon = tone === "success" ? CheckCircleIcon : ExclamationTriangleIcon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex gap-3 border-l-2 pl-4",
        tone === "success" ? "border-success" : "border-danger",
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-5 shrink-0",
          tone === "success" ? "text-success" : "text-danger",
        )}
      />
      <div>
        {heading ? (
          <p className="text-base font-medium text-ink">{heading}</p>
        ) : null}
        <p className="mt-1 text-sm text-ink-secondary">{children}</p>
      </div>
    </div>
  );
}
