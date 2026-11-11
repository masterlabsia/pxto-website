import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { GlowField } from "@/components/ui/GlowField";
import { posicionamento } from "@/content/home";

/**
 * O pivô da página: o reconhecimento vira "existe uma empresa para isso".
 *
 * Centralizado e limpo, da exploração do Stitch (11/11/2026): o título, uma linha curta
 * como respiro e o parágrafo. As aspas e a etiqueta "TESE ESTRUTURAL" do Stitch não
 * entraram: o título não é uma citação, e a etiqueta era texto novo.
 *
 * Contêiner arredondado em LARGURA TOTAL da página (20px de margem), como o Hero e o CTA,
 * com a luz do mouse em escala reduzida (`GlowField`). O corpo usa a tinta secundária, que
 * passa em AA com a luz fraca (intensidade 0.6).
 */
export function Posicionamento() {
  return (
    <section aria-labelledby="posicionamento-heading" className="px-4 py-12 md:px-5">
      <div className="pxto-container-in relative isolate overflow-hidden rounded-xl border border-rule bg-ground-subtle py-24 md:py-32">
        <GlowField scale={0.6} intensity={0.6} />
        <Container width="wide" className="relative z-10">
          <div className="pxto-reveal-stagger mx-auto max-w-4xl text-center">
            <Heading level={2} size="display" id="posicionamento-heading">
              {posicionamento.heading}
            </Heading>
            <div aria-hidden="true" className="mx-auto mt-10 h-px w-12 bg-rule-strong" />
            <div className="mx-auto mt-10 max-w-2xl space-y-4">
              {posicionamento.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-lg text-ink-secondary md:text-xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
