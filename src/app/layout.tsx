import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { LogoSymbol } from "@/components/ui/Logo";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import "@/styles/globals.css";

/**
 * Manrope e JetBrains Mono, da direção do protótipo H612 do Stitch. `next/font/google` baixa os
 * arquivos no build e os serve do próprio domínio: nenhum link para o Google
 * Fonts vai ao navegador e nenhuma dependência nova entra. Subset latin, com
 * ajuste de métrica automático para evitar salto de layout.
 * Trocar a família é editar este arquivo e o bloco de tokens.
 */
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s. ${site.name}` },
  description: site.descriptor,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141313" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <LogoSymbol />
        <AnalyticsListener />
        <SkipLink />
        <Navbar />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
