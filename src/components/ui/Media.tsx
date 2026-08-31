import Image from "next/image";
import { Diagram } from "@/components/ui/Diagram";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { PxtoAsset, PxtoDiagram } from "@/content/schemas";

/**
 * PxtoImage não tem `kind`, então a presença da chave já separa os dois. Vai
 * como type predicate e não como condição solta porque só o predicate estreita
 * também o ramo negativo, que é onde o resto do componente trabalha.
 */
function isDiagram(asset: PxtoAsset): asset is PxtoDiagram {
  return "kind" in asset && asset.kind === "diagram";
}

/**
 * A unidade reutilizável de imagem do site.
 *
 * É a mídia que se repete, não a seção. As seções têm proporções de grid
 * genuinamente diferentes, então um componente de seção com mídia viraria um
 * god-component com uma prop por variação. Aqui a seção continua dona do seu
 * layout e só recebe a mídia pronta.
 *
 * Resolve sozinho o caso do ativo pendente: enquanto `pending` for verdadeiro,
 * renderiza o slot rotulado em vez de um `next/image` apontando para arquivo
 * inexistente, que daria imagem quebrada.
 *
 * `sizes` é obrigatório quando há imagem real. Sem ele o navegador baixa a
 * maior variante em qualquer viewport, e é o erro de performance mais comum
 * com `next/image`.
 *
 * Aceita foto ou diagrama e despacha sozinho. A seção pede mídia e não sabe
 * qual das duas recebeu, que é o que mantém o layout independente do ativo.
 */
export function Media({
  image,
  ratio,
  sizes,
  priority = false,
  caption,
  className,
}: {
  image: PxtoAsset;
  /** Proporção do quadro, por exemplo "16 / 10". */
  ratio: string;
  /** Obrigatório quando a imagem existe. Ignorado no estado pendente. */
  sizes?: string;
  priority?: boolean;
  /** Legenda abaixo do quadro. Nunca sobreposta à imagem. */
  caption?: string;
  className?: string;
}) {
  // Diagrama não tem estado pendente nem `sizes`: a geometria já está aqui.
  if (isDiagram(image)) {
    const figure = (
      // max-w-lg trava o topo da faixa de escala. Sem o teto, no layout
      // empilhado o diagrama ocupa a largura toda e os rótulos chegam a 30px,
      // porque texto em SVG escala com o quadro.
      <div
        className="mx-auto w-full max-w-lg overflow-hidden border border-rule bg-ground-subtle"
        style={{ aspectRatio: ratio }}
      >
        <Diagram diagram={image} className="h-full w-full" />
      </div>
    );

    if (!caption) return <div className={className}>{figure}</div>;

    return (
      <figure className={className}>
        {figure}
        <figcaption className="mt-3 font-mono text-2xs uppercase text-ink-secondary">
          {caption}
        </figcaption>
      </figure>
    );
  }

  const frame = image.pending ? (
    <ImageSlot ratio={ratio} label={image.brief ?? image.alt} />
  ) : (
    <div
      className="relative w-full overflow-hidden border border-rule bg-ground-subtle"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className="object-cover"
      />
    </div>
  );

  if (!caption) return <div className={className}>{frame}</div>;

  return (
    <figure className={className}>
      {frame}
      <figcaption className="mt-3 font-mono text-2xs uppercase text-ink-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}
