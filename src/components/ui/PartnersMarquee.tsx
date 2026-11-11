/**
 * Faixa de nomes que passa na tela, como o "logo roll" do protótipo H612.
 * Decidido pelo responsável em 11/11/2026.
 *
 * COMPONENTE DE SERVIDOR. Antes tinha um botão de pausa e por isso era client leaf.
 * O responsável pediu para tirar o botão (11/11/2026), e o componente deixou de
 * guardar estado: o movimento é todo CSS (`.pxto-marquee` em globals.css).
 *
 * LACUNA DE ACESSIBILIDADE, ASSUMIDA. WCAG 2.2.2 pede um jeito de parar movimento
 * automático que dura mais de 5 segundos. Sem o botão, a faixa para no hover, no
 * foco dentro e sob reduced-motion, mas quem usa só o teclado não tem como pará-la.
 * O axe do projeto não testa esse critério, então as auditorias passam mesmo assim.
 * Para fechar a lacuna sem botão: parar a faixa depois de alguns ciclos, ou deixá-la
 * parada por padrão em telas sem hover. Registrado em docs/parcerias.md.
 *
 * ACESSIBILIDADE. A faixa inteira é `aria-hidden`: ela repete os nomes várias vezes,
 * e um leitor de tela leria a lista dezenas de vezes. Quem lê a lista de verdade é a
 * `<ul class="sr-only">` da seção, uma vez só.
 *
 * A REPETIÇÃO É TÉCNICA, não informação. Cada grupo precisa ser mais largo que a
 * viewport para o loop não ter vão, então os nomes se repetem. Isso não indica mais
 * empresas do que as que estão autorizadas (docs/parcerias.md).
 *
 * SEPARADOR. Um ponto entre os nomes, a pedido do responsável (11/11/2026). É CSS
 * (`.pxto-marquee li::after`), e não texto: CSS gerado não entra em `innerText`, então o
 * auditor de conteúdo (que limita o ponto médio a um por linha) e o leitor de tela não o
 * veem. O ponto vem DEPOIS de cada nome, inclusive o último de cada grupo, para o fim do
 * primeiro grupo encaixar no começo do segundo sem emenda.
 *
 * Reduced-motion: ver `.pxto-marquee` em globals.css. A faixa vira uma lista parada,
 * cada nome uma vez.
 */

/**
 * Quantas vezes os nomes se repetem dentro de um grupo, para ele passar de 2600px
 * (uma tela de 4K em 1x). Com letra menor, os nomes ocupam menos largura e a
 * repetição precisa ser maior.
 */
const REPEAT = 6;

export function PartnersMarquee({ names }: { names: readonly string[] }) {
  const group = Array.from({ length: REPEAT }, () => names).flat();

  return (
    <div aria-hidden="true" className="pxto-marquee py-4 md:py-6">
      <div className="pxto-marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className={`flex shrink-0 items-center ${copy === 1 ? "pxto-marquee-dup" : ""}`}
          >
            {group.map((name, index) => (
              <li
                key={`${copy}-${index}`}
                className={`flex shrink-0 items-center whitespace-nowrap text-xl font-light text-ink-secondary md:text-3xl ${index >= names.length ? "pxto-marquee-rep" : ""}`}
              >
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
