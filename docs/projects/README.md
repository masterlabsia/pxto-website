# Projects

The case-study system — the site's primary evidence of capability.

**PRD sources:** §16 (projects section), §17 (Furniture Visualization), §18
(AI Interior Designer), §19 (Project Entry), §20 (publication criteria), §21
(project page structure), §42 (data model), §43 (project rules).

## What belongs here

| Document | Content |
| --- | --- |
| `PROJECT_FRAMEWORK.md` | **Exists.** Metadata and data model, categories, per-field content rules, visual assets, disclosure ladder, confidentiality, claim limits, page and card structures, Home presentation, publication checklist, reusable template |
| `<slug>.md` | One editorial record per project, created from the framework's Appendix template |

## Purpose

The projects section demonstrates **capability, reasoning, execution,
technology and the variety of problems solved** — not the number of clients
(§16).

## Non-negotiable rules

- A client's name, logo, or association with the project may only be published
  with authorisation (§17.1, §20).
- Before publishing, the checklist in `PROJECT_FRAMEWORK.md` §20 must be
  cleared and signed off by a human (§20).
- Where restrictions exist: publish no client name, no proprietary information,
  no internal data, no proprietary architecture, no commercial information and
  no unauthorised metrics. The project may still be presented **anonymised**
  when permitted (§20).
- Every project needs a unique slug, title, summary, category, cover image and
  description, and must follow the consistent structure (§43).
- Projects are structured data, not hardcoded UI content (§42, §43).
- Never invent technologies used in a project without confirmation (§53).

## Current projects

### Furniture Visualization (§17)
Category: AI / Web App / Image Generation. A web application that accepts
images of a piece of furniture and of a room and generates a realistic
visualisation of the furniture placed in that room. Demonstrates AI, image
processing, image generation, web application development, integration of
different technologies, and turning a concept into a working product.
**The client name must not be used without authorisation (§17.1).**

### AI Interior Designer (§18)
Category: AI / Computer Vision / Conversational Assistant. An assistant that
analyses images of rooms and helps produce interior design proposals.
Demonstrates AI, visual analysis, conversational interfaces, assistant
development, recommendation generation and building digital experiences.

## Status

**`PROJECT_FRAMEWORK.md` drafted (v1.0).** It supersedes the earlier
`project-entry-template.md`, which has been removed; its content is carried into
§20 and the Appendix. Sections marked `PROPOSAL` are not approved.

The PRD provides a summary, problem, solution and case objective for both
projects. It does **not** provide context, challenge, how-it-works detail,
technology lists, results, images or video, and it does not record disclosure
clearance for either project. Both are therefore `published: false`.

## Requires human decision

See `PROJECT_FRAMEWORK.md` §22 for the full list. Highest priority:

- [ ] **Category axis** (`PROJECT_FRAMEWORK.md` §2.4) — whether cards lead with
      capability (Integração/Automação/Software/Site) rather than the PRD's
      technology-composite strings. Affects every card on the site
- [ ] **Disclosure clearance for both projects** — the full §20 checklist
- [ ] Approve the A/B/C disclosure ladder (§15.2)
- [ ] Whether the client behind Furniture Visualization may be named (PRD §17.1)
- [ ] Screenshots, imagery and demo video for both projects
- [ ] Confirmed technology lists — must not be inferred (PRD §53)
- [ ] Results / outcomes, if any may be published (PRD §20)
