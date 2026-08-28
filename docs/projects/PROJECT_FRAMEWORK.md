# PXTO — Project Content Framework

**Version:** 1.0
**Status:** Draft — sections marked `PROPOSAL` are not approved
**Sources:** [`../PRD.md`](../PRD.md) · [`../strategy/POSITIONING.md`](../strategy/POSITIONING.md) · [`../narrative/NARRATIVE.md`](../narrative/NARRATIVE.md) · [`../architecture/SITEMAP.md`](../architecture/SITEMAP.md) · [`../architecture/PAGE_SPECS.md`](../architecture/PAGE_SPECS.md)

> This document supersedes `project-entry-template.md`, which has been removed.
> Its content is carried into §20 and the Appendix.

---

## How to read this document

| Status | Meaning |
| --- | --- |
| `DERIVED` | Fixed by the PRD. **Binding.** |
| `INTERPRETED` | Follows from decisions already made upstream. No new business fact. |
| `PROPOSAL` | Not settled upstream. **Not approved.** Collected in §22. |

### What projects are for

`DERIVED` — PRD §16.

> Demonstrate **capability, reasoning, execution, technology and the variety of
> problems solved.**
> **Not** to demonstrate the number of clients.

Because PXTO cannot claim scale, history or results (Positioning §13), the
portfolio is the **load-bearing proof of the entire position** (Positioning
§14.2). This framework exists to make that proof repeatable.

### The two governing principles

**1. A project is data, never a page.**
New projects are added as content records. No route is created, no component is
written, no layout is changed (§42, §43, §50.6). This is an acceptance criterion,
not a preference.

**2. Confidentiality is a property of content, never of category.**
A restricted project is not filed elsewhere, hidden, or labelled. It appears in
the same section, on the same template, in the same card format — with less
detail. See §2.3 and §15.

---

## 1. Project metadata

### 1.1 Two records per project

`INTERPRETED` — from §20, §42; SITEMAP §7.2.

Every project exists as **two separate records**, and the separation is a safety
mechanism:

| Record | Location | Contains | Published |
| --- | --- | --- | --- |
| **Editorial record** | `docs/projects/<slug>.md` | Everything: clearance decisions, restrictions, unpublishable context, open questions | **No** |
| **Runtime record** | Structured content consumed by the site | Cleared, publishable content only | **Yes** |

> ### The governing rule
> **If it is in the runtime record, it is publishable.**
>
> Nothing enters the runtime record before it clears §20. Disclosure reasoning,
> restrictions and client correspondence never leave the editorial record. A
> field cannot leak if it was never copied.

### 1.2 Runtime field specification

`DERIVED` for the fields in §42; `PROPOSAL` for those marked ✚ (identified as
missing in SITEMAP §7.2).

| Field | Type | Required | Public | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | **Yes** | Yes (URL) | Unique, permanent, kebab-case → `/projetos/<slug>` (§43) |
| `title` | string | **Yes** | Yes | §3 |
| `category` | enum | **Yes** | Yes | §2 |
| `summary` | string | **Yes** | Yes | §4 |
| `coverImage` | asset ref | **Yes** | Yes | §12 |
| `context` | rich text | No | Yes | §5 |
| `problem` | rich text | No | Yes | §6 |
| `challenge` | rich text | No | Yes | §7 |
| `solution` | rich text | No | Yes | §8 |
| `process` | rich text | No | Yes | §9 — "Como funciona" |
| `technologies` | string[] | No | Yes | §10. **Confirmed only** (§53) |
| `results` | rich text | No | Yes | §11. **Cleared only** (§20) |
| `gallery` | asset ref[] | No | Yes | §12 |
| `video` ✚ | asset ref | No | Yes | §13 |
| `featured` | boolean | **Yes** | — | §19 |
| `published` ✚ | boolean | **Yes** | — | §1.3 |
| `order` ✚ | number | No | — | Deterministic ordering |
| `solutions` ✚ | enum[] | **Yes** | Yes | Which capabilities this demonstrates (SITEMAP §4.3) |
| `seo` ✚ | object | No | Yes | `title`, `description`; falls back to `title` / `summary` |

**A project requires exactly six fields to exist** (§43): `slug`, `title`,
`category`, `summary`, `coverImage`, and at least one descriptive block. See
§1.4.

### 1.3 The `published` flag

`PROPOSAL` — required by §20's clearance gate.

| Value | Effect |
| --- | --- |
| `false` | No route, no index card, no sitemap entry, no Home appearance, not indexed |
| `true` | Fully published |

Default is `false`. A project becomes `true` only when §20's checklist is
complete and signed.

