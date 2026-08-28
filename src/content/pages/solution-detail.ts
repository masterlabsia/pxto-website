import type { SolutionSlug } from "@/content/schemas";

/**
 * Per-solution page content. Copy source: WEBSITE_COPY.md Part II sections 3 to 6.
 * Positioning lines and scope lists are FIXED by PRD 23 to 26 and live in
 * content/solutions.ts. Em-dash remediation applied per VISUAL_DIRECTION V.1.
 */
export type SolutionPage = {
  meta: { title: string; description: string };
  heroBody: string;
  problema: { heading: string; body: string[] };
  oQueFazemos: { heading: string; note?: string };
  abordagem: { heading: string; body: string[] };
  exemplos: { heading: string; items: string[] };
  cta: { heading: string; body: string; label: string };
};

export const solutionPages: Record<SolutionSlug, SolutionPage> = {
  integracoes: {
    meta: {
      title: "Integrações",
      description:
        "Conectamos sistemas, APIs e ferramentas para que a informação circule automaticamente entre plataformas, sem digitação manual e sem planilhas de transporte.",
    },
    heroBody:
      "Informação que já existe em um sistema não deveria precisar ser digitada em outro.",
    problema: {
      heading: "Duas ferramentas, a mesma informação, nenhuma versão oficial.",
      body: [
        "O CRM sabe quem é o cliente. O ERP sabe o que ele comprou. A planilha sabe o que ficou pendente. E alguém, todo dia, mantém as três em sincronia na mão.",
        "Enquanto isso funciona, ninguém questiona. O problema aparece quando o volume cresce, quando a pessoa que fazia isso sai, ou quando uma informação desatualizada gera uma decisão errada.",
      ],
    },
    oQueFazemos: {
      heading: "O que conectamos",
      note: "A lista acima é ilustrativa. O que determina a integração é o que os seus sistemas expõem e o que a sua operação precisa, não a ferramenta que está na moda.",
    },
    abordagem: {
      heading: "Como abordamos uma integração",
      body: [
        "Antes de conectar qualquer coisa, mapeamos onde a informação nasce, por onde ela passa e onde ela precisa chegar. Boa parte do trabalho de uma integração é descobrir que o fluxo real não é o que está no organograma.",
        "Depois definimos o que precisa ser automático, o que precisa de conferência humana e o que simplesmente pode deixar de existir.",
      ],
    },
    exemplos: {
      heading: "Onde uma integração costuma resolver",
      items: [
        "Pedidos que precisam ser lançados em mais de um sistema",
        "Cadastros de clientes mantidos em duplicidade",
        "Dados de vendas que só chegam ao financeiro por planilha",
        "Ferramentas de marketing que não sabem o que aconteceu depois da conversão",
        "Relatórios montados manualmente a partir de várias fontes",
        "Sistemas legados que ninguém quer substituir, mas que precisam se comunicar",
      ],
    },
    cta: {
      heading: "Tem dois sistemas que deveriam conversar?",
      body: "Conte quais são e o que precisa circular entre eles.",
      label: "Conte seu projeto",
    },
  },

  automacao: {
    meta: {
      title: "Automação de processos",
      description:
        "Transformamos processos repetitivos em fluxos automatizados. Trabalho que depende de alguém lembrar de executar passa a rodar sozinho.",
    },
    heroBody: "Se o processo pode ser descrito, ele pode ser automatizado.",
    problema: {
      heading: "Processos que dependem de alguém lembrar.",
      body: [
        "Toda operação tem tarefas que rodam porque uma pessoa específica lembra de executá-las. Copiar dados de um relatório para outro. Avisar a equipe quando algo muda de status. Conferir se a informação chegou.",
        "Funciona, até a semana em que essa pessoa está de férias.",
      ],
    },
    oQueFazemos: { heading: "O que automatizamos" },
    abordagem: {
      heading: "Como abordamos uma automação",
      body: [
        "Começamos descrevendo o processo como ele realmente acontece, não como deveria acontecer. É comum descobrir, nessa etapa, que parte do trabalho não precisa ser automatizado: precisa deixar de existir.",
        "O que sobra vira fluxo. E o que exige julgamento humano continua com quem tem contexto para decidir.",
      ],
    },
    exemplos: {
      heading: "Onde uma automação costuma resolver",
      items: [
        "Relatórios recorrentes montados manualmente",
        "Aprovações que dependem de alguém acompanhar uma caixa de entrada",
        "Dados que precisam ser movidos de um lugar para outro em horários fixos",
        "Notificações internas disparadas na mão",
        "Conferências repetitivas entre duas fontes de informação",
        "Processamento de arquivos, documentos ou solicitações em volume",
      ],
    },
    cta: {
      heading: "Existe um processo que consome sua equipe todo mês?",
      body: "Descreva como ele funciona hoje. É por aí que começamos.",
      label: "Conte seu projeto",
    },
  },

  software: {
    meta: {
      title: "Software sob medida",
      description:
        "Desenvolvemos aplicações e sistemas sob medida para necessidades específicas de negócio. Quando o produto pronto quase resolve, construímos a parte que falta.",
    },
    heroBody: "Nem todo processo cabe em um software feito para o caso geral.",
    problema: {
      heading: "Os últimos 20% são sempre o problema.",
      body: [
        "O sistema que você contratou resolve quase tudo. O que falta é justamente a parte específica do seu negócio, aquela que ninguém mais faz do mesmo jeito.",
        "A saída costuma ser adaptar o processo ao software. Funciona, com um custo que raramente é calculado: a operação passa a trabalhar em função da ferramenta, e não o contrário.",
      ],
    },
    oQueFazemos: { heading: "O que construímos" },
    abordagem: {
      heading: "Como abordamos um desenvolvimento",
      body: [
        "Software sob medida tem um risco conhecido: virar um sistema que só quem construiu entende. Trabalhamos para que isso não aconteça, construindo o que o problema exige, no formato mais simples que se sustenta, e deixando a solução preparada para evoluir.",
        "A escolha da tecnologia vem depois do entendimento do problema. Nunca antes.",
      ],
    },
    exemplos: {
      heading: "Onde construir costuma ser a resposta",
      items: [
        "Um processo central do negócio que nenhum produto de mercado cobre",
        "Uma ferramenta interna que hoje vive em planilhas compartilhadas",
        "Um painel que reúne informações que estão em quatro lugares diferentes",
        "Um portal para clientes, fornecedores ou equipes externas",
        "Uma ideia de produto que precisa sair do papel para ser testada",
        "Um assistente que aplica regras do negócio de forma consistente",
      ],
    },
    cta: {
      heading: "Tem uma necessidade que nenhum sistema resolve?",
      body: "Descreva o que precisa acontecer. A forma de construir é o nosso trabalho.",
      label: "Conte seu projeto",
    },
  },

  sites: {
    meta: {
      title: "Criação de sites",
      description:
        "Sites rápidos, responsivos e encontráveis, integrados às ferramentas da empresa. Presença digital tratada como infraestrutura, não como peça gráfica.",
    },
    heroBody:
      "Um site é infraestrutura. Precisa carregar rápido, ser encontrado e conversar com o resto da operação.",
    problema: {
      heading: "Bonito não é o mesmo que funcional.",
      body: [
        "Muitos sites institucionais são entregues como peça gráfica: ficam bem na apresentação e mal no mundo real. Carregam devagar no celular, não aparecem na busca, não se conectam a nenhuma ferramenta da empresa e não geram um contato sequer.",
        "A questão não é estética. É que o site foi tratado como um projeto visual, e não como parte da operação.",
      ],
    },
    oQueFazemos: { heading: "O que construímos" },
    abordagem: {
      heading: "Como abordamos um site",
      body: [
        "Antes do layout, definimos o que o site precisa fazer: para quem ele fala, o que essa pessoa precisa entender e qual ação deve ficar evidente.",
        "Performance, acessibilidade e SEO entram desde o começo. Depois de pronto, são caros de corrigir. E, quando faz sentido, o site conversa com as ferramentas que a empresa já usa, em vez de virar mais uma ilha.",
      ],
    },
    exemplos: {
      heading: "Quando faz sentido",
      items: [
        "A empresa não tem presença digital própria",
        "O site atual não é encontrado por quem procura o que a empresa faz",
        "As páginas carregam mal no celular",
        "O formulário existe, mas o contato não chega a lugar nenhum",
        "A empresa precisa de uma página comercial específica para uma oferta",
        "O site precisa se conectar às ferramentas que a empresa já usa",
      ],
    },
    cta: {
      heading: "Precisa de um site que funcione de verdade?",
      body: "Conte o que ele precisa resolver.",
      label: "Conte seu projeto",
    },
  },
};

/**
 * Sites only. The self-evidencing proof point (POSITIONING 12.1): verifiable by
 * the reader, claims nothing unmeasurable.
 *
 * This block must be deleted if the built site does not meet the standard it
 * describes, because it would then be an unsupportable claim (PRD 53).
 */
export const esteSite = {
  heading: "O exemplo mais direto é este",
  body: [
    "Este site foi construído com os mesmos critérios que aplicamos em qualquer projeto: performance, acessibilidade, SEO técnico e estrutura preparada para crescer sem ser refeita.",
    "Você pode avaliar o resultado enquanto lê esta página.",
  ],
} as const;
