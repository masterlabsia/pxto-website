# PXTO — Page Specifications

**Version:** 1.0
**Status:** Draft — sections marked `PROPOSAL` are not approved
**Sources:** [`../PRD.md`](../PRD.md) · [`../strategy/POSITIONING.md`](../strategy/POSITIONING.md) · [`../narrative/NARRATIVE.md`](../narrative/NARRATIVE.md)
**Companion:** [`SITEMAP.md`](SITEMAP.md) — routes, navigation, link graph, content models

---

## How to read this document

| Status | Meaning |
| --- | --- |
| `DERIVED` | Fixed by the PRD. **Binding.** |
| `INTERPRETED` | Follows from decisions already made upstream. No new business fact. |
| `PROPOSAL` | Not settled upstream. **Not approved.** Collected in §11. |

### What this document is and is not

**Is:** what each page must accomplish, who it is for, what it must contain, in
what order, and what job each section performs.

**Is not:** interface design, layout, components, colour, typography, motion, or
final copy. Those belong to `../design-system/` and `../content/`.

**On messages.** "Primary message" and "secondary messages" state *what the
reader must understand* — not the words used to say it. Where the PRD fixes a
formulation (§6, §12, §13, §14, §16, §23–§26, §29) it is quoted and marked
`DERIVED — fixed copy`. Everything else is a message, not a headline.

**On sections.** Section names are structural identifiers, not headings.

### Spec format

Every page below defines the same thirteen fields: objective · target visitor ·
user intent · primary message · secondary messages · sections in order · purpose
of each section · required content · primary CTA · secondary CTA · internal
links · SEO intent · conversion role. Constraints and open items follow.

### Site-wide constants

`DERIVED` — apply to every page unless a page overrides them.

| | |
| --- | --- |
| Navbar | Logo · Soluções · Projetos · Sobre · Contato · CTA *Fale com a PXTO* (§10.1) |
| Footer | Present on every page (§11.2, §28); content proposed in `SITEMAP.md` §3.4 |
| Primary CTA label | *Fale com a PXTO* (§29) |
| Contextual CTA alternatives | *Vamos conversar* · *Conte seu projeto* · *Quero conversar sobre meu projeto* · *Começar uma conversa* (§29) |
| Prohibited CTAs | "Saiba mais" as primary · "Clique aqui" · "Solicite agora" (§29) |
| Metadata | title, meta description, canonical, Open Graph, Twitter/X (§36) |
| Title pattern | `PROPOSAL` — `[Page] — PXTO`; homepage differs (§1) |
| Analytics | `cta_click` on every CTA (§38) |
| Accessibility | Semantic headings, one `h1` per page, keyboard navigation, visible focus, labels, alt text, reduced-motion support (§35) |
| Prohibited everywhere | Client logos, testimonials, counters, badges, metrics, invented proof (§53; Positioning §13) |

---

## 1. `/` — Home

**Template:** `home` · **Status:** structure `DERIVED` (§11.2)

### Objective
`DERIVED` — §11.1. Present, in one page: what PXTO is, the problem it solves,
its capabilities, examples of work, why PXTO is worth considering, and how to
make contact.

### Target visitor
A business owner, partner, director or operations/commercial/administrative
manager (§8.1) arriving with no prior knowledge of PXTO — from a referral,
search, or a link. Non-technical but technically literate. Time-poor.

### User intent
"What is this company, and could it help with my situation?" The visitor is
scanning, not reading. They are deciding within seconds whether to continue
(§12).

### Primary message
The visitor's systems do not talk to each other, and that is solvable
(Narrative §15.3).

### Secondary messages
`INTERPRETED` — from Narrative §13.

1. PXTO connects systems, automates processes and builds solutions (§6)
2. The problem is structural, not the visitor's fault (§13)
3. Four capabilities, one diagnosis — the visitor does not choose the category
4. PXTO starts from the problem, not the technology (§15)
5. PXTO builds real, working things (§16)

### Sections in order

`DERIVED` — §11.2.

