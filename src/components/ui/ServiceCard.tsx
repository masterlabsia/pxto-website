import { ArrowLink } from "@/components/ui/TextLink";
import type { Solution } from "@/content/schemas";

/**
 * All four instances are visually identical: identical span, identical rule,
 * identical content depth. That enforces the four-peer rule (PRD 4)
 * structurally rather than by discipline.
 *
 * Never: an icon per service, a featured variant, or a description length that
 * creates implied hierarchy between the four.
 */
export function ServiceCard({ solution }: { solution: Solution }) {
  return (
    <li className="pxto-rule-top flex flex-col py-6">
      <h3 className="text-xl font-semibold text-ink">{solution.name}</h3>
      <p className="mt-1 font-mono text-2xs uppercase text-ink-secondary">
        {solution.positioning}
      </p>
      <p className="mt-4 flex-1 text-sm text-ink-secondary">
        {solution.description}
      </p>
      <div className="mt-6">
        <ArrowLink href={`/solucoes/${solution.slug}`}>
          {solution.ctaLabel}
        </ArrowLink>
      </div>
    </li>
  );
}
