# Architecture

The structural shape of the site: routes, navigation, page composition and
content models.

**PRD sources:** §9 (architecture), §10 (navigation), §11 (Home), §21 (project
page), §22 (Soluções page), §42 (CMS / data model), §43 (project rules),
§56 (final structure).

## What belongs here

| Document | Content |
| --- | --- |
| `SITEMAP.md` | **Exists.** Routes, hierarchy, navigation, internal link graph, URL conventions, indexing, content models, scaling behaviour |
| `PAGE_SPECS.md` | **Exists.** Per-page objective, visitor, intent, messages, sections, required content, CTAs, internal links, SEO intent, conversion role |

Infrastructure, deployment and tooling belong in `../technical/`.

## Key constraints

- New projects must be addable at `/projetos/<slug>` **without structural
  change** to the projects page or the site (§42, §56).
- Projects are represented as **structured data**, never hardcoded into UI
  components where a data structure exists (§42, §43).
- The architecture must permit later migration to a CMS without rebuilding the
  interface (§42).
- Navigation stays simple. **No mega menu initially** (§10.1).

## Status

**`SITEMAP.md` and `PAGE_SPECS.md` drafted (v1.0).** Together they supersede the
earlier `information-architecture.md`, which has been removed; all of its content
is carried into the two new documents.

Sections marked `PROPOSAL` in either document are not approved and do not bind
implementation.

**Page readiness** — see `PAGE_SPECS.md` §9. Three pages are structurally ready
but content-blocked (`/projetos`, `/sobre`, `/contato`); two more are partially
blocked. Every blocker is a business decision, not design or engineering work.

## Requires human decision

See `SITEMAP.md` §11 and `PAGE_SPECS.md` §11 for the full lists. Highest
priority:

- [ ] Project disclosure clearance (PRD §20) — blocks `/projetos` and
      `/projetos/[slug]` entirely
- [ ] Direct contact channels and lead destination — block `/contato`
- [ ] Approve the proposed structures for the solution detail pages, `/sobre`
      and the `/projetos` index
- [ ] Diferenciais content — the only Home block with no defined substance
- [ ] Footer content
- [ ] Whether the site is Portuguese-only or will need internationalisation.
      The PRD specifies Portuguese content and Portuguese routes and never
      mentions other languages.
