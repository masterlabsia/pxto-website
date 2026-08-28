# PXTO Website

Institutional website for **PXTO** — the company's primary digital presence.

- **Repository:** `pxto-website`
- **Planned domain:** `pxto.co`
- **Status:** Documentation phase. No application code has been written yet.
- **Source of truth:** [`docs/PRD.md`](docs/PRD.md)

---

## 1. What the PXTO website is

PXTO is a technology company working at the intersection of technology and
operations. Its four capability areas are **Integrações**, **Automação**,
**Software** and **Sites** (PRD §1, §14).

The website is the company's institutional digital presence. It is not a
product, a SaaS application or a blog. It is a public-facing site that presents
PXTO as an **independent corporate brand**, tied to the company (CNPJ) and not
to the individuals behind it (PRD §1.1).

The site as specified consists of (PRD §9, §56):

```text
/                        Home
/solucoes                Soluções
  /integracoes           Integrações
  /automacao             Automação
  /software              Software
  /sites                 Sites
/projetos                Projetos
  /<slug>                Individual project pages
/sobre                   Sobre
/contato                 Contato
```

## 2. Project purpose

The website's business objective is to act as a **commercial opportunity
generation tool** (PRD §3). A visitor must be able to answer, quickly:

> What is PXTO? What does it do? What problems does it solve? Could PXTO build
> something like what I need? How do I get in touch?

Concretely, the site must (PRD §2):

1. State clearly what PXTO is and which problems it solves.
2. Present the four solution areas.
3. Demonstrate technical capability through real, delivered projects.
4. Build credibility **without overstating experience or inventing results**.
5. Make it easy for a potential client to start a conversation.
6. Be fast, responsive, accessible and search-engine optimised.
7. Allow new projects to be added later without rebuilding the site structure.

The communication is oriented to **business problems, operational efficiency and
digital solutions** — not to technology for its own sake (PRD §3, §57).

## 3. Documentation structure

All project documentation lives under `docs/`. Each area has its own `README.md`
describing what belongs there and what does not.

```text
docs/
├── PRD.md            Product Requirements Document — the source of truth
├── README.md         Guide to the documentation areas
├── brand/            Visual and verbal identity: logo, colour, type, tone
├── strategy/         Positioning, value proposition, audience, business goals
├── narrative/        Site-wide storytelling: message architecture, page flow
├── architecture/     Information architecture, routes, data models, technical shape
├── content/          Page-by-page copy, forms, metadata, microcopy
├── projects/         Case-study framework, per-project entries, disclosure rules
├── design-system/    Foundations, tokens, components, states, responsive rules
└── technical/        Stack, environments, Git/CI, SEO, performance, security, QA
```

`docs/README.md` explains the role of each area in detail.

## 4. Development principles

Drawn from the PRD; the section reference is authoritative.

**Product and content**

- The documentation is the source of truth. When code and documentation
  disagree, the documentation wins (PRD §52).
- Never invent clients, numbers, results, testimonials, logos, certifications,
  partners, awards, metrics, or technologies used in a project. Every factual
  claim must originate from information supplied by PXTO (PRD §53).
- Never claim more experience or more clients than PXTO actually has (PRD §7).
- A client's name, logo or association is published only with authorisation
  (PRD §17.1, §20).
- Avoid empty corporate language, buzzwords, superlatives without evidence, and
  unproven promises (PRD §7).

**Design**

- Consistency over variety; clear visual hierarchy; consistent spacing;
  legible typography (PRD §32).
- Responsive-first — responsiveness is designed in, not retrofitted (PRD §34).
- Animation must serve a purpose. Never add effects merely to demonstrate
  technical ability, and never trade performance for aesthetics (PRD §32).
- Do not introduce a second component to solve a visual problem an existing
  component already solves (PRD §31, §32).
- Visual direction: precision, engineering, simplicity, sophistication, trust.
  Not futuristic, cyberpunk, "generic AI startup", creative agency or SaaS
  template (PRD §33).

**Engineering**

- Accessibility target: **WCAG 2.2 AA** where technically applicable (PRD §35).
- SEO is handled during development, not afterwards (PRD §36).
- Minimum necessary JavaScript; optimised images and fonts; no unnecessary
  dependencies (PRD §37).
