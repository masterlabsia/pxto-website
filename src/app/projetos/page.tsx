import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/metadata";
import { projetosPage } from "@/content/pages/projetos";
import { getPublishedProjects } from "@/content/projects";

export const metadata: Metadata = buildMetadata({ ...projetosPage.meta, path: "/projetos" });

/**
 * Demonstrates capability, reasoning, execution and the variety of problems
 * solved. Explicitly not client volume (PRD 16).
 *
 * With zero cleared projects the grid and the intro are omitted rather than
 * rendered empty: an empty state here would advertise the absence
 * (PROJECT_FRAMEWORK 19.4). Never a placeholder card, never "em breve", never
 * a phrase implying that more exist and are hidden.
 *
 * The page itself still exists because PRD 10.1 fixes it in the navbar. It must
 * not be published until at least one project clears the section 20 checklist.
 */
export default function ProjetosPage() {
  const projects = getPublishedProjects();
  const p = projetosPage;

  return (
    <>
      <section className="border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Heading level={1} size="display">
                {p.heading}
              </Heading>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-lg text-ink-secondary">{p.subheading}</p>
              {projects.length > 0 ? (
                <p className="mt-4 max-w-prose text-base text-ink-secondary">{p.intro}</p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {projects.length > 0 ? (
        <section aria-label="Lista de projetos" className="pxto-interval pb-14 md:pb-16 lg:pb-20">
          <Container width="wide">
            {/*
              Three columns at lg. The card format is identical to Home and to
              the solution pages: only the column count differs, which is a
              page-level layout decision, not a second card format.
            */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} headingLevel={2} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTA headingId="cta-projetos" heading={p.cta.heading} body={p.cta.body} />
    </>
  );
}
