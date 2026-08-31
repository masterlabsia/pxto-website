import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { DefinitionList } from "@/components/content/DefinitionList";
import { problema } from "@/content/home";

/**
 * O ponto único de falha da página (NARRATIVE 7.4). Se o reconhecimento não
 * acontece aqui, tudo abaixo lê como material genérico de fornecedor.
 *
 * Os 3 parágrafos de corpo saíram na deduplicação: já existiam em
 * sobrePage.porQue. O reconhecimento agora é trabalho exclusivo das 6 situações.
 *
 * O reframe deixou de dividir espaço com uma coluna de corpo à direita e passou
 * a fechar a seção sozinho, em corpo maior. É a função que a narrativa dá a ele:
 * o momento de virada, não uma nota de rodapé do heading.
 */
export function Problema() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="max-w-[30ch] lg:max-w-[38ch]">
          <Heading level={2} size="section" id="problema-heading">
            {problema.heading}
          </Heading>
        </div>

        <DefinitionList
          items={problema.situations}
          className="pxto-reveal-stagger mt-12 lg:mt-14"
        />

        <p className="pxto-reveal mt-12 max-w-[46ch] text-lg text-ink lg:mt-14">
          {problema.reframe}
        </p>
      </Container>
    </section>
  );
}