| # | Section | Purpose | Required content |
| --- | --- | --- | --- |
| 1 | **Navbar** | Orientation and permanent access to the CTA | Site-wide constant |
| 2 | **Hero** | Answer "what does PXTO do" in seconds (§12) | Headline *Conectamos sistemas. Automatizamos processos. Construímos soluções.* · subheadline *Tecnologia aplicada aos desafios reais das empresas.* · two CTAs (§12) — `DERIVED — fixed copy` |
| 3 | **Problema** | Recognition → naming → reframe (Narrative §3.2). **The page's single point of failure** (Narrative §7.4) | The framing *Sua empresa já tem tecnologia. O problema é quando ela não conversa.* plus recognisable situations: disconnected systems, manual processes, duplicated data, scattered information, repetitive tasks, tools that do not fit (§13) |
| 4 | **Posicionamento** | Name the space PXTO works in; convert recognition into "there is a company for this" | A statement of where PXTO operates. Content depends on the territory decision (Positioning §14) |
| 5 | **Soluções** | Present four instruments of one capability (Narrative §4.3) | Title *Tecnologia para resolver problemas reais.* · the four solutions with their PRD descriptions · **a CTA per solution to its own page** (§14) — `DERIVED — fixed copy` |
| 6 | **Como trabalhamos** | Method as evidence; relieve "I can't write a brief" (Narrative §4.2) | Five steps with descriptions: Entendemos · Desenhamos · Construímos · Integramos · Evoluímos (§15) |
| 7 | **Projetos** | Prove capability through real work (§16) | Featured projects with cover image, title, category, summary · link to `/projetos` |
| 8 | **Diferenciais** | Answer "why PXTO" without claiming scale | **Content undefined** (§11.2 lists the block; nothing defines it). Narrative role proposed in Narrative §7.3 |
| 9 | **CTA** | Convert intent into a low-friction first step | Invitation to describe a problem · primary CTA (§29) |
| 10 | **Footer** | Secondary navigation and identity | Site-wide constant |

### Required content
Logo · hero copy (fixed, §12) · problem situations (§13) · four solution
descriptions (§14) · five process steps (§15) · at least one cleared project
with cover image · Diferenciais content (**undefined**) · CTA block copy.

**Blocked:** the Projetos section requires at least one project with disclosure
clearance (§20). Neither currently has it.

### Primary CTA
*Fale com a PXTO* → `/contato`. Appears in hero, in the CTA block, and in the
navbar.

### Secondary CTA
*Ver projetos* → `/projetos` (§12). Plus one CTA per solution → its solution page
(§14).

### Internal links
**Out:** 4 solution pages (§14) · `/projetos` · featured project pages ·
`/contato` · footer links.
**In:** logo from every page · direct traffic.

### SEO intent
The site's primary entry point. Should be findable for the company name and for
problem-shaped queries about disconnected systems, manual processes and bespoke
software. Title carries the company name and its core capability; meta
description states the problem PXTO solves in business terms, not technology
terms. `Organization` + `WebSite` structured data (`SITEMAP.md` §6.3). Canonical
self. Only `h1` on the site's most important page — the hero headline.

### Conversion role
**Top of funnel and primary router.** Fires Page View; carries the most
`cta_click` volume; routes to `service_view` (solution pages), `project_view`
(projects) and `/contato`. Success is measured by onward engagement, not by
direct submission.

### Constraints
- The Problema section decides the page. If recognition fails, everything below
  it reads as generic vendor material (Narrative §7.4)
- Solutions appear in a fixed order with equal weight. No visual or ordinal
  primacy (§4)
- Diferenciais must not become a stats bar, badge row or logo strip (Narrative
  §7.3; Positioning §13.6)
- No AI vocabulary anywhere on this page (Narrative §4.5)

### Open items
Diferenciais content · Posicionamento section content, pending the territory
decision · which projects are `featured`.

---

## 2. `/solucoes` — Soluções

**Template:** `solutions-index` · **Status:** structure `DERIVED` (§22)

### Objective
`DERIVED` — §22. Present PXTO's commercial portfolio: the four capabilities as
one coherent offer.

### Target visitor
A visitor who has understood the problem framing and wants to know what PXTO
actually offers — or who arrived directly via the navbar seeking a service
overview.

### User intent
"What can PXTO do, and which of these applies to me?"

### Primary message
Four instruments, one diagnosis (Narrative §15.3).

### Secondary messages
1. The four capabilities answer the same underlying condition (Narrative §4.3)
2. The visitor does not need to choose the category — the diagnosis decides
   (Narrative §2.3)
3. Each capability has real depth behind it
4. PXTO's method is the same regardless of which applies (§15)

