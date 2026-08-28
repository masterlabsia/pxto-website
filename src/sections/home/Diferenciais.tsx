import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { diferenciais } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * PROPOSAL content. PRD 11.2 lists this block but defines none of its
 * substance. The four items are drawn strictly from the structural
 * differentiators in POSITIONING 11.1, each true today and each requiring no
 * evidence of scale.
 *
 * Never a stats bar, a badge row, a logo strip or a list of adjectives. Each of
 * those needs proof PXTO does not have, and POSITIONING 13.6 forbids a layout
 * slot that would want it.
 *
 * Composition: two columns where the right column is offset downward, so the
 * four items read as a stepped sequence rather than as a fourth grid. At
 * DESIGN_VARIANCE 6 the offset carries the rhythm. A plain 2x2 grid here would
 * repeat the definition-list family used by Problema.
 */
const positions = [
  "lg:col-span-5 lg:col-start-1",
  "lg:col-span-5 lg:col-start-8 lg:mt-20",
  "lg:col-span-5 lg:col-start-1 lg:-mt-4",
  "lg:col-span-5 lg:col-start-8 lg:mt-16",
] as const;

export function Diferenciais() {
  return (
    <section
      aria-labelledby="diferenciais-heading"
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="lg:max-w-[32ch]">
          <Heading level={2} size="section" id="diferenciais-heading">
            {diferenciais.heading}
          </Heading>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-y-10 lg:mt-4 lg:grid-cols-12 lg:gap-y-0">
          {diferenciais.items.map((item, index) => (
            <div key={item.title} className={cn(positions[index])}>
              <h3 className="border-t border-rule pt-5 text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-ink-secondary">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
