import type { PxtoDiagram } from "@/content/schemas";

/**
 * Renderiza um diagrama vindo da camada de conteúdo.
 *
 * CHAMADO SOMENTE POR `Media`, nunca por uma seção, mesmo precedente do
 * ImageSlot. A seção pede mídia e não sabe se recebe foto ou diagrama.
 *
 * A assinatura é o gate: aceita `diagram` e nada mais. Sem children, sem paths,
 * sem viewBox solto. Não existe onde encaixar um traço inventado, então
 * ilustração decorativa, que a regra 7.15 proíbe, fica impossível por
 * construção e não por disciplina.
 *
 * SVG INLINE, não <img src="...svg">. SVG carregado por <img> renderiza em modo
 * isolado: não herda CSS do documento e `currentColor` resolve contra o preto
 * padrão do próprio arquivo. Inline, o diagrama acompanha os dois temas sem
 * precisar de um segundo arquivo.
 *
 * CONTRASTE. Traço é conteúdo não textual com significado, WCAG 1.4.11, mínimo
 * 3:1, então usa ink-secondary e nunca `rule`, que reprova. Rótulo é texto,
 * mínimo 4.5:1, então usa a tinta primária. A diferença entre os dois também
 * cria a hierarquia: o rótulo lê antes do traço.
 *
 * SEM ACENTO. A regra 7.6 diz que o acento significa interativo, focado ou
 * definido. Um diagrama estático não é nenhum dos três.
 */
export function Diagram({
  diagram,
  className,
}: {
  diagram: PxtoDiagram;
  className?: string;
}) {
  return (
    <svg
      viewBox={diagram.viewBox}
      role="img"
      aria-label={diagram.alt}
      data-diagram
      className={className}
    >
      <g
        className="text-ink-secondary"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
      >
        {/*
          `vector-effect` NAO e herdado, entao precisa ir em cada forma. Na raiz
          do <svg> ou no <g> ele nao faz efeito nenhum.

          Existe porque o diagrama renderiza entre 0.81 e 1.45 de escala: sem
          ele o traço variaria de 1.2px a 2.2px, e o peso de linha deixaria de
          bater com o 1.5 dos ícones e com as réguas de 1px.
        */}
        {diagram.edges.map((edge) => (
          <polyline
            key={edge.points.map((p) => p.join()).join(" ")}
            points={edge.points.map(([x, y]) => `${x},${y}`).join(" ")}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {diagram.nodes.map((node) => (
          // Raio 0: estrutura, por 7.3. Nada no site é arredondado.
          <rect
            key={node.id}
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {diagram.junctions.map(([x, y]) => (
          <circle key={`${x},${y}`} cx={x} cy={y} r={2.5} fill="currentColor" stroke="none" />
        ))}
      </g>

      <g className="fill-ink font-mono" fontSize={15} letterSpacing={0.3}>
        {diagram.nodes.map((node) => (
          <text
            key={node.id}
            x={node.x + node.w / 2}
            y={node.y + node.h / 2}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {node.label}
          </text>
        ))}
      </g>
    </svg>
  );
}
