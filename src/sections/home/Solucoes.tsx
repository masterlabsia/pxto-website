import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { solucoes } from "@/content/home";
import { solutions } from "@/content/solutions";

/**
 * The four capabilities are peers, permanently (PRD 4).
 *
 * Grade de 4 cartões com borda arredondada (11/11/2026, escolha do responsável a partir
 * do Stitch): idênticos, sem ícone, sem numeração, sem cartão em destaque e sem descrição
 * de tamanho diferente.
 * A igualdade é estrutural, não por disciplina.
 *
 * O `id` é o destino do botão "Ver soluções" do Hero.
 */
export function Solucoes() {
  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-heading"
      className="px-4 py-24 md:px-5 md:py-32"
    >
      <Container width="wide" className="px-0 md:px-0 lg:px-0">
        <div className="pxto-reveal-stagger max-w-3xl">
          <Heading level={2} size="section" id="solucoes-heading">
            {solucoes.heading}
          </Heading>
          <p className="mt-6 text-lg text-ink-secondary">{solucoes.lead}</p>
        </div>

        <ul className="pxto-reveal-stagger mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {solutions.map((solution) => (
            <ServiceCard key={solution.slug} solution={solution} variant="column" />
          ))}
        </ul>
      </Container>
    </section>
  );
}
