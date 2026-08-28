import { ProjectSchema, type Project, type SolutionSlug } from "../schemas";
import { furnitureVisualization } from "./furniture-visualization";
import { aiInteriorDesigner } from "./ai-interior-designer";
import { gestaoDeContratos } from "./gestao-de-contratos";

/**
 * The content access layer. This is the CMS migration seam
 * (TECHNICAL_ARCHITECTURE.md 7.3 and 22.1).
 *
 * No component and no route imports a project file directly. When content
 * moves to a CMS, only these function bodies change.
 */

const all: Project[] = [
  furnitureVisualization,
  aiInteriorDesigner,
  gestaoDeContratos,
].map((p) =>
  ProjectSchema.parse(p),
);

function byOrder(a: Project, b: Project): number {
  return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
}

/**
 * The single place `published` is filtered. An uncleared project cannot leak
 * through a forgotten conditional elsewhere.
 */
export function getPublishedProjects(): Project[] {
  return all.filter((p) => p.published).sort(byOrder);
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | null {
  return getPublishedProjects().find((p) => p.slug === slug) ?? null;
}

export function getProjectsBySolution(solution: SolutionSlug): Project[] {
  return getPublishedProjects().filter((p) => p.solutions.includes(solution));
}
