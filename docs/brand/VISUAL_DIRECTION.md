# PXTO Visual Direction Proposal

**Version:** 2.0 (supersedes v1.0)
**Status:** Exploration. Nothing here is approved. Nothing is built.
**Skill applied:** `design-taste-frontend` (taste-skill v2 experimental)
**Sources:** all PXTO documentation, plus the skill's own rules.

> **This document contains zero em-dash characters**, by the skill's Section 9.G.
> That rule is demonstrated here rather than merely quoted, because it applies to
> the site's copy and the site's copy is already in violation. See Part V.

---

## Note on the skill, corrected

**v1.0 of this document was produced without the requested skill.** I searched
for `design-taste-frontend`, did not find it, found the official
`frontend-design` plugin skill on disk, read it, applied it, and said so. That
was the honest fallback, but it was not the tool asked for, and the two skills
disagree on several points that matter.

The repository at `github.com/Leonxlnx/taste-skill` has now been cloned and read.
`design-taste-frontend` is the frontmatter name of `skills/taste-skill/`, the v2
default of that library. It is installed at
`~/.claude/skills/design-taste-frontend/`.

**To install it as a plugin instead** (recommended, so it updates and is visible
in the skill list):

```text
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
```

### What changed because the skill changed

`frontend-design` is a philosophy: read the room, be distinctive, spend your
boldness once. `design-taste-frontend` is that plus a **mechanical rulebook**:
three numbered dials, a brief-inference protocol, roughly forty named AI tells
banned outright, and a pre-flight checklist that fails the output if any box
cannot be ticked.

The practical consequence for PXTO is direct. **Several signature moves in v1.0
of this document are explicitly banned by the real skill.** They are listed and
corrected in Part III. The strategic reasoning in v1.0 survived; the execution
did not.

---

## Part I. Design Read and dials

### 1. The Design Read

Required by the skill, Section 0.B, before anything else:

> **Reading this as:** a serious B2B company site for operations and business
> decision-makers, with a technical, evidence-light, engineering language,
> leaning toward Tailwind v4 plus a grotesk and mono pairing, restrained motion,
> and real photography rather than illustration.

Signals that produced it, per the skill's Section 0.A:

| Signal | Reading |
| --- | --- |
| Page kind | Company site: landing, four service pages, portfolio, about, contact |
| Vibe words in the brief | "serious technology company", "precision, engineering, simplicity, sophistication, trust" (PRD §33) |
| Reference signals | Stated as negatives only: not futuristic, not cyberpunk, not generic AI startup, not creative agency, not SaaS template (§33) |
| Audience | Non-technical but technically literate operations leaders. Time-poor. Risk-averse toward new vendors (Positioning §1.3) |
| Existing brand assets | **None.** No logo, no palette, no typefaces (Brand Foundation §15) |
| Quiet constraints | Accessibility-critical (WCAG 2.2 AA, §35), performance-critical (§37), and **evidence-constrained**: no social proof may exist anywhere (§53) |

That last constraint has no equivalent in the skill's vocabulary, and it is the
strongest one on this project. The skill assumes a logo wall is available and
tells you how to build it well. PXTO may not have one at all.

### 2. Dials

The skill's baseline is `8 / 6 / 4`. Its own inference table (Section 1.A) moves
a trust-first, regulated-adjacent, accessibility-critical brief to `3-4 / 2-3 /
4-5`, and a mainstream landing to `7 / 6 / 4`.

PXTO sits between those two rows: it is trust-first in substance but must not
look institutional or dull, because §33 asks for sophistication and Positioning
§14.6 requires the design to carry credibility the copy declines to claim.

> ### Recommended project dials
> ```
> DESIGN_VARIANCE:  6
> MOTION_INTENSITY: 3
> VISUAL_DENSITY:   5
> ```

**Reasoning, as the skill requires (never silently use the baseline):**

- **VARIANCE 6**, not 8. Asymmetry is earned here through offset composition and
  varied grid fractions, not through masonry or chaos. Above 7 the site starts
  reading as an agency portfolio, which §4 forbids. Below 5 it reads as
  institutional, which fails §33.
- **MOTION 3**, not 6. PRD §32.6 requires animation to have a function and §32.7
  forbids effects that demonstrate technology for its own sake. The skill's own
  rule, "motion claimed is motion shown", cuts both ways: at 3 the page is
  honestly still, with state feedback only, and no half-built choreography.
