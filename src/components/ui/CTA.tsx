import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { MediaBackdrop } from "@/components/ui/MediaBackdrop";
import { GlowField } from "@/components/ui/GlowField";
import type { PxtoImage } from "@/content/schemas";
import { cta as siteCta } from "@/content/site";

/**
 * One primary action. It follows an argument rather than preceding the reason
 * to act, and no second CTA of the same intent appears on the same page
 * (PRD 29, NARRATIVE 14.5).
 *
 * Never manufactured urgency: there is no scarcity to claim.
 *
 * Duas composições, decididas pela presença de `body`:
 * - com `body`: título à esquerda, apoio e botão à direita (7 e 5 colunas).
 * - sem `body`: contêiner arredondado, título grande centralizado e o botão logo
 *   abaixo, com a luz do mouse em escala reduzida (`GlowField`). É a da Home, como
 *   o fechamento do protótipo H612, onde o título já carrega o convite.
 */
export function CTA({
  heading,
  body,
  href = siteCta.primary.href,
  label = siteCta.primary.label,
  headingId = "cta-heading",
  image,
}: {
  heading: string;
  body?: string;
  href?: string;
  label?: string;
  headingId?: string;
  /**
   * Só na composição sem `body`. Foto de fundo do contêiner, com o véu leve: a foto
   * do CTA da Home foi medida no recorte de largura total e passa (7,7:1 no escuro,
   * 5,1:1 no claro, no pior pixel). Sem ela, o contêiner leva a luz do mouse.
   */
  image?: PxtoImage;
}) {
  const button = (
    <ButtonLink href={href} size="lg" analyticsLocation="cta-block">
      {label}
    </ButtonLink>
  );

  if (!body) {
    // LARGURA TOTAL da página, com 20px de margem, como o Hero (pedido do
    // responsável em 11/11/2026). Sem `Container`: o contêiner arredondado vai de
    // borda a borda, e o texto fica centralizado dentro dele. Com foto, a ALTURA
    // acompanha a tela do computador (`pxto-fill-viewport`, globals.css), e o texto
    // fica no meio.
    return (
      <section aria-labelledby={headingId} className="px-4 py-5 md:px-5">
        {image ? (
          <MediaBackdrop
            image={image}
            scrim="soft"
            sizes="100vw"
            className="pxto-container-in pxto-fill-viewport flex flex-col justify-center overflow-hidden rounded-xl border border-rule bg-ground-subtle"
          >
            {/* Alinhado à ESQUERDA, na mesma coluna das outras seções (11/11/2026, escolha
                do responsável a partir do Stitch). Só o título e o botão: a etiqueta, o
                parágrafo e o "confidencialidade garantida por NDA" do Stitch eram
                texto e promessa inventados. */}
            <Container width="wide" className="w-full">
              <div className="pxto-reveal-stagger max-w-3xl py-24 text-left md:py-32">
                <Heading level={2} size="display" id={headingId} className="lg:text-6xl">
                  {heading}
                </Heading>
                <div className="mt-10">{button}</div>
              </div>
            </Container>
          </MediaBackdrop>
        ) : (
          <div className="relative isolate overflow-hidden rounded-xl border border-rule bg-ground-subtle">
            <GlowField scale={0.6} intensity={0.6} />
            <Container width="wide" className="relative z-10">
              <div className="pxto-reveal-stagger max-w-3xl py-24 text-left md:py-32">
                <Heading level={2} size="display" id={headingId} className="lg:text-6xl">
                  {heading}
                </Heading>
                <div className="mt-10">{button}</div>
              </div>
            </Container>
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className="pxto-section-rule bg-ground-subtle py-14 md:py-16 lg:py-20"
    >
      <Container width="wide">
        <div className="pxto-reveal-stagger grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading level={2} size="section" id={headingId}>
              {heading}
            </Heading>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-prose text-base text-ink-secondary">{body}</p>
            <div className="mt-8">{button}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
