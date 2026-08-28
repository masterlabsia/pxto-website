import type { Project } from "../schemas";

/**
 * Developed as a delivered solution. No client narrative is constructed
 * around it (stated by PXTO). Nothing here claims an engagement.
 *
 * published: false. Pending the PROJECT_FRAMEWORK section 20 checklist.
 */
export const aiInteriorDesigner: Project = {
  slug: "ai-interior-designer",
  title: "AI Interior Designer",
  category: "AI / Computer Vision / Conversational Assistant",
  solutions: ["software"],
  summary:
    "Assistente que analisa imagens de ambientes e apoia a criação de propostas de design de interiores.",

  problem:
    "Transformar uma fotografia de um ambiente em um ponto de partida para decisões de design.",
  solution:
    "Um assistente que combina análise visual, inteligência artificial e interação conversacional para auxiliar na criação de um projeto.",

  technologies: [
    "Inteligência artificial",
    "Análise visual",
    "Interfaces conversacionais",
    "Desenvolvimento de assistentes",
    "Geração de recomendações",
  ],

  coverImage: {
    src: "/images/projects/ai-interior-designer/cover.avif",
    alt: "Interface do assistente analisando a fotografia de um ambiente.",
    width: 1600,
    height: 1200,
  },

  published: false,
  featured: true,
  order: 2,
};
