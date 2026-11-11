import { PartnerSchema, type Partner } from "./schemas";

/**
 * Empresas que fizeram parceria com a PXTO. Informadas pelo responsável em
 * 11/11/2026, que declarou ter autorização de cada uma. O registro, com o que
 * ainda falta anexar, está em docs/parcerias.md.
 *
 * Só nome, em texto. Nenhuma relação (cliente ou parceira) é afirmada além da
 * palavra "parceria", que foi a do responsável. Nenhum logo, número, descrição
 * ou depoimento, e nada que indique escala. A ordem é a da lista abaixo, sem
 * destaque entre as empresas.
 *
 * Para adicionar uma empresa: uma linha aqui e o registro em docs/parcerias.md.
 * Para retirar a autorização de uma, mude `authorized` para false: ela some do
 * site sem mais nenhum passo. Se nenhuma estiver autorizada, a seção inteira some.
 */
const raw: Partner[] = [
  { name: "Play9ContentGroup", authorized: true },
  { name: "Casaeaser", authorized: true },
];

/** Valida na carga do módulo. Dado ruim derruba o build, não uma requisição. */
const partners: Partner[] = raw.map((p) => PartnerSchema.parse(p));

/** O ponto de acesso. Nenhum componente lê a lista bruta (CLAUDE.md 8.4). */
export function getAuthorizedPartners(): Partner[] {
  return partners.filter((p) => p.authorized);
}

export const parcerias = {
  /** DRAFT. Rótulo neutro, na palavra do responsável. */
  heading: "Parcerias",
} as const;
