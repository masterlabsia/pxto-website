import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { MediaBackdrop } from "@/components/ui/MediaBackdrop";
import { posicionamento } from "@/content/home";

/**
 * O pivô da página: o reconhecimento vira "existe uma empresa para isso".
 *
 * A foto é fundo do bloco inteiro, com o texto por cima. O `MediaBackdrop`
 * resolve véu, tema e estado pendente. Enquanto não houver ativo, a seção
 * renderiza exatamente como antes, sobre `ground-subtle`.
 *
 * O corpo usa tinta primária, não secundária: sobre foto a secundária reprova
 * em AA em qualquer opacidade de véu. Ver MediaBackdrop.

 */
export function Posicionamento() {
  return (
    <MediaBackdrop
      image={posicionamento.media}
      sizes="100vw"
      className="border-y border-rule bg-ground-subtle"
    >
      <section
        aria-labelledby="posicionamento-heading"
        className="pb-14 pt-10 md:pb-16 md:pt-12 lg:pb-20 lg:pt-14"
      >
        <Container width="wide">
          <div className="pxto-reveal-stagger grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Heading level={2} size="display" id="posicionamento-heading">
                {posicionamento.heading}
              </Heading>
            </div>
            <div className="space-y-4 lg:col-span-7 lg:col-start-6">
              {posicionamento.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-prose text-base text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </MediaBackdrop>
  );
}
