import { DiagramSchema } from "@/content/schemas";

/**
 * Diagrama do Hero. Ilustra a primeira linha da headline, "Conectamos
 * sistemas", com a topologia que uma integração de fato tem.
 *
 * O QUE ELE PODE E NÃO PODE AFIRMAR. Os rótulos são funções de negócio
 * genéricas, universais em qualquer empresa. Não são sistemas de nenhum
 * cliente, não são tecnologias que a PXTO usou e não são um projeto entregue.
 * Ilustram o conceito, e por isso não caem na regra 0.1 nem na 15.7.
 *
 * Zero número, por PRD 53. Um diagrama que precisa de quantidade para
 * funcionar está errado.
 *
 * ORTOGONAL, e isso é decisão de marca, não de gosto. Roteamento em 90 graus
 * com retângulos lê como esquema de engenharia. Nó redondo ligado por curva
 * orgânica é a imagem canônica de AI startup, que a 4.8 proíbe.
 *
 * Coordenadas em 352 por 242, que é 16/11 exato, a mesma proporção que o slot
 * de mídia do Hero já reservava.
 *
 * TAMANHO DOS RÓTULOS. Texto em SVG não respeita o tamanho de fonte do usuário
 * e escala junto com o container, então o que importa não é o valor absoluto e
 * sim a razão entre fonte e largura do viewBox. A 15 sobre 352, o rótulo cai em
 * 12px na viewport de 320, que é o piso de legibilidade, e sobe até 22px onde o
 * quadro é maior. `Media` limita a largura do diagrama justamente para o topo
 * dessa faixa não disparar.
 *
 * É também o que decide o comprimento dos rótulos: com fonte maior, "FATURAS"
 * cabe e "FATURAMENTO" estouraria a caixa.
 */
export const sistemasConectados = DiagramSchema.parse({
  kind: "diagram",
  alt: "Diagrama: vendas, estoque e financeiro ligados a um barramento comum, que alimenta faturamento e relatórios.",
  viewBox: "0 0 352 242",

  nodes: [
    { id: "vendas", label: "VENDAS", x: 8, y: 24, w: 114, h: 32 },
    { id: "estoque", label: "ESTOQUE", x: 8, y: 105, w: 114, h: 32 },
    { id: "financas", label: "FINANÇAS", x: 8, y: 186, w: 114, h: 32 },
    { id: "faturas", label: "FATURAS", x: 230, y: 64, w: 114, h: 32 },
    { id: "relatorios", label: "RELATÓRIOS", x: 230, y: 146, w: 114, h: 32 },
  ],

  edges: [
    // Entradas: cada sistema encosta no barramento na sua própria altura.
    { points: [[122, 40], [176, 40]] },
    { points: [[122, 121], [176, 121]] },
    { points: [[122, 202], [176, 202]] },
    // O barramento.
    { points: [[176, 40], [176, 202]] },
    // Saídas.
    { points: [[176, 80], [230, 80]] },
    { points: [[176, 162], [230, 162]] },
  ],

  junctions: [
    [176, 40],
    [176, 80],
    [176, 121],
    [176, 162],
    [176, 202],
  ],
});
