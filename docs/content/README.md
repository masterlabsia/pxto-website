# Content

The actual words that appear on the site.

**PRD sources:** §12–§16 (Home sections), §22–§28 (pages), §29 (CTA), §36
(SEO), §39 (contact form).

## What belongs here

| Document | Content |
| --- | --- |
| `WEBSITE_COPY.md` | **Exists.** First complete draft: all eleven pages, global copy, form states, validation, microcopy library, and review notes |

Project case-study text lives in `../projects/`, not here.

## Rules

1. Every factual claim must originate from information supplied by PXTO
   (PRD §53). No invented clients, numbers, results, testimonials, logos,
   certifications, partners, awards or metrics.
2. Copy given in the PRD is a **suggested** starting point and may be refined
   during copywriting (§6) — by a human, not by an agent.
3. Follow the tone rules and the forbidden-language list in `../brand/`
   (PRD §7).
4. Do not overstate experience or client count (§7).
5. Every page needs SEO metadata; SEO is handled during development, not
   afterwards (§36).

## Copy already fixed by the PRD

- **Hero (§12):** headline *Conectamos sistemas. Automatizamos processos.
  Construímos soluções.* · subheadline *Tecnologia aplicada aos desafios reais
  das empresas.* · primary CTA *Fale com a PXTO* · secondary CTA *Ver projetos*.
- **Problema (§13):** *Sua empresa já tem tecnologia. O problema é quando ela
  não conversa.*
- **Soluções (§14):** title *Tecnologia para resolver problemas reais.* plus
  one descriptive paragraph per solution, given verbatim in the PRD. Each
  solution carries a CTA to its own page.
- **Como trabalhamos (§15):** the five steps and their descriptions.
- **Projetos (§16):** title *O que construímos.* and its subtitle.
- **Solution page positioning lines (§23–§26).**
- **CTA vocabulary (§29).**

These are transcribed in `../architecture/PAGE_SPECS.md` and
`../narrative/README.md` with their section references.

## Status

**`WEBSITE_COPY.md` drafted (v1.0)** — first complete draft of every page.
Nothing in it is approved.

Copy is marked `FIXED` (verbatim from the PRD), `DRAFT` (written, reviewable),
`⚠ CONFIRMAR` (asserts a fact only PXTO can verify) or `⟦PLACEHOLDER⟧`
(information that does not exist and must not be invented). Part IV indexes
every placeholder, every item needing confirmation, every deliberately omitted
section, and the approval dependencies.

## Requires human decision

See `WEBSITE_COPY.md` Part IV for the indexed lists. Highest priority:

- [ ] **Direct contact details** — e-mail, phone / WhatsApp (§28). Without them
      the Contato page and the footer cannot be completed
- [ ] **Privacy notice / LGPD wording** (§44) — a legal commitment; must not be
      drafted by an agent
- [ ] **Response-time commitment** — the success state promises no timeframe
      until one is decided
- [ ] **Project gallery and demo assets** — real assets only; no mockups
- [ ] Confirm or remove the nine items marked `⚠ CONFIRMAR`, including the US
      client and sector reference on Furniture Visualization
- [ ] Sobre page gaps: vision, name origin, founder visibility (§10.8)
- [ ] Whether the PRD's suggested copy is final or is to be rewritten (§6)
