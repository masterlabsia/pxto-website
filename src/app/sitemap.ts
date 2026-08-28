import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { getPublishedProjects } from "@/content/projects";

/**
 * Generated, never hand-maintained: adding a project must require no manual SEO
 * step (PRD 42). An uncleared project never appears here (PRD 20).
 * /design-system is an internal reference and is deliberately excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = [
    "/",
    "/solucoes",
    ...solutions.map((s) => `/solucoes/${s.slug}`),
    "/projetos",
    ...getPublishedProjects().map((p) => `/projetos/${p.slug}`),
    "/sobre",
    "/contato",
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