**Both current projects are `false`** (Positioning §12.1).

### 1.4 Minimum viable project

`DERIVED` — §43.

The least a project may contain and still be published:

- `slug`, `title`, `category`, `summary`, `coverImage`, `solutions`
- At least one of: `context`, `problem`, `challenge`, `solution`
- A completed §20 checklist

A project meeting only this bar is still a legitimate project. **Depth is
proportional to what may be disclosed** (§21) — a short entry is correct, a
padded one is a defect.

### 1.5 Fields deliberately absent

`INTERPRETED`

| Not a field | Why |
| --- | --- |
| `client`, `clientLogo` | Client identity is never carried in runtime data. Where naming is cleared, the name appears inside the cleared text (§14) |
| `testimonial` | Prohibited without evidence (§53) |
| `metrics`, `roi`, `hoursSaved` | Prohibited unless cleared, and then they belong inside `results` (§11) |
| `duration`, `teamSize` | Implies scale and capacity (Positioning §13.2) |
| `status` ("em andamento", "concluído") | Invites a pipeline reading and suggests thin output |
| `confidential` | Confidentiality is not a display state. See §2.3 |

### 1.6 On dates

`PROPOSAL`

A `date` field is factual and permissible **if PXTO supplies it**. But displaying
dates publicly reveals how recently the company began operating — and the
position is that newness is **neither hidden nor advertised** (Positioning
§16.8).

**Recommendation:** record dates in the editorial record for internal ordering;
do not display them on the site. Revisit once there is a longer body of work.

---

## 2. Project categories

### 2.1 What a category is for

`INTERPRETED`

A category helps a visitor understand **what kind of problem this project
solved** at card-scanning speed. It is a reading aid, not a filing system.

### 2.2 Prohibited categories

`DERIVED` — instructed by PXTO; consistent with §16 and Positioning §13.

**The following must never exist**, as categories, sections, tags, badges or
filters:

| Prohibited | Why |
| --- | --- |
| **PXTO Labs** | Frames work as experimentation, undermining the claim that PXTO builds working solutions |
| **Experiments** | Signals the work is not production-grade |
| **Internal Projects** | Splits the portfolio by provenance; implies the "real" work is elsewhere |
| **Confidential Projects** | **Advertises concealment.** Announces that better proof exists but is withheld — worse than saying nothing (Narrative §9.5) |
| **Case Study / Portfolio Piece** | Provenance labels, not problem labels |
| Status labels — "Em andamento", "Coming soon" | Imply a thin portfolio; §19 and Narrative §9.6 forbid placeholders |

**All projects belong to the same Projects section.** A project built for a
client, a project built for PXTO itself, and a project that cannot name its
client are told the same way, in the same place, on the same template. What
varies is **content depth** (§15), never placement.

### 2.3 Why confidentiality is never a category

`DERIVED` — §20; Narrative §9.5.

Filing a project as "confidential" does three things, all harmful:

1. It **draws attention to the restriction** rather than to the work
2. It **fragments the portfolio**, making an already small body of work look
   smaller
3. It reads as **concealment** rather than as professional discretion

§20 explicitly permits an anonymised presentation. The framework's answer is
therefore: tell the story, adjust the detail, keep the placement. Discretion is
a stated professional standard (Brand Foundation §5.5), and a well-told anonymous
case is more persuasive than a poorly told named one (Narrative §9.5).

### 2.4 The category tension — and the recommendation

`PROPOSAL`

The PRD assigns technology-composite categories to both existing projects:

- Furniture Visualization → *AI / Web App / Image Generation* (§17)
- AI Interior Designer → *AI / Computer Vision / Conversational Assistant* (§18)

These conflict with three established decisions:

1. Technology is a supporting character in every case (Narrative §9.3)
2. AI must not become the company's identity (§4; Positioning §15.1)
3. Projects should connect back to the four capabilities (SITEMAP §4.3)

Leading with "AI /" on every card makes the portfolio read as an AI company's
portfolio — the highest-probability narrative failure on the site (Narrative
§17.3).

**Recommendation — two axes, not one:**

| Axis | Field | Public prominence | Values |
| --- | --- | --- | --- |
| **Capability** | `solutions` | Primary — the card label | Integração · Automação · Software · Site |
| **Technical nature** | `technologies` / `category` | Secondary — on the project page | The PRD's composite strings, preserved verbatim |

This keeps the PRD's own descriptors intact, connects proof to offer, makes the
portfolio-composition problem visible (Positioning §15.1), and stops the card
grid from announcing AI four times.

**This changes how a PRD-specified field is displayed. It requires PXTO's
approval** (§22).

