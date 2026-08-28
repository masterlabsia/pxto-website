import { cn } from "@/lib/cn";
import { LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo-paths";

const SYMBOL_ID = "pxto-mark";

/**
 * Declara a geometria da marca uma única vez por página.
 *
 * Renderizado no layout raiz. Cada <Logo> referencia este símbolo por <use>,
 * o que evita repetir cerca de 5KB de path na navbar e no rodapé.
 */
export function LogoSymbol() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      className="absolute"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <symbol id={SYMBOL_ID} viewBox={LOGO_VIEWBOX}>
        <g transform="translate(0,1254) scale(0.1,-0.1)" fill="currentColor">
          {LOGO_PATHS.map((d) => (
            <path key={d.slice(0, 24)} d={d} />
          ))}
        </g>
      </symbol>
    </svg>
  );
}

/**
 * A marca PXTO.
 *
 * Herda a cor de tinta do tema, então funciona em claro e escuro sem um segundo
 * arquivo: o quadrado assume a cor do texto e o fundo da página aparece através
 * das letras vazadas.
 *
 * O quadrado já contém a palavra "pxto", então não acompanha um wordmark em
 * texto ao lado. Isso duplicaria a marca.
 *
 * TAMANHO MÍNIMO. Medido em 28/08/2026: o "x" do meio só fica visível a partir
 * de cerca de 64px, e só fica legível a partir de 96px. Abaixo disso a marca lê
 * como "p to". O traço do x é fino demais em relação às outras letras, e o
 * arquivo entregue é uma vetorização automática, com ruído nas bordas.
 *
 * A navbar usa 40px por ser o maior tamanho que cabe no teto de 80px de altura.
 * Isso está abaixo do mínimo legível. A correção é do ativo, não do código:
 * uma variante para tamanho pequeno com o x mais encorpado, ou um vetor limpo
 * no lugar da vetorização. Ver docs/qa/QA_REPORT.md.
 */
export function Logo({
  className,
  label,
  decorative = false,
}: {
  className?: string;
  /** Nome acessível. Omitido quando a marca é decorativa dentro de um link já rotulado. */
  label?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("text-ink", className)}
      {...(decorative
        ? { "aria-hidden": true as const, focusable: false as const }
        : { role: "img", "aria-label": label ?? "PXTO" })}
    >
      <use href={`#${SYMBOL_ID}`} />
    </svg>
  );
}
