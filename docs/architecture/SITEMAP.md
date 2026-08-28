# PXTO — Sitemap and Route Architecture

**Version:** 1.0
**Status:** Draft — sections marked `PROPOSAL` are not approved
**Sources:** [`../PRD.md`](../PRD.md) · [`../strategy/POSITIONING.md`](../strategy/POSITIONING.md) · [`../narrative/NARRATIVE.md`](../narrative/NARRATIVE.md)
**Companion:** [`PAGE_SPECS.md`](PAGE_SPECS.md) — what each page must accomplish and contain

> This document supersedes the earlier `information-architecture.md`, which has
> been removed. All of its content is carried here and in `PAGE_SPECS.md`.

---

## How to read this document

| Status | Meaning |
| --- | --- |
| `DERIVED` | Fixed by the PRD. **Binding.** |
| `INTERPRETED` | Follows necessarily from decisions already made. No new business fact. |
| `PROPOSAL` | Not settled upstream. **Not approved.** Collected in §11. |

**Scope.** Routes, navigation, link structure, URL rules, indexing and content
models. This document defines **structure**, not interface. No layout, no
components, no visual decisions.

---

## 1. Route table

`DERIVED` — PRD §9, §56; route list confirmed by PXTO.

| # | Route | Page | Type | Template | Depth | Indexable |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `/` | Home | Static | `home` | 0 | Yes |
| 2 | `/solucoes` | Soluções | Static | `solutions-index` | 1 | Yes |
| 3 | `/solucoes/integracoes` | Integrações | Static | `solution-detail` | 2 | Yes |
| 4 | `/solucoes/automacao` | Automação | Static | `solution-detail` | 2 | Yes |
| 5 | `/solucoes/software` | Software | Static | `solution-detail` | 2 | Yes |
| 6 | `/solucoes/sites` | Sites | Static | `solution-detail` | 2 | Yes |
| 7 | `/projetos` | Projetos | Static | `projects-index` | 1 | Yes |
| 8 | `/projetos/[slug]` | Project detail | Dynamic | `project-detail` | 2 | Yes |
| 9 | `/sobre` | Sobre | Static | `about` | 1 | Yes |
| 10 | `/contato` | Contato | Static | `contact` | 1 | Yes |

**Nine routes, four templates reused across them.** Total pages at launch: 10
(the eight static pages plus two project instances).

### 1.1 Project instances at launch

`DERIVED` — PRD §56.

| Slug | Project | Clearance |
| --- | --- | --- |
| `furniture-visualization` | Furniture Visualization (§17) | **Not cleared** (§20) |
| `ai-interior-designer` | AI Interior Designer (§18) | **Not cleared** (§20) |

Neither project has passed the publication checklist. **Routes exist in the
architecture; the pages must not be published until clearance is granted**
(Positioning §12.1).

### 1.2 Non-page routes

`INTERPRETED` — required by PRD §36, §39.

| Route | Purpose | Indexable |
| --- | --- | --- |
| `/sitemap.xml` | Search engine sitemap (§36) | n/a |
| `/robots.txt` | Crawl directives (§36) | n/a |
| Contact submission endpoint | Server-side form handling (§39.8, §44) | **No** |
| `/404` | Not found | **No** |

The contact endpoint path is an implementation detail for `../technical/`. It
must be server-side: credentials are never exposed in the frontend (§39.8, §44).

---

## 2. Hierarchy

`DERIVED` — PRD §9.

```text
/                                    Home
│
├── /solucoes                        Soluções
│   ├── /solucoes/integracoes        Integrações
│   ├── /solucoes/automacao          Automação
│   ├── /solucoes/software           Software
│   └── /solucoes/sites              Sites
│
├── /projetos                        Projetos
│   ├── /projetos/furniture-visualization
│   ├── /projetos/ai-interior-designer
│   └── /projetos/[slug]             ← new projects, no structural change (§42, §56)
│
├── /sobre                           Sobre
│
└── /contato                         Contato
```

### 2.1 Structural properties

`INTERPRETED`

| Property | Value | Why it matters |
| --- | --- | --- |
| Maximum depth | 2 | Every page is ≤2 clicks from Home |
| Top-level sections | 4 | Matches the navbar exactly (§10.1) |
| Dynamic segments | 1 (`[slug]`) | The only route that grows |
| Orphan pages | 0 | Every page has ≥2 inbound internal links (§4) |
| Templates | 4 | Reuse over variety (§32.1) |

### 2.2 The one thing this hierarchy must guarantee

`DERIVED` — §42, §50.6, §56.

> A new project is added at `/projetos/<slug>` **without any structural change**
> to the site.

This is an acceptance criterion (§50.6), not an aspiration. It is satisfied by
`/projetos/[slug]` being a single dynamic template driven by structured data
(§7), never by per-project pages.

---

