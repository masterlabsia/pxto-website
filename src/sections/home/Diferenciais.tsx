import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { diferenciais } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * PROPOSAL content. PRD 11.2 lista este bloco mas não define nenhuma substância.
 * Os quatro itens vêm dos diferenciais estruturais de POSITIONING 11.1, cada um
 * verdadeiro hoje e nenhum exigindo evidência de escala.
 *
 * Os quatro corpos saíram na deduplicação: três já existiam em
 * sobrePage.principios, e o quarto foi criado lá antes de ser removido daqui.
 *
 * O que sobrou são quatro afirmações de prática, não adjetivos. Por isso elas
 * sobrevivem sozinhas sem virar a lista de "why choose us" que NARRATIVE 7.3
 * proíbe: "Começamos pelo problema" é uma afirmação verificável na primeira
 * conversa; "Somos inovadores" não seria.
 *
 * Sem barra de números, sem fileira de selos, sem tira de logos. Cada um deles
 * exigiria prova que a PXTO não tem, e POSITIONING 13.6 proíbe até o espaço
 * vazio que os pediria.
 *
 * Composição: pilha escalonada, não grade. A grade de 2x2 repetiria a família da
 * lista de definições do Problema, e no DESIGN_VARIANCE 6 o deslocamento é o que
 * carrega o ritmo.
 */
const positions = [
  "lg:col-span-5 lg:col-start-1",
  "lg:col-span-5 lg:col-start-8 lg:mt-16",
  "lg:col-span-5 lg:col-start-1 lg:-mt-2",
  "lg:col-span-5 lg:col-start-8 lg:mt-12",
] as const;

export function Diferenciais() {
  return (
    <section
      aria-labelledby="diferenciais-heading"
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="lg:max-w-[32ch]">
          <Heading level={2} size="section" id="diferenciais-heading">
            {diferenciais.heading}
          </Heading>
        </div>

        <ul className="pxto-reveal-stagger mt-10 grid grid-cols-1 gap-y-8 lg:mt-6 lg:grid-cols-12 lg:gap-y-0">
          {diferenciais.items.map((item, index) => (
            <li key={item.title} className={cn(positions[index])}>
              {/* Afirmação isolada, em corpo maior. Sem o parágrafo de apoio,
                  um título de card ficaria órfão; uma declaração se sustenta. */}
              <p className="border-t border-rule pt-5 text-xl font-medium text-ink md:text-2xl">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
