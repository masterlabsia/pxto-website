import Image from "next/image";
import type { PxtoImage } from "@/content/schemas";
import { cn } from "@/lib/cn";

/**
 * Foto ocupando o bloco inteiro, com o texto por cima.
 *
 * Três decisões que não são estéticas:
 *
 * 1. O véu usa a cor de fundo do PRÓPRIO TEMA, não uma cor fixa. Um bloco com
 *    foto normalmente vira "sempre escuro", o que seria inversão de tema no
 *    meio da página, proibida pelo theme lock (DESIGN_SYSTEM I.3.3). Com o véu
 *    seguindo o tema, o claro fica com texto escuro sobre foto clareada e o
 *    escuro com texto claro sobre foto escurecida. A paridade se mantém.
 *
 * 2. Opacidade 0.72, verificada e não escolhida por gosto. É o valor que
 *    garante 4.5:1 na pior foto possível (preta no tema claro, branca no
 *    escuro) em ambos os temas. Reduzir exige verificar contra a foto real.
 *
 * 3. Estado pendente NÃO renderiza placeholder cinza. Sem foto, o bloco fica
 *    exatamente como está hoje. Um slot rotulado ocupando uma seção inteira
 *    seria pior que a ausência da foto.
 *
 * REGRA DE TEXTO. Dentro deste componente o corpo usa tinta PRIMÁRIA, nunca
 * `ink-secondary`. A secundária reprova em AA sobre foto em qualquer opacidade
 * de véu. A hierarquia vem de tamanho e peso, não de cor.
 */
export function MediaBackdrop({
  image,
  priority = false,
  sizes = "100vw",
  className,
  children,
}: {
  /** Sem este campo, ou com `pending`, a seção renderiza sem fundo. */
  image?: PxtoImage;
  priority?: boolean;
  sizes?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const active = Boolean(image && !image.pending);

  return (
    <div
      // Marcador para o gate de acessibilidade. O cálculo de contraste dá falso
      // positivo aqui: o walker sobe até o primeiro background não transparente,
      // encontra o véu em rgba com alpha 0.72, e descarta o alpha. Ou seja, mede
      // contra a cor pura do tema e ignora a foto embaixo. O gate verifica por
      // identidade de token, não por cálculo.
      data-media-backdrop=""
      className={cn("relative isolate", className)}
    >
      {active && image ? (
        <>
          <Image
            src={image.src}
            alt=""
            aria-hidden="true"
            fill
            priority={priority}
            sizes={sizes}
            className="-z-10 object-cover"
          />
          {/* Véu verificado. Mecanismo de acessibilidade, não decoração. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-scrim" />
        </>
      ) : null}
      {children}
    </div>
  );
}