### 2.5 Taxonomy rules

Whichever axis is adopted:

1. **Controlled vocabulary.** Categories come from a fixed list; they are never
   invented per project
2. **Finite and small.** A taxonomy that grows with every project is a tag
   system, and tags fragment a small portfolio
3. **Problem- or capability-shaped**, never provenance-, status- or
   confidentiality-shaped (§2.2)
4. **No filtering UI below roughly six projects.** A filter over two projects
   advertises scarcity (Narrative §9.6)

---

## 3. Project title

`DERIVED` — §43 requires a title; rules `INTERPRETED`.

**The title names the project, not the client and not the technology.**

| Rule | Detail |
| --- | --- |
| Names the thing built | "Furniture Visualization" (§17), "AI Interior Designer" (§18) |
| Never contains a client name | Unless naming is cleared (§14), and even then the title is about the work |
| Never a technology label alone | "Integração via API" describes a method, not a project |
| No superlatives or marketing language | §7 |
| Short enough to survive a card | Roughly 2–5 words |
| Stable | Public identifier; a change implies a slug change and a 301 (SITEMAP §5.3) |
| Distinct | No two projects with confusable titles |

**Anonymised projects still get a real title.** "Projeto Confidencial" is not a
title (§2.2). Name the *thing*: "Integração de Pedidos e Estoque".

---

## 4. Summary

`DERIVED` — §43 requires a summary.

**One to two sentences stating what the project is and what problem it solved.**

This is the most reused field on the site: the card (§18), the project hero
(§17), the Home projects section (§19), and the fallback meta description
(SITEMAP §6). Write it once, well.

| Rule | Detail |
| --- | --- |
| Leads with the problem or the outcome | Not with the technology (Narrative §9.3) |
| Comprehensible without the page | It is read in isolation, on a card |
| Concrete | "Permite visualizar como um móvel se encaixa em um ambiente" over "solução inovadora de visualização" |
| No metrics | Unless cleared (§11) |
| No client name | Unless cleared (§14) |
| Roughly 15–35 words | Long enough to be specific, short enough for a card |

**Reference formulations, from the PRD's own summaries** (§17, §18) — these are
the standard to match, not templates to copy.

---

## 5. Context

`INTERPRETED` — §19, §21.

**The situation before the project existed.** Who had the problem, what they were
working with, why the situation arose.

| Rule | Detail |
| --- | --- |
| Sets the stage; does not yet state the problem | That is §6 |
| Anonymisable | "Uma empresa que trabalha com…" carries context without identity (§15) |
| Non-judgemental | Never implies the client made bad decisions (Narrative §3.1) |
| Business-level | The reader is not technical (§8) |
| Omit if it would breach disclosure | Omitted, not padded (§21) |

**Neither existing project has a documented context** (§17, §18 supply summary,
problem, solution and case objective only). It must come from PXTO.

---

## 6. Problem

`INTERPRETED` — §19, §21. **The most important block after the summary.**

**What was not working, in the client's terms.**

| Rule | Detail |
| --- | --- |
| Stated as a business problem | Not as a technical requirement |
| Recognisable to a reader with a different problem | Transfer is the point — a reader should think "mine is like that" |
| Almost always disclosable | A problem can nearly always be described without identifying anyone. **Prefer anonymising the problem over omitting it** |
| No blame | Neither the client nor a previous vendor (§7) |

Both existing projects have a documented problem (§17, §18) — the strongest
starting material available.

---

## 7. Challenge

`INTERPRETED` — §19, §21.

**What made the problem non-trivial to solve.** This is the block most often
confused with §6, and the distinction carries the framework's value:

| | Answers | Belongs to |
| --- | --- | --- |
| **Problem** | What was wrong? | The client's world |
| **Challenge** | Why was it hard to fix? | PXTO's world |

The challenge is where **reasoning** becomes visible — and reasoning is exactly
what §16 asks the portfolio to demonstrate, and what a reader can evaluate even
when they cannot evaluate code (Narrative §9.1).

| Rule | Detail |
| --- | --- |
| Real constraints only | Technical, operational, informational — never manufactured drama |
| No proprietary architecture | Restricted under §20 |
| Honest about trade-offs | Naming a constraint you worked within is more credible than implying there were none |
| Omit if it cannot be described without breaching disclosure | §20 |

---

## 8. Solution

`DERIVED` — §19, §21.

**The approach chosen, and why it was the right one.**

| Rule | Detail |
| --- | --- |
| The *why* matters more than the *what* | The decision demonstrates capability; the deliverable alone does not |
| Focus on the solution, not the technologies | §25's rule applies to cases as well as to the Software page |
| Connects back to the challenge | The solution should read as an answer to §7 |
| No proprietary architecture detail | §20 |

