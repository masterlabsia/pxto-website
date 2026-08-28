import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTA } from "@/components/ui/CTA";
import { Processo } from "@/sections/shared/Processo";
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
      <section className="border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Heading level={1} size="display">
                {p.hero.heading}
              </Heading>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-lg text-ink-secondary">{p.hero.body}</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="visao-geral" className="pxto-interval pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Heading level={2} size="section" id="visao-geral">
                {p.overview.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-6 lg:col-start-7">
              {p.overview.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink-secondary">
                  {t}
                </p>
              ))}
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {solutions.map((s) => (
              <ServiceCard key={s.slug} solution={s} />
            ))}
          </ul>
        </Container>
      </section>

      <Processo headingId="processo-solucoes" />

      <CTA headingId="cta-solucoes" heading={p.cta.heading} body={p.cta.body} />
    </>
  );
}
