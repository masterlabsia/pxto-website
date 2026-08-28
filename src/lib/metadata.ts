import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Metadata comes from content, never from the component tree.
 * TECHNICAL_ARCHITECTURE.md 11.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Organization JSON-LD. No foundingDate, no numberOfEmployees, no
 * aggregateRating: structured data is a factual claim and is bound by PRD 53
 * exactly as visible copy is.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.descriptor,
  };
}
