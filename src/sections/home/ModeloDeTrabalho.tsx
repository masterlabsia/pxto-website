import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { MediaBackdrop } from "@/components/ui/MediaBackdrop";
import { imagens } from "@/content/imagens";
import { modeloDeTrabalho } from "@/content/home";

/**
 * O momento comercial da página: a frase que diz como a PXTO se contrata, resultado
 * como serviço. Ver `modeloDeTrabalho` em content/home.ts.
 *
 * DOIS PAINÉIS LIGADOS POR UMA SETA, da exploração do Stitch (11/11/2026): "Você" à
 * esquerda, "PXTO" à direita. Transforma a frase mais importante do site em algo que se vê
 * em dois segundos. O texto de cada painel é a linha já aprovada, e nenhum marcador do
 * Stitch entrou (eram promessas inventadas).
 *
 * Os painéis são sólidos (fundo do tema a 85%), e NÃO vidro: vidro só vale para o botão
 * secundário, a navbar e a luz do Hero (CLAUDE.md 7.5). A foto de fundo é a dos cabos
 * organizados, com o véu padrão de 72% medido contra os pixels reais (docs/imagens.md).
 *
 * Dentro de MediaBackdrop o texto usa SEMPRE a tinta primária, nunca a secundária.
 */
function Painel({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-ink/15 bg-ground/85 p-6 text-left md:p-8">
      <span className="inline-flex rounded-full border border-rule-strong px-3 py-1 font-mono text-2xs uppercase text-ink">
        {label}
      </span>
      <p className="mt-5 text-lg text-ink md:text-xl">{text}</p>
    </div>
  );
}

export function ModeloDeTrabalho() {
  return (
    <section aria-labelledby="modelo-heading" className="px-4 py-12 md:px-5">
      <Container width="wide" className="px-0 md:px-0 lg:px-0">
        <MediaBackdrop
          image={imagens.modelo}
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="pxto-container-in overflow-hidden rounded-xl border border-rule bg-ground-subtle"
        >
          <div className="px-6 py-20 text-center md:px-12 md:py-28">
            <div className="pxto-reveal-stagger">
              <Heading
                level={2}
                size="display"
                id="modelo-heading"
                className="mx-auto max-w-3xl lg:text-6xl"
              >
                {modeloDeTrabalho.heading}
              </Heading>

              <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-6">
                <Painel {...modeloDeTrabalho.voce} />
                <span
                  aria-hidden="true"
                  className="mx-auto grid size-12 place-items-center self-center rounded-full border border-ink/20 bg-ground/85 text-ink"
                >
                  <ArrowRightIcon className="size-5 rotate-90 md:rotate-0" />
                </span>
                <Painel {...modeloDeTrabalho.pxto} />
              </div>

              <p className="mx-auto mt-10 max-w-2xl text-lg text-ink md:text-xl">
                {modeloDeTrabalho.note}
              </p>
            </div>
          </div>
        </MediaBackdrop>
      </Container>
    </section>
  );
}
