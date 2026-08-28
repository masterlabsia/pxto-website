import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CTA } from "@/components/ui/CTA";
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
      <section className="border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Badge>{solution.name}</Badge>
              <Heading level={1} size="display" className="mt-5">
                {solution.positioning}
              </Heading>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-lg text-ink-secondary">{page.heroBody}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Problema before the offer, on every page that has both. */}
      <section aria-labelledby="problema" className="pxto-interval pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Heading level={2} size="section" id="problema">
                {page.problema.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-5 lg:col-start-8">
              {page.problema.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink-secondary">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="escopo"
        className="border-y border-rule bg-ground-subtle py-14 md:py-16 lg:py-20"
      >
        <Container width="wide">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Heading level={2} size="section" id="escopo">
                {page.oQueFazemos.heading}
              </Heading>
              <p className="mt-5 max-w-prose text-base text-ink">
                {solution.description}
              </p>
              {page.oQueFazemos.note ? (
                <p className="mt-4 max-w-prose text-sm text-ink-secondary">
                  {page.oQueFazemos.note}
                </p>
              ) : null}
            </div>
            {/* Scope as real list markup, never a middle-dot joined string. */}
            <ul className="lg:col-span-6 lg:col-start-7">
              {solution.scope.map((item) => (
                <li
                  key={item}
                  className="pxto-rule-top py-3 font-mono text-2xs uppercase text-ink-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="abordagem" className="pxto-interval pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading level={2} size="section" id="abordagem">
                {page.abordagem.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-7 lg:col-start-6">
              {page.abordagem.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-base text-ink">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {parsed.data === "sites" ? (
        <section aria-labelledby="este-site" className="pb-14 md:pb-16 lg:pb-20">
          <Container width="wide">
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Heading level={2} size="section" id="este-site">
                  {esteSite.heading}
                </Heading>
              </div>
              <div className="space-y-4 lg:col-span-6 lg:col-start-7">
                {esteSite.body.map((t) => (
                  <p key={t.slice(0, 24)} className="text-base text-ink-secondary">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="exemplos" className="pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <Heading level={2} size="section" id="exemplos">
            {page.exemplos.heading}
          </Heading>
          {/* Situations, never claimed engagements (PRD 53). */}
          <ul className="mt-8 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {page.exemplos.items.map((item) => (
              <li key={item} className="pxto-rule-top py-4 text-base text-ink">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Omitted entirely when no cleared project applies. Never an empty region. */}
      {related.length > 0 ? (
        <section aria-labelledby="relacionados" className="pb-14 md:pb-16 lg:pb-20">
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
        </section>
      ) : null}

      <section aria-labelledby="outras" className="pb-14 md:pb-16 lg:pb-20">
        <Container width="wide">
          <Heading level={2} size="sub" id="outras">
            O diagnóstico pode apontar para outro caminho
          </Heading>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 md:grid-cols-3">
            {siblings.map((s) => (
              <li key={s.slug} className="pxto-rule-top py-5">
                <Link
                  href={`/solucoes/${s.slug}`}
                  className="group block transition-colors duration-fast"
                >
                  <span className="text-lg font-medium text-ink group-hover:text-accent">
                    {s.name}
                  </span>
                  <span className="mt-1 block font-mono text-2xs uppercase text-ink-secondary">
                    {s.positioning}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTA
        headingId="cta-solucao"
        heading={page.cta.heading}
        body={page.cta.body}
        label={page.cta.label}
      />
    </>
  );
}