- **DENSITY 5**, not 4. The audience reads operational systems all day and
  scans rather than reads (Positioning §1.3). Density 5 also protects against
  the emptiness failure that a thin portfolio creates (Project Framework §19.4).

Per-direction dial overrides appear with each direction below.

---

## Part II. Constraints that bind every direction

Unchanged from v1.0, and still the governing filter.

1. **Convey** precision, technology, engineering, simplicity, sophistication,
   trust (§33).
2. **Never resemble** a futuristic, cyberpunk, generic AI startup, creative
   agency or SaaS template look. No gradient-heavy, no glassmorphism-heavy
   (§33).
3. **Design must carry the credibility the copy declines to claim** (Positioning
   §14.6). Under-designing and over-designing are the same failure.
4. **No layout slot that only makes sense once filled with social proof**
   (Positioning §13.6). This disqualifies any direction that needs a logo wall,
   a stat bar or a testimonial region to look complete.
5. **Two projects, neither cleared, no gallery assets** (Project Framework §12).
   This is the launch condition, not a temporary state.
6. **Quality floor:** responsive-first, WCAG 2.2 AA, visible focus, reduced
   motion respected, minimum necessary JavaScript (§34, §35, §37).

---

## Part III. Where the skill overrides v1.0

Honest audit. Each row is a rule in `design-taste-frontend` that v1.0 violated.

| # | Skill rule | v1.0 did | Verdict |
| --- | --- | --- | --- |
| 1 | **No section-number eyebrows** (9.F). `001 · Capabilities`, `06 · how it works` banned outright | Made a numbered annotated margin the signature of Direction A | **Fails.** Signature must be rebuilt |
| 2 | **Eyebrow count** at most `ceil(sections / 3)` (4.7). Home has 8 content sections, so at most 3 | Put a margin label beside every section | **Fails** |
| 3 | **No decoration text strip at hero bottom** (9.F) | Direction A hero ended with `Integrações · Automação · Software · Sites` | **Fails.** Strip removed |
| 4 | **Hero stack discipline**, max 4 text elements (4.7) | Direction A hero had 5 | **Fails** |
| 5 | **No crosshair or hairline grid lines as decoration** (9.F) | Direction A used rules as a structural motif | **At risk.** Rules survive only where they separate real content |
| 6 | **Real images mandatory. Pure-text minimalism is incomplete work, not minimalism** (4.8) | Direction A explicitly had no hero image and almost no imagery | **Fails.** See Part V.2, the largest finding in this document |
| 7 | **Middle-dot rationed**, at most 1 per line (9.F) | Scope lists in the copy use it as the default separator | **Fails.** Copy remediation needed |
| 8 | **Em-dash completely banned** (9.G), zero tolerance | The drafted Portuguese copy contains 49 lines with em-dashes | **Fails.** Copy remediation needed |
| 9 | **Section-layout-repetition ban** (4.7). Eight sections need at least four distinct layout families | Direction A ran one measure throughout, Direction C ran one panel construction throughout | **Fails for both** |
| 10 | **Generic step labels banned** (9.F). `Stage 1`, `Phase 01`, `Step 1` | PRD §15 itself prints `01 Entendemos` through `05 Evoluímos` | **Conflict.** See Part IV.1 |
| 11 | **Dual dark mode by default** (8.0) | v1.0 treated dark as a choice specific to Direction C | **Gap.** All directions now need both modes |
| 12 | **Serif discipline** (4.1). Serif very discouraged, `Fraunces` and `Instrument_Serif` banned | v1.0 proposed grotesks throughout | **Passes** |
| 13 | **Inter discouraged as default** (4.1) | v1.0 named Inter as a candidate for Direction C | **Weak.** Acceptable only because §33 asks for neutrality, but better candidates exist |
| 14 | **Anti-center bias** above VARIANCE 4 (4.3) | All three directions are non-centered | **Passes** |

**Six hard failures, three at-risk items, one genuine conflict with the PRD.**
The strategic argument in v1.0 stands. Its execution needed this correction.

---

## Part IV. Conflicts between the skill and PXTO's own documentation

Where two authorities disagree, the PRD wins, because it is the project's source
of truth (§52). These are recorded so the disagreement is deliberate rather than
accidental.

