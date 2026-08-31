import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/TextLink";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getFeaturedProjects } from "@/content/projects";
import { projetos } from "@/content/home";
import { cta } from "@/content/site";

/**
 * Omitted, never emptied.
 *
 * Both projects are currently published: false, because neither has passed the
 * PROJECT_FRAMEWORK section 20 disclosure checklist. With nothing cleared this
 * section renders nothing at all: no placeholder card, no "em breve" tile, no
 * empty state message. An empty state here would advertise the absence
 * (PROJECT_FRAMEWORK 19.4).
 *
 * To preview the section during design review, set `published: true` in a
 * project content file. Do not commit that change.
 */
export function Projetos() {
  const projects = getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="projetos-heading"
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Heading level={2} size="section" id="projetos-heading">
              {projetos.heading}
            </Heading>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-prose text-base text-ink-secondary">
              {projetos.subheading}
            </p>
          </div>
        </div>

        {/* Três colunas em lg pelo mesmo motivo de /projetos: em duas colunas o
            terceiro card fica órfão. O formato do card não muda, só a contagem
            de colunas, que é decisão de página. */}
        <div className="pxto-reveal-stagger mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12">
          <ArrowLink href={cta.allProjects.href}>{cta.allProjects.label}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
