import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { comoTrabalhamos } from "@/content/home";

/**
 * Method as evidence. A new company cannot prove capability with volume, so how
 * it works is the strongest available proof (NARRATIVE 4.2).
 *
 * Os passos são nomeados só pelo verbo, sem numeração, como no Stitch. A ordem
 * está na própria sequência e na frase de fechamento. A numeração 01 a 05
 * continua nas páginas que usam `Processo`.
 *
 * Título e linha de apoio à esquerda, passos à direita, separados por régua:
 * ali a régua separa conteúdo de fato.
 */
export function ComoTrabalhamos() {
  return (
    <section
      id="como-trabalhamos"
      aria-labelledby="processo-heading"
      className="px-4 py-24 md:px-5 md:py-32"
    >
      <Container width="wide" className="px-0 md:px-0 lg:px-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="pxto-reveal-stagger lg:col-span-5">
            <Heading level={2} size="section" id="processo-heading">
              {comoTrabalhamos.heading}
            </Heading>
            <p className="mt-6 max-w-prose text-lg text-ink-secondary">
              {comoTrabalhamos.intro}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ol className="pxto-reveal-stagger">
              {comoTrabalhamos.steps.map((step) => (
                <li key={step.name} className="pxto-line-item pb-8 pt-6">
                  <h3 className="text-2xl font-medium text-ink">{step.name}</h3>
                  <p className="mt-3 max-w-prose text-base text-ink-secondary">{step.lead}</p>
                </li>
              ))}
            </ol>
            <p className="mt-12 max-w-xl text-base font-semibold text-ink">
              {comoTrabalhamos.closing}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
