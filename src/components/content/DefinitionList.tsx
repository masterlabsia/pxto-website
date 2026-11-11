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
 * - `stack`: coluna única, sem régua, termo em corpo maior.
 * - `card`: coluna única dentro de um cartão arredondado, com uma linha entre os itens e a
 *   numeração 01, 02... à esquerda. É a do Problema na Home, vinda da exploração do Stitch
 *   (11/11/2026). A numeração é CSS (`.pxto-numbered`), então não entra no texto nem no
 *   leitor de tela. Os itens não têm ordem: o número é só um marcador, e é exceção à regra
 *   que limita numeral (CLAUDE.md 7.12), decidida pelo responsável.
 */
export function DefinitionList({
  items,
  layout = "columns",
  className,
}: {
  items: readonly Definition[];
  layout?: "columns" | "stack" | "card";
  className?: string;
}) {
  const stack = layout === "stack";
  const card = layout === "card";
  return (
    <dl
      className={cn(
        card
          ? "pxto-numbered overflow-hidden rounded-xl border border-rule bg-ground-subtle"
          : stack
            ? ""
            : "grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.term}
          className={
            card
              ? "border-t border-rule py-6 pl-16 pr-6 transition-colors duration-fast first:border-t-0 hover:bg-surface md:py-7 md:pl-20 md:pr-8"
              : stack
                ? "pxto-line-item pb-6 pt-6"
                : "pxto-rule-top py-5 md:py-6"
          }
        >
          <dt className={stack || card ? "text-xl font-medium text-ink" : "font-medium text-ink"}>
            {item.term}
          </dt>
          <dd
            className={cn(
              "max-w-prose text-ink-secondary",
              stack || card ? "mt-1.5 text-base" : "mt-1 text-sm",
            )}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
