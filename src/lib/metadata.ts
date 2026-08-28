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
