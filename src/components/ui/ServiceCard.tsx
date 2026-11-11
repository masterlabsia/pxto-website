import Link from "next/link";
import { ArrowLink } from "@/components/ui/TextLink";
import type { Solution } from "@/content/schemas";

/**
 * All four instances are visually identical: identical span, identical rule,
 * identical content depth. That enforces the four-peer rule (PRD 4)
 * structurally rather than by discipline.
 *
 * Never: an icon per service, a featured variant, or a description length that
 * creates implied hierarchy between the four.
 *
 * NENHUMA IMAGEM POR SOLUÇÃO, permanentemente. No instante em que uma das quatro
 * ganhar uma imagem melhor que as outras, a regra de pares do PRD 4 está violada
 * na prática, mesmo com spans idênticos. Se a seção precisar de apoio visual,
 * é UMA imagem compartilhada acima das quatro células.
 *
 * A linha de posicionamento (PRD 23 a 26) não aparece aqui na home: era
 * redundante ao lado da descrição. Continua em /solucoes e nas 4 páginas de
 * detalhe, onde audit-content a exige verbatim.
 *
 * `variant` é uma disposição, nunca uma hierarquia: as quatro instâncias de uma
 * mesma página sempre usam a mesma.
 * - `ruled` (padrão): régua no topo e link com seta, em /solucoes.
 * - `column`: cartão com borda arredondada, título, descrição e um link de texto separado
 *   por uma linha, em grade de 4 colunas, usado na Home. Veio da exploração do Stitch
 *   (11/11/2026), SEM o ícone e SEM a numeração dele: ícone por solução é proibido, e
 *   numerar quatro pares sugeriria ordem entre eles. Os quatro cartões são idênticos.
 */
export function ServiceCard({
  solution,
  variant = "ruled",
}: {
  solution: Solution;
  variant?: "ruled" | "column";
}) {
  const href = `/solucoes/${solution.slug}`;

  if (variant === "column") {
    return (
      <li className="flex flex-col rounded-xl border border-rule bg-ground-subtle p-6 transition-colors duration-fast hover:border-rule-strong md:p-8">
        <h3 className="text-2xl font-medium text-ink">{solution.name}</h3>
        <p className="mt-4 flex-1 text-base text-ink-secondary">{solution.description}</p>
        <div className="mt-8 border-t border-rule pt-5">
          <Link
            href={href}
            data-analytics="cta"
            data-analytics-location="service-card"
            className="inline-flex py-1 text-base font-medium text-ink underline decoration-rule-strong underline-offset-4 transition-colors duration-fast hover:decoration-ink"
          >
            {solution.ctaLabel}
          </Link>
        </div>
      </li>
    );
  }

  return (
    <li className="pxto-rule-top flex flex-col py-6">
      <h3 className="text-xl font-semibold text-ink">{solution.name}</h3>
      <p className="mt-3 flex-1 text-sm text-ink-secondary">
        {solution.description}
      </p>
      <div className="mt-6">
        <ArrowLink href={href} analyticsLocation="service-card">
          {solution.ctaLabel}
        </ArrowLink>
      </div>
    </li>
  );
}
