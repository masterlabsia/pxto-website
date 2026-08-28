import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { organizationJsonLd } from "@/lib/metadata";
import { site } from "@/content/site";
import "@/styles/globals.css";

/**
 * CANDIDATE typefaces: Geist Sans and Geist Mono (DESIGN_SYSTEM.md I.4.2).
 * Self-hosted through the package, so no Google Fonts link tag ships.
 * Swapping the family is an edit to this file plus the token block.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s. ${site.name}` },
  description: site.descriptor,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <SkipLink />
        <Navbar />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
