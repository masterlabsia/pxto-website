/**
 * Homepage copy. Source: docs/content/WEBSITE_COPY.md Part II, section 1.
 *
 * FIXED strings are verbatim from the PRD and must not be edited.
 * DRAFT strings are the approved first draft.
 *
 * Em-dash remediation applied per VISUAL_DIRECTION.md Part V.1. Sentences that
 * used an em-dash in the copy document are restructured with a period or a
 * comma. No wording is otherwise changed.
 */

export const hero = {
  /**
   * `pending: true` enquanto não houver ativo. O componente Media renderiza o
   * slot rotulado com o `brief`, e troca sozinho para next/image quando a flag
   * cair. Publicar a foto é edição de conteúdo, não de componente.
   */
  media: {
    src: "/images/site/hero.avif",
    alt: "Interface de um projeto entregue pela PXTO.",
    brief: "Imagem principal. Captura real de projeto liberado ou fotografia própria. 1600x1100.",
    width: 1600,
    height: 1100,
    pending: true,
  },
  /** FIXED. PRD 12. Set as three lines, which the sentence structure asks for. */
  headlineLines: [
    "Conectamos sistemas.",
    "Automatizamos processos.",
    "Construímos soluções.",
  ],
  /** FIXED. PRD 12. */
  subheadline: "Tecnologia aplicada aos desafios reais das empresas.",
} as const;

export const problema = {
  /** FIXED. PRD 13. */
  heading: "Sua empresa já tem tecnologia. O problema é quando ela não conversa.",
  // Os 3 parágrafos de corpo saíram: [0] e [1] já existiam quase literalmente em
  // sobrePage.porQue, e [2] foi migrado para lá. Deduplicação, não corte.
  // O reconhecimento passa a ser trabalho das 6 situações abaixo.
  /** The six situations are FIXED by PRD 13. Descriptions are DRAFT. */
  situations: [
    {
      term: "Sistemas desconectados",
      description:
        "Duas ferramentas guardam a mesma informação. Nenhuma das duas é a versão oficial.",
    },
    {
      term: "Processos manuais",
      description:
        "Existe trabalho na sua operação que só existe porque nada se conecta.",
    },
    {
      term: "Dados duplicados",
      description:
        "A mesma informação é digitada mais de uma vez, em lugares diferentes, por pessoas diferentes.",
    },
    {
      term: "Informações espalhadas",
      description:
        "Nenhum lugar responde sozinho a uma pergunta simples do dia a dia.",
    },
    {
      term: "Tarefas repetitivas",
      description: "Pessoas qualificadas executando trabalho mecânico.",
    },
    {
      term: "Ferramentas que não atendem",
      description:
        "O software resolve o caso geral. O seu caso é exatamente o que sobra.",
    },
  ],
  /** Narrative 3.2 move 3. Do not cut. Without it the section is only uncomfortable. */
  reframe:
    "Nada disso é consequência de uma decisão errada. É o que acontece quando a operação cresce mais rápido que as ferramentas que ela foi juntando pelo caminho. E tem solução.",
} as const;

export const posicionamento = {
  /**
   * Foto de fundo do bloco inteiro, com o texto por cima.
   *
   * Enquanto `pending` for verdadeiro a seção renderiza sobre `ground-subtle`,
   * exatamente como antes. Publicar a foto é remover a flag.
   */
  media: {
    src: "/images/site/posicionamento.avif",
    alt: "Duas ferramentas que registram a mesma informação sem trocar dados entre si.",
    brief: "Fundo do bloco inteiro. Fotografia própria, horizontal, de contraste baixo e sem ponto focal no centro, onde fica o texto. Sem marca de cliente, sem dado real. 2400x1200.",
    width: 2400,
    height: 1200,
    pending: false,
  },
  heading: "O problema não está nos seus sistemas. Está entre eles.",
  body: [
    "A PXTO trabalha nesse espaço: entre as ferramentas, entre os processos, entre o que o software faz e o que a sua operação realmente precisa.",
    // O segundo parágrafo saiu: repetia a headline do hero e antecipava a seção
    // Soluções, que vem logo abaixo. A mesma lógica vive em solucoesPage.overview.
  ],
} as const;

export const solucoes = {
  /** FIXED. PRD 14. */
  heading: "Tecnologia para resolver problemas reais.",
  // O intro saiu: repetia quase palavra por palavra solucoesPage.overview.body[2],
  // onde o mesmo argumento aparece com mais espaço.
} as const;

export const comoTrabalhamos = {
  heading: "Como trabalhamos",
  intro: "Não começamos pela tecnologia. Começamos pelo problema.",
  /** Step names and first lines are FIXED by PRD 15. Second lines are DRAFT. */
  steps: [
    {
      name: "Entendemos",
      lead: "Mapeamos o problema, contexto e objetivo.",
    },
    {
      name: "Desenhamos",
      lead: "Definimos a melhor abordagem para transformar a necessidade em solução.",
    },
    {
      name: "Construímos",
      lead: "Desenvolvemos a solução utilizando as tecnologias mais adequadas ao problema.",
    },
    {
      name: "Integramos",
      lead: "Conectamos a solução ao ecossistema existente do cliente quando necessário.",
    },
    {
      name: "Evoluímos",
      lead: "Monitoramos, ajustamos e evoluímos a solução conforme novas necessidades.",

    },
  ],
  /** Required by PRD 15: never claim every project passes through all five. */
  closing:
    "Nem todo projeto passa por todas as etapas. O que não muda é a ordem: entender antes de construir.",
} as const;

export const projetos = {
  /** FIXED. PRD 16. */
  heading: "O que construímos.",
  subheading:
    "Soluções desenvolvidas para transformar ideias e problemas em produtos digitais funcionais.",
} as const;

/**
 * PROPOSAL, not approved. PRD 11.2 lists this block but defines no content.
 * Written strictly from the structural differentiators in POSITIONING 11.1,
 * each of which is true today and requires no evidence of scale.
 */
export const diferenciais = {
  heading: "Por que a PXTO",
  items: [
    {
      title: "Começamos pelo problema",
    },
    {
      title: "Um só responsável pelo caminho inteiro",
    },
    {
      title: "A tecnologia é escolhida pelo problema",
    },
    {
      title: "Construímos o que o problema exige",
    },
  ],
} as const;

export const homeCta = {
  heading: "Descreva o problema. A solução é o nosso trabalho.",
  body: "Você não precisa chegar com uma especificação pronta, nem saber qual tecnologia usar.",
} as const;

export const homeMeta = {
  title:
    "PXTO. Integração de sistemas, automação de processos e software sob medida",
  description:
    "A PXTO conecta sistemas, automatiza processos e constrói software sob medida. Tecnologia aplicada aos problemas reais da operação da sua empresa.",
} as const;
