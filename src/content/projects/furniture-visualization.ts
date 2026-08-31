import type { Project } from "../schemas";

/**
 * Disclosure Level B, Described (PROJECT_FRAMEWORK 15.2).
 * Delivered to a company in the United States. The client is NOT identified.
 *
 * published: false. No route, no card, no sitemap entry until the
 * PROJECT_FRAMEWORK section 20 checklist is signed by a human.
 *
 * Blocks omitted on purpose:
 *   results  - no result is documented or cleared (PRD 20)
 *   gallery  - no cleared assets exist
 */
export const furnitureVisualization: Project = {
  slug: "furniture-visualization",
  title: "Furniture Visualization",
  category: "AI / Web App / Image Generation",
  solutions: ["software"],
  summary:
    "Duas fotos viram a visualização do móvel dentro do ambiente.",

  problem:
    "Permitir que usuários visualizem de maneira mais concreta como determinado móvel pode se encaixar em um ambiente. Ver o produto isolado e imaginar o produto no lugar são coisas diferentes.",
  solution:
    "Uma aplicação que combina entrada visual, processamento por inteligência artificial e geração de imagens.",

  technologies: [
    "Inteligência artificial",
    "Processamento de imagens",
    "Geração de imagens",
    "Desenvolvimento de aplicações web",
    "Integração de diferentes tecnologias",
  ],

  coverImage: {
    src: "/images/projects/furniture-visualization/cover.avif",
    alt: "Visualização de um móvel inserido na fotografia de um ambiente.",
    width: 1600,
    height: 1200,
    pending: true,
  },

  published: true,
  featured: true,
  // Ordered after the integration case, so the portfolio does not open with two
  // AI projects (POSITIONING 15.1).
  order: 2,
};
