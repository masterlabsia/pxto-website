/**
 * Verifies that every published project has its declared image assets on disk.
 *
 * TECHNICAL_ARCHITECTURE.md 9: "the build should not be allowed to ship an
 * invisible gap." A missing cover image otherwise renders as a broken image,
 * which is worse than failing loudly.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { readFileSync, readdirSync } from "node:fs";

const dir = "src/content/projects";
const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts");

const missing = [];
for (const file of files) {
  const src = readFileSync(join(dir, file), "utf8");
  const published = /published:\s*true/.test(src);
  if (!published) continue;
  for (const m of src.matchAll(/src:\s*"(\/[^"]+)"/g)) {
    const asset = m[1];
    if (!existsSync(join("public", asset))) missing.push(`${file}: ${asset}`);
  }
}

if (missing.length > 0) {
  console.error("Missing image assets for published projects:");
  for (const m of missing) console.error("  " + m);
  process.exit(1);
}
const publishedCount = files.filter((f) =>
  /published:\s*true/.test(readFileSync(join(dir, f), "utf8")),
).length;

console.log(`check-assets: ok (${files.length} project files scanned)`);

if (publishedCount === 0) {
  console.warn("");
  console.warn("  LAUNCH BLOCKER: zero projects are published.");
  console.warn("  /projetos renders with no cards, and the navbar links to it.");
  console.warn("  The portfolio is the load-bearing proof of the positioning.");
  console.warn("  Clear at least one project (PROJECT_FRAMEWORK section 20)");
  console.warn("  before connecting the production domain.");
  console.warn("");
}