### 1. Numbered process steps

**Skill (9.F):** generic step labels are banned. `Stage 1`, `Step 1`,
`Phase 01`. The step content is the label.
**PRD (§15):** prints the process as `01 Entendemos` through `05 Evoluímos`.

**Resolution:** the PRD wins on the content, the skill wins on the treatment.
The five steps keep their names and their order. The numerals are not set as
eyebrow-styled micro-labels above each step, and they never appear as decorative
enumeration anywhere else on the site. A sequence that genuinely is a sequence
may be numbered once, in the one place where the order carries meaning.

**Flagged for PXTO:** dropping the numerals entirely is also defensible and is
what the skill would prefer. This is a copy and design decision, not an agent
decision.

### 2. Imagery versus evidence

**Skill (4.8):** every page needs real images. Text-only pages with hand-rolled
SVG or div-based fake previews are slop. Even restrained sites need two or three
real images.
**PRD (§53) and Positioning (§13):** nothing may be shown that implies work,
clients or results PXTO cannot evidence. Stock photography standing in for real
work is prohibited (Project Framework §12.3).

**Resolution:** both are right, and the intersection is narrow but real. The site
needs genuine photography that claims nothing: the actual product interfaces from
the two projects once cleared, and otherwise abstract or environmental imagery
that is honestly what it is. What it may not have is stock office photography,
invented dashboards, or generated mockups of work that was never built.

This is the project's largest unresolved practical problem. See Part V.2.

### 3. Logo walls

**Skill (4.8):** when the brief calls for a trusted-by wall, use real SVG logos,
never text wordmarks.
**PXTO (Positioning §13.6):** no logo wall may exist, and no layout slot may
exist that would want one.

**Resolution:** PXTO wins absolutely. The skill's rule is conditional on the
brief calling for a logo wall. This brief forbids it.

---

## Part V. Two corrections this analysis forces on completed work

### 1. The drafted copy fails the skill's pre-flight

`docs/content/WEBSITE_COPY.md` contains **49 lines with em-dash characters** in
the Portuguese copy and **34 lines using the middle-dot** as a default separator.
Both are hard fails under Sections 9.F and 9.G.

The em-dash is not a cosmetic issue in the skill's framing. It is named as the
single most-violated tell, and the fix is mechanical: replace with a period, a
comma, a colon, parentheses, or a restructured sentence. The middle-dot fix is to
convert scope lists into real list markup or column layout rather than dot-joined
strings.

**Recommendation:** run this remediation on `WEBSITE_COPY.md` before any
implementation begins. It is a mechanical pass over drafted copy, not a rewrite,
and it costs nothing now versus fixing it in components later.

### 2. PXTO needs real photography, and has none

The skill is blunt that a pure-text page is incomplete work. Combined with the
prohibition on fabricated or stock-standing-in imagery, the position is:

> The site requires real visual assets. PXTO currently has zero cleared images.

The honest paths, in the skill's own priority order (4.8):

1. **Real assets from the two projects**, once disclosure clears (§20). Interface
   captures, real outputs, the before-and-after flow §17 asks for. This is the
   best material and it is blocked on a business decision, not on design.
2. **Commissioned or generated environmental photography** that depicts nothing
   it is not: workspaces, materials, textures. It must never imply a client, a
   team size or an office PXTO does not have.
3. **Clearly labelled placeholder slots** with an explicit list handed to PXTO,
   which is what the skill prescribes when neither of the above is possible.

**This should be treated as a launch blocker of the same weight as disclosure
clearance.** It was not visible in v1.0 because `frontend-design` has no
equivalent rule.

---

## Part VI. The three directions, revised

Names unchanged. Concepts unchanged. Execution corrected.

| | **A prime, Especificação** | **B, Intervalo** | **C, Instrumento** |
| --- | --- | --- | --- |
| Concept | The site is a technical document | The site renders the gap | The site is an instrument |
| `DESIGN_VARIANCE` | 6 | 9 | 4 |
| `MOTION_INTENSITY` | 3 | 6 | 3 |
| `VISUAL_DENSITY` | 5 | 2 | 8 |
| Layout families | Measure, split, grid, full-bleed figure | Offset fields, full-bleed, stacked | Panels, split, marquee, stacked |
| Whitespace | Disciplined, vertical | Extreme, structural | Tight, rhythmic |
| Type and image | Type leads, image documents | Equal masses across a void | Image contained by data |
| Projects | Documented cases | Singular showcases | Uniform records |
| Technology | Named in context | Nearly invisible | Tagged in metadata |

