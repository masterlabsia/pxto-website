import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { ProjectBlocks } from "@/components/content/ProjectBlocks";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/metadata";
import { getProject, getPublishedProjects } from "@/content/projects";
import { getSolution } from "@/content/solutions";

/**
 * Only published projects get a route. An uncleared project has no page at all:
 * PRD 20 enforced by the router rather than by a conditional someone might
 * forget (TECHNICAL_ARCHITECTURE 6).
 *
 * Both current projects are published: false, so this currently generates zero
 * pages. That is correct, not a bug.
 */
export function generateStaticParams() {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.summary,
    path: `/projetos/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const capability = project.solutions[0];
  const capabilityName = capability ? getSolution(capability)?.name : undefined;
  const others = getPublishedProjects().filter((p) => p.slug !== project.slug);

  return (
    <>
      {/* The page opens with the project and its problem, never with the stack. */}
      <section className="border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                {capabilityName ? <Badge>{capabilityName}</Badge> : null}
                <Badge>{project.category}</Badge>
              </div>
              <Heading level={1} size="display" className="mt-5">
                {project.title}
              </Heading>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-lg text-ink-secondary">{project.summary}</p>
            </div>
          </div>

          <div className="relative mt-10 aspect-[16/9] w-full border border-rule bg-ground-subtle lg:mt-12">
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 85vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <div className="pxto-interval pb-14 md:pb-16 lg:pb-20">
        <ProjectBlocks project={project} />
      </div>

      {project.gallery && project.gallery.length > 0 ? (
        <section aria-labelledby="galeria" className="pb-14 md:pb-16 lg:pb-20">
          <Container width="wide">
            <Heading level={2} size="sub" id="galeria">
              Demonstração
            </Heading>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.gallery.map((img) => (
                <figure key={img.src}>
                  <div className="relative aspect-[4/3] w-full border border-rule bg-ground-subtle">
                    <Image src={img.src} alt={img.alt} fill sizes="50vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 text-xs text-ink-secondary">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section aria-labelledby="outros" className="pb-14 md:pb-16 lg:pb-20">
          <Container width="wide">
            <Heading level={2} size="sub" id="outros">
              Outros projetos
            </Heading>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
              {others.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTA
        headingId="cta-projeto"
        heading="Tem uma ideia que precisa virar produto?"
        body="Descreva o problema que ela resolve. O resto é conversa."
        label="Quero conversar sobre meu projeto"
      />
    </>
  );
}
