import type { SolutionSlug } from "./schemas";

/**
 * Site-wide content. Copy source: docs/content/WEBSITE_COPY.md Part I.
 * FIXED strings are verbatim from the PRD and must not be edited here.
 */

export const site = {
  name: "PXTO",
  /** PRD 6, complementary message. Reused as the footer descriptor. */
  descriptor: "Tecnologia aplicada aos desafios reais das empresas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt-BR",
} as const;

/** PRD 10.1. Five items plus the CTA. No mega menu. */
export const navigation = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;

/** PRD 29. One label per intent, used everywhere. */
export const cta = {
  primary: { label: "Fale com a PXTO", href: "/contato" },
  projects: { label: "Ver projetos", href: "/projetos" },
  allProjects: { label: "Ver todos os projetos", href: "/projetos" },
} as const;

export const solutionCtaLabel: Record<SolutionSlug, string> = {
  integracoes: "Ver integrações",
  automacao: "Ver automação",
  software: "Ver software",
  sites: "Ver sites",
};

/**
 * BLOCKED: direct contact channels are undefined (SITEMAP 11.2).
 * Do not invent an address. The footer omits the block while this is empty.
 */
export const contactChannels: { email?: string; phone?: string } = {};
