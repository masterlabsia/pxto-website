# Design System

How the interface looks and behaves — defined once, reused everywhere.

**PRD sources:** §30 (foundations), §31 (components), §32 (design rules), §34
(responsiveness), §35 (accessibility), §55 Phase 3.

## What belongs here

| Document | Content |
| --- | --- |
| `DESIGN_SYSTEM.md` | **Exists.** The full specification: principles, visual personality, colour, typography, type scale, spacing, grid, containers, breakpoints, radius, shadows, icons, image treatment, motion, accessibility, component principles, responsive behaviour, do and don't, plus the 24-component inventory and token naming |
| `foundations.md` | Real values, written once the palette and typefaces exist |
| `tokens.md` | The token file itself, generated from `DESIGN_SYSTEM.md` Part III |
| `components/` | One document per component, expanded from the Part II inventory as each is built |

## Foundations to document (§30.1)

Cores · Tipografia · Escala tipográfica · Espaçamento · Grid · Containers ·
Breakpoints · Border radius · Sombras · Ícones · Motion · Estados.

**No values are specified in the PRD.** They depend on `../brand/`.

## Component catalogue (§31)

```text
Button    Link      Navbar    Footer    Logo      Container  Section
Heading   Text      Card      Badge     Input     Textarea   Select
Form      Accordion Modal     Tabs      Image     Video
ProjectCard         ServiceCard         CTA
```

Components must be reusable. **Do not create visually duplicated components
without need** (§31).

## Design rules (§32)

1. Consistency over variety.
2. Clear visual hierarchy.
3. Consistent spacing.
4. Legible typography.
5. Responsiveness from the start.
6. Animation must have a function.
7. Do not use effects merely to demonstrate technology.
8. Do not sacrifice performance for aesthetics.
9. Do not use different components to solve the same visual problem without
   justification.

## Responsiveness (§34)

Responsive-first. Breakpoints are defined here. At minimum: Mobile, Tablet,
Desktop, Large Desktop. Every component must have defined responsive behaviour.

## Accessibility (§35)

Target: **WCAG 2.2 AA**, where technically applicable. Semantic HTML, keyboard
navigation, visible focus, adequate contrast, form labels, alt text, correct
heading hierarchy, reduced-motion support, accessible interactive elements.

## Status

**`DESIGN_SYSTEM.md` drafted (v1.0).** The system is specified: token
architecture, scales, ratios, rules and a 24-component inventory. **No component
is implemented.**

Specified against Direction A prime (`../brand/VISUAL_DIRECTION.md`), which is
recommended and **not approved**. If another direction is chosen, the token
structure survives; radius, density, motion ceiling and layout families change.

**Still blocked on `../brand/`.** Every colour and typeface in the specification
is a `CANDIDATE`. Six required assets are listed in `DESIGN_SYSTEM.md` Part IV,
in build order. **No component should be built before the palette and typefaces
exist** — building against candidate values means rebuilding.

## Requires human decision

See `DESIGN_SYSTEM.md` Part V for the full list. Highest priority:

- [ ] **Approve or reject Direction A prime** — the system is specified against it
- [ ] **The six blocked assets** (`DESIGN_SYSTEM.md` Part IV): logo, palette,
      typefaces, photography, contact channels and legal copy, term definitions
- [ ] Typeface selection, including whether Inter is acceptable
- [ ] Icon library choice from the permitted set
- [ ] Whether dark mode ships at launch — the specification assumes both themes
      ship together; the PRD is silent
- [ ] Whether `shadcn/ui` is adopted as the component base, and how far its
      defaults are overridden — the PRD recommends the stack but does not settle
      this (§40).

Breakpoint values are now specified (`DESIGN_SYSTEM.md` Part I.9) using the
standard set, since §34 names the tiers but not the numbers.