- Projects are structured data, never hardcoded into UI components (PRD §42,
  §43).
- No secrets in the frontend; inputs validated on the backend; environment
  variables for configuration; LGPD respected where applicable (PRD §44).
- A page or feature is done only when it passes the Definition of Done
  (PRD §49, mirrored in `docs/technical/definition-of-done.md`).

## 5. How this documentation should be used by AI agents

> **The operational rules live in [`CLAUDE.md`](CLAUDE.md) at the repository
> root.** It is the entry point for any AI-assisted work: the eight absolute
> rules, the source-of-truth hierarchy, per-area rules, the Definition of Done,
> and the ambiguity protocol. This section states the principle; `CLAUDE.md`
> states the rules.

PRD §52–§54 govern AI participation in this project. In short: **AI is a
development tool, not a decision-maker on positioning, brand or design
system.**

### Before writing any code

1. Read `docs/PRD.md` for the requirement.
2. Read the relevant `docs/` area (design system, content, architecture,
   projects) for the established decision.
3. Reuse existing components and existing tokens. Follow existing layout
   patterns.
4. Only then write code — responsive, accessible, SEO-correct (PRD §54).

### Ambiguity protocol

- **Technical ambiguity** — choose the simplest option consistent with the
  existing architecture, and proceed (PRD §52).
- **Business, content or positioning ambiguity** — stop and flag it for a human.
  Do not resolve it by writing a plausible answer into the documentation
  (PRD §52).

### Hard limits

An agent must **not**:

- change PXTO's positioning or value proposition;
- invent services, case studies, metrics, testimonials or fictitious clients;
- introduce a new visual pattern where an existing one applies;
- alter the design system unilaterally;
- fill a gap in business information with an assumption presented as fact.

When information is missing, record the gap as an open question in the relevant
`docs/` area and leave it unresolved. An empty section marked `TO BE DEFINED` is
correct; an invented one is a defect.

### Writing back to the documentation

Documentation may be extended with decisions **made by a human** or with
material **derived directly from the PRD**, and should cite the PRD section it
comes from. Anything else is a proposal, not a decision, and must be labelled
as such.

## 6. Current state

| Area | State |
| --- | --- |
| PRD | Complete (v1.0, Draft for development) |
| Documentation structure | Created |
| Brand — verbal foundation | Drafted (`docs/brand/BRAND_FOUNDATION.md`); open decisions listed in its §15 |
| Positioning strategy | Drafted (`docs/strategy/POSITIONING.md`); open decisions listed in its §17 |
| Narrative strategy | Drafted (`docs/narrative/NARRATIVE.md`); open decisions listed in its §18 |
| Information architecture | Drafted (`docs/architecture/SITEMAP.md`, `PAGE_SPECS.md`); open decisions in their §11 |
| Project framework | Drafted (`docs/projects/PROJECT_FRAMEWORK.md`); open decisions listed in its §22 |
| Website copy | First draft (`docs/content/WEBSITE_COPY.md`); placeholders and open items in its Part IV |
| Visual direction | v2.0 under the `design-taste-frontend` skill (`docs/brand/VISUAL_DIRECTION.md`); one recommended, none approved |
| Copy remediation | **Needed**: drafted copy fails the skill's em-dash and middle-dot rules (`VISUAL_DIRECTION.md` Part V.1) |
| Real imagery | **Blocker**: the site needs honest photography; none exists (`VISUAL_DIRECTION.md` Part V.2) |
| Design system | Specified (`docs/design-system/DESIGN_SYSTEM.md`); no component implemented; blocked on brand assets |
| Technical architecture | Specified (`docs/technical/TECHNICAL_ARCHITECTURE.md`); stack evaluated, not accepted wholesale |
| AI operating rules | `CLAUDE.md` at the repository root; read it before touching code |
| Brand — logo, colour, typography | Not defined — awaiting human input |
| Design system | Not defined — awaiting brand |
| Application code | Not started |

Implementation follows the roadmap in PRD §55, beginning with Phase 1
(Foundation). No UI work should begin before brand and design system decisions
exist.
