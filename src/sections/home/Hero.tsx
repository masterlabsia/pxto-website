import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
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
 * headlines at two, so the conflict is resolved by scale rather than by copy:
 * text-4xl to text-5xl, never text-6xl, so the CTAs stay in the first viewport.
 */
export function Hero() {
  return (
    <section className="border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
      <Container width="wide">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:pt-6">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
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

          <figure className="lg:col-span-5">
            <ImageSlot
              ratio="16 / 11"
              label="Imagem principal. Captura real de projeto liberado ou fotografia própria. 1600x1200."
            />
            <figcaption className="mt-3 font-mono text-2xs uppercase text-ink-secondary">
              Ativo pendente de liberação
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
