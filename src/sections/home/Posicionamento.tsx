import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { posicionamento } from "@/content/home";

/**
 * O pivô da página: o reconhecimento vira "existe uma empresa para isso".
 *
 * Só texto, sobre `ground-subtle`, como no Stitch. A foto de fundo saiu: o
 * globo com rede de luz contrariava 4.8, 7.5 e 7.15. Sem foto, o corpo usa a
 * tinta secundária, que passa em AA sobre o fundo liso.
 */
export function Posicionamento() {
  return (
    <section
      aria-labelledby="posicionamento-heading"
      className="px-4 py-24 md:px-5 md:py-32"
    >
      <Container width="wide" className="px-0 md:px-0 lg:px-0">
        <div className="pxto-reveal-stagger max-w-4xl">
          <Heading level={2} size="display" id="posicionamento-heading">
            {posicionamento.heading}
          </Heading>
          <div className="mt-8 space-y-4">
            {posicionamento.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-3xl text-lg text-ink-secondary md:text-xl">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
