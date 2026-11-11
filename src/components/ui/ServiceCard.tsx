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
 * - `column`: linha no topo que cresce no hover, grande respiro antes do título e
 *   link de texto, em grade de 4 colunas, usada na Home (protótipo H612).
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
      <li className="pxto-line-item flex flex-col pt-16">
        <h3 className="text-xl font-medium text-ink">{solution.name}</h3>
        <p className="mt-3 flex-1 text-base text-ink-secondary">{solution.description}</p>
        <div className="mt-8">
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
