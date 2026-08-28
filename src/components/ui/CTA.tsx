import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { cta as siteCta } from "@/content/site";

/**
 * One primary action. It follows an argument rather than preceding the reason
 * to act, and no second CTA of the same intent appears on the same page
 * (PRD 29, NARRATIVE 14.5).
 *
 * Never manufactured urgency: there is no scarcity to claim.
 */
export function CTA({
  heading,
  body,
  href = siteCta.primary.href,
  label = siteCta.primary.label,
  headingId = "cta-heading",
}: {
  heading: string;
  body: string;
  href?: string;
  label?: string;
  headingId?: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-rule bg-ground-subtle py-14 md:py-16 lg:py-20"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading level={2} size="section" id={headingId}>
              {heading}
            </Heading>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-prose text-base text-ink-secondary">{body}</p>
            <div className="mt-8">
              <ButtonLink href={href} size="lg" analyticsLocation="cta-block">
                {label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
