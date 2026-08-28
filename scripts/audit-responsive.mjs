/**
 * Responsive audit. PRD 34, DESIGN_SYSTEM I.17.
 *
 * Every route at every breakpoint tier: no horizontal overflow, navigation
 * behaves per tier, the CTA stays reachable, text stays readable, and nothing
 * escapes the viewport.
 *
 * Usage: node scripts/audit-responsive.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:5000";
const ROUTES = [
  "/", "/solucoes", "/solucoes/integracoes", "/solucoes/sites",
  "/projetos", "/projetos/gestao-de-contratos", "/sobre", "/contato",
];
const VIEWPORTS = [
  { name: "320", w: 320, h: 800 },
  { name: "390", w: 390, h: 844 },
  { name: "768", w: 768, h: 1024 },
  { name: "1024", w: 1024, h: 900 },
  { name: "1440", w: 1440, h: 900 },
  { name: "1920", w: 1920, h: 1080 },
];

const failures = [];
const fail = (r, vp, check, detail) => failures.push(`${r} @${vp} :: ${check} :: ${detail}`);

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(350);

    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;

      // Elements escaping the viewport horizontally.
      const escapees = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const cs = getComputedStyle(el);
        if (cs.overflowX === "auto" || cs.overflowX === "scroll") continue;
        if (r.right > doc.clientWidth + 1 || r.left < -1) {
          escapees.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]}`);
        }
      }

      // Smallest rendered font size on visible text.
      let minFont = 99;
      for (const el of document.querySelectorAll("p, li, span, a, dd, figcaption")) {
        if (!(el.textContent ?? "").trim()) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        minFont = Math.min(minFont, parseFloat(getComputedStyle(el).fontSize));
      }

      const nav = document.querySelector("header");
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;

      // A CTA to /contato must be reachable without opening a menu.
      const ctaVisible = [...document.querySelectorAll('a[href^="/contato"]')].some((a) => {
        const r = a.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.top < window.innerHeight * 2;
      });

      return { overflow, escapees: [...new Set(escapees)].slice(0, 4), minFont, navHeight, ctaVisible };
    });

    if (m.overflow > 0) fail(route, vp.name, "overflow", `${m.overflow}px horizontal`);
    for (const e of m.escapees) fail(route, vp.name, "escapa-viewport", e);
    if (m.minFont < 11) fail(route, vp.name, "fonte", `${m.minFont}px, abaixo do mínimo legível`);
    if (m.navHeight > 80) fail(route, vp.name, "nav-altura", `${Math.round(m.navHeight)}px, máximo 80px`);
    if (!m.ctaVisible) fail(route, vp.name, "cta", "nenhum CTA para /contato alcançável no topo da página");

    // Navigation must be one line at lg and above.
    if (vp.w >= 1024) {
      const navLines = await page.evaluate(() => {
        const items = [...document.querySelectorAll("header nav a")];
        const tops = new Set(items.map((a) => Math.round(a.getBoundingClientRect().top)));
        return tops.size;
      });
      if (navLines > 1) fail(route, vp.name, "nav", `navegação em ${navLines} linhas no desktop`);
    }

    await ctx.close();
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(`\nRESPONSIVE: ${failures.length} problema(s)\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`responsive audit: ok (${ROUTES.length} rotas x ${VIEWPORTS.length} viewports)`);
