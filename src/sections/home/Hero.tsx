import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { sistemasConectados } from "@/content/diagrams/sistemas-conectados";
import { hero } from "@/content/home";
import { cta } from "@/content/site";

/**
 * Asymmetric split, 7 and 5 columns. Not centred: DESIGN_VARIANCE 6 puts the
 * hero off-centre by default, and the centred hero over a dark field is the
 * pattern the brief explicitly rules out.
 *
 * Four text elements maximum, which the skill's hero stack discipline requires:
 * headline, subheadline, two CTAs. No eyebrow, no trust strip, no capability
 * strip along the bottom, no scroll cue.
 *
 * The headline is three lines because PRD 12 fixes it that way. The skill caps
 * headlines at two, so the conflict is resolved by scale rather than by copy.
 *
 * VIEWPORT HEIGHT, a partir de lg. O que mudou junto: a headline estava presa
 * em text-5xl para os CTAs caberem na primeira tela de um Hero curto. Com o
 * Hero ocupando a viewport essa restricao cai, e ela cresce em xl. O ganho de
 * presenca vem da escala do texto, nao do espaco em si.
 *
 * `justify-center` distribui o bloco na altura. Continua fora do centro na
 * horizontal, split 7 e 5, porque o Hero centrado sobre campo escuro e o
 * padrao que o brief exclui.
 */
export function Hero() {
  return (
    <section className="pxto-hero-viewport flex flex-col justify-center border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
      <Container width="wide">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl xl:text-6xl">
              {hero.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-prose text-lg text-ink-secondary">
              {hero.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href={cta.primary.href} size="lg" analyticsLocation="home-hero">
                {cta.primary.label}
              </ButtonLink>
              <ButtonLink href={cta.projects.href} size="lg" variant="secondary" analyticsLocation="home-hero-secondary">
                {cta.projects.label}
              </ButtonLink>
            </div>
          </div>

          <Media
            image={sistemasConectados}
            ratio="16 / 11"
            className="lg:col-span-5"
          />
        </div>
      </Container>
    </section>
  );
}
