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
  body: [
    "Cada ferramenta foi contratada para resolver um problema específico. Nenhuma delas foi feita para conversar com as outras.",
    "O espaço entre elas acaba sendo preenchido por pessoas: digitando de novo o que um sistema já sabe, mantendo planilhas que só existem para transportar dados, lembrando de executar um processo que deveria rodar sozinho.",
    "Esse trabalho não aparece em nenhum relatório. Aparece na equipe que nunca dá conta e na operação que só cresce contratando mais gente.",
  ],
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
    "Nada disso é consequência de uma decisão errada. É o que acontece quando a operação cresce mais rápido do que as ferramentas que ela foi juntando pelo caminho. E tem solução.",
} as const;

export const posicionamento = {
  heading: "O problema não está nos seus sistemas. Está entre eles.",
  body: [
    "A PXTO trabalha nesse espaço: entre as ferramentas, entre os processos, entre o que o software faz e o que a sua operação realmente precisa.",
    "Começamos entendendo o problema. Depois conectamos sistemas, automatizamos processos, construímos software ou colocamos no ar a presença digital que faltava. O que for necessário para resolver o caso.",
  ],
} as const;

export const solucoes = {
  /** FIXED. PRD 14. */
  heading: "Tecnologia para resolver problemas reais.",
  intro:
    "Quatro formas de resolver o mesmo tipo de problema. Qual delas se aplica ao seu caso é uma conclusão do diagnóstico, não uma escolha que você precisa fazer antes de conversar.",
} as const;

export const comoTrabalhamos = {
  heading: "Como trabalhamos",
  intro: "Não começamos pela tecnologia. Começamos pelo problema.",
  /** Step names and first lines are FIXED by PRD 15. Second lines are DRAFT. */
  steps: [
    {
      name: "Entendemos",
      lead: "Mapeamos o problema, contexto e objetivo.",
      detail:
        "Antes de propor qualquer coisa, precisamos entender como a operação funciona hoje, inclusive as partes que ninguém documentou.",
    },
    {
      name: "Desenhamos",
      lead: "Definimos a melhor abordagem para transformar a necessidade em solução.",
      detail:
        "É aqui que decidimos o que construir, o que conectar e o que simplesmente não precisa existir.",
    },
    {
      name: "Construímos",
      lead: "Desenvolvemos a solução utilizando as tecnologias mais adequadas ao problema.",
      detail: "A tecnologia é escolhida pelo problema, não o contrário.",
    },
    {
      name: "Integramos",
      lead: "Conectamos a solução ao ecossistema existente do cliente quando necessário.",
      detail:
        "Uma solução que não conversa com o resto da operação vira mais um sistema isolado.",
    },
    {
      name: "Evoluímos",
      lead: "Monitoramos, ajustamos e evoluímos a solução conforme novas necessidades.",
      /** No further promise of continuity: the service model is undefined. */
      detail: null,
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
      body: "Antes de propor qualquer solução, entendemos o que está acontecendo. Diagnóstico primeiro, tecnologia depois.",
    },
    {
      title: "Um só responsável pelo caminho inteiro",
      body: "Entender, desenhar, construir, integrar e evoluir. Sem repassar o problema de um fornecedor para outro no meio do caminho.",
    },
    {
      title: "A tecnologia é escolhida pelo problema",
      body: "Não temos plataforma para defender nem produto para empurrar. A ferramenta certa é a que resolve o seu caso.",
    },
    {
      title: "Construímos o que o problema exige",
      body: "Nem mais, nem menos. Solução superdimensionada custa caro para construir e mais caro ainda para manter.",
    },
  ],
} as const;

export const homeCta = {
  heading: "Descreva o problema. A solução é o nosso trabalho.",
  body: "Você não precisa chegar com uma especificação pronta, nem saber qual tecnologia usar. Conte o que não está funcionando. O resto é conversa.",
} as const;

export const homeMeta = {
  title:
    "PXTO. Integração de sistemas, automação de processos e software sob medida",
  description:
    "A PXTO conecta sistemas, automatiza processos e constrói software sob medida. Tecnologia aplicada aos problemas reais da operação da sua empresa.",
} as const;
