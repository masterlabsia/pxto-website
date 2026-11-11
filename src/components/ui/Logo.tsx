import { cn } from "@/lib/cn";
import {
  LOGO_ACCENT,
  LOGO_PATHS,
  LOGO_TRANSFORM,
  LOGO_VIEWBOX,
} from "@/lib/logo-paths";

const SYMBOL_ID = "pxto-mark";

/**
 * Declara a geometria da marca uma única vez por página.
 *
 * Renderizado no layout raiz. Cada <Logo> referencia este símbolo por <use>,
 * o que evita repetir os paths na navbar e no rodapé.
 *
 * A geometria vem de src/lib/logo-paths.ts, que é GERADO de public/logo.svg
 * por scripts/build-logo.mjs. Para trocar a marca: substitua o SVG e rode
 * `npm run build:logo`.
 */
export function LogoSymbol() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <symbol id={SYMBOL_ID} viewBox={LOGO_VIEWBOX}>
        {/*
          O transform vem dos grupos do arquivo de origem e NÃO pode ser
          descartado: o Inkscape exporta o desenho em coordenadas cruas e o
          reposiciona aqui. Sem ele o desenho fica deslocado e o viewBox corta
          a direita e a base, que foi exatamente o bug do primeiro corte.
        */}
        <g {...(LOGO_TRANSFORM ? { transform: LOGO_TRANSFORM } : {})}>
          {LOGO_PATHS.map((path) => (
            <path
              key={path.d.slice(0, 24)}
              d={path.d}
              // Duas cores, dois comportamentos. As letras seguem a tinta do
              // tema via currentColor, então funcionam no claro e no escuro sem
              // um segundo arquivo. O "x" mantém a cor da marca nos dois temas.
              fill={path.role === "accent" ? (LOGO_ACCENT ?? "currentColor") : "currentColor"}
            />
          ))}
        </g>
      </symbol>
    </svg>
  );
}

/**
 * A marca PXTO.
 *
 * Wordmark horizontal, proporção ~2.24:1. O dimensionamento é pela ALTURA:
 * passe `h-*` e a largura acompanha. Nunca force largura e altura juntas, que
 * distorce.
 *
 * O wordmark já contém a palavra "pxto", então não acompanha texto ao lado.
 * Isso duplicaria a marca.
 */
export function Logo({
  className,
  label,
  decorative = false,
}: {
  /** Use altura: `h-8`, `h-10`. A largura acompanha pela proporção. */
  className?: string;
  /** Nome acessível. Omitido quando dentro de um link já rotulado. */
  label?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      // w-auto mais a proporção do viewBox mantêm o desenho sem distorção
      // qualquer que seja a altura escolhida pelo consumidor.
      className={cn("w-auto text-ink", className)}
      {...(decorative
        ? { "aria-hidden": true as const, focusable: false as const }
        : { role: "img", "aria-label": label ?? "PXTO" })}
    >
      <use href={`#${SYMBOL_ID}`} />
    </svg>
  );
}
