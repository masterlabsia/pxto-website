import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/TextLink";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/sections/shared/PageHero";
import { ComoTrabalhamos } from "@/sections/shared/ComoTrabalhamos";
import { buildMetadata } from "@/lib/metadata";
import { sobrePage } from "@/content/pages/sobre";

export const metadata: Metadata = buildMetadata({ ...sobrePage.meta, path: "/sobre" });

/**
 * Builds trust. PXTO is presented as a company.
 *
 * Structural rule (PRD 27): "A PXTO é...", never "Eu sou...". No first-person
 * singular. No history, no team, no clients, no numbers: none is evidenceable,
 * and specificity about method replaces them.
 */
export default function SobrePage() {
  const p = sobrePage;
  return (
    <>
      <PageHero heading={p.hero.heading} body={p.hero.body} />

      <Section spacing="page" labelledBy="por-que">
        <Container width="wide">
          <div className="pxto-reveal-stagger grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading level={2} size="section" id="por-que">
                {p.porQue.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-7 lg:col-start-6">
              {p.porQue.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink-secondary md:text-lg">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <section aria-labelledby="como-pensamos" className="px-4 py-5 md:px-5">
        <Container width="wide">
          <div className="pxto-container-in rounded-xl border border-rule bg-ground-subtle px-6 py-16 md:px-12 md:py-24">
            <div className="pxto-reveal-stagger max-w-3xl">
              <Heading level={2} size="section" id="como-pensamos">
                {p.comoPensamos.heading}
              </Heading>
              <div className="mt-8 space-y-4">
                {p.comoPensamos.body.map((t) => (
                  <p key={t.slice(0, 24)} className="text-base text-ink-secondary md:text-lg">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ComoTrabalhamos />

      <Section spacing="page" labelledBy="principios" className="pt-0 md:pt-0">
        <Container width="wide">
          <Heading level={2} size="section" id="principios" className="pxto-reveal">
            {p.principios.heading}
          </Heading>
          {/* Enforceable rules, not aspirational adjectives. */}
          <dl className="pxto-reveal mt-12 grid grid-cols-1 overflow-hidden rounded-xl border border-rule bg-ground-subtle md:grid-cols-2">
            {p.principios.items.map((item) => (
              <div
                key={item.title}
                className="border-t border-rule p-6 first:border-t-0 md:p-8 md:nth-2:border-t-0 md:even:border-l"
              >
                <dt className="text-xl font-medium text-ink">{item.title}</dt>
                <dd className="mt-3 max-w-prose text-base text-ink-secondary">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Link rule R2: every non-project page reaches a project. */}
      <Section spacing="page" labelledBy="ver-projetos" className="pt-0 md:pt-0">
        <Container width="wide">
          <div className="pxto-reveal-stagger max-w-3xl">
            <Heading level={2} size="sub" id="ver-projetos">
              A forma mais direta de entender como trabalhamos é ver o que já foi construído.
            </Heading>
            <div className="mt-6">
              <ArrowLink href="/projetos">Ver projetos</ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      <CTA headingId="cta-sobre" heading={p.cta.heading} body={p.cta.body} />
    </>
  );
}
