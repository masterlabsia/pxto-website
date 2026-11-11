import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/sections/shared/PageHero";
import { PageEvent } from "@/components/analytics/PageEvent";
import { JsonLd, serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { solutions, getSolution } from "@/content/solutions";
import { solutionPages, esteSite } from "@/content/pages/solution-detail";
import { getProjectsBySolution } from "@/content/projects";
import { SolutionSlug } from "@/content/schemas";

/**
 * One template for the four solution pages. Four separate files would be four
 * places to drift, and PRD 4 requires the four to be treated as peers.
 *
 * Section order per PAGE_SPECS section 3: hero, problema, o que fazemos,
 * abordagem, exemplos, projetos relacionados (conditional), outras soluções,
 * CTA. Problema always precedes the offer (NARRATIVE 3.4).
 */
export function generateStaticParams() {
  return solutions.map((s) => ({ solucao: s.slug }));
}

type Params = { params: Promise<{ solucao: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { solucao } = await params;
  const parsed = SolutionSlug.safeParse(solucao);
  if (!parsed.success) return {};
  const page = solutionPages[parsed.data];
  return buildMetadata({ ...page.meta, path: `/solucoes/${parsed.data}` });
}

export default async function SolutionPage({ params }: Params) {
  const { solucao } = await params;
  const parsed = SolutionSlug.safeParse(solucao);
  if (!parsed.success) notFound();

  const solution = getSolution(parsed.data);
  if (!solution) notFound();

  const page = solutionPages[parsed.data];
  const related = getProjectsBySolution(parsed.data);
  const siblings = solutions.filter((s) => s.slug !== parsed.data);

  return (
    <>
      <PageEvent name="service_view" props={{ solution: parsed.data }} />
      <JsonLd data={serviceJsonLd(solution)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Soluções", path: "/solucoes" },
          { name: solution.name, path: `/solucoes/${solution.slug}` },
        ])}
      />
      <PageHero heading={solution.positioning} body={page.heroBody}>
        <Badge>{solution.name}</Badge>
      </PageHero>

      {/* Problema before the offer, on every page that has both. */}
      <Section spacing="page" labelledBy="problema">
        <Container width="wide">
          <div className="pxto-reveal-stagger grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Heading level={2} size="section" id="problema">
                {page.problema.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-5 lg:col-start-8">
              {page.problema.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink-secondary md:text-lg">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <section aria-labelledby="escopo" className="px-4 py-5 md:px-5">
        <Container width="wide">
          <div className="pxto-container-in rounded-xl border border-rule bg-ground-subtle px-6 py-16 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="pxto-reveal-stagger lg:col-span-5">
                <Heading level={2} size="section" id="escopo">
                  {page.oQueFazemos.heading}
                </Heading>
                <p className="mt-6 max-w-prose text-base text-ink md:text-lg">
                  {solution.description}
                </p>
                {page.oQueFazemos.note ? (
                  <p className="mt-4 max-w-prose text-sm text-ink-secondary">
                    {page.oQueFazemos.note}
                  </p>
                ) : null}
              </div>
              {/* Scope as real list markup, never a middle-dot joined string. */}
              <ul className="pxto-reveal lg:col-span-6 lg:col-start-7">
                {solution.scope.map((item) => (
                  <li
                    key={item}
                    className="border-t border-rule py-4 font-mono text-2xs uppercase text-ink-secondary first:border-t-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Section spacing="page" labelledBy="abordagem">
        <Container width="wide">
          <div className="pxto-reveal-stagger grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading level={2} size="section" id="abordagem">
                {page.abordagem.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-7 lg:col-start-6">
              {page.abordagem.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink md:text-lg">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {parsed.data === "sites" ? (
        <Section spacing="page" labelledBy="este-site" className="pt-0 md:pt-0">
          <Container width="wide">
            <div className="pxto-reveal-stagger grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Heading level={2} size="section" id="este-site">
                  {esteSite.heading}
                </Heading>
              </div>
              <div className="space-y-4 lg:col-span-6 lg:col-start-7">
                {esteSite.body.map((t) => (
                  <p key={t.slice(0, 24)} className="text-base text-ink-secondary md:text-lg">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="page" labelledBy="exemplos" className="pt-0 md:pt-0">
        <Container width="wide">
          <Heading level={2} size="section" id="exemplos" className="pxto-reveal">
            {page.exemplos.heading}
          </Heading>
          {/* Situations, never claimed engagements (PRD 53). */}
          <ul className="pxto-reveal mt-12 grid grid-cols-1 overflow-hidden rounded-xl border border-rule bg-ground-subtle md:grid-cols-2">
            {page.exemplos.items.map((item) => (
              <li
                key={item}
                className="border-t border-rule p-6 text-base text-ink first:border-t-0 md:p-8 md:nth-2:border-t-0 md:even:border-l"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Omitted entirely when no cleared project applies. Never an empty region. */}
      {related.length > 0 ? (
        <Section spacing="page" labelledBy="relacionados" className="pt-0 md:pt-0">
          <Container width="wide">
            <Heading level={2} size="section" id="relacionados">
              Projetos
            </Heading>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="page" labelledBy="outras" className="pt-0 md:pt-0">
        <Container width="wide">
          <Heading level={2} size="sub" id="outras" className="pxto-reveal">
            O diagnóstico pode apontar para outro caminho
          </Heading>
          <ul className="pxto-reveal mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solucoes/${s.slug}`}
                  className="group block rounded-xl border border-rule bg-ground-subtle p-6 transition-colors duration-fast hover:border-rule-strong md:p-8"
                >
                  <span className="text-lg font-medium text-ink">{s.name}</span>
                  <span className="mt-2 block font-mono text-2xs uppercase text-ink-secondary">
                    {s.positioning}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTA
        headingId="cta-solucao"
        heading={page.cta.heading}
        body={page.cta.body}
        label={page.cta.label}
      />
    </>
  );
}