---

# Direction A prime: **Especificação**
### *The Specification*

## 1. Design concept

The site is built as the artefact an engineering company actually produces: a
specification. Structure carries meaning, terms are defined, figures are
captioned and referenced from the text. Nothing is decorated, everything is
specified.

The reader's impression is not "this is beautifully designed" but **"this was
made by people who are precise"**, which is the correct first impression for a
company whose differentiation is diagnosis before building and restraint over
claim.

**Signature, rebuilt.** v1.0 proposed a numbered annotated margin. That is a
banned tell (Part III.1 and III.2). The replacement:

> **The defined term.** Key operational nouns in the running copy carry a
> hairline underline and, on hover or focus, reveal a one-line definition set in
> mono. It is what a specification does with terminology, it is genuinely
> functional for a non-technical reader meeting words like "integração" or
> "fluxo", and it is a motion and interaction idea rather than a decorative
> label. It survives the eyebrow cap because it is inline, not a section header.

## 2. Visual rationale

Positioning §12.2 established that the site's own execution is one of the few
available proof points. Narrative §9.1 established that reasoning is what a
non-technical reader can evaluate. This direction makes the thinking the visible
material, which is the one asset PXTO has in quantity on day one.

## 3. Typography direction

| Role | Character | `CANDIDATE` |
| --- | --- | --- |
| Display | Technical grotesk, moderate scale, real presence at 48 to 64px | Geist, Söhne, ABC Diatype, PP Neue Montreal |
| Body | Same family at text weights, 60 to 72ch measure | idem |
| Utility | Mono, used only for definitions, captions and figure references | Geist Mono, Söhne Mono, JetBrains Mono |

Per the skill's 4.1: no serif, Inter avoided, one family plus its mono
companion. Emphasis inside headlines uses weight or italic of the same family,
never a second family.

**Scale:** six steps, largest heading around 3.5 times body. Hierarchy is carried
by weight, measure and position, not by size jumps.

## 4. Layout direction

`DESIGN_VARIANCE: 6`

At least four layout families across the Home page, per the skill's 4.7:

1. **Measure** for argument sections: Problema, Posicionamento
2. **Asymmetric split** for Como trabalhamos: steps left, one supporting image right
3. **Four-cell grid** for Soluções, cells equal, enforcing the four-peer rule
4. **Full-bleed figure** for the featured project, image with a caption below it

Offset composition rather than centering. Generous vertical rhythm, disciplined
horizontal measure. Rules only where they separate real content, never as
texture.

`VISUAL_DENSITY: 5`

## 5. Colour approach

`CANDIDATE`, subject to the brand decision and AA validation.

Near-monochrome, one accent, locked across the whole page per the skill's colour
consistency rule.

| Role | Light | Dark |
| --- | --- | --- |
| Ground | `#FCFCFC` | `#0E0F11` |
| Ink | `#111214` | `#E9EBED` |
| Ink secondary | `#5C6066` | `#8E949B` |
| Rule | `#E3E5E8` | `#242830` |
| Accent | `#1B4DE4` | `#5B86FF` |

Dual mode by default, per the skill's Section 8. No pure black, no pure white.
The accent is functional only: links, focus, defined terms. No glow, no gradient.

## 6. Motion approach

`MOTION_INTENSITY: 3`

State feedback only. Focus rings, hover on interactive elements, the defined-term
reveal, form states, menu open and close. Durations 120 to 180ms. No
scroll-triggered entrance animation anywhere.

Per the skill's "motion claimed is motion shown" rule, dialing to 3 is the honest
choice: the page does not pretend to a choreography it will not ship, and there
are no half-built ScrollTriggers to break.

## 7. Project presentation

Documented cases. The narrative blocks carry the page and the imagery is a
captioned figure referenced from the text. The index lists projects as entries
rather than as a gallery, so two entries read as a complete list rather than as
an empty grid.

Anonymised cases fit natively, since a document that describes a situation
without naming a party is a normal professional document.

## 8. Technology treatment

Named in context, inside the block where it clarifies the solution, and set in
mono. Never a stack banner, never an icon row, never above solution-page level.

