import { ImageSchema, type PxtoImage } from "./schemas";

/**
 * Imagens da Home. TODAS são GERADAS POR IA, não fotografias de um lugar real, e o
 * texto alternativo diz isso. Decisão do responsável em 11/11/2026, que pediu
 * imagem de atmosfera e aceitou o uso de imagem gerada. Origem, pedido e
 * tratamento de cada uma estão em docs/imagens.md.
 *
 * Nenhuma mostra pessoa, marca, cliente, projeto ou produto da PXTO, e nenhuma
 * afirma nada sobre trabalho feito. Servem de atmosfera e de metáfora:
 * ordem (Modelo de trabalho) e calma (CTA). Uma terceira, os cabos emaranhados do
 * Problema, foi testada e retirada a pedido do responsável em 11/11/2026.
 */
const raw = {
  /** Fundo do Modelo de trabalho. Os cabos em ordem: o resultado depois da bagunça. */
  modelo: {
    src: "/images/site/modelo.avif",
    alt: "Painel de conexões de rede com cabos azuis organizados em fileiras. Imagem ilustrativa, gerada por IA.",
    width: 1680,
    height: 944,
  },
  /** Fundo do CTA final. Calma, espaço e luz baixa. */
  cta: {
    src: "/images/site/cta.avif",
    alt: "Fachada de concreto ao anoitecer, com luz suave na entrada e o céu azul ao fundo. Imagem ilustrativa, gerada por IA.",
    width: 1776,
    height: 896,
  },
} satisfies Record<string, PxtoImage>;

/** Valida na carga do módulo. Imagem sem alt derruba o build, não uma requisição. */
export const imagens = {
  modelo: ImageSchema.parse(raw.modelo),
  cta: ImageSchema.parse(raw.cta),
};
