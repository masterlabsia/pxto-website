# Brand

Visual and verbal identity of PXTO.

**PRD sources:** §1.1 (brand is corporate, not personal), §7 (communication
principles), §33 (visual direction), §55 Phase 2.

## What belongs here

| Document | Content |
| --- | --- |
| `BRAND_FOUNDATION.md` | **Exists.** Essence, purpose, mission, vision, values, personality, perception, is/is-not, tone of voice, communication principles, vocabulary, positioning implications |
| `LOGO_SPEC.md` | **Exists.** Briefing técnico para recriar as logos: o que foi medido nos arquivos entregues, os dois problemas encontrados, requisitos de arquivo, cor, validação e checklist de entrega |
| `colors.md` | Palette with roles (primary, surface, text, accent, state) and contrast validation |
| `typography.md` | Typeface selection, weights, licensing, loading strategy |
| `voice-and-tone.md` | Verbal identity, vocabulary allowed and forbidden |
| `VISUAL_DIRECTION.md` | **Exists (v2.0).** Three visual directions explored under the `design-taste-frontend` skill: design read, dials, rationale, typography, layout, colour, motion, project treatment, hero composition, strengths, risks, skill settings, plus a recommendation |

Brand decisions are the input to `../design-system/`. Tokens are not defined
here; they are defined there.

## Fixed by the PRD

- PXTO is presented as an **independent corporate brand**, tied to the company,
  not to its founders or collaborators (§1.1).
- The identity must convey: precision, technology, engineering, simplicity,
  sophistication, trust (§33).
- It must **not** look: excessively futuristic, cyberpunk, "generic AI
  startup", creative agency, SaaS template, gradient-heavy, glassmorphism-heavy
  (§33).
- The design must look like it was built by a serious technology company (§33).
- Tone: clear, direct, professional, modern, technical without being overly
  technical, confident, objective, problem-oriented, solution-oriented, human
  (§7).
- Forbidden language: excessive buzzwords, empty corporate language, unproven
  promises, superlatives without evidence, "revolucionário", "disruptivo",
  "a melhor solução", "transformação digital" as an empty phrase, and any
  overstatement of experience or client count (§7).

## Status

**Verbal identity drafted** in `BRAND_FOUNDATION.md` (v1.0). Sections marked
`PROPOSAL` there are not approved and do not bind implementation.

**Visual direction explored** in `VISUAL_DIRECTION.md` (v2.0), rebuilt under the
`design-taste-frontend` skill (taste-skill v2, installed at
`~/.claude/skills/design-taste-frontend/`). Three distinct directions, one
recommended (**A prime, Especificação**). Nothing is approved and nothing is
built. Every typeface and hex value there is a `CANDIDATE`, not a selection.

v2.0 also records two corrections the skill forces on completed work: the drafted
copy fails the em-dash and middle-dot rules, and the site requires real
photography that does not yet exist. See its Part V.

**Visual identity: still empty — awaiting human input.** The PRD defines the
intent of the identity (§33) but supplies no assets or concrete values, and
choosing a direction does not supply them.

## Requires human decision

Visual:

- [ ] **Approve or reject a visual direction** (`VISUAL_DIRECTION.md` Part IV;
      A — Especificação is recommended)
- [ ] **Variante compacta da marca** para 24 a 48px. O wordmark entregue lê
      "p to" abaixo de 64px. Ver `LOGO_SPEC.md` §2.1
- [ ] **Cor da marca: turquesa `#009D88` ou azul `#1B4DE4`?** O ícone entregue e
      o accent do site usam cores diferentes. Ver `LOGO_SPEC.md` §4.2
- [ ] Colour palette — no colours are specified anywhere in the PRD.
- [ ] Typography — no typefaces are specified anywhere in the PRD.
- [ ] Whether a formal brand guideline exists outside this repository.

Verbal — see `BRAND_FOUNDATION.md` §15 for the full list:

- [ ] Vision (not present in the PRD; blocking the Sobre page)
- [ ] Confirmation of essence, purpose and values
- [ ] Company model: services only, or products too
- [ ] How much weight AI carries in the positioning and the portfolio
- [ ] Founder visibility
- [ ] Meaning and pronunciation of the name "PXTO"

These are brand decisions. An AI agent must not choose them (PRD §52).