## 9. Hero composition

Corrected for the skill's hero rules: four text elements maximum, no bottom
decoration strip, headline at most two lines, subtext under 20 words, top padding
capped, real image present.

```text
┌──────────────────────────────────┬─────────────────────────┐
│                                  │                         │
│  Conectamos sistemas.            │                         │
│  Automatizamos processos.        │      [ real image ]     │
│  Construímos soluções.           │                         │
│                                  │   honest photography    │
│  Tecnologia aplicada aos         │   or a cleared product  │
│  desafios reais das empresas.    │   capture. Not a mock.  │
│                                  │                         │
│  [Fale com a PXTO] [Ver projetos]│                         │
│                                  │                         │
└──────────────────────────────────┴─────────────────────────┘
```

**Note on the headline.** PRD §12 fixes it at three lines, and the skill caps
headlines at two. The PRD wins. The mitigation is font scale: this headline is
set in the `text-4xl md:text-5xl` range, not `text-7xl`, so three lines still fit
the viewport with the CTAs visible. That is exactly the trade the skill's own
hero rule prescribes when copy is fixed.

**On the image.** v1.0 argued for no hero image. The skill overrules that, and it
is right: a text-only hero is not restraint, it is an unfinished page. The
requirement is that the image be honest. See Part V.2.

## 10. Strengths and risks

### Strengths

1. Performs at its best with a thin portfolio, since quality is independent of
   how much work there is to show
2. Carries credibility through precision, satisfying Positioning §14.6 without an
   unsupportable claim
3. Structurally hostile to social proof: there is nowhere for a logo strip to go
4. Fast to build and fast to load, which makes the Sites capability
   self-evidencing (Positioning §12.1)
5. Native fit for anonymised cases, the expected default (Project Framework
   §15.2)
6. Now passes the skill's layout-variety rule, which v1.0 did not

### Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Reads as the skill's banned broadsheet or editorial default | Medium, down from High | Single measure not newspaper columns. Mono for utility, not editorial serif. Rules only where they separate content. No pull quotes, no drop caps |
| Austerity read as coldness | Medium | The copy is human (§7). The defined-term interaction adds warmth without decoration |
| Requires exceptional typographic execution | High | Nowhere to hide. Spacing errors a busy design would absorb are fatal here |
| Depends on real photography that does not exist | **High** | Part V.2. Shared by all three directions, most exposed here because there are few images and each carries weight |

## 11. Skill settings

```yaml
design_read: serious B2B company site for operations decision-makers,
             technical and evidence-light language, grotesk plus mono,
             restrained motion, honest photography

DESIGN_VARIANCE:  6
MOTION_INTENSITY: 3
VISUAL_DENSITY:   5

system:     Tailwind v4 utilities, dark variant. No component-library defaults
            shipped as-is. shadcn/ui only if owned and restyled (skill 2.A)
type:       display  Geist / Söhne / ABC Diatype / PP Neue Montreal
            body     same family, 60-72ch
            utility  matching mono, definitions and captions only
            no serif. Inter avoided. Fraunges and Instrument_Serif banned
color:      near-monochrome, one locked accent, dual mode, no pure black or white
motion:     state feedback only, 120-180ms, no scroll entrances
layout:     4 families minimum. measure, asymmetric split, four-cell grid,
            full-bleed figure. offset over centered
signature:  the defined term, inline hairline plus mono definition on hover
images:     real only. cleared project captures first, honest environmental
            photography second, labelled placeholder slots last
risk spend: the absence of motion, bought back with typographic precision
avoid:      section-number eyebrows, hero decoration strip, hairlines as
            texture, middle-dot as separator, em-dash anywhere
```

---

# Direction B: **Intervalo**
### *The Interval*

## 1. Design concept

The positioning made literal. PXTO works in the space between systems, so the
space is the composition. Content sits in asymmetric fields separated by
deliberate voids, and the eye is repeatedly asked to cross an interval.

**Signature:** the interval itself, a consistent rhythmic void sized as a real
unit in the spacing scale.

## 2. Visual rationale

The only direction that argues the positioning structurally rather than
decorating it. It also answers §33's sophistication requirement most directly,
because confident emptiness cannot be faked.

## 3. Typography direction

Extreme scale contrast: very large display against very small utility type, with
a deliberate hole in the middle of the scale that mirrors the layout's void.

