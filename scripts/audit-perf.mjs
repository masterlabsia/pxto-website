/**
 * Performance audit. TECHNICAL_ARCHITECTURE 16.
 *
 * Measures the budget directly rather than through Lighthouse, which currently
 * requires Node 22 and this environment runs 20.9. The metrics below are the
 * ones the budget is written against, read from the Performance API in a real
 * Chromium page.
 *
 * Usage: node scripts/audit-perf.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:4777";
const ROUTES = ["/", "/solucoes", "/solucoes/integracoes", "/projetos", "/projetos/gestao-de-contratos", "/sobre", "/contato"];

const BUDGET = {
  lcpMs: 2000,
  cls: 0.05,
  /**
   * Uncompressed script bytes. The gzipped figure the build reports is roughly
   * a quarter of this. 460KB raw corresponds to about 120KB gzipped.
   */
  jsRawKb: 470,
  /**
   * Fonts are woff2, so the measured bytes are the transfer bytes. Two variable
   * families currently cost more than the compressed JavaScript, which makes
   * this the single heaviest asset class on the site.
   */
  fontKb: 145,
};

const browser = await chromium.launch();
const failures = [];
const rows = [];

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();

  let jsBytes = 0;
  let cssBytes = 0;
  let fontBytes = 0;
  let imgBytes = 0;
  // Real body sizes. content-length is absent on most Next.js chunks, which
  // silently undercounts by an order of magnitude.
  const pending = [];
  page.on("response", (res) => {
    const type = res.request().resourceType();
    if (!["script", "stylesheet", "font", "image"].includes(type)) return;
    pending.push(
      res
        .body()
        .then((b) => {
          if (type === "script") jsBytes += b.length;
          else if (type === "stylesheet") cssBytes += b.length;
          else if (type === "font") fontBytes += b.length;
          else if (type === "image") imgBytes += b.length;
        })
        .catch(() => {}),
    );
  });

  await page.goto(BASE + route, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await Promise.all(pending);

  const metrics = await page.evaluate(async () => {
    const lcp = await new Promise((resolve) => {
      let value = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) value = e.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      setTimeout(() => resolve(value), 600);
    });

    const cls = await new Promise((resolve) => {
      let value = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) value += e.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      setTimeout(() => resolve(value), 600);
    });

    const nav = performance.getEntriesByType("navigation")[0];
    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
    const longTasks = performance.getEntriesByType("longtask") ?? [];

    return {
      lcp: Math.round(lcp),
      cls: Number(cls.toFixed(4)),
      fcp: Math.round(fcp?.startTime ?? 0),
      ttfb: Math.round(nav?.responseStart ?? 0),
      domNodes: document.querySelectorAll("*").length,
      longTaskMs: Math.round(longTasks.reduce((s, t) => s + t.duration, 0)),
    };
  });

  const jsKb = Math.round(jsBytes / 1024);
  const fontKb = Math.round(fontBytes / 1024);

  rows.push({
    route,
    lcp: metrics.lcp,
    cls: metrics.cls,
    fcp: metrics.fcp,
    ttfb: metrics.ttfb,
    jsKb,
    cssKb: Math.round(cssBytes / 1024),
    fontKb: Math.round(fontBytes / 1024),
    imgKb: Math.round(imgBytes / 1024),
    dom: metrics.domNodes,
    longTaskMs: metrics.longTaskMs,
  });

  if (metrics.lcp > BUDGET.lcpMs) failures.push(`${route}: LCP ${metrics.lcp}ms > ${BUDGET.lcpMs}ms`);
  if (metrics.cls > BUDGET.cls) failures.push(`${route}: CLS ${metrics.cls} > ${BUDGET.cls}`);
  if (jsKb > BUDGET.jsRawKb) failures.push(`${route}: JS ${jsKb}KB raw > ${BUDGET.jsRawKb}KB`);
  if (fontKb > BUDGET.fontKb) failures.push(`${route}: fonts ${fontKb}KB > ${BUDGET.fontKb}KB`);

  await ctx.close();
}

await browser.close();

console.log("");
console.log("route                              LCP    CLS    FCP   TTFB    JS   CSS  FONT   IMG    DOM  LONGTASK");
for (const r of rows) {
  console.log(
    r.route.padEnd(34) +
      String(r.lcp + "ms").padStart(6) +
      String(r.cls).padStart(7) +
      String(r.fcp + "ms").padStart(7) +
      String(r.ttfb + "ms").padStart(7) +
      String(r.jsKb + "K").padStart(6) +
      String(r.cssKb + "K").padStart(6) +
      String(r.fontKb + "K").padStart(6) +
      String(r.imgKb + "K").padStart(6) +
      String(r.dom).padStart(7) +
      String(r.longTaskMs + "ms").padStart(10),
  );
}
console.log("");

if (failures.length > 0) {
  console.error(`PERF BUDGET: ${failures.length} breach(es)`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log("perf audit: ok, all routes within budget");
