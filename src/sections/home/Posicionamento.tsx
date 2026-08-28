import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { posicionamento } from "@/content/home";

/**
 * The pivot of the page: recognition becomes "there is a company for this".
 *
 * A ground shift rather than a rule marks the change, which is the design
 * system's elevation rule and avoids hairlines used as texture. The heading and
 * the body sit in offset columns so the composition steps rather than stacks.
 */
export function Posicionamento() {
  return (
    <section
      aria-labelledby="posicionamento-heading"
      className="border-y border-rule bg-ground-subtle py-14 md:py-16 lg:py-20"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Heading level={2} size="display" id="posicionamento-heading">
              {posicionamento.heading}
            </Heading>
          </div>
          <div className="space-y-4 lg:col-span-7 lg:col-start-6">
            {posicionamento.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-prose text-base text-ink-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