| Role | `CANDIDATE` |
| --- | --- |
| Display | GT America, Suisse Int'l, PP Neue Montreal, Cabinet Grotesk Display |
| Body | Same family, text cut |
| Utility | Matching mono or small caps, 11 to 12px |

No serif. Emphasis by weight or italic within the family, never a second family.

## 4. Layout direction

`DESIGN_VARIANCE: 9`, the skill's asymmetric band: fractional grid columns,
large empty zones, offset composition. Mobile collapses to strict single column
per the skill's mandatory mobile override.

`VISUAL_DENSITY: 2`, art-gallery spacing, `py-32` to `py-48` section gaps.

Layout families: offset two-field, full-bleed image, stacked centered manifesto.
Three families is thin against the skill's four-family rule for an eight-section
page, and that is a real weakness of the direction.

## 5. Colour approach

Two grounds and one accent, so the interval reads as a real division rather than
as empty page.

| Role | Light | Dark |
| --- | --- | --- |
| Ground | `#FFFFFF` | `#0B0C0D` |
| Ground alt | `#F2F3F4` | `#141618` |
| Ink | `#0A0B0C` | `#EDEEEF` |
| Ink secondary | `#6B7076` | `#909699` |
| Accent | `#2F6BFF` | `#5B86FF` |

## 6. Motion approach

`MOTION_INTENSITY: 6`. One orchestrated page-load sequence in which elements
arrive into position across the interval, plus scroll-settled alignment on key
sections. Translation and opacity only, 200 to 320ms, spring easing.

The skill permits this at 6 but demands it actually ship, implemented with Motion
`useScroll` rather than scroll listeners, with cleanup and a reduced-motion path.
**This is the only direction where motion is load-bearing, which is its
exposure.**

## 7. Project presentation

Singular showcases, one project per viewport, image and text as two masses across
the interval. Visually the most impressive treatment of the three, and the most
dependent on assets that do not exist.

## 8. Technology treatment

Nearly invisible. Small utility type near the foot of a project page. The
cleanest possible answer to the AI-positioning risk.

## 9. Hero composition

Headline anchored top-left at large scale, subheadline and CTAs anchored far
lower-right, the void between them as the composition. Four text elements, no
strip, no scroll cue.

**Unresolved against the skill:** 4.8 requires a real hero visual. A hero whose
whole idea is emptiness resists one. Placing an image in the far field is
possible but weakens the concept, which is a genuine tension rather than a
detail.

## 10. Strengths and risks

### Strengths

1. The only direction that argues the positioning structurally
2. Highest design ceiling, most obviously art-directed
3. Strongest answer to §33's sophistication requirement
4. Furthest from every prohibited look
5. Technology invisible by construction

### Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| **Emptiness reads as thinness with two uncleared projects and no imagery** | **Critical** | None available at launch. This remains the disqualifying risk |
| Whitespace plus large display is agency vocabulary, which §4 and §33 forbid | High | Constant guarding, fighting the direction's own instincts |
| Motion is load-bearing | Medium | Reduced-motion users get a materially lesser page, uncomfortable against §35 |
| Only three layout families, against the skill's four-family rule | Medium | Would need a fourth invented for the sake of the rule, which is backwards |
| Conflicts with the mandatory hero-image rule | Medium | Unresolved |

## 11. Skill settings

```yaml
DESIGN_VARIANCE:  9
MOTION_INTENSITY: 6
VISUAL_DENSITY:   2

type:       display  GT America / Suisse Int'l / PP Neue Montreal, 80-140px
            utility  matching mono or small caps, 11-12px
            scale with a deliberate hole in the middle range
color:      two grounds plus one locked accent, dual mode
motion:     one orchestrated load sequence closing the gap, Motion useScroll,
            translation and opacity only, cleanup mandatory, reduced-motion path
layout:     offset two-field across a sized void, mobile collapses to single col
signature:  the interval, a repeated rhythmic void as the composition
risk spend: the emptiness, and the motion that animates it
avoid:      placeholder imagery, agency-portfolio vocabulary, rotated text,
            scroll cues, decorative dots
```

---

# Direction C: **Instrumento**
### *The Instrument*

## 1. Design concept

PXTO builds operational tools, so the site behaves like one. A modular grid of
defined panels, information-dense, scannable, with states that respond like a
working interface rather than like a marketing page.

