import { Container } from "@/components/ui/Container";
import { GlowField } from "@/components/ui/GlowField";
import { Heading } from "@/components/ui/Heading";

/**
 * Abertura das páginas internas, no mesmo contêiner arredondado do Hero da Home, em
 * escala menor: título à esquerda, apoio logo abaixo e a luz do mouse reduzida
 * (`GlowField`, escala 0,6). Largura total com 20px de margem, como o Hero.
 *
 * Sem `pxto-container-in`: o título é o candidato a LCP e o Chrome atrasa LCP em
 * elemento com opacidade menor que 1 (mesma razão do Hero da Home).
 *
 * `children` recebe o que acompanha o título (rótulo da solução, por exemplo), acima
 * dele. O h1 é sempre este componente, então há um por página.
 */
export function PageHero({
  heading,
  body,
  children,
}: {
  heading: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="px-4 pb-5 pt-5 md:px-5">
      <div className="relative isolate overflow-hidden rounded-xl border border-rule bg-ground-subtle">
        <GlowField scale={0.6} intensity={0.6} />
        <Container width="wide" className="relative z-10">
          <div className="max-w-4xl py-20 md:py-28">
            {children}
            <Heading level={1} size="display" className={children ? "mt-5 lg:text-6xl" : "lg:text-6xl"}>
              {heading}
            </Heading>
            {body ? <p className="mt-8 max-w-2xl text-lg text-ink md:text-xl">{body}</p> : null}
          </div>
        </Container>
      </div>
    </section>
  );
}