---

## 9. How it works

`INTERPRETED` — §19, §21.

**The mechanism, at whatever depth disclosure permits.**

§17 gives the pattern for a visual project:

```text
Foto do móvel + Foto do ambiente → Processamento → Ambiente visualizado
```

| Rule | Detail |
| --- | --- |
| A reader should be able to explain it afterwards | If they cannot, it is too abstract or too technical |
| Sequence over architecture | Steps and flow, not system diagrams that expose proprietary design (§20) |
| Depth follows clearance | Reduce detail rather than omitting the block |
| No invented mechanism | Describe what was built, never what would have been ideal (§53) |

---

## 10. Technology / capabilities

`DERIVED` — §19; constrained by §53, §20, §25.

**What was actually used.**

> ### Hard rule
> **Never list a technology that has not been confirmed by PXTO** (§53).
> Inference from the project type is invention.

| Situation | Handling |
| --- | --- |
| Technologies confirmed and cleared | List them |
| Technologies confirmed, disclosure restricted | Describe **capability categories** instead — "processamento de imagem", "análise visual", "interface conversacional" (§20) |
| Technologies not confirmed by PXTO | **Omit the block entirely** |

**Framing rule.** Technology is a supporting character (Narrative §9.3). The
block answers "what was used", never "why this project matters". A case that
leads with its stack repositions PXTO as a software house (Narrative §17.1) or
an AI company (§17.3).

**Both existing projects** name capabilities in their case objectives (§17, §18):
AI, image processing, image generation, web application development, technology
integration; and AI, visual analysis, conversational interfaces, assistant
development, recommendation generation. **These are capability statements, not a
confirmed stack** — the concrete technologies still require confirmation.

---

## 11. Results

`DERIVED` — §19, §20, §53. **The most restricted block on the site.**

| Situation | Handling |
| --- | --- |
| Results cleared for publication | Publish as cleared, in the client's terms |
| Results exist, not cleared | **Omit the block** |
| No results measured | **Omit the block** |
| Results known informally, unverified | **Omit the block** |

> **Never**: percentages, hours saved, ROI, efficiency gains, revenue effects,
> uptime, user counts, or any figure not authorised by the client (§20;
> Positioning §13.4).

**Qualitative is the default and is sufficient.** "O processo passou a rodar sem
intervenção manual" is a result. It is specific, honest, and requires no
measurement (Narrative §5.4).

**Omission carries no cost.** §21 states content is proportional to what is
available. A project without a results block is normal. A project with an
invented one is a defect that discredits the whole portfolio.

**Neither existing project has documented results** (§17, §18).

---

## 12. Visual assets

`DERIVED` — §43 requires a cover image; §19 lists images.

### 12.1 Cover image — required

| Requirement | Detail |
| --- | --- |
| Every published project has one | §43 |
| Shows the actual work | A screenshot, an output, the real interface |
| Contains no client-identifying detail | Unless cleared (§14) — logos, names, real customer data |
| Legible at card size | It is seen small before it is seen large (§18) |
| Consistent proportion across projects | An inconsistent grid looks unfinished |
| Optimised | §37 |
| Has alt text | §35 |

### 12.2 Gallery — optional