**Signature:** the panel, one construction repeated at every scale.

## 2. Visual rationale

Positioning §12.1 identifies the site itself as a proof point, and §26 asks that
Sites be understood as operational surface rather than visual craft. This
direction makes that argument as literally as possible, and it matches an
audience that reads systems and reports all day.

## 3. Typography direction

Compact and functional, hierarchy by weight and container rather than by size.

| Role | `CANDIDATE` |
| --- | --- |
| Interface | Geist, Söhne, Roboto Flex. **Inter only if PXTO explicitly wants the neutral Linear-style read**, per the skill's 4.1 override |
| Data and labels | Matching mono with tabular figures |

The skill's density rule is explicit: above `VISUAL_DENSITY 7`, all numbers are
set in mono and generic card containers are banned. Panels here must therefore be
defined by border and ground shift, never by a card with a shadow.

## 4. Layout direction

`DESIGN_VARIANCE: 4`, low asymmetry by design. Strict twelve-column grid, panels
spanning defined column sets, tight consistent internal padding.

`VISUAL_DENSITY: 8`, the skill's cockpit band.

**Correction from v1.0:** running panels through every section fails the
section-layout-repetition rule. At least four families are required: panel grid,
asymmetric split, full-width statement, and one horizontal scroll-snap or marquee
band, used once only per the skill's marquee rule.

## 5. Colour approach

Layered neutrals defining planes, one signal accent.

| Role | Dark | Light |
| --- | --- | --- |
| Ground | `#0D0F12` | `#FBFBFC` |
| Panel | `#15181C` | `#F3F4F6` |
| Border | `#262B32` | `#E2E5E9` |
| Ink | `#E8EAED` | `#14171A` |
| Ink secondary | `#8B929B` | `#646A72` |
| Accent | `#3D7BFF` | `#1B4DE4` |

Dark-first is where this direction spends its boldness. **The skill flags the
danger directly**: a near-black ground with a single bright accent is one of the
named AI defaults. Guards: layered neutrals rather than flat black, strictly
functional accent, no glow, and a full light theme shipped in parallel.

## 6. Motion approach

`MOTION_INTENSITY: 3`. Interface-grade feedback only, 80 to 140ms. Hover, active,
focus, expand and collapse. No scroll entrance animation. The most internally
consistent motion story of the three and the cheapest against §37.

## 7. Project presentation

Uniform records. Each project is a panel with a labelled header, a metadata row,
a summary and a contained image region. Two projects read as complete because
uniform records imply no quantity, and weak imagery degrades gracefully because
images are contained rather than hero.

## 8. Technology treatment

Tagged in panel metadata, capability first per Project Framework §2.4. This is
the direction's principal exposure against §4, since tag rows are visually
prominent and both current projects would carry AI tags.

## 9. Hero composition

Message and the four capabilities delivered together, with the four panels
visibly equal so the four-peer rule is enforced structurally rather than by
discipline.

**Corrected from v1.0:** the four capability panels are a separate section
directly below the hero, not inside it. The skill's hero stack discipline caps
the hero at four text elements and forbids feature content inside it.

## 10. Strengths and risks

### Strengths

1. The site demonstrates the Sites capability by being one
2. Handles a thin portfolio well, since uniform records imply no quantity
3. Fastest to scan for a time-poor operational audience
4. Enforces the four-peer rule structurally
5. Most consistent motion story, cheapest in performance terms
6. Degrades gracefully with weak imagery, which matters given Part V.2

### Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| **Reads as a SaaS template, explicitly prohibited by §33** | **Critical** | Sustained discipline: no gradients, no glass, no pill buttons, no icon feature grids, no fake product screenshots. The direction fights its reference material continuously |
| **Dark plus bright accent is a named AI default** | High | Layered neutrals, functional accent, no glow. Still uncomfortably close |
| Panel grid invites a clientes panel | High | Positioning §13.6 forbids it. The form actively wants what the brand cannot have |
| Feels like a product rather than a company | Medium | A visitor may not immediately grasp what is sold |
| Dark-first needs a full parallel light system | Medium | Doubles token and QA work |

## 11. Skill settings

