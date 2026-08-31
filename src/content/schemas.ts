import { z } from "zod";

/**
 * Content contract. Source of truth: docs/projects/PROJECT_FRAMEWORK.md 1.2
 * and docs/technical/TECHNICAL_ARCHITECTURE.md 8.
 *
 * This schema is the CMS schema when content migrates. Types derive from it
 * with z.infer and are never maintained in parallel.
 */

export const SolutionSlug = z.enum([
  "integracoes",
  "automacao",
  "software",
  "sites",
]);
export type SolutionSlug = z.infer<typeof SolutionSlug>;

export const ImageSchema = z.object({
  src: z.string().min(1),
  /** Required, not optional. An image without alt text fails the build. */
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /**
   * The asset is declared but not yet delivered.
   *
   * PRD 43 requires every project to have a cover image, so the field stays
   * required and the project still declares what the asset will be. This flag
   * only records that the file has not landed, and the UI renders the honest
   * labelled slot instead of a broken image.
   *
   * It is not a licence to publish without imagery: check-assets lists every
   * pending asset as an outstanding deliverable.
   */
  pending: z.boolean().optional(),
  /**
   * O que precisa ser produzido. Aparece SOMENTE no slot do estado pendente,
   * como briefing para a PXTO, e nunca como texto acessível.
   *
   * Existe porque `alt` e briefing são coisas diferentes: "Imagem principal,
   * 1600x1200" é um briefing útil e um alt péssimo. Sem separar, um dos dois
   * fica errado.
   */
  brief: z.string().optional(),
});
export type PxtoImage = z.infer<typeof ImageSchema>;

/**
 * Diagrama. Geometria declarada como DADO, nunca como path solto.
 *
 * POR QUE NÓS E ARESTAS, e não uma string de path. Um `d="M..."` livre seria
 * indistinguível de ilustração decorativa, que a regra 7.15 proíbe. Declarando
 * a topologia, três coisas passam a ser verdade por construção:
 *
 *   1. Não existe onde encaixar um traço inventado. Decoração fica impossível
 *      estruturalmente, não por disciplina.
 *   2. Os rótulos são dados, então o gate de conteúdo os enxerga. Rótulo dentro
 *      de <text> escapa de `innerText`, que é como audit-content varre a página.
 *   3. O diagrama vira conteúdo de verdade: tem alt, valida no build e migra
 *      para um CMS junto com o resto.
 *
 * Sem cor no dado. A cor vem do componente, via currentColor, senão o diagrama
 * não acompanha os dois temas.
 */
const DiagramNode = z.object({
  id: z.string().min(1),
  x: z.number(),
  y: z.number(),
  w: z.number().positive(),
  h: z.number().positive(),
  /** Texto real, em português. Varrido pelo gate de conteúdo. */
  label: z.string().min(1),
});

const DiagramEdge = z.object({
  /**
   * Pontos do traçado, em coordenadas do viewBox. Ortogonal por convenção:
   * roteamento em 90 graus lê como esquema de engenharia, enquanto curva
   * orgânica lê como grafo de rede neural, que é o visual banido pela 4.8.
   */
  points: z.array(z.tuple([z.number(), z.number()])).min(2),
});

export const DiagramSchema = z.object({
  kind: z.literal("diagram"),
  /** Obrigatório. Descreve o que o diagrama mostra, não que ele é um diagrama. */
  alt: z.string().min(1),
  viewBox: z.string().regex(/^0 0 \d+ \d+$/, "viewBox precisa ser '0 0 w h'"),
  nodes: z.array(DiagramNode).min(1),
  edges: z.array(DiagramEdge).min(1),
  /** Pontos de junção, onde uma aresta encosta no barramento. */
  junctions: z.array(z.tuple([z.number(), z.number()])).default([]),
});
export type PxtoDiagram = z.infer<typeof DiagramSchema>;

/**
 * O que um slot de mídia aceita. `Media` despacha por aqui, e nenhuma seção
 * precisa saber se o beat carrega foto ou diagrama.
 *
 * PxtoImage não tem `kind`, então `"kind" in asset` já discrimina os dois em
 * TypeScript sem precisar tocar em nenhum conteúdo existente.
 */
export type PxtoAsset = PxtoImage | PxtoDiagram;

export const SolutionSchema = z.object({
  slug: SolutionSlug,
  name: z.string().min(1),
  /** PRD 23 to 26. FIXED copy. */
  positioning: z.string().min(1),
  /** PRD 14. FIXED copy. */
  description: z.string().min(1),
  scope: z.array(z.string().min(1)).min(1),
  ctaLabel: z.string().min(1),
});
export type Solution = z.infer<typeof SolutionSchema>;

export const ProjectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    title: z.string().min(1).max(80),
    /** Technical nature. Secondary to `solutions` on cards. FRAMEWORK 2.4. */
    category: z.string().min(1),
    /** Capability mapping. Leads on cards. */
    solutions: z.array(SolutionSlug).min(1),
    summary: z.string().min(40).max(320),

    context: z.string().optional(),
    problem: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    process: z.string().optional(),
    /** Confirmed technologies only. Never inferred. PRD 53. */
    technologies: z.array(z.string()).optional(),
    /** Cleared results only. Omitted when not cleared. PRD 20. */
    results: z.string().optional(),

    coverImage: ImageSchema,
    gallery: z.array(ImageSchema).optional(),

    /** Requires a signed disclosure checklist. FRAMEWORK 20. */
    published: z.boolean(),
    featured: z.boolean(),
    order: z.number().int().optional(),
    seo: z
      .object({ title: z.string(), description: z.string() })
      .partial()
      .optional(),
  })
  .refine(
    (p) => [p.context, p.problem, p.challenge, p.solution].some(Boolean),
    {
      message:
        "A project needs at least one descriptive block (PROJECT_FRAMEWORK 1.4).",
    },
  );

export type Project = z.infer<typeof ProjectSchema>;
