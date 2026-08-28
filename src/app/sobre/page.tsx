import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/TextLink";
import { CTA } from "@/components/ui/CTA";
import { Processo } from "@/sections/shared/Processo";
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
      <section className="border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <Heading level={1} size="display">
                {p.hero.heading}
              </Heading>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-prose text-lg text-ink-secondary">{p.hero.body}</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="por-que" className="pxto-interval pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading level={2} size="section" id="por-que">
                {p.porQue.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-7 lg:col-start-6">
              {p.porQue.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink-secondary">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="como-pensamos"
        className="border-y border-rule bg-ground-subtle py-14 md:py-16 lg:py-20"
      >
        <Container width="wide">
          <div className="max-w-prose">
            <Heading level={2} size="section" id="como-pensamos">
              {p.comoPensamos.heading}
            </Heading>
            <div className="mt-6 space-y-4">
              {p.comoPensamos.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink-secondary">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Processo headingId="processo-sobre" />

      <section aria-labelledby="principios" className="pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <Heading level={2} size="section" id="principios">
            {p.principios.heading}
          </Heading>
          {/* Enforceable rules, not aspirational adjectives. */}
          <dl className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {p.principios.items.map((item) => (
              <div key={item.title} className="pxto-rule-top py-6">
                <dt className="text-lg font-medium text-ink">{item.title}</dt>
                <dd className="mt-2 max-w-prose text-sm text-ink-secondary">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Link rule R2: every non-project page reaches a project. */}
      <section aria-labelledby="ver-projetos" className="pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <Heading level={2} size="sub" id="ver-projetos">
            A forma mais direta de entender como trabalhamos é ver o que já foi construído.
          </Heading>
          <div className="mt-6">
            <ArrowLink href="/projetos">Ver projetos</ArrowLink>
          </div>
        </Container>
      </section>

      <CTA headingId="cta-sobre" heading={p.cta.heading} body={p.cta.body} />
    </>
  );
}