## 3. Navigation model

### 3.1 Primary navigation

`DERIVED` — PRD §10.1.

| Item | Destination |
| --- | --- |
| Logo PXTO | `/` |
| Soluções | `/solucoes` |
| Projetos | `/projetos` |
| Sobre | `/sobre` |
| Contato | `/contato` |
| **CTA — Fale com a PXTO** | `/contato` (highlighted) |

**Rules:**

- Navigation is simple. **No mega menu initially** (§10.1)
- "Soluções" links to the overview page; it does not expand into the four
  children. Those are reached from `/solucoes` and from the Home Soluções
  section (§14)
- The CTA is visually distinct from the navigation items (§10.1). Its treatment
  is a design-system decision, not defined here
- Five items plus one CTA. Adding items requires reconsidering the whole
  navigation, not appending

### 3.2 Why the four solutions are not in the navbar

`INTERPRETED` — Narrative §2.3.

The PRD's "no mega menu" instruction (§10.1) aligns with a narrative constraint:
**the visitor must not be required to self-diagnose into a service category
before proceeding.** Exposing four solution links in the navbar asks the visitor
to classify their own problem at the moment of least context. The overview page
and the Home Soluções section both frame the four *after* the problem has been
established.

### 3.3 Mobile navigation

`PROPOSAL` — the PRD does not specify mobile navigation behaviour, only that the
site is responsive-first (§34).

The same five items and the CTA. The CTA must remain reachable without opening a
menu — it is the site's single conversion action (§29). Interaction pattern is a
design-system decision.

### 3.4 Footer

`PROPOSAL` — the PRD requires a footer on Home (§11.2) and Contato (§28) but
never defines its content.

Minimum viable structure, derived from what exists rather than invented:

| Group | Contents |
| --- | --- |
| Identity | Logo, one-line company description |
| Soluções | The four solution links |
| Site | Projetos, Sobre, Contato |
| Contact | Direct channels — **undefined** (§11) |
| Legal | Privacy notice — **undefined**, required if LGPD applies (§44) |

**Prohibited in the footer** (Positioning §13.6): social proof of any kind,
client logos, certification badges, counters, or awards. No slot may exist that
only makes sense once filled with proof PXTO does not have.

Social media links: only for accounts that exist and are maintained as PXTO
(§1.1). None is documented. **Do not create placeholder icons.**

---

## 4. Internal link graph

`INTERPRETED` — from PRD §14, §21, §22, §29; Narrative §14.4.

Internal links are structural, not decorative. Two rules govern all of them:

> **R1 — Conversion.** Every page offers a path to `/contato`.
> **R2 — Proof.** Every non-project page offers a path to at least one project.

R2 exists because the portfolio is the load-bearing proof of the position
(Positioning §14.2). A page that never reaches a project asks the visitor to
take capability on faith.

### 4.1 Outbound links by page

| From | To | Nature |
| --- | --- | --- |
| `/` | 4 solution pages | Required — each solution carries a CTA to its page (§14) |
| `/` | `/projetos` + featured projects | Proof (§11.2, §16) |
| `/` | `/contato` | Hero CTA + CTA block (§12, §29) |
| `/solucoes` | 4 solution pages | Primary purpose (§22) |
| `/solucoes` | `/projetos` | Proof — §22 includes a Projetos block |
| `/solucoes` | `/contato` | CTA (§22) |
| `/solucoes/*` | `/contato` | Contextual CTA |
| `/solucoes/*` | Related projects | Proof |
| `/solucoes/*` | Sibling solutions | The diagnosis decides which applies (Narrative §8.4.4) |
| `/projetos` | Project pages | Primary purpose |
| `/projetos` | `/contato` | CTA |
| `/projetos/[slug]` | `/contato` | CTA (§21) |
| `/projetos/[slug]` | Other projects | Continued exploration |
| `/projetos/[slug]` | Related solution page | Connects proof back to offer |
| `/sobre` | `/projetos` | Proof (R2) |
| `/sobre` | `/contato` | CTA |
| `/contato` | — | Terminal. No competing exits |

### 4.2 Inbound coverage

`INTERPRETED` — verifies no orphans.

| Page | Inbound sources |
| --- | --- |
| `/solucoes` | Navbar, footer, Home |
| `/solucoes/integracoes` | `/solucoes`, Home Soluções, sibling pages, footer, related projects |
| `/solucoes/automacao` | idem |
| `/solucoes/software` | idem |
| `/solucoes/sites` | idem |
| `/projetos` | Navbar, footer, Home, `/solucoes`, `/sobre` |
| `/projetos/[slug]` | `/projetos`, Home featured, related solution pages, sibling projects |
| `/sobre` | Navbar, footer |
| `/contato` | Navbar CTA, footer, every page |

Minimum inbound links per page: **2.** No orphans.

