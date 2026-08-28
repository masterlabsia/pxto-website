# PXTO Website — Documentation

This directory is the **source of truth** for the PXTO website (PRD §52).
Code implements what is written here. Where code and documentation disagree,
the documentation is correct and the code is a defect.

## The hierarchy

```text
docs/PRD.md                 ← authoritative requirement
    ↓
docs/strategy/              ← why: positioning, audience, business goals
docs/brand/                 ← who: identity, voice, visual direction
    ↓
docs/narrative/             ← what we say, and in what order
docs/architecture/          ← how the site is structured
    ↓
docs/design-system/         ← how it looks and behaves
docs/content/               ← the actual words on each page
docs/projects/              ← the case studies and their rules
    ↓
docs/technical/             ← how it is built, shipped and verified
```

A document lower in the chain may never contradict one above it. If it needs
to, the higher document must be changed first — by a human.

## Areas

### `PRD.md`
The Product Requirements Document (v1.0). Written in Portuguese. Everything
else in `docs/` derives from it. **Do not edit it to resolve an ambiguity** —
raise the ambiguity with a human instead. Amendments to the PRD are a product
decision.

### `brand/`
**Role:** the identity of PXTO as a brand — how it looks and how it sounds.

Belongs here: logo files and usage rules, colour palette, typography choices,
verbal identity and tone of voice, the vocabulary to use and the vocabulary to
avoid, and the visual direction interpretation (PRD §7, §33).

Does not belong here: component specifications or CSS tokens — those are
`design-system/`, which consumes brand decisions and expresses them as tokens.

Source: PRD §7 (communication principles), §33 (visual direction), §55 Phase 2.

**Status:** empty. Brand assets and decisions have not been supplied.

### `strategy/`
**Role:** why the website exists and who it is for.

Belongs here: positioning statement, value proposition, the central message and
its supporting messages, target audience definition and their stated needs,
business objectives, success metrics, and competitive/category framing.

Does not belong here: page copy (`content/`) or narrative sequencing
(`narrative/`).

Source: PRD §2 (site objectives), §3 (business objective), §4 (positioning),
§5 (value proposition), §6 (central message), §8 (audience), §51 (metrics),
§57 (final directive).

### `narrative/`
**Role:** the story the site tells, and the order it tells it in.

Belongs here: the message architecture (which idea each page and section is
responsible for), the argument flow from problem → positioning → solutions →
process → proof → contact, CTA strategy, and the rules for how the four
solutions relate to one another so no single one defines the brand.

Does not belong here: final copy (`content/`) or layout (`design-system/`).

Source: PRD §6, §11 (Home structure), §13 (problem section), §15 (how we work),
§29 (CTA), §57.

### `architecture/`
**Role:** the structural shape of the site and its data.

Belongs here: information architecture and the sitemap, URL/route definitions,
navigation model, page-level block structures, the `Project` data model and
other content models, and the content-source strategy (local structured
content now, CMS-capable later).

Does not belong here: infrastructure, deployment and tooling — those are
`technical/`.

Source: PRD §9 (architecture), §10 (navigation), §11, §21, §22, §42 (CMS/data
model), §56 (final structure).

### `content/`
**Role:** the actual words that appear on the site.

Belongs here: page-by-page copy, headlines and subheadlines, section text,
button and CTA labels, form fields and their labels, validation and state
messages, empty/error/success states, alt-text policy, and SEO metadata
(titles, meta descriptions, Open Graph text) per page.

Does not belong here: strategic rationale (`strategy/`) or project case-study
text (`projects/`).

Rule: every factual claim in this directory must trace to information supplied
by PXTO (PRD §53). Copy suggested by the PRD is a starting point and may be
refined during copywriting (PRD §6) — but only by a human decision.

Source: PRD §12–§16, §22–§28, §29 (CTA), §36 (SEO), §39 (form).

### `projects/`
**Role:** the case-study system — the site's primary proof of capability.

Belongs here: the Project Entry framework, the project page structure, the
publication and confidentiality checklist, and one document per project
containing its approved, publishable content.

Rule: a project is publishable only after the disclosure checklist is cleared.
Where restrictions exist, the project may still be presented anonymised
(PRD §20). Client names and logos require authorisation.

Source: PRD §16 (projects section), §17–§18 (current projects), §19 (Project
Entry), §20 (publication criteria), §21 (project page structure), §43 (project
rules).

**Contains:** `PROJECT_FRAMEWORK.md` — the complete project content framework:
metadata and data model, categories, per-field rules, disclosure ladder,
confidentiality handling, page and card structures, publication checklist, and a
reusable editorial template. The two named projects — Furniture Visualization and
AI Interior Designer — are summarised in the PRD but **not yet cleared for
publication**.

### `design-system/`
**Role:** how the interface looks and behaves, defined once and reused.

Belongs here: foundations (colour, typography and its scale, spacing, grid,
containers, breakpoints, radius, shadow, iconography, motion, states), the
design tokens that encode them, the component catalogue with variants and
states, responsive behaviour per component, and the design rules that govern
when a new component is justified.

Rule: components are reusable. Do not create visually duplicated components
without a documented reason (PRD §31, §32).

Source: PRD §30 (foundations), §31 (components), §32 (design rules), §34
(responsiveness), §35 (accessibility), §55 Phase 3.

**Status:** empty. Blocked on `brand/`.

### `technical/`
**Role:** how the site is built, deployed, measured and verified.

Belongs here: stack decisions and their rationale, folder structure
conventions, environments (development / preview / production), domain and DNS,
Git workflow and PR requirements, CI/CD, SEO implementation, performance
budgets, analytics events, contact-form handling, security and privacy (LGPD),
and QA / Definition of Done.

Does not belong here: the site's information architecture and content models —
those are `architecture/`.

Source: PRD §36–§40, §41 (repository), §44 (security), §45 (domain), §46
(environments), §47 (Git), §48 (CI/CD), §49 (Definition of Done), §50
(acceptance criteria).

**Contains:** `definition-of-done.md`.

## Conventions

- **Language.** The PRD and all user-facing site copy are in Portuguese.
  Explanatory documentation is written in English; any Portuguese copy quoted
  from the PRD is reproduced verbatim and must not be translated.
- **Traceability.** Cite the PRD section for any statement derived from it.
- **Unknowns.** Mark them `TO BE DEFINED` with a note on who must decide. Never
  fill a gap with a plausible invention (PRD §53).
- **Proposals.** Anything not yet approved by a human is labelled
  `PROPOSAL — not approved` and does not bind implementation.
