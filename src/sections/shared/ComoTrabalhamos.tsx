import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { comoTrabalhamos } from "@/content/home";

/**
 * Method as evidence. A new company cannot prove capability with volume, so how
 * it works is the strongest available proof (NARRATIVE 4.2).
 *
 * LINHA DO TEMPO HORIZONTAL com os cinco passos (11/11/2026, escolha do responsável a
 * partir do Stitch), num cartão arredondado. Cada passo tem um nó numerado 01 a 05 e uma
 * linha o liga ao seguinte. Aqui a numeração tem sentido: a ordem É a informação (e a
 * frase de fechamento diz "o que não muda é a ordem").
 *
 * O que NÃO veio do Stitch: ele destacava o nó 05 com um anel de luz, e isso daria
 * ênfase a "Evoluímos", que tem o aviso ⚠ CONFIRMAR (compromisso pós-entrega ainda sem
 * definição comercial). Os cinco nós são iguais. Os textos são os aprovados, e não os
 * que ele reescreveu.
 *
 * Em tela larga (a partir de lg) é uma linha com cinco colunas. Abaixo disso empilha, com
 * o nó à esquerda e a linha descendo. O mobile é a última etapa do projeto.
 */
export function ComoTrabalhamos() {
  return (
    <section
      id="como-trabalhamos"
      aria-labelledby="processo-heading"
      className="px-4 py-24 md:px-5 md:py-32"
    >
      <Container width="wide" className="px-0 md:px-0 lg:px-0">
        <div className="pxto-reveal-stagger max-w-3xl">
          <Heading level={2} size="section" id="processo-heading">
            {comoTrabalhamos.heading}
          </Heading>
          <p className="mt-6 text-lg text-ink-secondary">{comoTrabalhamos.intro}</p>
        </div>

        <div className="mt-14 rounded-xl border border-rule bg-ground-subtle p-6 md:p-10">
          <ol className="pxto-reveal-stagger grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
            {comoTrabalhamos.steps.map((step, index) => (
              <li
                key={step.name}
                className={[
                  "relative pl-16 lg:pl-0",
                  // A linha que liga este nó ao próximo. Vertical abaixo de lg, horizontal a partir dele.
                  "not-last:after:absolute not-last:after:left-5 not-last:after:top-12 not-last:after:-bottom-10 not-last:after:w-px not-last:after:bg-rule-strong",
                  "lg:not-last:after:left-12 lg:not-last:after:-right-6 lg:not-last:after:bottom-auto lg:not-last:after:top-5 lg:not-last:after:h-px lg:not-last:after:w-auto",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full border border-rule-strong bg-ground-subtle font-mono text-xs text-ink lg:static"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-medium text-ink lg:mt-6">{step.name}</h3>
                <p className="mt-3 text-base text-ink-secondary">{step.lead}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
