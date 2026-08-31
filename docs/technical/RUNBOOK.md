# Runbook

**Status:** `DERIVED` from incidents. Every trap below cost real time at least
once.

Day to day operation of the repository: how to start, how to verify, and how to
read the failures that lie about their own cause.

This is not a tutorial. It documents the things that are not discoverable from
`package.json`, and the failures whose symptom points at the wrong place.

---

## 1. Starting a session

```bash
git pull                 # first, always. See 1.1
npm install              # only if package.json changed. Also wires the hooks
npm run dev              # port 3000
git log --oneline -3     # where the last session stopped
git status
```

### 1.1. Why `git pull` comes first

The remote has received pushes from outside a working session. On 31/08/2026
`origin/develop` was found already at the local HEAD without anyone in the
session having pushed, and `origin/main` moved independently.

Pulling first costs two seconds. Discovering it after an hour of edits costs a
conflict resolution at the worst possible moment.

### 1.2. `npm install` wires the git hooks

`prepare: husky` runs on install, which is what points `core.hooksPath` at
`.husky/_`. On a fresh clone the hooks do nothing until someone installs. If a
commit with a malformed message succeeds, check this first.

---

## 2. Ports and build directories

| Command | Port | Build directory |
| --- | --- | --- |
| `npm run dev` | 3000 | `.next` |
| `npm run audit:start -- -p 7500` | 7500 | `.next-audit` |
| `npm run check` | none | `.next` |

**The separation exists for one reason.** `next dev` and `next start` share
`.next` by default, so building while a dev server is running rewrites the
directory underneath it. See 3.1.

`npm run check` is the production gate and still builds into `.next`. **Do not
run it with a dev server up.**

---

## 3. Failures that lie about their cause

### 3.1. `__webpack_modules__[moduleId] is not a function`

```
TypeError: __webpack_modules__[moduleId] is not a function
    at Object.__webpack_require__ [as require] (.next/server/webpack-runtime.js)
```

**Reads as:** an application error. A broken import, a bad component.

**Actually is:** a stale build cache. Something ran a build into `.next` while
the dev server was live. The dev server holds module IDs in memory that point
at chunks which no longer exist.

**The code is fine.** `npx tsc --noEmit` will pass while every route returns
500, and that combination is the signature.

```bash
ss -ltnp | grep -E '3000|7500'   # how many servers are actually up
kill <pid>                        # by PID. See 3.2
rm -rf .next
npm run dev
```

To audit without touching the dev server, use `audit:build` and `audit:start`,
which target `.next-audit`.

**Rule of thumb: if routes break right after a build, count the running servers
before reading any application code.**

### 3.2. `pkill -f next` kills the shell

The pattern matches the shell process running the command, so the shell dies
before the server does. The command appears to hang or exits with code 144, and
the server is still listening.

Kill by PID instead:

```bash
ss -ltnp | grep 7500              # read the pid= field
kill <pid>
```

### 3.3. Replacing `public/logo.svg` changes nothing

**Reads as:** nothing at all. No error, no type failure, no lint failure. The
site keeps serving the previous mark.

**Actually is:** the components read `src/lib/logo-paths.ts`, which is
**generated** from the SVG. The file is the source; the module is derived and
committed.

```bash
npm run build:logo
```

The pre-commit hook now catches this by comparing `LOGO_SOURCE_HASH` against a
hash of the file, so a commit that changes the SVG without regenerating is
refused. The trap is only live for someone bypassing the hook.

**Delivery requirement for any replacement SVG:** the drawing must sit inside
its `viewBox` after any group `transform` is applied. Inkscape exports raw
coordinates and repositions with a `translate` on the layer group. Dropping that
transform shifts the drawing and the viewBox clips the right and bottom edges,
while the original file still renders correctly. Full requirements in
`../brand/LOGO_SPEC.md`.

---

## 4. Verifying

```bash
npm run check                        # typecheck, lint, assets, build. Clean tree
npm run audit:build                  # safe with dev running
npm run audit:start -- -p 7500
npm run audit                        # the six suites
```

The six suites are functional, responsive, a11y, content, security and perf.
They run against a served production build, never against `next dev`.

### 4.1. What the gates do not cover

Known and deliberate, so that nobody assumes a green run means more than it
does:

- **Contrast is sampled at one moment.** Any moving background under text would
  pass the gate while failing WCAG 1.4.3 in most frames. This is why
  `DESIGN_SYSTEM.md` §14.2 bans perpetual loops rather than relying on the gate.
- **`audit-content` reads `innerText`.** Text inside SVG `<text>` does not
  appear reliably. Diagram labels are scanned as content data instead, which is
  why diagram geometry is declared as nodes and edges rather than as paths.
- **Document byte weight is not budgeted.** Inline SVG lands in the HTML
  document, not in `imgKb`. One diagram measured 472 bytes gzipped, so six stay
  within noise, but the budget does not exist yet.

---

## 5. Git hooks

| Hook | Runs | Cost |
| --- | --- | --- |
| `pre-commit` | `verify:staged`, `typecheck`, `lint`, `check:assets` | about 3s |
| `commit-msg` | Conventional Commits, em-dash ban, 72 character subject | instant |

`pre-commit` deliberately does not build, because `next build` writes into
`.next` and would break a running dev server. See 2.

`verify:staged` covers the two failures that `tsc` and ESLint let through: an
em-dash in `src/`, and drift between `public/logo.svg` and its generated module.
Both scan staged files only.

**`--no-verify` is a decision, not a shortcut.** If a hook is wrong, fix the
hook.

---

## 6. Generated files

Do not edit these by hand. Each carries a header saying so.

| File | Generated from | Command |
| --- | --- | --- |
| `src/lib/logo-paths.ts` | `public/logo.svg` | `npm run build:logo` |
| `src/app/icon.png`, `apple-icon.png` | `public/favicon.png` | see `LOGO_SPEC.md` |

---

## 7. Symptom index

| Symptom | Section |
| --- | --- |
| Every route returns 500 after a build | 3.1 |
| `tsc` passes but the site is broken | 3.1 |
| A kill command hangs or exits 144 | 3.2 |
| New logo file has no effect | 3.3 |
| Logo clipped on the right or bottom | 3.3 |
| A bad commit message was accepted | 1.2 |
| Dev server dies during an audit | 2 |
