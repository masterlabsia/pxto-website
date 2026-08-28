import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { DefinitionList } from "@/components/content/DefinitionList";
import { problema } from "@/content/home";

/**
 * The single point of failure of the page (NARRATIVE 7.4). If recognition does
 * not land here, everything below reads as generic vendor material.
 *
 * Three moves, in order: recognition, naming, reframe. The reframe paragraph is
 * load-bearing and must not be cut. It sits directly under the heading rather
 * than trailing the section, so the left column carries weight instead of
 * leaving a void.
 *
 * The six situations are a definition list, not a card grid. A card grid would
 * repeat the layout family used by Soluções, and the skill bans a default
 * divide-y list above five items.
 */
export function Problema() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="pxto-interval pb-14 md:pb-16 lg:pb-20"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading level={2} size="section" id="problema-heading">
              {problema.heading}
            </Heading>
            <p className="mt-6 max-w-[46ch] text-lg text-ink">
              {problema.reframe}
            </p>
          </div>

          <div className="space-y-4 lg:col-span-5">
            {problema.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base text-ink-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <DefinitionList items={problema.situations} className="mt-12 lg:mt-14" />
      </Container>
    </section>
  );
}
