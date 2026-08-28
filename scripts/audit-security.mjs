/**
 * Security audit. PRD 44, TECHNICAL_ARCHITECTURE 15.
 *
 * Usage: node scripts/audit-security.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:5000";
const failures = [];
const warnings = [];
const fail = (area, detail) => failures.push(`${area} :: ${detail}`);
const warn = (area, detail) => warnings.push(`${area} :: ${detail}`);

const REQUIRED_HEADERS = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": null,
  "permissions-policy": null,
  "content-security-policy": null,
};

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

// --- Response headers -------------------------------------------------------
const res = await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
const headers = res?.headers() ?? {};
for (const [name, expected] of Object.entries(REQUIRED_HEADERS)) {
  const value = headers[name];
  if (!value) fail("header", `${name} ausente`);
  else if (expected && !value.toLowerCase().includes(expected.toLowerCase())) {
    fail("header", `${name} = "${value}", esperado "${expected}"`);
  }
}
if (headers["x-powered-by"]) fail("header", "x-powered-by exposto");

// --- No secrets in anything the browser downloads ----------------------------
const clientCode = [];
page.on("response", async (r) => {
  if (r.request().resourceType() !== "script") return;
  try { clientCode.push(await r.text()); } catch {}
});
for (const route of ["/", "/contato", "/projetos"]) {
  await page.goto(BASE + route, { waitUntil: "load" });
  await page.waitForTimeout(800);
}
const bundle = clientCode.join("\n");

const SECRET_PATTERNS = [
  [/RESEND_API_KEY\s*[:=]\s*["'][^"']+["']/i, "RESEND_API_KEY com valor"],
  [/CONTACT_TO_EMAIL\s*[:=]\s*["'][^"']+["']/i, "CONTACT_TO_EMAIL com valor"],
  [/re_[A-Za-z0-9]{20,}/, "chave Resend"],
  [/sk_(live|test)_[A-Za-z0-9]{16,}/, "chave secreta genérica"],
  [/AKIA[0-9A-Z]{16}/, "chave AWS"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "chave privada"],
];
for (const [re, label] of SECRET_PATTERNS) {
  if (re.test(bundle)) fail("secret", `${label} no bundle do cliente`);
}

// Confidential client material must never reach the browser either.
for (const term of ["highq", "thomson reuters", "pipedrive", "playnest", "playconnect"]) {
  if (bundle.toLowerCase().includes(term)) fail("secret", `termo confidencial "${term}" no bundle`);
}

// --- The contact form must not post to a third party ------------------------
await page.goto(BASE + "/contato", { waitUntil: "domcontentloaded" });
const formAction = await page.locator("form").first().getAttribute("action");
if (formAction && /^https?:\/\//i.test(formAction)) {
  fail("form", `action aponta para origem externa: ${formAction}`);
}

// --- External links must not leak the opener --------------------------------
const risky = await page.evaluate(() =>
  [...document.querySelectorAll('a[target="_blank"]')]
    .filter((a) => !(a.getAttribute("rel") ?? "").includes("noopener"))
    .map((a) => a.getAttribute("href")),
);
for (const r of risky) fail("link", `target=_blank sem rel=noopener: ${r}`);

// --- Inline scripts need a nonce once a strict CSP is in place ---------------
const inlineScripts = await page.evaluate(() =>
  [...document.querySelectorAll("script:not([src])")].map((s) => ({
    type: s.getAttribute("type"),
    nonce: s.getAttribute("nonce"),
  })),
);
const unnoncedJsonLd = inlineScripts.filter((s) => s.type === "application/ld+json" && !s.nonce);
if (unnoncedJsonLd.length > 0) {
  warn("csp", `${unnoncedJsonLd.length} bloco(s) JSON-LD inline sem nonce. Aceito: a CSP usa 'unsafe-inline' em script-src porque nonce exigiria middleware e renderização dinâmica. Ver next.config.ts`);
}

await browser.close();

// --- Repository hygiene -----------------------------------------------------
if (existsSync(".env")) {
  const gi = existsSync(".gitignore") ? readFileSync(".gitignore", "utf8") : "";
  if (!gi.includes(".env")) fail("repo", ".env existe e não está no .gitignore");
}
if (!existsSync(".env.example")) warn("repo", ".env.example ausente");

// NEXT_PUBLIC_ must never carry a secret-looking name.
if (existsSync(".env.example")) {
  for (const line of readFileSync(".env.example", "utf8").split("\n")) {
    if (/^NEXT_PUBLIC_.*(KEY|SECRET|TOKEN|PASSWORD)/i.test(line) && !/TURNSTILE_SITE_KEY/i.test(line)) {
      fail("env", `variável exposta ao cliente com nome de segredo: ${line.split("=")[0]}`);
    }
  }
}

// Server-only modules must not be imported by client components.
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(full)) out.push(full);
  }
  return out;
}
for (const file of walk("src")) {
  const src = readFileSync(file, "utf8");
  if (!src.startsWith('"use client"')) continue;
  if (/process\.env\.(?!NEXT_PUBLIC_)/.test(src)) {
    fail("env", `client component lê env de servidor: ${file}`);
  }
}

console.log("");
for (const w of warnings) console.log("  aviso: " + w);
if (failures.length > 0) {
  console.error(`\nSECURITY: ${failures.length} problema(s)\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log("\nsecurity audit: ok");
