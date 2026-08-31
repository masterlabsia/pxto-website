# Open decisions

**Status:** register of decisions that belong to PXTO, not to code.

Each entry below is written to be pasted into a GitHub issue as is. The format
follows `CLAUDE.md` §20: what is ambiguous, which document settles it, the
options, the one I would pick and why, and what is blocked meanwhile.

An entry leaves this file when its issue is opened. The file is a bridge, not a
permanent home.

> **Why these are issues and not runbook entries.** A decision has an end state,
> so it closes. A runbook entry lives as long as the system behaves that way.
> See `../technical/RUNBOOK.md`.

---

## 1. Which colour is the brand colour

**Ambiguity.** Three colours are in use at the same time, and all three are
visible on the same screen: the logo is green, the CTA is blue, the browser tab
is turquoise.

**Settles it:** `docs/brand/BRAND_FOUNDATION.md`, plus `LOGO_SPEC.md` §3.1.

**Measured contrast**, computed from the shipped tokens:

| | text 4.5:1 light | text 4.5:1 dark | non text 3:1 |
| --- | --- | --- | --- |
| Site accent `#1B4DE4` light, `#5B86FF` dark | 6.34 passes | 5.75 passes | passes |
| Logo green `#308459` | **4.48 fails** | **4.17 fails** | passes |
| Favicon turquoise `#009D88` | **3.31 fails** | 5.64 passes | passes |

**This corrects an earlier estimate.** The green was reported as roughly 4.0:1
and "marginally passing". It is 4.48:1, which **fails** AA for body text, and it
fails on both themes.

**The structural point:** the accent is a **pair**, one value per theme, which is
why it passes everywhere. The green and the turquoise are single values with no
dark variant. Whichever colour wins needs two values, not one.

**Options.**

1. **Keep the blue accent, redo logo and favicon.** Contrast already resolved on
   both themes. Cost: two brand assets remade.
2. **Green becomes the accent.** Needs a lighter companion for dark and a
   revalidation of every pair. As delivered it cannot carry link or body text.
3. **Turquoise becomes the accent.** Worst starting position: fails light for
   text and needs a darker companion.

**I would pick 1.** It is the only option where the contrast work is already
done and verified, and it changes assets rather than the whole token system.

**Blocked meanwhile:** the accent stays `CANDIDATE`, and any component that
would use brand colour beyond interaction state.

---

## 2. Is Aeonik the typeface of the brand and of the site

**Ambiguity.** `public/logo.svg` records the original face as **Aeonik Medium**,
now converted to outlines. This was not documented anywhere before. Site
typography is still `CANDIDATE` on Geist.

**Settles it:** `docs/brand/BRAND_FOUNDATION.md` and `DESIGN_SYSTEM.md` Part I,
typography.

**Options.**

1. **Aeonik for both.** Wordmark and interface agree. Cost: a commercial licence
   including web use, and self hosting with subsetting per §13.
2. **Aeonik in the mark, Geist on the site.** Common and defensible: the mark is
   a drawing, not text. Costs nothing.
3. **Change the mark to the site face.** Cheapest, and discards a decision that
   has already been made in the logo.

**I would pick 2 unless the licence is already owned**, in which case 1 is
better. Option 3 wastes work already done.

**Blocked meanwhile:** typography stays `CANDIDATE`, which blocks the font
loading and subsetting work.

---

## 3. Amend §7.9 to allow a single draw on in the Hero

**Ambiguity.** `CLAUDE.md` §7.9 says motion is banned in the Hero. The request
is for the systems diagram to **draw itself once** on load: `stroke-dashoffset`,
700 to 900ms, no loop, no scroll driving, then permanently still.

**Settles it:** `CLAUDE.md` §7.9, `DESIGN_SYSTEM.md` §14.1 and §14.2.

**The reason the rule exists does not apply here.** §7.9 bans Hero motion
because the headline is the LCP element and Chrome delays LCP while opacity is
below 1. A draw on animates the diagram, not the headline, so LCP is untouched.
It is also not a perpetual loop, which is the separate §14.2 ban and stays.

**Options.**

1. **Amend, narrowly.** Allow one time, non looping, non scroll driven motion on
   an element that is not an LCP candidate. Costs zero JS, CSS only, and is not
   written at all under `prefers-reduced-motion`.
