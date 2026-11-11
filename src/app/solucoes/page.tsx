import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/sections/shared/PageHero";
import { ComoTrabalhamos } from "@/sections/shared/ComoTrabalhamos";
import { buildMetadata } from "@/lib/metadata";
import { solucoesPage } from "@/content/pages/solucoes";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = buildMetadata({ ...solucoesPage.meta, path: "/solucoes" });

/**
 * The commercial portfolio as one offer, not a service menu.
 *
 * The overview precedes the four blocks: without it the page reads as a menu,
 * which is the generic-software-house failure (NARRATIVE 8.1).
 */
export default function SolucoesPage() {
  const p = solucoesPage;
  return (
    <>
      <PageHero heading={p.hero.heading} body={p.hero.body} />

      <Section spacing="page" labelledBy="visao-geral">
        <Container width="wide">
          <div className="pxto-reveal-stagger grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Heading level={2} size="section" id="visao-geral">
                {p.overview.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-6 lg:col-start-7">
              {p.overview.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink-secondary md:text-lg">
                  {t}
                </p>
              ))}
            </div>
          </div>

          <ul className="pxto-reveal-stagger mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {solutions.map((s) => (
              <ServiceCard key={s.slug} solution={s} variant="column" />
            ))}
          </ul>
        </Container>
      </Section>

      <ComoTrabalhamos />

      <CTA headingId="cta-solucoes" heading={p.cta.heading} body={p.cta.body} />
    </>
  );
}
