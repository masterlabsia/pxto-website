import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Project } from "@/content/schemas";

/**
 * The nine narrative blocks of a project page, in the order PRD 21 fixes.
 *
 * A block with no content is omitted, not emptied. No empty headings, no
 * "informação não disponível", no placeholder text. Content is proportional to
 * what may be disclosed (PRD 21).
 *
 * `Resultado` is omitted on both current projects because no result is
 * documented or cleared. Omission carries no cost; an invented outcome would
 * discredit the whole portfolio.
 */
const blocks = [
  ["context", "Contexto"],
  ["problem", "Problema"],
  ["challenge", "Desafio"],
  ["solution", "Solução"],
  ["process", "Como funciona"],
  ["results", "Resultado"],
] as const;

export function ProjectBlocks({ project }: { project: Project }) {
  const present = blocks.filter(([key]) => Boolean(project[key]));

  return (
    <Container width="wide">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-4">
          {present.map(([key, label]) => (
            <section key={key} aria-labelledby={`bloco-${key}`} className="pxto-rule-top py-8">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-6">
                <Heading
                  level={2}
                  size="card"
                  id={`bloco-${key}`}
                  className="font-mono text-2xs uppercase text-ink-secondary lg:col-span-3"
                >
                  {label}
                </Heading>
                <p className="max-w-prose text-base text-ink lg:col-span-9">
                  {project[key]}
                </p>
              </div>
            </section>
          ))}

          {project.technologies && project.technologies.length > 0 ? (
            <section aria-labelledby="bloco-tec" className="pxto-rule-top py-8">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-6">
                <Heading
                  level={2}
                  size="card"
                  id="bloco-tec"
                  className="font-mono text-2xs uppercase text-ink-secondary lg:col-span-3"
                >
                  Capacidades aplicadas
                </Heading>
                {/* Confirmed capabilities only. Never an inferred stack (PRD 53). */}
                <ul className="lg:col-span-9">
                  {project.technologies.map((t) => (
                    <li key={t} className="py-1 text-base text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
