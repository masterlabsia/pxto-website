/**
 * Functional audit: every internal link resolves, navigation works, the form
 * behaves across all states, and 404 responds correctly.
 *
 * Usage: node scripts/audit-functional.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:5000";
const failures = [];
const notes = [];
const fail = (area, detail) => failures.push(`${area} :: ${detail}`);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await ctx.newPage();

// --- Crawl every internal link reachable from the site ----------------------
const seen = new Set();
const queue = ["/"];
const linkGraph = new Map();

while (queue.length > 0) {
  const route = queue.shift();
  if (seen.has(route)) continue;
  seen.add(route);

  const res = await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
  if (!res || res.status() !== 200) {
    fail("link", `${route} returned ${res?.status() ?? "no response"}`);
    continue;
  }

  const links = await page.$$eval("a[href]", (as) =>
    as.map((a) => ({ href: a.getAttribute("href") ?? "", text: (a.textContent ?? "").trim() })),
  );
  linkGraph.set(route, links);

  for (const { href } of links) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (clean && !seen.has(clean)) queue.push(clean);
  }
}
notes.push(`${seen.size} rotas alcançáveis a partir de /`);

// --- Link rules from SITEMAP section 4 --------------------------------------
for (const [route, links] of linkGraph) {
  const hrefs = links.map((l) => l.href);
  if (!hrefs.some((h) => h.startsWith("/contato"))) {
    fail("link-rule-R1", `${route} não oferece caminho para /contato`);
  }
  const isProject = route.startsWith("/projetos/");
  const isContact = route === "/contato";
  if (!isProject && !isContact && !hrefs.some((h) => h.startsWith("/projetos"))) {
    fail("link-rule-R2", `${route} não oferece caminho para um projeto`);
  }
}

// --- Empty or placeholder links ---------------------------------------------
for (const [route, links] of linkGraph) {
  for (const l of links) {
    if (!l.href || l.href === "#") fail("link", `${route} tem link vazio "${l.text}"`);
    if (!l.text && !(await page.$(`a[href="${l.href}"] img`))) {
      // anchors with no accessible text are caught by axe; noted only.
    }
  }
}

// --- 404 --------------------------------------------------------------------
const r404 = await page.goto(BASE + "/rota-que-nao-existe", { waitUntil: "domcontentloaded" });
if (r404?.status() !== 404) fail("404", `status ${r404?.status()} em rota inexistente`);
const has404Copy = await page.locator("text=Esta página não existe").count();
if (has404Copy === 0) fail("404", "página 404 sem a copy aprovada");

// --- Navigation actually navigates ------------------------------------------
await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
for (const [label, expected] of [["Soluções", "/solucoes"], ["Projetos", "/projetos"], ["Sobre", "/sobre"], ["Contato", "/contato"]]) {
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.locator(`header nav a:has-text("${label}")`).first().click();
  // Client-side routing does not create a new document, so waiting on a load
  // state resolves immediately against the old URL. Wait on the URL itself.
  await page.waitForURL(`**${expected}`, { timeout: 5000 }).catch(() => {});
  if (!new URL(page.url()).pathname.startsWith(expected)) {
    fail("nav", `"${label}" levou a ${new URL(page.url()).pathname}, esperado ${expected}`);
  }
}

// --- Mobile menu ------------------------------------------------------------
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mpage = await mctx.newPage();
await mpage.goto(BASE + "/", { waitUntil: "domcontentloaded" });
const toggle = mpage.locator('button[aria-controls="menu-mobile"]');
if ((await toggle.count()) === 0) fail("nav-mobile", "botão de menu ausente");
else {
  if ((await toggle.getAttribute("aria-expanded")) !== "false") fail("nav-mobile", "aria-expanded inicial incorreto");
  await toggle.click();
  if ((await toggle.getAttribute("aria-expanded")) !== "true") fail("nav-mobile", "aria-expanded não muda ao abrir");
  if ((await mpage.locator("#menu-mobile").count()) === 0) fail("nav-mobile", "painel não abre");
  await mpage.keyboard.press("Escape");
  await mpage.waitForTimeout(200);
  if ((await mpage.locator("#menu-mobile").count()) !== 0) fail("nav-mobile", "Escape não fecha o menu");
}
await mctx.close();

// --- Contact form states ----------------------------------------------------
await page.goto(BASE + "/contato", { waitUntil: "domcontentloaded" });

// Empty submit must surface field errors, not a silent success.
await page.waitForTimeout(1700);
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(2000);
if ((await page.locator("form").count()) === 0) {
  fail("form", "submit vazio resultou em sucesso: lead seria descartado silenciosamente");
} else {
  const errs = await page.locator("form p.text-danger").count();
  if (errs < 2) fail("form", `submit vazio produziu ${errs} erros de campo, esperado ao menos 2`);
}

// Invalid email must be rejected.
await page.fill("#nome", "Teste");
await page.fill("#email", "nao-e-email");
await page.fill("#mensagem", "Temos dois sistemas que não trocam informação entre si.");
await page.waitForTimeout(1700);
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(2000);
const emailErr = await page.locator("#email-error").count();
if (emailErr === 0) fail("form", "e-mail inválido não produziu erro");

// Valid submit must NOT report a fake success while delivery is unconfigured.
await page.fill("#email", "maria@exemplo.com");
await page.waitForTimeout(1700);
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(2500);
const succeeded = (await page.locator("form").count()) === 0;
if (succeeded) fail("form", "reportou sucesso sem destino configurado");
else notes.push("form: envio válido reporta destino não configurado, em vez de simular sucesso");

// Honeypot must be hidden from users and assistive tech.
const hp = page.locator("#website");
if ((await hp.count()) === 0) fail("form", "honeypot ausente");
else if (await hp.isVisible()) fail("form", "honeypot visível");

// --- sitemap and robots -----------------------------------------------------
const sm = await page.goto(BASE + "/sitemap.xml");
if (sm?.status() !== 200) fail("sitemap", `status ${sm?.status()}`);
const smText = await page.content();
for (const must of ["/solucoes/integracoes", "/projetos/gestao-de-contratos", "/sobre", "/contato"]) {
  if (!smText.includes(must)) fail("sitemap", `${must} ausente`);
}
if (smText.includes("/design-system")) fail("sitemap", "/design-system não deveria estar no sitemap");

const rb = await page.goto(BASE + "/robots.txt");
if (rb?.status() !== 200) fail("robots", `status ${rb?.status()}`);
const rbText = await page.content();
if (!rbText.includes("Disallow: /design-system")) fail("robots", "/design-system não está bloqueado");

await browser.close();

console.log("");
for (const n of notes) console.log("  nota: " + n);
if (failures.length > 0) {
  console.error(`\nFUNCTIONAL: ${failures.length} problema(s)\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log("\nfunctional audit: ok");