```yaml
DESIGN_VARIANCE:  4
MOTION_INTENSITY: 3
VISUAL_DENSITY:   8

type:       interface  Geist / Söhne / Roboto Flex. Inter only on explicit
                       request for a neutral Linear-style read
            data       matching mono, tabular figures. mandatory above density 7
color:      layered neutrals, one locked accent, dark-first plus full light theme
motion:     interface feedback only, 80-140ms, no scroll entrances
layout:     12-col panel grid plus at least 3 other families. no card shadows,
            panels defined by border and ground shift
signature:  the panel, one construction at every scale
risk spend: the dark-first ground
avoid:      gradients, glassmorphism, pill buttons, icon feature grids,
            fake product previews, glow, any slot wanting a logo wall
```

---

## Part VII. Recommendation

# Recommended: **Direction A prime, Especificação**

The recommendation from v1.0 survives the change of skill, which is itself
informative: the reasoning was sound even though the execution was not.

## Why

**1. It is the only direction whose quality does not depend on assets PXTO does
not have.** Direction B is the strongest idea in this document and it cannot be
built now. A showcase form with two uncleared projects and no imagery reads as
emptiness, which is the exact failure Project Framework §19.4 warns about, and
the skill's mandatory hero-image rule makes the gap worse rather than better.

**2. It makes reasoning visible, and reasoning is what PXTO actually has.**
Positioning §12 established that the available proof is almost entirely how PXTO
thinks and works. This direction puts that on the surface of every page.

**3. It resolves the credibility paradox in Positioning §14.6.** Precision is the
only material that carries authority without asserting anything, and assertion is
what this brand cannot afford.

**4. It enforces the structural prohibitions by construction.** Direction C's
panel grid actively wants a clientes panel. Direction B's large fields beg to be
filled. A specification has nowhere to put social proof.

**5. It survives the skill's rulebook with the fewest compromises.** After the
Part III corrections, Direction A prime passes the pre-flight. Direction C spends
its entire execution fighting two named AI defaults at once, the SaaS template
and the dark-plus-bright-accent pairing. Direction B cannot satisfy the
four-family layout rule or the hero-image rule without damaging its own concept.

**6. At `MOTION_INTENSITY: 3` it is honest.** The skill's "motion claimed is
motion shown" rule means a low dial is a real choice rather than an excuse, and
it is the choice most consistent with §32.6, §32.7 and §37.

## What changed in the recommendation since v1.0

| v1.0 said | v2.0 says | Why |
| --- | --- | --- |
| Signature is the numbered annotated margin | Signature is the defined term, inline | Section-number eyebrows are a banned tell |
| No hero image, deliberately | Real hero image, honestly sourced | Pure-text minimalism is incomplete work (4.8) |
| One measure throughout | Four layout families minimum | Section-layout-repetition ban (4.7) |
| Rules as a structural motif | Rules only where they separate real content | Decorative hairlines are a banned tell |
| Light theme implied | Dual mode required | Dark mode protocol (Section 8) |
| Borrow the interval from B | Retained | Still correct, and it is a spacing decision rather than a device |
| Borrow equal panels from C for Soluções | Retained | Still correct, and it satisfies the four-peer rule structurally |

## What must still be guarded

| Do | Do not |
| --- | --- |
| Single content measure | Newspaper multi-column |
| Mono for definitions and captions | Editorial serif display |
| Rules that separate real content | Hairlines as texture |
| The five process steps named by their verbs | `Stage 1`, `Phase 01`, decorative enumeration |
| Real photography, honestly sourced | Stock offices, generated mockups, div-based fake UI |
| At most three eyebrows across eight sections | An eyebrow above every section |
| Periods, commas, colons | Em-dash, anywhere, ever |

---

## Part VIII. Next steps

1. **Remediate the copy** in `docs/content/WEBSITE_COPY.md`: zero em-dashes,
   middle-dot only where a real separator is needed. Mechanical, cheap now,
   expensive later.
2. **Decide the imagery path** (Part V.2). This is now a launch blocker of the
   same weight as project disclosure clearance.
3. **Approve or reject a direction.** A prime is recommended.
4. **Then** brand assets, tokens, `docs/design-system/foundations.md`,
   components, pages. The design system remains blocked on logo, palette and
   typefaces regardless of which direction is chosen (Brand Foundation §15).

A useful intermediate artefact, if wanted: three static hero artboards, one per
direction, so the choice is made by looking rather than by reading. That is an
exploration piece, not the website, and it would not touch `src/`.
