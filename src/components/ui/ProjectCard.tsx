import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Project } from "@/content/schemas";
import { getSolution } from "@/content/solutions";

/**
 * One card format across the entire site: Home, the index, and solution pages
 * use this component unchanged.
 *
 * Never: a client logo, any metric, a status or confidencial badge, a
 * non-clickable state, an "em breve" tile. Capability leads the label, the
 * technical category follows (PROJECT_FRAMEWORK 2.4).
 */
export function ProjectCard({
  project,
  headingLevel = 3,
}: {
  project: Project;
  /**
   * The card sits under an h2 section heading almost everywhere, so h3 is the
   * default. On /projetos the cards sit directly under the page h1 with no
   * intermediate section heading, so the level is raised to keep the document
   * outline unbroken.
   */
  headingLevel?: 2 | 3;
}) {
  const Title = `h${headingLevel}` as const;
  const capability = project.solutions[0];
  const capabilityName = capability ? getSolution(capability)?.name : undefined;

  return (
    <article className="group">
      <Link href={`/projetos/${project.slug}`} className="block">
        {project.coverImage.pending ? (
          <ImageSlot ratio="16 / 10" label={project.coverImage.brief ?? project.coverImage.alt} />
        ) : (
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-ground-subtle">
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="mt-5">
          {capabilityName ? <Badge>{capabilityName}</Badge> : null}
          <Title className="mt-3 text-xl font-semibold text-ink transition-colors duration-fast group-hover:text-accent">
            {project.title}
          </Title>
          <p className="mt-2 max-w-prose text-sm text-ink-secondary">
            {project.summary}
          </p>
        </div>
      </Link>
    </article>
  );
}