### 4.3 Solution ↔ project relationship

`PROPOSAL`

Solution pages should surface projects that demonstrate that capability, and
project pages should link back to the relevant solution. This requires the
`Project` model to carry a relationship to one or more solutions — a field not
present in the PRD's conceptual model (§42). See §7.2.

**Current limitation:** both existing projects are AI-categorised (§17, §18) and
map most naturally to Software. Integrações and Automação currently have **no
project to link to**, which is the portfolio composition problem identified in
Positioning §15.1. Those pages must not display an empty "related projects"
region — the section is omitted when nothing relevant exists (Positioning
§13.6).

---

## 5. URL conventions

`DERIVED` — from §56's own routes; extended `INTERPRETED`.

### 5.1 Rules

1. **Lowercase, hyphen-separated.** `ai-interior-designer`
2. **No accents or special characters.** `/solucoes`, not `/soluções` — the PRD's
   own convention (§56)
3. **Portuguese**, matching the site language (§56)
4. **No trailing slash**, applied consistently
5. **No language prefix.** Single-language site; adding one later is a migration
   (§11)
6. **Nouns, not verbs.** `/contato`, not `/entre-em-contato`
7. **Two segments maximum.** Depth is capped at 2 (§2.1)
8. **Slugs are permanent.** A slug is a public identifier; changing one requires
   a 301 redirect (§5.3)

### 5.2 Project slug rules

`DERIVED` — §43 requires a unique slug per project.

- Unique across all projects, permanently
- Derived from the project name, not from the client name — client identity may
  be restricted (§20)
- No client name in a slug unless disclosure is explicitly cleared (§17.1, §20)
- Descriptive of the project, not of the technology — a slug is public
  positioning (Narrative §9.3)

### 5.3 Changing a route

Any published URL that changes requires a **301 redirect** from the old path.
This applies to project slugs, which are the most likely to change if a
disclosure restriction is added or lifted.

### 5.4 Reserved and out-of-scope paths

`INTERPRETED`

Not in scope, and **not to be created speculatively**: `/blog`, `/carreiras`,
`/servicos` (superseded by `/solucoes`), `/clientes`, `/depoimentos`,
`/parceiros`, `/precos`. The last four would require proof PXTO does not have
(Positioning §13).

`/privacidade` may become necessary if LGPD applies (§44). Undecided — see §11.

---

## 6. Indexing and discovery

`DERIVED` — PRD §36.

### 6.1 Per-route indexing

| Route | Index | Sitemap | Canonical |
| --- | --- | --- | --- |
| `/` | Yes | Yes | Self |
| `/solucoes` | Yes | Yes | Self |
| `/solucoes/*` (4) | Yes | Yes | Self |
| `/projetos` | Yes | Yes | Self |
| `/projetos/[slug]` | Yes, **per cleared project only** | Yes, per published project | Self |
| `/sobre` | Yes | Yes | Self |
| `/contato` | Yes | Yes | Self |
| Form endpoint | **No** | No | — |
| `/404` | **No** | No | — |

Every page carries: title, meta description, canonical, Open Graph, Twitter/X
metadata, semantic headings and a friendly URL (§36).

### 6.2 Sitemap generation

`INTERPRETED`

`/sitemap.xml` must be generated from the route definitions and the project
data, not maintained by hand — otherwise adding a project requires a manual
step, violating §42's requirement that new projects need no structural change.

**A project without disclosure clearance must not appear in the sitemap.**

### 6.3 Structured data

`PROPOSAL` — §36 requires structured data "quando aplicável".

| Route | Type | Note |
| --- | --- | --- |
| All | `Organization` | Name, URL, logo. **No founding date, no employee count, no aggregate rating** — none is evidenceable (§53) |
| `/` | `WebSite` | — |
| `/solucoes/*` | `Service` | Only if it can be described without invented attributes |
| `/projetos/[slug]` | `CreativeWork` | Client not named unless cleared (§20) |
| `/contato` | `ContactPage` | Requires real contact channels (§11) |

**Prohibited structured data:** `aggregateRating`, `review`, `award`,
`numberOfEmployees`, `foundingDate` unless supplied. Structured data is a factual
claim to search engines and is bound by §53 exactly as visible copy is.

---

## 7. Content model

`DERIVED` — PRD §42, §43.

### 7.1 The Project model

```typescript
Project {
  slug          // unique, permanent, kebab-case → /projetos/<slug>
  title
  category
  summary
  context
  challenge
  solution
  process
  technologies  // only confirmed technologies (§53)
  results       // only if disclosure clearance permits (§20)
  coverImage
  gallery
  featured      // surfaces on Home
}
```

Required for every project: unique slug, title, summary, category, cover image,
description, consistent structure, respect for disclosure rules (§43).

**Projects are data.** They are never hardcoded into UI components where a data
structure exists (§43). This is what makes §50.6 achievable.

