/**
 * Accessibility audit beyond axe.
 *
 * axe catches roughly half of real accessibility issues. This covers the half
 * it does not: computed contrast of the actual rendered colours, focus order,
 * the skip link, heading hierarchy, landmarks, target size and reduced motion.
 *
 * Usage: node scripts/audit-a11y.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:4555";
const ROUTES = [
  "/", "/solucoes", "/solucoes/integracoes", "/solucoes/automacao",
  "/solucoes/software", "/solucoes/sites", "/projetos",
  "/projetos/gestao-de-contratos", "/sobre", "/contato",
];

function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function ratio(fg, bg) {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

function parseRgb(value) {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  if (parts.length >= 4 && parts[3] === 0) return null; // transparent
  return [parts[0], parts[1], parts[2]];
}

const failures = [];
function fail(route, check, detail) {
  failures.push(`${route} :: ${check} :: ${detail}`);
}

const browser = await chromium.launch();

for (const scheme of ["light", "dark"]) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(400);
    const label = `${route} [${scheme}]`;

    // --- Computed text contrast on every visible text node container ---
    const samples = await page.evaluate(() => {
      const out = [];
      const els = document.querySelectorAll("p, h1, h2, h3, h4, li, a, button, label, dt, dd, span, figcaption");
      for (const el of els) {
        const text = (el.textContent ?? "").trim();
        if (!text) continue;
        // Only leaf-ish elements, to avoid measuring containers.
        if (el.querySelector("p, h1, h2, h3, h4, li, a, button, label, dt, dd")) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        // Walk up for the first non-transparent background.
        let bg = null;
        let node = el;
        while (node) {
          const c = getComputedStyle(node).backgroundColor;
          if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) { bg = c; break; }
          node = node.parentElement;
        }
        out.push({
          tag: el.tagName.toLowerCase(),
          text: text.slice(0, 40),
          color: cs.color,
          bg: bg ?? getComputedStyle(document.body).backgroundColor,
          size: parseFloat(cs.fontSize),
          weight: parseInt(cs.fontWeight, 10) || 400,
        });
      }
      return out;
    });

    for (const s of samples) {
      const fg = parseRgb(s.color);
      const bg = parseRgb(s.bg);
      if (!fg || !bg) continue;
      const r = ratio(fg, bg);
      const isLarge = s.size >= 24 || (s.size >= 18.66 && s.weight >= 700);
      const min = isLarge ? 3 : 4.5;
      if (r < min) {
        fail(label, "contrast", `${r.toFixed(2)}:1 (min ${min}) ${s.tag} "${s.text}"`);
      }
    }

    if (scheme === "light") {
      // --- Heading hierarchy: exactly one h1, no skipped levels ---
      const levels = await page.$$eval("h1,h2,h3,h4,h5,h6", (hs) =>
        hs.map((h) => Number(h.tagName[1])),
      );
      const h1s = levels.filter((l) => l === 1).length;
      if (h1s !== 1) fail(label, "headings", `${h1s} h1 elements`);
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] - levels[i - 1] > 1) {
          fail(label, "headings", `skipped h${levels[i - 1]} -> h${levels[i]}`);
        }
      }

      // --- Landmarks ---
      const landmarks = await page.evaluate(() => ({
        header: !!document.querySelector("header"),
        nav: !!document.querySelector("nav"),
        main: !!document.querySelector("main"),
        footer: !!document.querySelector("footer"),
      }));
      for (const [k, v] of Object.entries(landmarks)) {
        if (!v) fail(label, "landmark", `missing <${k}>`);
      }

      // --- Skip link is first in tab order and becomes visible ---
      await page.keyboard.press("Tab");
      const first = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { text: (el.textContent ?? "").trim(), visible: r.width > 0 && r.height > 0 };
      });
      if (!first || !/pular para o conte/i.test(first.text)) {
        fail(label, "skip-link", `first tab stop is "${first?.text ?? "none"}"`);
      } else if (!first.visible) {
        fail(label, "skip-link", "not visible when focused");
      }

      // --- Focus indicator is present on interactive elements ---
      const noFocusRing = [];
      for (let i = 0; i < 12; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const cs = getComputedStyle(el);
          const hasOutline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
          const hasShadow = cs.boxShadow && cs.boxShadow !== "none";
          return { ok: hasOutline || hasShadow, text: (el.textContent ?? "").trim().slice(0, 30) };
        });
        if (info && !info.ok) noFocusRing.push(info.text);
      }
      for (const b of noFocusRing) fail(label, "focus-visible", `no indicator on "${b}"`);

      // --- Target size, WCAG 2.5.8: 24x24 minimum ---
      const smallTargets = await page.$$eval("a[href], button, input, select, textarea", (els) =>
        els
          .filter((el) => {
            const cs = getComputedStyle(el);
            // Visually hidden until focused (skip link): not an undersized target.
            if (cs.clip === "rect(0px, 0px, 0px, 0px)" || cs.position === "absolute" && cs.width === "1px") return false;
            // WCAG 2.5.8 exception: target constrained by the line-height of
            // surrounding non-target text (a link inside a sentence).
            const parent = el.parentElement;
            if (parent && el.tagName === "A") {
              const own = (el.textContent ?? "").trim();
              const all = (parent.textContent ?? "").trim();
              if (all.length > own.length + 10) return false;
            }
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24);
          })
          .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 24)}"`),
      );
      for (const t of smallTargets) fail(label, "target-size", t);

      // --- Every form control has an accessible name ---
      const unlabelled = await page.$$eval("input:not([type=hidden]), select, textarea", (els) =>
        els
          .filter((el) => {
            const id = el.getAttribute("id");
            const hasLabel = id && document.querySelector(`label[for="${id}"]`);
            return !hasLabel && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby");
          })
          .map((el) => el.getAttribute("name") ?? el.tagName),
      );
      for (const u of unlabelled) fail(label, "form-label", `no label for "${u}"`);
    }

    await ctx.close();
  }
}

// --- Reduced motion: transitions must be neutralised ---
const rmCtx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
const rmPage = await rmCtx.newPage();
await rmPage.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await rmPage.waitForTimeout(300);
const longTransitions = await rmPage.evaluate(() =>
  [...document.querySelectorAll("*")]
    .filter((el) => {
      const d = getComputedStyle(el).transitionDuration;
      return d && d.split(",").some((v) => parseFloat(v) > 0.05);
    })
    .slice(0, 5)
    .map((el) => el.tagName.toLowerCase()),
);
for (const t of longTransitions) fail("/ [reduced-motion]", "reduced-motion", `transition still active on ${t}`);
await rmCtx.close();

await browser.close();

if (failures.length > 0) {
  console.error(`\nA11Y AUDIT: ${failures.length} issue(s)\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`a11y audit: ok (${ROUTES.length} routes, light and dark, contrast + focus + headings + landmarks + targets + labels + reduced motion)`);