### Sections in order

`DERIVED` — §22.

| # | Section | Purpose | Required content |
| --- | --- | --- | --- |
| 1 | **Hero** | Frame the page as one offer, not a menu | Page-level positioning statement |
| 2 | **Visão geral** | Establish the shared logic before the four appear — prevents the page reading as a service list (Narrative §8.1) | The connecting idea: the same diagnosis leads to different builds |
| 3 | **Integrações** | Present the capability and route onward | Positioning line *Faça seus sistemas conversarem.* · description · scope · link to page (§23) |
| 4 | **Automação** | idem | *Automatize o trabalho que não deveria precisar ser manual.* · description · scope · link (§24) |
| 5 | **Software** | idem | *Quando uma solução pronta não basta, construímos a sua.* · description · scope · link (§25) |
| 6 | **Sites** | idem | *Presença digital construída para funcionar.* · description · scope · link (§26) |
| 7 | **Como trabalhamos** | Show the method is common to all four | The five steps (§15) |
| 8 | **Projetos** | Proof (§22) | Project cards · link to `/projetos` |
| 9 | **CTA** | Conversion | Primary CTA |

Positioning lines are `DERIVED — fixed copy` (§23–§26).

### Required content
Page hero copy · overview copy · four capability blocks · five process steps ·
project cards · CTA copy.

### Primary CTA
*Fale com a PXTO* → `/contato`.

### Secondary CTA
Per capability, a link to its own page (§22).

### Internal links
**Out:** 4 solution pages · `/projetos` · `/contato`.
**In:** navbar · footer · Home.

### SEO intent
The hub page for PXTO's offer. Should be findable for queries about the
combination of integration, automation and bespoke software from one supplier.
Meta description frames the four as one capability, not as a service list.
Passes authority to the four child pages — the primary reason this page exists
structurally as well as narratively.

### Conversion role
**Mid-funnel router.** Distributes to `service_view` pages; secondary
conversion point for visitors already convinced.

### Constraints
- No capability may receive more space, higher position weight or richer
  treatment than the others (§4)
- The overview must precede the four, or the page becomes a menu (Narrative
  §8.1)
- No tool or vendor names as identity (§23)

### Open items
Whether solution content is structured data shared with Home and the footer
(`SITEMAP.md` §7.3).

---

## 3. Solution detail pages — shared template

**Template:** `solution-detail` · **Status:** `PROPOSAL` — §23–§26 define
positioning and scope but no section structure.

### Shared section structure

`PROPOSAL`

| # | Section | Purpose |
| --- | --- | --- |
| 1 | **Hero** | State the capability's positioning line and what it resolves |
| 2 | **Problema** | Open with the visitor's situation, not the offer (Narrative §3.4) |
| 3 | **O que fazemos** | Concrete scope of the capability |
| 4 | **Abordagem** | How PXTO approaches this specific kind of work (§15, adapted) |
| 5 | **Exemplos de aplicação** | Recognisable situations where it applies — situations, **not** claimed client work |
| 6 | **Projetos relacionados** | Proof. **Conditional** — omitted entirely when no cleared project applies (`SITEMAP.md` §4.3) |
| 7 | **Outras soluções** | The diagnosis may point elsewhere (Narrative §8.4.4) |
| 8 | **CTA** | Conversion |

### Shared rules
- Section 2 always precedes section 3 (Narrative §3.4)
- Section 5 describes *situations*, never implied past engagements (§53)
- Section 6 is omitted, not emptied, when there is no cleared project
- Section 7 links to all three siblings with equal weight (§4)
- Technology is named only where it clarifies the solution (§25)

### Shared conversion role
**Mid-funnel qualification.** Fires `service_view`. Highest-intent non-contact
pages on the site: a visitor here has self-identified a problem type.

---

### 3.1 `/solucoes/integracoes` — Integrações

**Objective** — Show that the gap between the visitor's systems can be closed,
without tying the message to specific products (§23).

**Target visitor** — Someone whose team reconciles data between systems by hand;
often an operations or administrative manager.

**User intent** — "Can these two systems be made to talk?"

**Primary message** — The gap between your systems can be closed.

**Secondary messages** — (1) The problem is the space between tools, not the
tools; (2) integration is not limited to specific platforms (§23); (3) manual
re-entry stops; (4) PXTO diagnoses before proposing.