2. **Do not amend.** The Hero stays completely still. Nothing to build.

**I would pick 1**, with the exception written narrowly enough that it cannot be
read as permission for a background loop.

**Blocked meanwhile:** the animation itself, which is otherwise ready to build.

---

## 4. Hero slot: photograph or diagram

**Ambiguity.** `VISUAL_DIRECTION.md` §9 specifies *"honest photography or a
cleared product capture"* in the Hero slot. Commit `6bb946a` ships a diagram
there instead, and the divergence is recorded in a comment in
`src/content/home.ts`.

**Settles it:** `docs/brand/VISUAL_DIRECTION.md` §9.

**Options.**

1. **Amend §9 to accept a diagram.** The diagram claims nothing, follows both
   themes, weighs 472 bytes gzipped and is not an LCP candidate. It also matches
   the chosen direction, which is named *Especificação*.
2. **Restore the photograph.** Requires an asset that does not exist, and the
   Hero returns to a labelled pending slot.

**I would pick 1.** Option 2 trades a working visual for an empty one, and the
photography blocker has no date.

**Blocked meanwhile:** documentation and code disagree, which `CLAUDE.md` §3
defines as a defect by construction.

---

## 5. The Posicionamento photograph contradicts three rules

**Ambiguity.** `public/images/site/posicionamento.avif` is a night view of the
globe with glowing network arcs. It contradicts §4.8, never resemble a
futuristic or generic AI startup look; §7.5, no glow; and §7.15, real imagery
only, no stock standing in for real work. The brief in `home.ts` asks for
something else: *"fotografia própria, horizontal, de contraste baixo e sem ponto
focal no centro"*.

**Settles it:** `BRAND_FOUNDATION.md` §8 and `VISUAL_DIRECTION.md` Part V.2.

**Note.** The `alt` was corrected to describe the file that exists rather than
the brief, because screen reader users were receiving a description of something
that is not there. **That correction is provisional and tracks the file.**

**Options.**

1. **Replace with imagery that fits the brief.** Part V.2 explicitly permits
   commissioned or generated environmental photography that depicts nothing it
   is not: workspaces, materials, textures.
2. **Amend the brand rules.** Not recommended: §4.8 is the rule that keeps the
   site from looking like every other technology vendor.
3. **Remove the backdrop.** The section renders on `ground-subtle`, exactly as
   before the photo existed.

**I would pick 1**, and 3 is a reasonable interim step.

**Blocked meanwhile:** the section height cannot be increased. Giving the panel
presence makes the photograph visible, which is how this was found.

---

## 6. The 90 kB JS budget is not reachable

**Ambiguity.** `CLAUDE.md` §13 sets first load JS under 90 kB gzipped as a gate,
not an aspiration. The measured floor for React 19 plus Next 15 with **zero**
client components is 103 kB. The site ships 103 kB today with four client
components.

**Settles it:** `CLAUDE.md` §13 and `TECHNICAL_ARCHITECTURE.md`.

So 13 kB of the overage is structural and cannot be removed without changing
framework.

**Options.**

1. **Amend the number to something reachable**, for example 110 kB, and record
   why. Honest, and keeps the gate meaningful.
2. **Change framework**, for example Astro with islands. Reaches the number and
   discards the entire current implementation.
3. **Leave 90 kB in place.** The gate then fails permanently and stops being
   read, which is worse than having no gate.

**I would pick 1.** A gate nobody can pass is a gate nobody looks at. Option 2
is a real answer to a different question, which is whether this site needs React
at all, and that question is worth asking separately.

**Blocked meanwhile:** the performance gate reports a failure that no change can
fix, which trains everyone to ignore it.

---

## 7. Disclosure clearance for the three projects

**Ambiguity.** Three projects exist as content and none has a signed disclosure
checklist. `CLAUDE.md` §16.8 is explicit: preparation is allowed, clearance is a
human decision.

**Settles it:** `docs/projects/PROJECT_FRAMEWORK.md` §20.

**Blocked by this:** the three cover images, which are the only assets still
reported as pending by `check:assets`, and with them the proof section of the
home page.

**This is not a design question and has no technical workaround.** It needs a
signature per project.
