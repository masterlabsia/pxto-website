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
  /*
   * O Hero é só texto nesta exploração. O diagrama de sistemas continua em
   * src/content/diagrams, sem uso.
   *
   * DIVERGÊNCIA REGISTRADA: VISUAL_DIRECTION.md 9 especifica fotografia neste
   * slot, e o documento ainda não reflete nenhuma das duas trocas.
   */

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
  // Os 3 parágrafos de corpo saíram na deduplicação: [0] e [1] já existiam quase
  // literalmente em sobrePage.porQue, e [2] foi migrado para lá. O Stitch trouxe
  // de volta uma versão curta, abaixo. Ela repete ideias de sobrePage.porQue, e
  // se a deduplicação valer, é este parágrafo que sai.
  /** DRAFT. Versão curta do corpo, como no Stitch. Não consta em WEBSITE_COPY.md. */
  body:
    "Cada ferramenta foi contratada para resolver um problema específico. Nenhuma delas foi feita para conversar com as outras. O espaço entre elas acaba sendo preenchido por pessoas.",
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
  /**
   * Narrative 3.2 move 3. Versão curta, como no Stitch, decidida em 10/11/2026.
   * A versão longa, em WEBSITE_COPY.md, acrescentava "É o que acontece quando a
   * operação cresce mais rápido que as ferramentas que ela foi juntando pelo
   * caminho." O reenquadramento continua aqui: a frase nega a culpa e anuncia
   * a solução.
   */
  reframe: "Nada disso é consequência de uma decisão errada. E tem solução.",
} as const;

export const posicionamento = {
  // O bloco é só texto, como no Stitch. A foto de fundo (globo com rede de luz)
  // saiu: contrariava 4.8, 7.5 e 7.15. O arquivo continua em
  // public/images/site/posicionamento.avif, sem uso.
  heading: "O problema não está nos seus sistemas. Está entre eles.",
  body: [
    "A PXTO trabalha nesse espaço: entre as ferramentas, entre os processos, entre o que o software faz e o que a sua operação realmente precisa.",
    // O segundo parágrafo saiu: repetia a headline do hero e antecipava a seção
    // Soluções, que vem logo abaixo. A mesma lógica vive em solucoesPage.overview.
  ],
} as const;

/**
 * RASCUNHO. Resultado como serviço (OaaS), decidido com o responsável em
 * 10/11/2026. Registrado em WEBSITE_COPY.md 1.4 e em POSITIONING.md 18, ainda
 * sem aprovação formal do território (POSITIONING.md 14).
 *
 * Cuidado de redação: descreve um modelo de trabalho, não promete resultado.
 * "Assume o caminho" não é garantia, e nenhuma linha daqui cita prazo, métrica
 * ou índice de sucesso (POSITIONING.md 18.3).
 */
export const modeloDeTrabalho = {
  heading: "Você define o resultado. A PXTO assume o caminho até ele.",
  body: [
    "Em vez de comprar horas ou ferramentas, você descreve o que precisa que aconteça na operação.",
    "A PXTO desenha, constrói e conecta o que for necessário para chegar lá.",
    "Você não precisa chegar com a solução pronta, nem saber qual tecnologia usar.",
  ],
} as const;

export const solucoes = {
  /** FIXED. PRD 14. */
  heading: "Tecnologia para resolver problemas reais.",
  /**
   * DRAFT, aprovado em 11/11/2026. Ponte entre o Modelo de trabalho e as quatro
   * soluções: o resultado vem primeiro e o instrumento é consequência.
   */
  lead: "O resultado define o instrumento. Qual deles se aplica é uma conclusão do diagnóstico.",
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
  // RASCUNHO NÃO APROVADO, alinhado ao posicionamento OaaS. O texto aprovado
  // em WEBSITE_COPY.md é "Descreva o problema. A solução é o nosso trabalho."
  heading: "Conte o resultado que você precisa.",
  // O parágrafo de apoio saiu a pedido, para seguir o Stitch. O texto aprovado
  // em WEBSITE_COPY.md é "Você não precisa chegar com uma especificação pronta,
  // nem saber qual tecnologia usar."
} as const;

export const homeMeta = {
  title:
    "PXTO. Integração de sistemas, automação de processos e software sob medida",
  description:
    "A PXTO conecta sistemas, automatiza processos e constrói software sob medida. Você descreve o resultado que precisa na operação, e a PXTO cuida do caminho até ele.",
} as const;