Additional images showing the work: interface states, the process, before/after
where the project supports it (§17's demonstration pattern).

### 12.3 Prohibited imagery

`INTERPRETED` — §53; Positioning §13.6.

| Prohibited | Why |
| --- | --- |
| Mocked-up interfaces that were never built | Fabricated evidence (§53) |
| Client logos without authorisation | §17.1, §20 |
| Blurred or pixelated client marks | Signals concealment (Narrative §9.5) |
| Stock photography standing in for real work | Implies work that does not exist |
| Screenshots containing real customer data | §20, §44 |
| Decorative placeholders filling a gallery grid | A gallery with nothing to show is omitted, not filled |

### 12.4 When there is no usable image

A project with no publishable visual **cannot be published** — `coverImage` is
required (§43). The correct response is to produce a legitimate asset: an
anonymised screenshot, a diagram of the flow, an output sample. **Not** a stock
image or an invented mockup.

---

## 13. Demo / video

`DERIVED` — §19 lists "Vídeo / demonstração"; §17 explicitly requests a visual
demonstration where possible.

| Rule | Detail |
| --- | --- |
| Optional, and valuable where it exists | §17 asks for it for Furniture Visualization |
| Shows real output | Never a rendered simulation of what the product would do (§53) |
| Contains no client data | §20, §44 |
| Must not degrade page performance | Lazy-loaded, not auto-downloading (§37) |
| No autoplay with sound | §35 |
| Respects reduced-motion preferences | §35 |
| Has a still fallback | The page must work without it |
| A live demo is a claim of availability | Only link one that is maintained — a broken demo is worse than none |

Hosting and delivery are technical decisions (`../technical/`).

---

## 14. Client disclosure rules

`DERIVED` — §17.1, §20.

### 14.1 The default

> **A client is not named.** Naming requires explicit authorisation.

§17.1 states it directly for Furniture Visualization: *"O nome do cliente não deve
ser utilizado sem autorização."* The framework applies it to every project.

### 14.2 The three permissions

`DERIVED` — §20. These are **independent** — one may be granted without the
others:

| # | Permission | Question |
| --- | --- | --- |
| 1 | **Name** | May the client's name be disclosed? |
| 2 | **Logo** | May the client's logo be used? |
| 3 | **Association** | May the project be publicly associated with the client at all? |

Permission 3 is the strictest: without it, the project may still be published,
but nothing may point to who it was for — including indirect identification.

### 14.3 Recording authorisation

The editorial record must state, for each permission: **who granted it, when, and
in what form** (e-mail, contract clause, written confirmation). Verbal
recollection is not clearance.

If it is not written down, it is not cleared.

### 14.4 Withdrawn authorisation

If a client withdraws permission, the project reverts to the appropriate
disclosure level (§15) and is republished with reduced content — or set
`published: false`. The **slug and route are preserved** where possible; if
removed, a 301 is required (SITEMAP §5.3).

### 14.5 Indirect identification

`INTERPRETED`

Anonymisation fails when the client is identifiable by combination: an unusual
sector plus a distinctive process plus a recognisable interface identifies a
company as effectively as a name. Before publishing an anonymised project, ask
whether someone in that industry could name the client from the page.

---

## 15. Confidentiality rules

`DERIVED` — §20.

### 15.1 What is never published under restriction

Per §20:

- The client's name
- Proprietary information
- Internal data
- Proprietary architecture
- Commercial information
- Unauthorised metrics

### 15.2 The disclosure ladder

`PROPOSAL` — operationalises §20's permission to publish anonymised projects.

**Every level uses the same section, template, card and category.** Only content
depth changes.

| Level | Client identity | What it looks like | Blocks typically available |
| --- | --- | --- | --- |
| **A — Named** | Named, with authorisation | Full case, client named where relevant | All |
| **B — Described** | Not named; sector or situation given — *"uma empresa que trabalha com…"* | Full narrative, no identity | Context, Problem, Challenge, Solution, How it works, Capabilities |
| **C — Abstracted** | Not named; no sector | The problem shape and the reasoning | Problem, Challenge, Solution, Capabilities |

**Level B is the expected default.** It preserves nearly the whole narrative and
requires no authorisation beyond the right to describe the work.

### 15.3 What never changes across levels

`INTERPRETED` — this is the core of the instruction that confidentiality is
handled at content level:

- The project appears in `/projetos` alongside every other project
- It uses the same template (§17) and the same card (§18)
- It carries a real title (§3) and a real category (§2)
- It is eligible to be `featured` (§19)
- **Nothing on the page indicates that a restriction exists**

No "confidencial" badge. No greyed card. No "cliente não divulgado" label. No
locked state. The reader should perceive a project told at the depth it merits —
not a redacted document.

### 15.4 Writing at reduced disclosure

`INTERPRETED` — Narrative §9.5.

1. **Lead harder on problem and reasoning** — neither requires identification,
   and both are what §16 asks the portfolio to prove
2. **Name the situation, not the company** — "uma operação com pedidos em dois
   sistemas" is concrete without being identifying
3. **Use capability categories** where technologies are restricted (§10)
4. **Describe change qualitatively** where metrics are not authorised (§11)
5. **Never hint at identity** — no "um cliente do setor financeiro que você
   provavelmente conhece", no blurred logo, no coy phrasing
6. **Never apologise for the omission** or explain the restriction on the page.
   Discretion is a professional standard, stated by being practised

### 15.5 Data protection

`DERIVED` — §44.

No real customer data in screenshots, galleries or demos. No internal
identifiers, e-mail addresses or personal data. LGPD applies to project content
exactly as it applies to the contact form.

---

## 16. What can and cannot be claimed

`DERIVED` — §53; Positioning §13.

### 16.1 Can be claimed

| Claim | Condition |
| --- | --- |
| The problem the project addressed | Almost always disclosable |
| The reasoning behind the approach | PXTO's own; requires no permission |
| What was built and how it works | Within disclosure limits |
| Technologies used | **Confirmed by PXTO only** (§10) |
| Capabilities demonstrated | §17 and §18 supply these directly |
| Qualitative outcomes | If cleared (§11) |
| That the project was delivered and works | If true |

### 16.2 Cannot be claimed

| Never | Source |
| --- | --- |
| Unconfirmed technologies | §53 |
| Uncleared metrics or results | §20, §53 |
| Client names or logos without authorisation | §17.1, §20 |
| Testimonials or quotes not given | §53 |
| That a project is representative of many similar ones | Implies volume (Positioning §13.1) |
| Superlatives — "o projeto mais complexo", "solução inédita" | §7 |
| Awards, recognition, press | §53 |
| Implied scale — "mais um projeto de…", "como sempre fazemos" | Positioning §13.6 |
| Ongoing relationship, unless true and cleared | §53 |

### 16.3 The test

> **Can PXTO point to where this came from?** A written authorisation, a
> confirmed technical fact, a delivered artefact.
>
> If not, it does not go on the site (§53) — regardless of how ordinary the claim
> seems in this category.

---

## 17. Project page structure

`DERIVED` — §21. Full specification in `../architecture/PAGE_SPECS.md` §5.

```text
Hero → Contexto → Problema → Desafio → Solução → Como funciona
     → Tecnologia / capacidades → Resultado → Galeria / demonstração → CTA
```

| # | Block | Field | Required |
| --- | --- | --- | --- |
| 1 | Hero | `title`, `category`, `summary`, `coverImage` | **Yes** |
| 2 | Contexto | `context` | No |
| 3 | Problema | `problem` | No |
| 4 | Desafio | `challenge` | No |
| 5 | Solução | `solution` | No |
| 6 | Como funciona | `process` | No |
| 7 | Tecnologia / capacidades | `technologies` | No |
| 8 | Resultado | `results` | No |
| 9 | Galeria / demonstração | `gallery`, `video` | No |
| 10 | CTA | — | **Yes** |

### 17.1 Rules

`DERIVED` — §21.

1. **Not every block appears in every project.** Content is proportional to
   relevance and to available, cleared information
2. **A block with no content is omitted, not emptied.** No empty headings, no
   "informação não disponível", no placeholder text
3. **Block order never changes.** The sequence is the argument (Narrative §9.2);
   reordering breaks it
4. **The page opens with the problem, not the technology** (Narrative §9.3)
5. **CTA is always present** — contextual, *Quero conversar sobre meu projeto*
   (§29)

---

## 18. Project card structure

`INTERPRETED` — from §43's required fields; appears on `/projetos`, on Home
(§19), and on solution pages (SITEMAP §4.3).

### 18.1 Required elements

| Element | Field | Note |
| --- | --- | --- |
| Cover image | `coverImage` | §12 |
| Title | `title` | §3 |
| Category | `category` / `solutions` | §2.4 |
| Summary | `summary` | May be truncated; must remain comprehensible |
| Link | `slug` | Whole card is the target |

### 18.2 Rules

1. **One card format across the whole site.** Home, `/projetos` and solution
   pages use the same structure. Different treatments for the same object
   violate §32.9
2. **No client logo**, ever, on a card
3. **No metrics or figures** on a card
4. **No badges** — not "confidencial", not "novo", not "destaque", not a status
   label (§2.2)
5. **Cards are visually uniform.** A card that looks richer implies the others
   are thinner
6. **Every card links to a real page.** No non-clickable cards, no "em breve"

### 18.3 Prohibited card states

`INTERPRETED` — Positioning §13.6.

No "coming soon" cards, no placeholder cards, no blurred cards, no locked cards.
**If a project cannot be published, it does not appear** (§1.3).

---

## 19. Homepage project presentation

`DERIVED` — §11.2 places a Projetos section on the Home page; §16 defines its
purpose.

### 19.1 Purpose

Prove capability at the moment the reader has accepted the problem and the
method, and is asking whether PXTO can actually build (Narrative §7.1, block 6).

### 19.2 Contents

| Element | Detail |
| --- | --- |
| Section title | Fixed: *O que construímos.* (§16) |
| Subtitle | Fixed: *Soluções desenvolvidas para transformar ideias e problemas em produtos digitais funcionais.* (§16) |
| Project cards | `featured: true`, in `order` |
| Link | To `/projetos` |

### 19.3 Selection rules

`PROPOSAL`

1. Only `published: true` projects are eligible
2. `featured` is a deliberate editorial choice, not "the most recent"
3. Prefer **variety of problem type** over similarity — §16 asks the section to
   demonstrate range
4. Where possible, feature projects mapping to **different capabilities**, so the
   Home section does not present PXTO as a single-capability company (§4;
   Positioning §15.1)

### 19.4 Behaviour with few projects

`INTERPRETED` — Narrative §9.6; the current situation.

This is the live constraint: **at launch there may be one or two publishable
projects.**

| Rule | Detail |
| --- | --- |
| **Never pad** | No placeholders, no "em breve", no repeated cards, no filler tiles |
| **Never imply more exist** | No "alguns dos nossos projetos", no "entre outros" |
| **The layout must not require a minimum count** | A section built for six showing two reads as emptiness. A design-system constraint, flagged for `../design-system/` |
| **One project, well told, is sufficient** | It proves the company builds real things — which is the section's only job |
| **If zero are cleared, the section cannot appear honestly** | Omit it rather than fake it, and treat clearance as urgent (Positioning §12.3) |

---

## 20. Project publication checklist

`DERIVED` — §20, extended with framework and Definition-of-Done compliance.

**No project is published until every applicable box is checked and a human at
PXTO has signed off.** An AI agent may prepare a project; it may never clear one
(§52).

### 20.1 Identification — §20

- [ ] The client's name may be disclosed
- [ ] The client's logo may be disclosed
- [ ] The project may be associated with the client
- [ ] Authorisation exists **in writing**, with source and date recorded (§14.3)

### 20.2 Content — §20

- [ ] The problem may be described
- [ ] The solution may be described
- [ ] Technologies may be mentioned — **and are confirmed by PXTO** (§10)
- [ ] Images may be used
- [ ] Results may be disclosed

### 20.3 Confidentiality — §20

- [ ] No proprietary information
- [ ] No internal data
- [ ] No proprietary architecture
- [ ] No commercial information
- [ ] No unauthorised metrics
- [ ] No real customer data in any asset (§44)
- [ ] Disclosure level assigned: **A / B / C** (§15.2)
- [ ] Indirect identification checked — the client is not identifiable by
      combination (§14.5)

### 20.4 Framework compliance

- [ ] `slug` unique and permanent (§43)
- [ ] Required fields present (§1.4)
- [ ] `solutions` assigned (§2.4)
- [ ] Category from the controlled vocabulary; **no prohibited category** (§2.2)
- [ ] Title names the project, not the client or the technology (§3)
- [ ] Summary works in isolation on a card (§4)
- [ ] Cover image shows real work, is optimised, has alt text (§12)
- [ ] Blocks with no content are **omitted, not empty** (§17.1)
- [ ] No claim fails the §16.3 test
- [ ] Nothing unpublishable was copied into the runtime record (§1.1)

### 20.5 Narrative compliance

- [ ] The page opens with the problem, not the technology (§17.1.4)
- [ ] The project is framed by the problem solved, not the technology used
      (Narrative §9.3, §9.4)
- [ ] No badge, label or visual cue indicates a disclosure restriction (§15.3)

### 20.6 Technical — §49

- [ ] Route resolves; links work
- [ ] SEO metadata present; `CreativeWork` structured data names no uncleared
      client (SITEMAP §6.3)
- [ ] Responsive on mobile, tablet and desktop (§34)
- [ ] Images optimised and lazy-loaded where appropriate (§37)
- [ ] Accessibility reviewed — alt text, heading hierarchy, focus (§35)
- [ ] Added to the sitemap automatically, not manually (SITEMAP §6.2)

### 20.7 Sign-off

```text
Disclosure level (A / B / C):  ______
Cleared by (name):             ______
Date:                          ______
Authorisation source:          ______
published → true               [ ]
```

---

## 21. Adding a new project — the workflow

`INTERPRETED` — satisfies §42, §50.6.

```text
1. Copy the Appendix template → docs/projects/<slug>.md
2. Fill the editorial record — everything known, including what cannot be published
3. Obtain and record written authorisation (§14.3)
4. Assign the disclosure level (§15.2) and write content to that level
5. Prepare assets (§12, §13)
6. Complete the §20 checklist; obtain human sign-off
7. Copy ONLY cleared content into the runtime record (§1.1)
8. Set published: true
```

**Steps 7 and 8 are the only steps that touch the website.** No route is created,
no component is written, no layout changes, no navigation is updated. The card,
the page, the sitemap entry and the internal links all follow from the data
(SITEMAP §8).

**Step 3 is the usual blocker**, and it is a commercial conversation, not a
documentation task.

---

## 22. Open decisions

An AI agent must not resolve these (§52).

1. **Category axis (§2.4)** — capability-primary with the PRD's composite strings
   secondary. Changes how a PRD-specified field is displayed. **Highest
   priority** — it affects every card on the site
2. **Disclosure ladder (§15.2)** — the A/B/C levels operationalise §20 and need
   approval
3. **Clearance for both existing projects (§20)** — blocks `/projetos`,
   `/projetos/[slug]`, the Home Projetos section and internal link rule R2
4. **Model fields marked ✚ (§1.2)** — `published`, `solutions`, `order`, `video`,
   `seo`
5. **Whether dates are recorded and displayed (§1.6)** — recommendation: record,
   do not display
6. **`featured` selection for launch (§19.3)**
7. **Confirmed technology lists** for both projects (§10) — must come from PXTO,
   never inferred

---

# Appendix — Project template

Copy to `docs/projects/<slug>.md`. This is the **editorial record**: it holds
everything, including what will never be published. Only cleared content is
later copied into the runtime record (§1.1).

Leave a field blank rather than guessing. **An empty field is correct; an
invented one is a defect** (§53).

```markdown
---
slug:        # unique, permanent, kebab-case → /projetos/<slug>
title:       #
category:    # controlled vocabulary (§2) — never a prohibited category (§2.2)
solutions:   # [Integração | Automação | Software | Site] — one or more
published:   false
featured:    false
order:       #
---

# <Project title>

## Disclosure — NOT PUBLISHED (§14, §15)

Disclosure level (§15.2):    A Named / B Described / C Abstracted

| Permission | Granted | Source | Date |
| --- | --- | --- | --- |
| Client may be named        |  |  |  |
| Client logo may be used    |  |  |  |
| Association may be public  |  |  |  |

Restrictions (never published):

Indirect identification checked (§14.5):   [ ]

## Runtime content — PUBLISHABLE ONLY

### Summary (§4)
<!-- 1–2 sentences. Works alone on a card. Problem or outcome first. -->

### Context (§5)
<!-- The situation before. Omit if it cannot be described. -->

### Problem (§6)
<!-- What was not working, in business terms. Almost always disclosable —
     prefer anonymising over omitting. -->

### Challenge (§7)
<!-- Why it was hard. Where reasoning becomes visible. -->

### Solution (§8)
<!-- The approach chosen and WHY. -->

### How it works (§9)
<!-- Mechanism at permitted depth. A reader should be able to explain it after. -->

### Technology / capabilities (§10)
<!-- CONFIRMED technologies only. Capability categories where restricted.
     Omit the block entirely if nothing is confirmed. -->

### Results (§11)
<!-- Cleared results only. Qualitative is sufficient. Omit if not cleared,
     not measured, or only known informally. NEVER invent a figure. -->

## Assets (§12, §13)

| Asset | File | Alt text | Cleared |
| --- | --- | --- | --- |
| Cover image (required) |  |  |  |
| Gallery |  |  |  |
| Video / demo |  |  |  |

## SEO (§36)

Title:
Meta description:

## Publication checklist (§20)

### Identification
- [ ] Name may be disclosed
- [ ] Logo may be disclosed
- [ ] Association permitted
- [ ] Written authorisation recorded

### Content
- [ ] Problem may be described
- [ ] Solution may be described
- [ ] Technologies confirmed and may be mentioned
- [ ] Images may be used
- [ ] Results may be disclosed

### Confidentiality
- [ ] No proprietary information
- [ ] No internal data
- [ ] No proprietary architecture
- [ ] No commercial information
- [ ] No unauthorised metrics
- [ ] No real customer data in assets
- [ ] Disclosure level assigned
- [ ] Indirect identification checked

### Framework
- [ ] Slug unique and permanent
- [ ] Required fields present (§1.4)
- [ ] Category valid; not a prohibited category
- [ ] Title names the project
- [ ] Summary works in isolation
- [ ] Cover image real, optimised, alt text present
- [ ] Empty blocks omitted, not emptied
- [ ] Every claim passes the §16.3 test
- [ ] Nothing unpublishable copied to runtime

### Narrative
- [ ] Opens with the problem, not the technology
- [ ] Framed by problem solved, not technology used
- [ ] No badge or cue indicating a restriction

### Technical
- [ ] Route resolves; links work
- [ ] SEO metadata and structured data correct
- [ ] Responsive verified
- [ ] Images optimised
- [ ] Accessibility reviewed
- [ ] Sitemap entry generated automatically

## Sign-off

Disclosure level:        ______
Cleared by:              ______
Date:                    ______
Authorisation source:    ______
published → true         [ ]

## Open questions

<!-- Anything requiring a decision from PXTO. Never resolve by inventing. -->
```