**Sections** — shared template (§3). Section 3 scope: CRM, ERP, marketing
platforms, internal tools, APIs, databases, external services (§23). Section 5:
recognisable integration situations.

**Required content** — Positioning line *Faça seus sistemas conversarem.*
(`DERIVED — fixed copy`) · problem framing · scope · approach · application
examples · CTA copy.

**Primary CTA** — Contextual, → `/contato`. **Secondary CTA** — sibling
solutions; related projects if any exist.

**Internal links** — Out: `/contato`, 3 siblings, `/solucoes`, related projects
(none currently). In: `/solucoes`, Home Soluções, siblings, footer.

**SEO intent** — Findable for system-integration and API-connection queries
framed as business problems. Description must not name platforms as
specialisations (§23). `Service` structured data if attributes can be stated
without invention.

**Conversion role** — `service_view`; high-intent mid-funnel.

**Open item** — No cleared project demonstrates integration work. Section 6 is
omitted until one exists (Positioning §12.3).

---

### 3.2 `/solucoes/automacao` — Automação

**Objective** — Show that work currently done by people can be described and
therefore automated (§24).

**Target visitor** — Someone whose process depends on a person remembering to
run it.

**User intent** — "Can this repetitive process run by itself?"

**Primary message** — Work that should not be manual, is not.

**Secondary messages** — (1) If it can be described, it can be automated;
(2) automation is not tied to one platform (§23 principle); (3) people return to
work that needs judgement; (4) AI is applied where it fits, not by default.

**Sections** — shared template (§3). Section 3 scope: process automation,
workflows, data movement, notifications, synchronisation, processing, repetitive
tasks, **agents and AI where applicable** (§24).

**Required content** — Positioning line *Automatize o trabalho que não deveria
precisar ser manual.* (`DERIVED — fixed copy`) · problem framing · scope ·
approach · examples · CTA copy.

**Primary CTA** — Contextual, → `/contato`. **Secondary CTA** — siblings;
related projects if any.

**Internal links** — as §3.1.

**SEO intent** — Findable for process-automation queries in business language.
**Must not read as a low-code platform specialist page** — no platform name as a
credential (Narrative §17.4).

**Conversion role** — `service_view`; high-intent mid-funnel.

**Constraint** — This is the page where AI may legitimately appear (§24), and
the page most at risk of drifting into the low-code-agency voice. AI is
mentioned as *applicable*, never as the page's identity.

**Open item** — No cleared project demonstrates automation work.

---

### 3.3 `/solucoes/software` — Software

**Objective** — Legitimise building when nothing off-the-shelf fits, keeping
focus on the solution rather than the stack (§25).

**Target visitor** — Someone stuck at the last 20% of a product that almost
works.

**User intent** — "Can something be built that actually fits our process?"

**Primary message** — When nothing fits, it can be built.

**Secondary messages** — (1) The process should not be bent to the software;
(2) bespoke does not mean unmaintainable; (3) the focus is the solution, not the
technologies (§25); (4) PXTO has built non-trivial products.

**Sections** — shared template (§3). Section 3 scope: web apps, internal
systems, portals, dashboards, operational tools, platforms, intelligent
assistants, digital products (§25).

**Required content** — Positioning line *Quando uma solução pronta não basta,
construímos a sua.* (`DERIVED — fixed copy`) · problem framing · scope ·
approach · examples · CTA copy.

**Primary CTA** — Contextual, → `/contato`. **Secondary CTA** — siblings;
related projects.

**Internal links** — Out: `/contato`, 3 siblings, `/solucoes`, both existing
projects once cleared. In: `/solucoes`, Home, siblings, footer, project pages.

**SEO intent** — Findable for bespoke/custom software queries framed as fit
problems. Description emphasises the fit problem, not technology lists.

**Conversion role** — `service_view`; highest-value mid-funnel page, since both
current projects map here.

**Constraint** — The page most exposed to the generic-software-house voice
(Narrative §17.1). It must open with the fit problem, never with a delivery
list.

---

### 3.4 `/solucoes/sites` — Sites

**Objective** — Reframe a website as an operational surface that must function —
explicitly not a creative agency offer (§26).

**Target visitor** — A company needing to establish or strengthen a digital
presence that works.

**User intent** — "Can they build us a site that performs and integrates?"

