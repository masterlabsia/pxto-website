import { site } from "@/content/site";
import type { Project, Solution } from "@/content/schemas";

/**
 * Structured data. PRD 36.
 *
 * Structured data is a factual claim made to search engines, so it is bound by
 * PRD 53 exactly as visible copy is.
 *
 * PROHIBITED here, permanently: aggregateRating, review, award, foundingDate,
 * numberOfEmployees, priceRange, and any property that asserts scale, history
 * or reputation. None is evidenceable.
 */

const base = site.url.replace(/\/$/, "");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: site.name,
    url: base,
    description: site.descriptor,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: site.name,
    inLanguage: site.locale,
    publisher: { "@id": `${base}/#organization` },
  };
}

export function serviceJsonLd(solution: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.description,
    url: `${base}/solucoes/${solution.slug}`,
    provider: { "@id": `${base}/#organization` },
    areaServed: "BR",
  };
}

/**
 * The client is never named, so there is no `client` or `sponsor` property.
 * An anonymised project carries no attribution beyond PXTO as creator.
 */
export function creativeWorkJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${base}/projetos/${project.slug}`,
    creator: { "@id": `${base}/#organization` },
    inLanguage: site.locale,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}

/** Renders a JSON-LD block. Serialised safely for embedding in a script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
