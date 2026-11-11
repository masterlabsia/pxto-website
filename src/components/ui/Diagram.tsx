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
 *
 * DESENHO ÚNICO, com `animate`. Uma vez no carregamento, DESIGN_SYSTEM.md 14.4.
 * Desenha só traço: os retângulos e os rótulos estão presentes desde o primeiro
 * quadro. É o que a 14.4 pede ao dizer que só se move o que não carrega
 * leitura, e é também a leitura certa do conceito, porque os sistemas já
 * existem e o que a PXTO faz é ligar um ao outro.
 *
 * A ORDEM DO DESENHO É A ORDEM DE `edges` NO ARQUIVO DE CONTEÚDO, e a direção é
 * a ordem dos pontos de cada aresta. Um diagrama novo controla a sua própria
 * sequência sem tocar em componente nem em CSS.
 *
 * O comprimento de cada traço é calculado aqui e entra como número puro em
 * `--pxto-draw`. O CSS o converte para `cqw`, e o motivo está no comentário de
 * `globals.css`: com `non-scaling-stroke` o traço tracejado é medido em pixels
 * de tela, não em unidades do viewBox.
 */

/** Comprimento de uma polilinha, em unidades do viewBox. */
function polylineLength(points: readonly (readonly [number, number])[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    if (!from || !to) continue;
    total += Math.hypot(to[0] - from[0], to[1] - from[1]);
  }
  return total;
}

/** Largura do viewBox, terceiro valor da lista. Base da conversão para `cqw`. */
function viewBoxWidth(viewBox: string): number {
  const width = Number(viewBox.trim().split(/\s+/)[2]);
  return Number.isFinite(width) && width > 0 ? width : 100;
}

export function Diagram({
  diagram,
  animate = false,
  className,
}: {
  diagram: PxtoDiagram;
  /** Desenha o traço uma vez no carregamento. DESIGN_SYSTEM.md 14.4. */
  animate?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox={diagram.viewBox}
      role="img"
      aria-label={diagram.alt}
      data-diagram
      data-draw={animate ? "" : undefined}
      className={className}
      style={
        animate
          ? ({ "--pxto-vb": viewBoxWidth(diagram.viewBox) } as React.CSSProperties)
          : undefined
      }
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
        {diagram.edges.map((edge, index) => (
          <polyline
            key={edge.points.map((p) => p.join()).join(" ")}
            points={edge.points.map(([x, y]) => `${x},${y}`).join(" ")}
            vectorEffect="non-scaling-stroke"
            data-edge=""
            style={
              animate
                ? ({
                    "--pxto-draw": polylineLength(edge.points),
                    "--pxto-i": index,
                  } as React.CSSProperties)
                : undefined
            }
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

        {diagram.junctions.map(([x, y], index) => (
          <circle
            key={`${x},${y}`}
            cx={x}
            cy={y}
            r={2.5}
            fill="currentColor"
            stroke="none"
            data-junction=""
            style={animate ? ({ "--pxto-i": index } as React.CSSProperties) : undefined}
          />
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