**Primary message** — A digital presence that works, not just looks right.

**Secondary messages** — (1) A site is infrastructure, not decoration;
(2) performance, SEO and accessibility are requirements, not extras (§26);
(3) it integrates with the company's tools (§26); (4) **the site you are reading
is the evidence** (Positioning §12.1).

**Sections** — shared template (§3). Section 3 scope: institutional sites,
landing pages, commercial pages, digital experiences, responsiveness,
performance, SEO, tool integration (§26).

**Required content** — Positioning line *Presença digital construída para
funcionar.* (`DERIVED — fixed copy`) · problem framing · scope · approach ·
examples · CTA copy.

**Primary CTA** — Contextual, → `/contato`. **Secondary CTA** — siblings.

**Internal links** — as §3.1.

**SEO intent** — Findable for professional website queries **without competing
on template or lowest-price terms** (Positioning §2.4). Description leads with
function.

**Conversion role** — `service_view`. Lowest-qualification traffic of the four;
the page must filter as much as it sells.

**Constraints**
- Must not read as a creative agency page (§26; Narrative §17.2)
- Visual craft is a requirement, never the subject (Narrative §8.3)
- Highest commoditisation risk of the four (Positioning §15.5) — the operational
  framing is what protects the brand

---

## 4. `/projetos` — Projetos

**Template:** `projects-index` · **Status:** partially `DERIVED` (§16 fixes title
and subtitle; structure `PROPOSAL`)

### Objective
`DERIVED` — §16. Demonstrate capability, reasoning, execution, technology and
the variety of problems solved. **Explicitly not** to demonstrate client volume.

### Target visitor
A visitor who accepts PXTO's claims in principle and now wants evidence. Also
the visitor who came directly for proof before reading anything else.

### User intent
"Have they actually built things, and are they anything like what I need?"

### Primary message
Real problems, actually solved (Narrative §15.3).

### Secondary messages
1. Each project began as a problem, not a technology choice (Narrative §9.3)
2. PXTO turns concepts into working products (§17, §18)
3. The range of problems matters more than the count (§16)
4. Discretion is a professional standard, where a project is anonymised (§20)

### Sections in order

`PROPOSAL`

| # | Section | Purpose | Required content |
| --- | --- | --- | --- |
| 1 | **Hero** | Frame what the section proves | Title *O que construímos.* · subtitle *Soluções desenvolvidas para transformar ideias e problemas em produtos digitais funcionais.* (§16) — `DERIVED — fixed copy` |
| 2 | **Lista de projetos** | Present cleared projects | One card per project: cover image, title, category, summary, link (§43) |
| 3 | **CTA** | Conversion | Primary CTA |

### Required content
Fixed hero copy · at least one cleared project · cover image and summary per
project · CTA copy.

**Blocked entirely** until at least one project passes the §20 checklist.

### Primary CTA
*Fale com a PXTO* → `/contato`.

### Secondary CTA
Individual project pages.

### Internal links
**Out:** project pages · `/contato`. **In:** navbar · footer · Home · `/solucoes`
· `/sobre` · project pages.

### SEO intent
The portfolio hub. Should be findable for the project names and for the company
name plus "projetos". Passes authority to project pages. Meta description
describes the kind of problems solved, never a quantity.

### Conversion role
**Proof stage.** The highest-trust moment in the funnel — a visitor who reads a
project and then converts is the site's strongest lead path. Fires `project_view`
on the detail pages it routes to.

### Constraints
- **Never imply that more projects exist and are hidden** (Narrative §9.6)
- **Never pad with placeholders**, "coming soon" cards, or a grid built for
  twenty entries showing two (Narrative §9.6; Positioning §13.6)
- No client logos, no client names without clearance (§17.1, §20)
- Few cases told deeply reads as selectivity; a sparse grid reads as emptiness —
  a layout consequence flagged for `../design-system/`

### Open items
Ordering rule · whether categories are filterable (unnecessary at two projects) ·
how many projects justify a filter.

---

## 5. `/projetos/[slug]` — Project detail

**Template:** `project-detail` · **Status:** structure `DERIVED` (§21)

### Objective
`DERIVED` — §21. Tell one project as a story about a problem, demonstrating
reasoning and execution, within the limits of what may be disclosed.

### Target visitor
An evaluating visitor comparing PXTO's demonstrated work against their own
situation.