### 7.2 Fields the model does not yet have

`PROPOSAL` — each is needed by the architecture but absent from §42.

| Field | Needed for | Note |
| --- | --- | --- |
| `solutions[]` | Solution ↔ project linking (§4.3) | Which capabilities the project demonstrates |
| `published` | Withholding uncleared projects (§20) | Neither current project is cleared |
| `order` / `featuredOrder` | Deterministic ordering | Otherwise ordering is implicit |
| `seo.title`, `seo.description` | Per-project metadata (§36) | Otherwise derived from title/summary |
| `video` | §19 and §17 both request demonstration media | Model has `gallery` only |
| `disclosure` | Recording what may be shown | §19 lists *Informações divulgáveis* and *Restrições de divulgação*; whether these live in runtime data or only in `../projects/` is undecided |

**Recommendation:** keep disclosure *reasoning* in `../projects/<slug>.md` and
carry only a boolean `published` plus already-cleared content into runtime data.
Runtime data should contain nothing that is not publishable.

### 7.3 Solution content

`PROPOSAL` — the PRD does not define a data model for solutions.

The four solutions are fixed and finite (§4, §14). They may be structured data
or static page content. **Recommendation:** structure the repeated elements —
name, slug, positioning line, short description, icon reference, scope list —
because they appear on Home (§14), on `/solucoes` (§22) and in the footer.
Duplicating them across three surfaces invites drift.

### 7.4 Content source strategy

`DERIVED` — §42.

Initial implementation may use local structured content. The architecture must
permit later migration to a CMS **without rebuilding the interface**. Practical
consequence: components consume a typed content interface, never file paths or
CMS-specific shapes.

---

## 8. Scaling behaviour

`INTERPRETED` — §42, §50.6, §50.15.

| Change | Structural impact |
| --- | --- |
| Add a project | **None.** New data entry → new route, index card, sitemap entry |
| Remove a project | **None.** Requires a 301 if it was published (§5.3) |
| Clear a restricted project | **None.** Flip `published`, add cleared content |
| Add a fifth solution | **Structural.** Navigation, Home section, `/solucoes` and the footer all assume four. A positioning decision first (§4) |
| Add a blog or content section | **Structural.** Out of scope (§5.4) |
| Add a second language | **Structural.** Route prefixes, content model, metadata. Unresolved (§11) |

Only the first three are routine. The rest are decisions, not additions —
which is exactly the boundary §50.15 asks the architecture to hold.

---

## 9. Analytics instrumentation points

`DERIVED` — PRD §38.

Funnel: Page View → CTA Click → Project View → Contact Form Start → Contact Form
Submit → Lead.

| Event | Fires on |
| --- | --- |
| `cta_click` | Any primary or secondary CTA, on every route |
| `service_view` | `/solucoes/*` |
| `project_view` | `/projetos/[slug]` |
| `contact_form_start` | First interaction with a form field on `/contato` |
| `contact_form_submit` | Successful submission |

Per-page conversion roles are specified in `PAGE_SPECS.md`. The analytics
provider is undefined (§38) — see `../technical/`.

---

## 10. Architectural constraints

`DERIVED` — carried from upstream, listed here because they bind route and
structure decisions.

1. **Four capabilities as peers.** No solution gets structural prominence — not
   in navigation, ordering, or link weight (§4)
2. **No layout slot that requires social proof.** No logo strips, testimonial
   regions, counters or badge rows anywhere in the structure (Positioning §13.6)
3. **The problem precedes the offer** on every page that has both (Narrative
   §3.4)
4. **No AI vocabulary** in routes, navigation, or page-level metadata (Narrative
   §4.5)
5. **The company speaks, never a person** — no `/eu`, no personal profile route
   (§1.1, §27)
6. **Uncleared projects are not published** — no route, no sitemap entry, no
   index card (§20)
7. **Two clicks maximum** from Home to any page

---

## 11. Open decisions

An AI agent must not resolve these (§52).

1. **Footer content (§3.4)** — structure proposed; direct channels and legal
   links undefined
2. **Direct contact channels** — e-mail, phone, WhatsApp. Undefined in the PRD,
   needed by `/contato` and the footer
3. **Privacy notice / `/privacidade`** — required if LGPD applies (§44)
4. **Project ↔ solution relationship (§4.3, §7.2)** — needs a model field and a
   decision on how relationships are curated
5. **Whether disclosure metadata lives in runtime data (§7.2)** — recommendation
   given
6. **Solution content structuring (§7.3)** — recommendation given
7. **Structured data scope (§6.3)** — which types are used
8. **Language scope** — Portuguese-only or bilingual. Carried from Brand
   Foundation §15.9; affects every route
9. **Disclosure clearance for both projects (§1.1)** — blocks publishing
   `/projetos/[slug]` entirely
