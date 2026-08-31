/**
 * Gera src/lib/logo-paths.ts a partir de public/logo.svg.
 *
 * POR QUE ESTE SCRIPT EXISTE. A geometria da marca vive num módulo TypeScript
 * para que o <symbol> seja declarado uma vez por página e reutilizado por <use>,
 * em vez de duplicar milhares de bytes de path na navbar e no rodapé.
 *
 * O efeito colateral disso foi duas fontes de verdade: trocar public/logo.svg
 * não mudava nada no site, porque o componente lê o módulo. Este script fecha
 * essa lacuna. O arquivo volta a ser a fonte; o módulo é derivado e commitado.
 *
 * CLASSIFICAÇÃO DE COR, e é o que permite o tema funcionar:
 *   path sem fill declarado   -> papel "ink", vira currentColor
 *   path com fill de cor      -> papel "accent", mantém a cor da marca
 *
 * Um wordmark de duas cores não cabe num único currentColor. As letras seguem a
 * tinta do tema; o "x" mantém a cor da marca em ambos os temas.
 *
 * Uso: node scripts/build-logo.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "public/logo.svg";
const OUT = "src/lib/logo-paths.ts";

const svg = readFileSync(SRC, "utf8");

const viewBox = svg.match(/\bviewBox="([^"]+)"/)?.[1];
if (!viewBox) {
  console.error(`${SRC}: sem viewBox. Impossível derivar a proporção.`);
  process.exit(1);
}

/**
 * Transformações dos grupos ancestrais.
 *
 * O Inkscape costuma exportar o desenho em coordenadas cruas e reposicioná-lo
 * com um translate no <g> de camada. Extrair só os <path> e descartar esse
 * transform desloca o desenho e o viewBox corta a direita e a base: o SVG
 * original renderiza certo e a versão extraída aparece cortada.
 *
 * As transformações são compostas na ordem em que aparecem, que é como o SVG
 * as aplica.
 */
const transforms = [...svg.matchAll(/<g\b[^>]*?\btransform="([^"]+)"/g)].map((m) => m[1].trim());
const transform = transforms.join(" ") || null;

// Inkscape quebra atributos em várias linhas, então o match precisa ser tolerante.
const raw = [...svg.matchAll(/<path\b([\s\S]*?)\/>/g)].map((m) => m[1]);
if (raw.length === 0) {
  console.error(`${SRC}: nenhum <path> encontrado.`);
  process.exit(1);
}

// Um transform em <path> individual seria perdido pela extração. Reprova em vez
// de gerar um módulo silenciosamente errado.
const pathWithTransform = raw.findIndex((a) => /\btransform="/.test(a));
if (pathWithTransform >= 0) {
  console.error(`${SRC}: o path ${pathWithTransform} tem transform próprio, que a extração não preserva.`);
  console.error('Achate as transformações no editor (Inkscape: Editar > Preferências > Comportamento > Transformações > Armazenar como: Otimizado) e exporte de novo.');
  process.exit(1);
}

const paths = [];
const accentColors = new Set();

for (const attrs of raw) {
  const d = attrs.match(/\bd="([\s\S]*?)"/)?.[1];
  if (!d) continue;

  const style = attrs.match(/\bstyle="([\s\S]*?)"/)?.[1] ?? "";
  const fillAttr = attrs.match(/\bfill="([^"]*)"/)?.[1];
  const fillStyle = style.match(/fill:\s*([^;]+)/)?.[1]?.trim();
  const fill = fillAttr ?? fillStyle;

  const isColored = fill && fill !== "none" && fill !== "currentColor";
  if (isColored) accentColors.add(fill.toLowerCase());

  paths.push({
    role: isColored ? "accent" : "ink",
    d: d.replace(/\s+/g, " ").trim(),
  });
}

if (accentColors.size > 1) {
  console.error(`${SRC}: ${accentColors.size} cores de acento encontradas: ${[...accentColors].join(", ")}`);
  console.error("A marca precisa de no máximo uma cor além da tinta, senão o tema não fecha.");
  process.exit(1);
}

const accent = [...accentColors][0] ?? null;
const [, , w, h] = viewBox.split(/\s+/).map(Number);

const module = `/**
 * GERADO POR scripts/build-logo.mjs. NÃO EDITAR À MÃO.
 * Fonte: ${SRC}
 *
 * Para trocar a marca: substitua ${SRC} e rode \`npm run build:logo\`.
 *
 * Papéis de cor:
 *   ink     letras. Renderizam com currentColor e seguem o tema.
 *   accent  o "x". Mantém a cor da marca nos dois temas.
 */
export const LOGO_VIEWBOX = ${JSON.stringify(viewBox)};

/**
 * Transformação dos grupos ancestrais do arquivo de origem, ou null.
 * Precisa envolver os paths ao renderizar: sem ela o desenho fica deslocado e
 * o viewBox corta a direita e a base.
 */
export const LOGO_TRANSFORM = ${transform ? JSON.stringify(transform) : "null"};

/** Proporção largura/altura, derivada do viewBox. */
export const LOGO_RATIO = ${(w / h).toFixed(4)};

/** Cor de acento declarada no arquivo de origem, ou null. */
export const LOGO_ACCENT = ${accent ? JSON.stringify(accent) : "null"};

export type LogoPath = { role: "ink" | "accent"; d: string };

export const LOGO_PATHS: readonly LogoPath[] = ${JSON.stringify(paths, null, 2)} as const;
`;

writeFileSync(OUT, module);

const ink = paths.filter((p) => p.role === "ink").length;
const acc = paths.filter((p) => p.role === "accent").length;
console.log(
  `build-logo: ${OUT} gerado. ${paths.length} paths (${ink} ink, ${acc} accent), ` +
    `proporção ${(w / h).toFixed(2)}:1, acento ${accent ?? "nenhum"}, ` +
    `transform ${transform ?? "nenhum"}`,
);