### User intent
"What exactly did they do, how did they think about it, and does it resemble my
problem?"

### Primary message
`INTERPRETED` — per project: **the problem this solved**, never the technology
used (Narrative §9.3).

### Secondary messages
1. PXTO understood a real problem before building
2. The approach was chosen for the problem
3. It works — here is the evidence
4. Capability shown here transfers to other problems

### Sections in order

`DERIVED` — §21.

| # | Section | Purpose | Required content |
| --- | --- | --- | --- |
| 1 | **Hero** | Identify the project and what it solved | Title, category, summary, cover image (§43) |
| 2 | **Contexto** | The situation before | Context — anonymised if required (§20) |
| 3 | **Problema** | What did not work | Problem statement |
| 4 | **Desafio** | What made it non-trivial | The constraint |
| 5 | **Solução** | The approach chosen and why | Solution description |
| 6 | **Como funciona** | How it actually works | Mechanism, at a level the disclosure permits |
| 7 | **Tecnologia / capacidades** | What was used | **Confirmed technologies only** (§53); capability categories where restricted |
| 8 | **Resultado** | What changed | Qualitative outcome. **Only cleared results** (§20); never invented metrics |
| 9 | **Galeria / demonstração** | Evidence | Images, video where available (§17, §19) |
| 10 | **CTA** | Conversion | Contextual CTA |

**Not every block appears in every project.** Content is proportional to
relevance and to available, cleared information (§21). **A block is omitted, not
padded.**

### Required content
Per the `Project` model (`SITEMAP.md` §7.1): slug, title, category, summary,
cover image, description. All other blocks conditional on clearance.

**Blocked:** both existing projects lack clearance (§20).

### Primary CTA
Contextual — *Quero conversar sobre meu projeto* → `/contato` (§29).

### Secondary CTA
Other projects · the related solution page.

### Internal links
**Out:** `/contato` · other projects · related solution page · `/projetos`.
**In:** `/projetos` · Home featured · related solution pages · sibling projects.

### SEO intent
Findable for the project name and for problem-shaped queries resembling the case.
Per-project title and description derived from title and summary.
`CreativeWork` structured data; **client not named unless cleared** (§20). Only
cleared projects are indexed or included in the sitemap (`SITEMAP.md` §6.1).

### Conversion role
**Deepest proof stage.** Fires `project_view`. A visitor completing a project
page is the most qualified non-converted visitor on the site — the contextual CTA
here matters disproportionately.

### Constraints
- **The technology is a supporting character** (Narrative §9.3). A page opening
  with the stack repositions PXTO as a software house or an AI company
- Both current projects are AI-categorised and must be framed by problem solved,
  not technology used (Narrative §9.4)
- Anonymised projects follow Narrative §9.5: name the situation, never the
  client; no placeholder logo, no blurred mark, no hint at identity
- No metric appears without clearance (§20)

---

## 6. `/sobre` — Sobre

**Template:** `about` · **Status:** `PROPOSAL` — §27 defines the objective and
permitted content but no structure.

### Objective
`DERIVED` — §27. Build trust. Present PXTO **as a company**.

### Target visitor
A visitor doing due diligence before making contact — checking whether PXTO is a
real, serious company.

### User intent
"Who are these people, and can I trust them with something that matters?"

### Primary message
How this company thinks (Narrative §15.3).

### Secondary messages
1. PXTO exists because the space between systems is worth taking seriously
   (Narrative §6.2)
2. The problem comes before the technology (§15)
3. PXTO builds only what the problem requires (§32, §52)
4. PXTO says only what it can support (§7, §53)

### Sections in order

`PROPOSAL` — derived from what §27 authorises: why the company exists, how it
thinks, how it works, principles, its view of technology, approach, culture.

| # | Section | Purpose | Required content |
| --- | --- | --- | --- |
| 1 | **Hero** | Establish that a company is speaking | Company-level statement — *"A PXTO é…"* (§27) |
| 2 | **Por que a PXTO existe** | Purpose (Brand Foundation §2) | The belief and the observation behind it |
| 3 | **Como pensamos** | The view of technology in companies (§27) | Technology as means; the problem first (§5, §57) |
| 4 | **Como trabalhamos** | Method as substance (§15) | The five steps, or a narrative form of them |
| 5 | **Princípios** | What PXTO will and will not do | Principles from Brand Foundation §5 |
| 6 | **Projetos** | Proof — link rule R2 (`SITEMAP.md` §4) | Project cards or a link to `/projetos` |
| 7 | **CTA** | Conversion | Primary CTA |

