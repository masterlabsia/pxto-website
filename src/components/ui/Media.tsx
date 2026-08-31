import Image from "next/image";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { PxtoImage } from "@/content/schemas";

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
 */
export function Media({
  image,
  ratio,
  sizes,
  priority = false,
  caption,
  className,
}: {
  image: PxtoImage;
  /** Proporção do quadro, por exemplo "16 / 10". */
  ratio: string;
  /** Obrigatório quando a imagem existe. Ignorado no estado pendente. */
  sizes?: string;
  priority?: boolean;
  /** Legenda abaixo do quadro. Nunca sobreposta à imagem. */
  caption?: string;
  className?: string;
}) {
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
