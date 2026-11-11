import { cn } from "@/lib/cn";

export type Definition = { term: string; description: string };

/**
 * The defined term, expressed as layout rather than as an interaction.
 *
 * This is the signature of Direction A prime (VISUAL_DIRECTION.md Part VI):
 * a specification defines its terms. A hanging definition list carries that
 * without a hover affordance, which suits MOTION_INTENSITY 3 and works
 * identically on touch.
 *
 * Duas disposições, escolhidas por quem consome:
 * - `columns` (padrão): grade de até três colunas com régua no topo de cada
 *   termo. Cabe quando a lista ocupa a largura inteira.
 * - `stack`: coluna única, sem régua, termo em corpo maior. É a da Home, ao
 *   lado do título, como no Stitch.
 */
export function DefinitionList({
  items,
  layout = "columns",
  className,
}: {
  items: readonly Definition[];
  layout?: "columns" | "stack";
  className?: string;
}) {
  const stack = layout === "stack";
  return (
    <dl
      className={cn(
        stack
          ? ""
          : "grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.term}
          className={stack ? "pxto-line-item pb-6 pt-6" : "pxto-rule-top py-5 md:py-6"}
        >
          <dt className={stack ? "text-xl font-medium text-ink" : "font-medium text-ink"}>
            {item.term}
          </dt>
          <dd
            className={cn(
              "max-w-prose text-ink-secondary",
              stack ? "mt-1.5 text-base" : "mt-1 text-sm",
            )}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
