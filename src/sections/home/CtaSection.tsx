import { CTA } from "@/components/ui/CTA";
import { homeCta } from "@/content/home";
import { imagens } from "@/content/imagens";

/** Home closing CTA. Composition only: the component owns the pattern. */
export function CtaSection() {
  return <CTA heading={homeCta.heading} image={imagens.cta} />;
}
