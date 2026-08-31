/**
 * Valida a mensagem de commit.
 *
 * Duas regras, ambas escritas: CLAUDE.md 17.3 exige Conventional Commits, e a
 * 0.6 proibe travessao em mensagem de commit que apareca para alguem.
 *
 * Uso: node scripts/verify-commit-msg.mjs <arquivo-da-mensagem>
 */
import { readFileSync } from "node:fs";

const path = process.argv[2];
if (!path) {
  console.error("verify-commit-msg: caminho da mensagem nao informado.");
  process.exit(1);
}

const raw = readFileSync(path, "utf8");
// Comentarios do git e o diff do --verbose nao fazem parte da mensagem.
const lines = raw.split("\n").filter((l) => !l.startsWith("#"));
const subject = lines[0]?.trim() ?? "";

const failures = [];

// merge, revert e fixup sao gerados pelo git e nao seguem o formato.
const generated = /^(Merge|Revert|fixup!|squash!)/.test(subject);

if (!generated) {
  const TYPES = ["feat", "fix", "chore", "docs"];
  const pattern = new RegExp(`^(${TYPES.join("|")})(\\([a-z0-9./-]+\\))?!?: .+`);

  if (!pattern.test(subject)) {
    failures.push(
      `Assunto fora do formato Conventional Commits.\n` +
        `    recebido: ${subject || "(vazio)"}\n` +
        `    esperado: <tipo>: <descricao>, com tipo em ${TYPES.join(", ")}\n` +
        `    CLAUDE.md 17.3. Exemplo: chore: instala husky e hooks de commit`,
    );
  }

  if (subject.length > 72) {
    failures.push(`Assunto com ${subject.length} caracteres. Limite 72.`);
  }
}

for (const { char, name } of [
  { char: "—", name: "travessao (em-dash)" },
  { char: "–", name: "meia-risca (en-dash)" },
]) {
  if (lines.join("\n").includes(char)) {
    failures.push(`Mensagem contem ${name}. CLAUDE.md 0.6 proibe, sem excecao.`);
  }
}

if (failures.length > 0) {
  console.error(`\nverify-commit-msg: ${failures.length} problema(s).\n`);
  for (const f of failures) console.error(`  ${f}\n`);
  process.exit(1);
}
