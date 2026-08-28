import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { solucoes } from "@/content/home";
import { solutions } from "@/content/solutions";

/**
 * The four capabilities are peers, permanently (PRD 4).
 *
 * Equal cells enforce that structurally rather than by discipline: identical
 * span, identical rule, identical content depth. No icon per service, no
 * featured card, no varying description length.
 *
 * Cells are separated by a top rule, not boxed as cards. Cards are reserved for
 * cases where elevation communicates real hierarchy, and here it would not.
 */
export function Solucoes() {
  return (
    <section
      aria-labelledby="solucoes-heading"
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="max-w-prose">
          <Heading level={2} size="section" id="solucoes-heading">
            {solucoes.heading}
          </Heading>
          <p className="mt-5 text-base text-ink-secondary">{solucoes.intro}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {solutions.map((solution) => (
            <ServiceCard key={solution.slug} solution={solution} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
