import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/TextLink";

export default function NotFound() {
  return (
    <section className="py-20 md:py-24 lg:py-32">
      <Container width="wide">
        <div className="max-w-prose">
          <Heading level={1} size="display">
            Esta página não existe.
          </Heading>
          <p className="mt-5 text-base text-ink-secondary">
            O endereço pode ter mudado ou o link pode estar incorreto.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink href="/" size="lg">
              Voltar para a home
            </ButtonLink>
            <ArrowLink href="/solucoes">Ver soluções</ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
