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
 */
export function ServiceCard({ solution }: { solution: Solution }) {
  return (
    <li className="pxto-rule-top flex flex-col py-6">
      <h3 className="text-xl font-semibold text-ink">{solution.name}</h3>
      <p className="mt-3 flex-1 text-sm text-ink-secondary">
        {solution.description}
      </p>
      <div className="mt-6">
        <ArrowLink href={`/solucoes/${solution.slug}`} analyticsLocation="service-card">
          {solution.ctaLabel}
        </ArrowLink>
      </div>
    </li>
  );
}
