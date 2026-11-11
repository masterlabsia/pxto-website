import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { MediaBackdrop } from "@/components/ui/MediaBackdrop";
import { imagens } from "@/content/imagens";
import { modeloDeTrabalho } from "@/content/home";

/**
 * O momento comercial da página: a frase que diz como a PXTO se contrata,
 * resultado como serviço. Ver `modeloDeTrabalho` em content/home.ts.
 *
 * É o "interstitial" do protótipo H612: um contêiner arredondado com uma frase
 * centralizada sobre uma imagem. A imagem é o painel de cabos organizados, o par
 * visual dos cabos emaranhados do Problema: bagunça antes, ordem aqui. É imagem
 * gerada por IA, e o texto alternativo diz isso (content/imagens.ts).
 *
 * VÉU PADRÃO (72%), e não o leve. Medido contra os pixels da foto: com 55% o texto
 * dá 3,5:1 no tema escuro, abaixo do AA. Com 72% dá 6,1:1.
 *
 * Dentro de MediaBackdrop o texto usa SEMPRE a tinta primária, nunca a secundária
 * (a secundária reprova em AA sobre foto). A hierarquia vem de tamanho.
 *
 * Um tema só na página (7.7): o véu usa a cor do próprio tema, então a seção não
 * inverte para escuro no tema claro.
 */
export function ModeloDeTrabalho() {
  return (
    <section aria-labelledby="modelo-heading" className="px-4 py-12 md:px-5">
      <Container width="wide" className="px-0 md:px-0 lg:px-0">
        <MediaBackdrop
          image={imagens.modelo}
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="overflow-hidden rounded-xl border border-rule bg-ground-subtle"
        >
          <div className="pxto-reveal-stagger px-6 py-24 text-center md:py-36">
            <Heading
              level={2}
              size="display"
              id="modelo-heading"
              className="mx-auto max-w-3xl lg:text-6xl"
            >
              {modeloDeTrabalho.heading}
            </Heading>
            <div className="mx-auto mt-10 max-w-2xl space-y-4">
              {modeloDeTrabalho.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-lg text-ink md:text-xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </MediaBackdrop>
      </Container>
    </section>
  );
}
