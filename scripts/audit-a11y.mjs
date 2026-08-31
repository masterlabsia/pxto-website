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

// --- Reduced motion -------------------------------------------------------
// Cobre transição E animação. Animação com `animation-timeline: view()` é
// progress-based: a duração é ignorada, o progresso vem da posição de rolagem.
// O bloco !important do globals.css zera duration e NÃO desliga esse mecanismo.
// A defesa correta é não escrever a regra sob reduced-motion, e este gate é o
// que garante isso.
const rmCtx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
const rmPage = await rmCtx.newPage();
await rmPage.goto(BASE + "/", { waitUntil: "domcontentloaded" });
// Rola a página inteira: uma animação por timeline só se manifesta ao rolar.
await rmPage.evaluate(async () => {
  const step = window.innerHeight;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await rmPage.waitForTimeout(300);

const motionLeaks = await rmPage.evaluate(() => {
  const out = { transitions: [], animations: [], timelines: [] };
  for (const el of document.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    const tag = el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : "");
    const d = cs.transitionDuration;
    if (d && d.split(",").some((v) => parseFloat(v) > 0.05)) out.transitions.push(tag);
    if (cs.animationName && cs.animationName !== "none") out.animations.push(`${tag} (${cs.animationName})`);
    const tl = cs.animationTimeline;
    if (tl && tl !== "auto" && tl !== "none") out.timelines.push(`${tag} (${tl})`);
  }
  for (const k of Object.keys(out)) out[k] = [...new Set(out[k])].slice(0, 5);
  return out;
});
for (const t of motionLeaks.transitions) fail("/ [reduced-motion]", "reduced-motion", `transição ativa em ${t}`);
for (const a of motionLeaks.animations) fail("/ [reduced-motion]", "reduced-motion", `animação ativa em ${a}`);
for (const t of motionLeaks.timelines) fail("/ [reduced-motion]", "reduced-motion", `animation-timeline ativa em ${t}`);
await rmCtx.close();

// --- Texto sobre foto: verificação por identidade, não por cálculo ---------
// O cálculo de contraste tem falso positivo dentro de MediaBackdrop: o walker
// encontra o véu (rgba com alpha) e o parser descarta o alpha, medindo contra a
// cor pura do tema. Aqui a checagem é exata: dentro de [data-media-backdrop] a
// cor de texto tem que ser a tinta primária, nunca a secundária.
for (const scheme of ["light", "dark"]) {
  const bdCtx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } });
  const bdPage = await bdCtx.newPage();
  await bdPage.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await bdPage.waitForTimeout(300);
  const offenders = await bdPage.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const ink = root.getPropertyValue("--color-ink").trim();
    const bad = [];
    for (const host of document.querySelectorAll("[data-media-backdrop]")) {
      for (const el of host.querySelectorAll("p, li, dd, span, h1, h2, h3, h4")) {
        if (!(el.textContent ?? "").trim()) continue;
        const probe = document.createElement("span");
        probe.style.color = "var(--color-ink)";
        host.appendChild(probe);
        const expected = getComputedStyle(probe).color;
        host.removeChild(probe);
        const actual = getComputedStyle(el).color;
        if (actual !== expected) {
          bad.push(`${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 30)}" = ${actual}, esperado ${expected}`);
        }
      }
    }
    return { bad: bad.slice(0, 5), ink };
  });
  for (const b of offenders.bad) {
    fail(`/ [${scheme}]`, "texto-sobre-foto", `${b}. Sobre foto usa tinta primária, nunca secundária`);
  }
  await bdCtx.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(`\nA11Y AUDIT: ${failures.length} issue(s)\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`a11y audit: ok (${ROUTES.length} rotas, claro e escuro: contraste, foco, headings, landmarks, alvos, labels, reduced-motion com animação e timeline, texto sobre foto)`);
