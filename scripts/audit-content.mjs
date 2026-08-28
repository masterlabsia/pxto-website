/**
 * Content audit. The rules in CLAUDE.md that are mechanically checkable.
 *
 * Checks the RENDERED text, not the source, because the rule is about what a
 * visitor sees.
 *
 * Usage: node scripts/audit-content.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:5000";
const ROUTES = [
  "/", "/solucoes", "/solucoes/integracoes", "/solucoes/automacao",
  "/solucoes/software", "/solucoes/sites", "/projetos",
  "/projetos/gestao-de-contratos", "/projetos/furniture-visualization",
  "/projetos/ai-interior-designer", "/sobre", "/contato",
];

/** PRD 7 and BRAND_FOUNDATION 13. Word-boundary matched. */
const BANNED_VOCAB = [
  "revolucionário", "revolucionaria", "disruptiv", "a melhor solução",
  "transformação digital", "inovador", "líder de mercado", "referência no mercado",
  "pioneir", "exclusiv", "end-to-end", "solução de ponta", "última geração",
  "anos de experiência", "nossos clientes", "nossa equipe", "nosso time",
  "empoderar", "alavancar", "potencializar",
];

/** PRD 29. */
const BANNED_CTA = ["saiba mais", "clique aqui", "solicite agora"];

/** Confidential client material that must never surface. */
const CONFIDENTIAL = [
  "highq", "thomson", "pipedrive", "play9", "playnest", "playconnect",
];

/** PRD 12, 13, 14, 16. Must appear verbatim. */
const FIXED_COPY = {
  "/": [
    "Conectamos sistemas.",
    "Automatizamos processos.",
    "Construímos soluções.",
    "Tecnologia aplicada aos desafios reais das empresas.",
    "Sua empresa já tem tecnologia. O problema é quando ela não conversa.",
    "Tecnologia para resolver problemas reais.",
    "Fale com a PXTO",
    "Ver projetos",
  ],
  "/solucoes/integracoes": ["Faça seus sistemas conversarem."],
  "/solucoes/automacao": ["Automatize o trabalho que não deveria precisar ser manual."],
  "/solucoes/software": ["Quando uma solução pronta não basta, construímos a sua."],
  "/solucoes/sites": ["Presença digital construída para funcionar."],
  "/projetos": [
    "O que construímos.",
    "Soluções desenvolvidas para transformar ideias e problemas em produtos digitais funcionais.",
  ],
};

const failures = [];
const fail = (route, check, detail) => failures.push(`${route} :: ${check} :: ${detail}`);

const browser = await chromium.launch();

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const res = await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
  if (res?.status() !== 200) {
    fail(route, "route", `status ${res?.status()}`);
    await ctx.close();
    continue;
  }
  await page.waitForTimeout(300);

  const text = await page.evaluate(() => document.body.innerText);
  const html = await page.content();
  const lower = text.toLowerCase();

  // Em-dash and en-dash: zero tolerance.
  const dashes = (text.match(/[—–]/g) ?? []).length;
  if (dashes > 0) fail(route, "em-dash", `${dashes} ocorrência(s)`);

  // Middle dot rationed to one per line.
  for (const line of text.split("\n")) {
    const dots = (line.match(/·/g) ?? []).length;
    if (dots > 1) fail(route, "middle-dot", `${dots} em "${line.trim().slice(0, 50)}"`);
  }

  for (const term of BANNED_VOCAB) {
    if (lower.includes(term)) fail(route, "vocabulário", `"${term}"`);
  }
  for (const cta of BANNED_CTA) {
    if (lower.includes(cta)) fail(route, "cta-proibido", `"${cta}"`);
  }
  for (const term of CONFIDENTIAL) {
    if (lower.includes(term)) fail(route, "confidencial", `"${term}" exposto`);
  }

  // First person singular. The company speaks, never a person (PRD 27).
  for (const m of [/\beu sou\b/i, /\bmeu nome\b/i, /\bminha empresa\b/i, /\beu construí\b/i]) {
    if (m.test(text)) fail(route, "primeira-pessoa", m.source);
  }

  // Numbers that look like invented metrics. The site should carry almost none.
  const numbers = (text.match(/\b\d[\d.,]*\s?(%|mil|milhões|anos|clientes|projetos|horas)\b/gi) ?? [])
    .filter((n) => !/^20\s?%/.test(n)); // known, approved rhetorical use on /solucoes/software
  for (const n of numbers) fail(route, "métrica", `"${n}"`);

  // Social proof scaffolding must not exist even when empty.
  for (const sel of ['[class*="logo-wall"]', '[class*="testimonial"]', '[class*="counter"]', '[data-stat]']) {
    if (await page.locator(sel).count()) fail(route, "prova-social", `slot ${sel} presente`);
  }
  if (/trusted by|confiam em nós|nossos parceiros|depoimentos/i.test(text)) {
    fail(route, "prova-social", "cabeçalho de prova social no texto");
  }

  // Empty states where a section should have been omitted.
  if (/em breve|coming soon|nenhum projeto|sem projetos/i.test(text)) {
    fail(route, "estado-vazio", "estado vazio renderizado em vez de seção omitida");
  }

  // Fixed copy integrity.
  for (const phrase of FIXED_COPY[route] ?? []) {
    if (!text.includes(phrase)) fail(route, "copy-fixa", `ausente: "${phrase}"`);
  }

  // Placeholder text left in the build.
  // Case-sensitive and word-bounded: /TODO/i matches the Portuguese "todo".
  if (/lorem ipsum/i.test(html) || /\b(TODO|FIXME|XXX|PLACEHOLDER)\b/.test(html)) {
    fail(route, "placeholder", "texto de placeholder no HTML");
  }

  await ctx.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(`\nCONTENT: ${failures.length} problema(s)\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`content audit: ok (${ROUTES.length} rotas: em-dash, vocabulário, CTAs, confidencialidade, métricas, prova social, copy fixa)`);
