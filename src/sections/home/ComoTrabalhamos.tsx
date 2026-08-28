import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { comoTrabalhamos } from "@/content/home";

/**
 * Method as evidence. A new company cannot prove capability with volume, so how
 * it works is the strongest available proof (NARRATIVE 4.2).
 *
 * The sequence is numbered because the order genuinely carries meaning, which
 * is the one case the skill permits. The numeral is inline metadata inside the
 * row, never an eyebrow-styled label above a heading, and it appears nowhere
 * else on the site.
 *
 * Sticky heading on the left so the section reads as one argument while the
 * steps scroll past it.
 */
export function ComoTrabalhamos() {
  return (
    <section
      aria-labelledby="processo-heading"
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Heading level={2} size="section" id="processo-heading">
                {comoTrabalhamos.heading}
              </Heading>
              <p className="mt-5 max-w-prose text-base text-ink-secondary">
                {comoTrabalhamos.intro}
              </p>
              <p className="mt-8 max-w-prose border-t border-rule pt-5 text-sm text-ink-secondary">
                {comoTrabalhamos.closing}
              </p>
            </div>
          </div>

          <ol className="lg:col-span-8">
            {comoTrabalhamos.steps.map((step, index) => (
              <li
                key={step.name}
                className="pxto-rule-top grid grid-cols-12 gap-4 py-6 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="col-span-2 font-mono text-2xs text-ink-secondary md:col-span-1"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="text-xl font-semibold text-ink">{step.name}</h3>
                  <p className="mt-2 max-w-prose text-base text-ink">{step.lead}</p>
                  {step.detail ? (
                    <p className="mt-2 max-w-prose text-sm text-ink-secondary">
                      {step.detail}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
