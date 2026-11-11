import { PartnersMarquee } from "@/components/ui/PartnersMarquee";
import { getAuthorizedPartners, parcerias } from "@/content/parcerias";

/**
 * Empresas que fizeram parceria com a PXTO, numa faixa de nomes que passa, como o
 * "logo roll" do protótipo H612. Fica logo abaixo do Hero (decidido em 11/11/2026),
 * sem título visível. Só nomes, em texto, com peso igual.
 *
 * Esta é a ÚNICA exceção à regra de que o site não tem slot de prova social
 * (CLAUDE.md 0.4) e a única faixa que anda (7.9), restrita ao que está abaixo:
 * nomes autorizados, sem logo, sem número, sem depoimento, sem descrição e sem
 * contador.
 *
 * OMITIDA, NUNCA VAZIA (CLAUDE.md 6.10). Sem nenhuma empresa autorizada, o
 * componente não renderiza nada.
 *
 * SEM TÍTULO VISÍVEL, mas com título para leitor de tela: um `h2` `sr-only` mantém
 * a hierarquia de títulos e nomeia a região. A lista real, lida uma vez só, é a
 * `<ul class="sr-only">`. A faixa animada é `aria-hidden` porque repete os nomes.
 *
 * `data-partners` é o marcador que o auditor de conteúdo usa para permitir os
 * nomes autorizados só aqui. Fora desta seção, os nomes continuam bloqueados.
 */
export function Parcerias() {
  const names = getAuthorizedPartners().map((partner) => partner.name);
  if (names.length === 0) return null;

  return (
    <section data-partners="" aria-labelledby="parcerias-heading" className="pb-6">
      <h2 id="parcerias-heading" className="sr-only">
        {parcerias.heading}
      </h2>
      <ul className="sr-only">
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <PartnersMarquee names={names} />
    </section>
  );
}
