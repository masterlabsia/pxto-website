import type { Metadata } from "next";
import { Hero } from "@/sections/home/Hero";
import { Problema } from "@/sections/home/Problema";
import { Posicionamento } from "@/sections/home/Posicionamento";
import { Solucoes } from "@/sections/home/Solucoes";
import { ComoTrabalhamos } from "@/sections/home/ComoTrabalhamos";
import { Projetos } from "@/sections/home/Projetos";
import { Diferenciais } from "@/sections/home/Diferenciais";
import { CtaSection } from "@/sections/home/CtaSection";
import { buildMetadata } from "@/lib/metadata";
import { homeMeta } from "@/content/home";

export const metadata: Metadata = buildMetadata({
  title: homeMeta.title,
  description: homeMeta.description,
  path: "/",
});

/**
 * Home page. Section order is fixed by PRD 11.2 and must not be rearranged.
 * The route composes, it does not implement.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problema />
      <Posicionamento />
      <Solucoes />
      <ComoTrabalhamos />
      <Projetos />
      <Diferenciais />
      <CtaSection />
    </>
  );
}
