import { SolutionSchema, type Solution } from "./schemas";

/**
 * The four capabilities. Peers, permanently (PRD 4).
 * `positioning` and `description` are FIXED copy from PRD 14 and 23 to 26.
 */
const raw: Solution[] = [
  {
    slug: "integracoes",
    name: "Integrações",
    positioning: "Faça seus sistemas conversarem.",
    description:
      "Conectamos sistemas, APIs e ferramentas para que informações possam circular automaticamente entre diferentes plataformas.",
    scope: [
      "CRM",
      "ERP",
      "Plataformas de marketing",
      "Ferramentas internas",
      "APIs",
      "Bancos de dados",
      "Serviços externos",
    ],
    ctaLabel: "Ver integrações",
  },
  {
    slug: "automacao",
    name: "Automação",
    positioning: "Automatize o trabalho que não deveria precisar ser manual.",
    description:
      "Transformamos processos repetitivos em fluxos automatizados, reduzindo trabalho manual e aumentando eficiência.",
    scope: [
      "Processos",
      "Workflows",
      "Movimentação de dados",
      "Notificações",
      "Sincronizações",
      "Processamento",
      "Tarefas repetitivas",
    ],
    ctaLabel: "Ver automação",
  },
  {
    slug: "software",
    name: "Software",
    positioning: "Quando uma solução pronta não basta, construímos a sua.",
    description:
      "Desenvolvemos aplicações e sistemas sob medida para necessidades específicas de negócio.",
    scope: [
      "Web apps",
      "Sistemas internos",
      "Portais",
      "Dashboards",
      "Ferramentas operacionais",
      "Plataformas",
      "Produtos digitais",
    ],
    ctaLabel: "Ver software",
  },
  {
    slug: "sites",
    name: "Sites",
    positioning: "Presença digital construída para funcionar.",
    description:
      "Criamos sites modernos, rápidos e responsivos para empresas que precisam estabelecer ou fortalecer sua presença digital.",
    scope: [
      "Sites institucionais",
      "Landing pages",
      "Páginas comerciais",
      "Responsividade",
      "Performance",
      "SEO",
      "Integração com ferramentas",
    ],
    ctaLabel: "Ver sites",
  },
];

/** Validates at module load. Bad content fails the build, not a request. */
export const solutions: Solution[] = raw.map((s) => SolutionSchema.parse(s));

export function getSolution(slug: string): Solution | null {
  return solutions.find((s) => s.slug === slug) ?? null;
}
