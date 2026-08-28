import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { comoTrabalhamos } from "@/content/home";

/**
 * Condensed process, first lines only (WEBSITE_COPY 2.4). Reused rather than
 * duplicated: the Home version carries the expanded detail lines.
 *
 * The numerals appear here because the order carries meaning, and nowhere else
 * on the site.
 */
export function Processo({ headingId = "processo" }: { headingId?: string }) {
  return (
    <section
      aria-labelledby={headingId}
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Heading level={2} size="section" id={headingId}>
              {comoTrabalhamos.heading}
            </Heading>
            <p className="mt-5 max-w-prose text-base text-ink-secondary">
              {comoTrabalhamos.intro}
            </p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {comoTrabalhamos.steps.map((step, i) => (
              <li key={step.name} className="pxto-rule-top grid grid-cols-12 gap-4 py-5">
                <span
                  aria-hidden="true"
                  className="col-span-2 font-mono text-2xs text-ink-secondary md:col-span-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="text-lg font-medium text-ink">{step.name}</h3>
                  <p className="mt-1 max-w-prose text-sm text-ink-secondary">{step.lead}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
