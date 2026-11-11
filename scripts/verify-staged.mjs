/**
 * Verificacoes de commit que os gates do CLAUDE.md 18 nao cobrem.
 *
 * `tsc` e o ESLint pegam tipo e estilo. Estas duas falhas passam por eles
 * intactas e sao as duas que ja quebraram o projeto:
 *
 *   1. Travessao em conteudo. CLAUDE.md 0.6 e absoluta e nao tem gate de
 *      commit. audit-content.mjs so ve a pagina renderizada, ou seja, depois
 *      do build, com o servidor no ar, quando o texto ja esta commitado.
 *
 *   2. Deriva entre public/logo.svg e src/lib/logo-paths.ts. Trocar o SVG sem
 *      rodar `npm run build:logo` nao quebra tipo nem lint: o site simplesmente
 *      continua exibindo a marca antiga, em silencio.
 *
 * Roda apenas sobre o que esta em stage, entao o custo acompanha o tamanho do
 * commit e nao o do repositorio.
 *
 * Uso: node scripts/verify-staged.mjs
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const staged = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACM"], {
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

const failures = [];

/* 1. Travessao ------------------------------------------------------------ */

// Escopo: o que vira texto no site. docs/ fica de fora porque e documentacao
// interna em ingles, onde a regra 0.6 nao se aplica.
const textFiles = staged.filter((f) => /^src\/.*\.(ts|tsx|css)$/.test(f));

// Escritos por code point para que este arquivo nao contenha os proprios
// caracteres que proibe.
const DASHES = [
  { char: "—", name: "travessao (em-dash)" },
  { char: "–", name: "meia-risca (en-dash)" },
];

for (const file of textFiles) {
  if (!existsSync(file)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const { char, name } of DASHES) {
      const col = line.indexOf(char);
      if (col >= 0) {
        failures.push(
          `${file}:${i + 1}:${col + 1}  ${name}\n` +
            `    ${line.trim().slice(0, 90)}\n` +
            `    CLAUDE.md 0.6: use ponto, virgula, dois pontos, parenteses ou reescreva.`,
        );
      }
    }
  });
}

/* 2. Deriva do logo ------------------------------------------------------- */

const LOGO_SRC = "public/logo.svg";
const LOGO_MOD = "src/lib/logo-paths.ts";

if (staged.includes(LOGO_SRC) && existsSync(LOGO_SRC) && existsSync(LOGO_MOD)) {
  const actual = createHash("sha256").update(readFileSync(LOGO_SRC, "utf8")).digest("hex").slice(0, 16);
  const recorded = readFileSync(LOGO_MOD, "utf8").match(/LOGO_SOURCE_HASH = "([^"]+)"/)?.[1];

  if (recorded !== actual) {
    failures.push(
      `${LOGO_SRC} mudou, mas ${LOGO_MOD} nao foi regerado.\n` +
        `    origem ${actual}, modulo ${recorded ?? "sem hash"}\n` +
        `    O site le o modulo, entao a marca antiga continuaria no ar.\n` +
        `    Rode: npm run build:logo && git add ${LOGO_MOD}`,
    );
  }
}

/* Resultado --------------------------------------------------------------- */

if (failures.length > 0) {
  console.error(`\nverify-staged: ${failures.length} problema(s).\n`);
  for (const f of failures) console.error(`  ${f}\n`);
  process.exit(1);
}

console.log(`verify-staged: ok. ${staged.length} arquivo(s) em stage, ${textFiles.length} de texto.`);