### Required content
Company statement · purpose · view of technology · method · principles · project
link · CTA copy.

**Notably absent, and correctly so:** no history, no founding date, no team, no
client list, no numbers. §27's permitted content list contains none of these,
and none is evidenceable (§53).

### Primary CTA
*Fale com a PXTO* → `/contato`.

### Secondary CTA
*Ver projetos* → `/projetos`.

### Internal links
**Out:** `/projetos` · `/contato`. **In:** navbar · footer.

### SEO intent
Findable for the company name and for brand-verification queries ("PXTO
empresa"). Frequently the second page a referred visitor opens. `Organization`
structured data — **no `foundingDate`, no `numberOfEmployees`, no
`aggregateRating`** (`SITEMAP.md` §6.3).

### Conversion role
**Trust stage.** Low direct conversion; high influence. Visitors reaching this
page are close to contact and are looking for a reason not to proceed. The page's
job is to give them none.

### Constraints
- **"A PXTO é…", never "Eu sou…"** (§27) — structural, absolute
- No first-person singular anywhere (Narrative §17.5)
- No abstraction as filler — "transformamos negócios através da inovação" is the
  failure mode (Narrative §10.4). Specificity about method replaces history
- No stock team photography, which implies a team size (Positioning §13.6)

### Open items — **this page cannot be completed**
Vision (Brand Foundation §15.1) · founder visibility (§15.6) · meaning of the
name (§15.10) · company model (§15.4). Structure can be built; content cannot be
finished until these are decided.

---

## 7. `/contato` — Contato

**Template:** `contact` · **Status:** structure `DERIVED` (§28)

### Objective
`DERIVED` — §28. Reduce the friction of starting a commercial conversation.

### Target visitor
A visitor who has decided PXTO is worth a conversation and is now weighing
exposure: being sold to, wasting time, having to explain something they cannot
articulate (Narrative §11.1).

### User intent
"I want to talk to them without committing to anything."

### Primary message
Describe the problem; that is enough to start (Narrative §11.3, §15.3).

### Secondary messages
1. You do not need a specification (§15; Narrative §13.6)
2. This is a conversation, not a quote request (§29)
3. There is a real company on the other side
4. Your information is handled properly (§44)

### Sections in order

`DERIVED` — §28.

| # | Section | Purpose | Required content |
| --- | --- | --- | --- |
| 1 | **Hero** | Set the register — conversation, not transaction | Page statement |
| 2 | **Mensagem** | Remove the "I don't know what to ask for" barrier (Narrative §2.3) | The controlling message: describe the problem, not the solution |
| 3 | **Formulário** | Capture the lead with minimum friction | Fields below |
| 4 | **Contato direto** | Alternative for visitors who will not use a form | Direct channels — **undefined** (§11) |
| 5 | **Footer** | Site-wide constant | — |

### Form fields

`DERIVED` — §28.

| Field | Notes |
| --- | --- |
| Nome | |
| Empresa | |
| E-mail | |
| Telefone/WhatsApp | |
| O que você precisa? | Options: Integração · Automação · Software · Site · Outro |
| Mensagem | |

**"O que você precisa?" is orientation, not qualification** (Narrative §11.4).
A visitor who cannot classify their problem must still be able to submit —
"Outro" exists for exactly this.

The form must stay simple (§28). Every additional field is friction, and
collecting unnecessary information is prohibited (§44).

### Required states
`DERIVED` — §39. Validation · loading · success · error · invalid-submission
blocking · anti-spam protection · lead recorded at the defined destination ·
no credentials in the frontend.

All states speak in the brand voice (Narrative §11.4.6).

### Required content
Page statement · the controlling message · field labels · validation messages ·
loading, success and error copy · direct contact channels (**undefined**) ·
privacy notice if LGPD applies (**undefined**).

### Primary CTA
The form submission itself. Contextual label from §29 — never "Solicite agora"
(§29).

### Secondary CTA
Direct contact channels.

### Internal links
**Out:** footer only. **Terminal page — no competing exits** (Narrative §14.4).
**In:** every page, navbar CTA, footer.

### SEO intent
Low search priority; high navigational value. Findable for "PXTO contato".
`ContactPage` structured data **only once real channels exist**. Indexed but not
an acquisition target.

### Conversion role
**Bottom of funnel — the conversion page.** Fires `contact_form_start` on first
field interaction and `contact_form_submit` on success (§38). The site's single
measured conversion. Every other page exists to route here.

### Constraints
- No commitment language: no "solicite um orçamento", no "agende uma
  demonstração" (§29; Narrative §11.4)
- No manufactured urgency — there is no scarcity to claim (§7)
- Never expose credentials or send directly from the client (§39.8, §44)
- Collect nothing unnecessary (§44)

### Open items — **this page cannot be completed**
Direct contact channels · lead destination (§39.7) · anti-spam mechanism (§39.6)
· what happens after submission, so the expectation can be stated (Narrative
§11.5) · privacy notice, if LGPD applies (§44).

---

## 8. Cross-page rules

`DERIVED` / `INTERPRETED`

1. **The problem precedes the offer** on every page that contains both
   (Narrative §3.4)
2. **Every page reaches `/contato`** (`SITEMAP.md` §4, R1)
3. **Every non-project page reaches a project** (R2) — omitted where no cleared
   project exists, never faked
4. **One `h1` per page**, correct heading hierarchy (§35)
5. **One primary CTA per view.** Competing equal-weight CTAs reduce action
   (Narrative §14.5)
6. **A CTA follows an argument**, never precedes the reason to act
7. **Four capabilities, equal weight**, on every page that lists them (§4)
8. **No AI vocabulary above solution-page level** (Narrative §4.5)
9. **No layout slot requiring social proof** (Positioning §13.6)
10. **Sections are omitted, not emptied**, when content does not exist

---

## 9. Page dependency status

| Page | Structure | Content | Blocked by |
| --- | --- | --- | --- |
| `/` | `DERIVED` | Partial | Diferenciais content · Posicionamento (territory) · a cleared project |
| `/solucoes` | `DERIVED` | Mostly available | — |
| `/solucoes/integracoes` | `PROPOSAL` | Mostly available | No project to link |
| `/solucoes/automacao` | `PROPOSAL` | Mostly available | No project to link |
| `/solucoes/software` | `PROPOSAL` | Mostly available | Project clearance |
| `/solucoes/sites` | `PROPOSAL` | Mostly available | — |
| `/projetos` | `PROPOSAL` | **Blocked** | Project clearance (§20) |
| `/projetos/[slug]` | `DERIVED` | **Blocked** | Project clearance (§20) |
| `/sobre` | `PROPOSAL` | **Blocked** | Vision · founder visibility · name · company model |
| `/contato` | `DERIVED` | **Blocked** | Contact channels · lead destination · post-submission commitment |

**Three pages are structurally ready and content-blocked. Two more are partially
blocked.** The blockers are business decisions, not design or engineering work.

---

## 10. What this document deliberately does not specify

Out of scope here, owned elsewhere:

| Concern | Owner |
| --- | --- |
| Layout, grid, spacing, hierarchy | `../design-system/` |
| Colour, typography, iconography, motion | `../design-system/` (blocked on `../brand/`) |
| Components and their states | `../design-system/` |
| Responsive behaviour per breakpoint | `../design-system/` |
| Final copy, headlines, microcopy, metadata strings | `../content/` |
| Framework, rendering, deployment, form backend | `../technical/` |
| Per-project content and clearance | `../projects/` |

---

## 11. Open decisions

An AI agent must not resolve these (§52).

1. **Diferenciais content** (§1) — the only Home block with no defined substance
2. **Posicionamento section content** (§1) — depends on the territory decision
   (Positioning §14)
3. **Solution detail page structure** (§3) — proposed; requires approval
4. **Sobre page structure** (§6) — proposed; requires approval
5. **Projetos index structure** (§4) — proposed; requires approval
6. **Project disclosure clearance** (§20) — blocks `/projetos` and
   `/projetos/[slug]` entirely
7. **Direct contact channels and lead destination** (§7) — block `/contato`
8. **Post-submission expectation** (§7) — what PXTO commits to, so it can be
   stated
9. **Privacy notice / LGPD applicability** (§7, §44)
10. **Which projects are `featured`** on Home (§1)
11. **Title tag pattern** (site-wide constants)
