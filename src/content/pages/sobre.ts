/**
 * Sobre. Copy source: WEBSITE_COPY.md Part II section 10.
 *
 * INCOMPLETE BY DESIGN. Vision, founder visibility, the meaning of the name and
 * the company model are undecided (BRAND_FOUNDATION 15). This page carries only
 * what PRD 27 authorises: why the company exists, how it thinks, how it works,
 * and its principles.
 *
 * No history, no team, no clients, no numbers. None should be added without a
 * human decision.
 */
export const sobrePage = {
  meta: {
    title: "Sobre",
    description:
      "A PXTO é uma empresa de tecnologia que trabalha no espaço entre os sistemas: entender o problema, escolher a tecnologia certa e construir o que for necessário.",
  },
  hero: {
    heading:
      "A PXTO é uma empresa de tecnologia que trabalha no espaço entre os sistemas.",
    body: "Integração, automação, software e sites são os instrumentos. O trabalho é resolver o problema.",
  },
  porQue: {
    heading: "Por que existimos",
    body: [
      "A maior parte das empresas não tem um problema de tecnologia. Tem um problema entre tecnologias.",
      "As ferramentas foram compradas uma a uma, cada uma resolvendo o seu próprio problema. O espaço entre elas não é responsabilidade de ninguém, e é a operação que acaba preenchendo esse espaço, com trabalho manual que ninguém planejou e ninguém mede.",
      "Esse trabalho não aparece em nenhum relatório. Aparece na equipe que nunca dá conta e na operação que só cresce contratando mais gente.",
      "A PXTO existe porque esse espaço merece ser levado a sério. É onde a operação realmente acontece.",
    ],
  },
  comoPensamos: {
    heading: "Como pensamos",
    body: [
      "Tecnologia é meio, não fim. Nenhuma ferramenta tem valor por si só: o valor aparece quando ela resolve um problema concreto de quem trabalha com ela todos os dias.",
      "Por isso não começamos escolhendo tecnologia. Começamos entendendo o problema, e a escolha técnica passa a ser uma consequência, não um ponto de partida.",
      "As ferramentas vão mudar. A capacidade de entender um problema e construir a solução, não.",
    ],
  },
  principios: {
    heading: "Princípios",
    items: [
      {
        title: "Evidência antes de afirmação",
        body: "Só dizemos o que podemos sustentar. Não inflamos experiência, não inventamos números e não prometemos resultado que não podemos comprovar.",
      },
      {
        title: "O problema antes da solução",
        body: "Nenhuma proposta começa por tecnologia. Começa por entender o que está acontecendo.",
      },
      {
        title: "Clareza antes de sofisticação",
        body: "Se precisa de jargão para ser explicado, provavelmente não foi bem entendido.",
      },
      {
        title: "O necessário, não o máximo",
        body: "Construímos o que o problema exige, do jeito mais simples que se sustenta. Solução superdimensionada é cara de construir e mais cara de manter.",
      },
      {
        title: "Discrição",
        body: "Informação de cliente não é material de divulgação. Nome, dado e arquitetura só aparecem com autorização.",
      },
      {
        title: "Durabilidade",
        body: "Construímos para ser mantido e evoluído, não para ser refeito.",
      },
      {
        // Sétimo princípio. Criado aqui antes de o corpo correspondente ser
        // removido do bloco Diferenciais da home. É o único item da migração
        // que não tinha destino existente: sem ele, o corte na home seria a
        // única perda real de substância do trabalho.
        title: "Um só responsável pelo caminho inteiro",
        body: "Entender, desenhar, construir, integrar e evoluir. Sem repassar o problema de um fornecedor para outro no meio do caminho.",
      },
    ],
  },
  cta: {
    heading: "Quer conversar sobre um problema específico?",
    body: "Não é preciso ter a solução pronta. Descrever o problema já é suficiente para começar.",
  },
} as const;
