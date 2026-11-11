import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { DefinitionList } from "@/components/content/DefinitionList";
import { problema } from "@/content/home";

/**
 * O ponto único de falha da página (NARRATIVE 7.4). Se o reconhecimento não
 * acontece aqui, tudo abaixo lê como material genérico de fornecedor.
 *
 * Composição do Stitch, em 5 e 7 colunas: à esquerda o título e o parágrafo que
 * nomeia o problema, à direita as seis situações em lista e, fechando, o
 * reenquadramento. O reenquadramento fica ao pé da lista porque é a virada: o
 * leitor reconhece a situação e logo depois descobre que ela tem solução.
 *
 * COSTURA COM O POSICIONAMENTO. As duas seções são um movimento só: aqui o
 * leitor se reconhece, ali ele descobre que existe uma empresa para isso.
 */
export function Problema() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="px-4 py-24 md:px-5 md:py-32"
    >
      <Container width="wide" className="px-0 md:px-0 lg:px-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="pxto-reveal-stagger lg:col-span-5">
            <Heading level={2} size="display" id="problema-heading">
              {problema.heading}
            </Heading>
            <p className="mt-8 max-w-prose text-base text-ink-secondary md:text-lg">
              {problema.body}
            </p>
          </div>

          <div className="lg:col-span-7">
            <DefinitionList
              items={problema.situations}
              layout="stack"
              className="pxto-reveal-stagger"
            />
            <p className="pxto-reveal mt-14 border-t border-rule pt-8 text-base font-semibold text-ink md:text-lg">
              {problema.reframe}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
