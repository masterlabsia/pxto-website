/**
 * Content gate. Runs before the build.
 *
 * 1. A published project whose declared image is missing AND not marked
 *    pending fails the build. TECHNICAL_ARCHITECTURE.md 9: "the build should
 *    not be allowed to ship an invisible gap."
 * 2. Pending assets are listed as outstanding deliverables, so a placeholder
 *    slot never quietly becomes permanent.
 * 3. Zero published projects is reported as a launch blocker.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = "src/content/projects";
const files = readdirSync(dir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts",
);

const missing = [];
const pending = [];
let publishedCount = 0;

for (const file of files) {
  const src = readFileSync(join(dir, file), "utf8");
  if (!/published:\s*true/.test(src)) continue;
  publishedCount += 1;

  // Each image literal is a block ending at its closing brace.
  for (const block of src.split(/\bsrc:\s*"/).slice(1)) {
    const path = block.slice(0, block.indexOf('"'));
    const scope = block.slice(0, block.indexOf("}") + 1);
    const isPending = /pending:\s*true/.test(scope);
    if (isPending) pending.push(`${file}: ${path}`);
    else if (!existsSync(join("public", path))) missing.push(`${file}: ${path}`);
  }
}

if (missing.length > 0) {
  console.error("Missing image assets for published projects:");
  for (const m of missing) console.error("  " + m);
  process.exit(1);
}

console.log(
  `check-assets: ok (${files.length} project files, ${publishedCount} published)`,
);

if (pending.length > 0) {
  console.warn("");
  console.warn(`  ${pending.length} image asset(s) pending delivery from PXTO:`);
  for (const p of pending) console.warn("    " + p);
  console.warn("  These render as labelled slots, not as artwork.");
  console.warn("  Real assets are required before the production domain is connected.");
  console.warn("");
}

if (publishedCount === 0) {
  console.warn("");
  console.warn("  LAUNCH BLOCKER: zero projects are published.");
  console.warn("  /projetos renders with no cards, and the navbar links to it.");
  console.warn("  The portfolio is the load-bearing proof of the positioning.");
  console.warn("  Clear at least one project (PROJECT_FRAMEWORK section 20)");
  console.warn("  before connecting the production domain.");
  console.warn("");
}
