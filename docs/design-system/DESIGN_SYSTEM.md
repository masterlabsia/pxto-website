# PXTO Design System Specification

**Version:** 1.0
**Status:** Specification. No component is implemented.
**Sources:** [`../PRD.md`](../PRD.md) §30 to §35, [`../brand/VISUAL_DIRECTION.md`](../brand/VISUAL_DIRECTION.md) v2.0, [`../brand/BRAND_FOUNDATION.md`](../brand/BRAND_FOUNDATION.md), [`../strategy/POSITIONING.md`](../strategy/POSITIONING.md), [`../architecture/PAGE_SPECS.md`](../architecture/PAGE_SPECS.md), and the `design-taste-frontend` skill.

> **Zero em-dash characters in this document**, per the skill's Section 9.G. The
> rule governs the product, so it governs its specification.

---

## How to read this document

| Status | Meaning |
| --- | --- |
| `DERIVED` | Fixed by the PRD or by an approved decision. **Binding.** |
| `SPECIFIED` | Structure, ratio or rule decided here. Safe to build against. No brand fact invented. |
| `CANDIDATE` | A concrete value offered so the system is legible. **Not a selection.** Replaced when brand decides. |
| `BLOCKED` | Requires an asset or decision PXTO has not supplied. **Must not be invented.** See Part IV. |

### Two dependencies stated up front

**1. This system is specified against Direction A prime, Especificação**
(`VISUAL_DIRECTION.md` Part VI), which is **recommended and not approved**. If a
different direction is chosen, the token *structure* below survives unchanged.
What changes is a small set of values: radius scale, density, motion ceiling, and
the layout families in Part I.7.

**2. Brand assets do not exist.** No logo, no palette, no typefaces (Brand
Foundation §15). Every colour and typeface here is `CANDIDATE`. Part IV lists
exactly what PXTO must supply, in the order it is needed.

### Project dials

`DERIVED` from `VISUAL_DIRECTION.md` Part I.2. Every rule below is gated by
these.

```
DESIGN_VARIANCE:  6
MOTION_INTENSITY: 5
VISUAL_DENSITY:   5
```

---

# PART I. FOUNDATIONS

## 1. Design principles

`DERIVED` from PRD §32, extended with the rules that govern this system.

1. **Consistency above variety.** One solution per problem, reused.
2. **Clear visual hierarchy.** Every screen has one primary thing.
3. **Consistent spacing.** Space comes from the scale, never from a one-off value.
4. **Legible typography.** Measure, contrast and rhythm before expression.
5. **Responsive from the start**, not retrofitted.
6. **Animation must have a function.** If it cannot be justified in one sentence,
   it does not ship.
7. **No effect exists to demonstrate technology.**
8. **Performance is never traded for aesthetics.**
9. **No second component for a problem an existing component solves.**

Three added here, from the positioning:

10. **Precision is the credibility.** The copy claims nothing, so exactness of
    alignment, spacing and rhythm carries the authority (Positioning §14.6).
11. **No slot may exist that wants social proof.** No logo wall, no counter, no
    testimonial region, at any breakpoint (Positioning §13.6).
12. **Omit, never empty.** A section with no content is removed, not filled with
    a placeholder or an empty state.

## 2. Visual personality

`DERIVED` from PRD §33 and the brief.

**Must communicate:** technology, precision, engineering, sophistication,
simplicity, confidence.

**Expressed as:**

| Quality | How the system expresses it |
| --- | --- |
| Technology | Mono used for real metadata, not as decoration |
| Precision | Strict baseline rhythm, exact optical alignment, one spacing scale |
| Engineering | Structure visible in the layout, terms defined, figures captioned |
| Sophistication | Restraint. Near-monochrome, one accent, almost no motion |
| Simplicity | Few components, few variants, no ornament |
| Confidence | Moderate display scale. Large type is a claim, and this brand does not make claims |

**Must never resemble:** futuristic, cyberpunk, generic AI startup, creative
agency, SaaS template, gradient-heavy, glassmorphism-heavy (§33).

## 3. Colour system

### 3.1 Architecture

`SPECIFIED`

Semantic tokens only. No component references a raw hex value or a palette step
directly.

```
--color-ground            page background
--color-ground-subtle     alternating section background
--color-surface           raised surface, panel, input
--color-ink               primary text
--color-ink-secondary     captions, metadata, helper text
--color-ink-disabled      disabled text
--color-rule              borders and dividers
--color-rule-strong       emphasised border, input border
--color-accent            links, focus, defined terms, active state
--color-accent-hover      accent interactive state
--color-accent-contrast   text on an accent fill
--color-success           form success only
--color-danger            form error only
--color-focus             focus ring
```

**Colour consistency lock.** One accent for the entire site. A page does not gain
a second accent in a later section. Success and danger are reserved for form
state and appear nowhere else.

### 3.2 Candidate values

`CANDIDATE`. Replaced by the brand palette when it exists.

| Token | Light | Dark |
| --- | --- | --- |
| `ground` | `#FCFCFC` | `#0E0F11` |
| `ground-subtle` | `#F4F5F6` | `#141619` |
| `surface` | `#FFFFFF` | `#1A1D21` |
| `ink` | `#111214` | `#E9EBED` |
| `ink-secondary` | `#5C6066` | `#8E949B` |
| `ink-disabled` | `#9AA0A6` | `#5F666D` |
| `rule` | `#E3E5E8` | `#242830` |
| `rule-strong` | `#C7CBD1` | `#343A43` |
| `accent` | `#1B4DE4` | `#5B86FF` |
| `accent-hover` | `#1740BE` | `#7C9EFF` |
| `accent-contrast` | `#FFFFFF` | `#0E0F11` |
| `success` | `#1A7F4B` | `#4ADE80` |
| `danger` | `#B42318` | `#FF6B5E` |
| `focus` | same as accent | same as accent |

### 3.3 Rules

`DERIVED` and `SPECIFIED`

1. **Dual mode is mandatory.** Both themes ship together and both are tested.
2. **No pure black, no pure white** as ground or ink. Pure values kill depth.
3. **Theme lock per page.** No section inverts mid-page.
4. **No gradients** as surface or brand expression. §33.
5. **No glassmorphism.** No `backdrop-filter` as a surface treatment. §33.
6. **No glow.** No coloured outer shadow, ever.
7. **Accent carries meaning.** If it appears, something is interactive, focused,
   or defined. It is never decorative.
8. **Every pair validated** against WCAG 2.2 AA before use. Part I.15.

## 4. Typography system

### 4.1 Roles

`SPECIFIED`

| Role | Job | Requirement |
| --- | --- | --- |
| **Display** | Page and section headings | Grotesk with real presence at 32 to 56px. Variable weight preferred |
| **Body** | Running copy, UI labels | Same family at text weights. Excellent at 16 to 18px |
| **Utility** | Definitions, captions, figure references, capability tags, form metadata | Monospace, tabular figures |

**One family plus its mono companion.** A matched pair reads as a system. Two
unrelated families read as a compromise.

### 4.2 Candidate families

`CANDIDATE`. `BLOCKED` on the brand decision.

| Role | Candidates |
| --- | --- |
| Display and body | Geist, Söhne, ABC Diatype, PP Neue Montreal |
| Utility | Geist Mono, Söhne Mono, JetBrains Mono, Berkeley Mono |

Applying the skill's Section 4.1:

- **No serif.** "It feels premium" is not a justification. A serif is admissible
  only if the brand brief names one.
- **`Fraunces` and `Instrument_Serif` are banned** outright.
- **Inter is discouraged** as a default. Acceptable only if PXTO explicitly wants
  the neutral, Linear-adjacent read.
- **Emphasis inside a headline uses weight or italic of the same family.** Never
  a second family injected for visual interest.

### 4.3 Rules

1. Body measure between **60 and 72 characters**. Never full container width.
2. **One `h1` per page.** Heading levels never skip.
3. Italic in display type carrying a descender (`y g j p q`) needs
   `line-height: 1.1` minimum plus bottom reserve, or the descender clips.
4. Fonts self-hosted with `font-display: swap`. No Google Fonts link tag in
   production.
5. **Tabular figures** wherever numbers align in a column.
6. Uppercase used only for utility labels, never for headings or body.

## 5. Type scale

`SPECIFIED`. Base 16px. Roughly a 1.25 ratio at text sizes, loosening at display.
Ten steps, largest heading 3.5 times body, which is the ceiling Direction A prime
sets.

| Token | Size | Line height | Tracking | Use |
| --- | --- | --- | --- | --- |
| `text-2xs` | 11px | 1.45 | `0.02em` | Utility labels, capability tags |
| `text-xs` | 12px | 1.5 | `0.01em` | Captions, figure references |
| `text-sm` | 14px | 1.55 | `0` | Metadata, helper text, form labels |
| `text-base` | 16px | 1.6 | `0` | Body default |
| `text-lg` | 18px | 1.6 | `0` | Lead paragraph, large body |
| `text-xl` | 20px | 1.45 | `-0.005em` | Small heading, card title |
| `text-2xl` | 24px | 1.35 | `-0.01em` | Subsection heading, h3 |
| `text-3xl` | 30px | 1.25 | `-0.015em` | Section heading, h2 mobile |
| `text-4xl` | 38px | 1.15 | `-0.02em` | Section heading desktop, h2 |
| `text-5xl` | 48px | 1.1 | `-0.025em` | Page heading, h1 |
| `text-6xl` | 56px | 1.05 | `-0.03em` | Home hero only |

**Hero note.** PRD §12 fixes a three-line headline. The skill caps headlines at
two lines. The PRD wins, and the conflict is resolved by scale: the hero is set
at `text-4xl` mobile to `text-5xl` desktop, not `text-6xl`, so three lines still
fit the viewport with both CTAs visible. `text-6xl` is reserved and may go unused.

**Weights:** 400 body, 500 UI and labels, 600 headings. Three weights. No 300, no
800.

## 6. Spacing scale

`SPECIFIED`. Base unit 4px. Every margin, padding and gap comes from this scale.

| Token | Value | Typical use |
| --- | --- | --- |
| `space-1` | 4px | Icon to label |
| `space-2` | 8px | Label to input |
| `space-3` | 12px | Tight internal padding |
| `space-4` | 16px | Default internal padding, mobile gutter |
| `space-5` | 20px | Card padding mobile |
| `space-6` | 24px | Card padding, grid gutter |
| `space-8` | 32px | Block separation |
| `space-10` | 40px | Component group separation |
| `space-12` | 48px | Small section padding |
| `space-16` | 64px | Section padding mobile |
| `space-20` | 80px | Section padding tablet |
| `space-24` | 96px | Section padding desktop |
| `space-32` | 128px | The interval |

**The interval.** `space-32` is the borrowed idea from Direction B
(`VISUAL_DIRECTION.md` Part VII). It is a single oversized vertical gap used
between the major argument movements of a page, not between every section. On a
Home page it appears at most three times. It is what keeps a disciplined document
from reading as uniformly dense.

**Baseline rhythm:** 4px. Vertical spacing resolves to multiples of 4. This is
where "precision" becomes measurable rather than claimed.

## 7. Layout and grid

`SPECIFIED`

### 7.1 Grid

- **12 columns**, `lg` and above
- **6 columns**, `md`
- **Single column**, below `md`
- Gutter `space-6` desktop, `space-4` mobile
- CSS Grid only. **Never** flexbox percentage arithmetic such as
  `calc(33% - 1rem)`

### 7.2 Layout families

`DERIVED` from the skill's section-layout-repetition rule: at least four distinct
families across an eight-section page, and no family used twice in a row.

| Family | Structure | Used for |
| --- | --- | --- |
| **Measure** | Single column, 60 to 72ch, offset left | Argument sections: Problema, Posicionamento, Sobre |
| **Asymmetric split** | 7/5 or 5/7 columns, content and supporting asset | Como trabalhamos, solution page scope |
| **Equal grid** | 4 equal cells at `lg`, 2 at `md`, 1 below | Soluções only. Equal cells enforce the four-peer rule structurally |
| **Full-bleed figure** | Edge to edge image with caption below | Featured project, project gallery |
| **Record list** | Stacked rows, divided sparsely | Project index, capability lists |

**Zigzag cap:** at most two consecutive sections using asymmetric split. The
third is a pre-flight failure.

**Anti-center bias:** at `DESIGN_VARIANCE: 6`, section headers and hero content
are offset left, not centered. Centering is reserved for a single manifesto
moment if one is ever justified.

## 8. Containers

`SPECIFIED`

| Token | Max width | Use |
| --- | --- | --- |
| `container-prose` | 68ch | Running copy, argument sections |
| `container-content` | 1120px | Default page container |
| `container-wide` | 1360px | Full-bleed figures, hero split |
| `container-full` | 100% | Edge to edge media only |

Horizontal padding: `space-4` below `md`, `space-6` at `md`, `space-8` at `lg`
and above. Containers centre horizontally. Content inside them may be offset.

## 9. Breakpoints

`SPECIFIED`. The skill's standard set, unmodified.

| Token | Min width | PRD tier (§34) |
| --- | --- | --- |
| `sm` | 640px | Mobile large |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop large |
| `2xl` | 1536px | Large desktop |

**Mobile-first.** Base styles are mobile. Breakpoints add, never subtract.

**Viewport stability:** `min-height: 100dvh`, never `100vh`, for any full-height
region. `100vh` jumps on iOS Safari when the address bar collapses.

## 10. Border radius

`SPECIFIED`. **Shape consistency lock**: one documented rule, applied everywhere.

| Token | Value | Applies to |
| --- | --- | --- |
| `radius-none` | 0 | Structural surfaces, sections, panels, images, figures, tables |
| `radius-sm` | 2px | Interactive elements: buttons, inputs, selects, textareas, tags, focus rings |
| `radius-md` | 4px | Modal and popover only |

**The rule:** structure is sharp, interaction is slightly softened, nothing is
round. This encodes the engineering personality and it is checkable in review.

**Banned:** pill radius on buttons, fully rounded cards, mixed radii within one
component, any radius above 4px.

## 11. Shadows

`SPECIFIED`

**Elevation is communicated by border and ground shift, not by shadow.** This is
both a §33 requirement, since layered shadow reads as SaaS template, and a
performance decision.

| Token | Value | Use |
| --- | --- | --- |
| `shadow-none` | none | Everything by default |
| `shadow-overlay` | `0 8px 24px rgba(17,18,20,0.10)` light, `0 8px 24px rgba(0,0,0,0.45)` dark | Modal and popover only |

**Rules:** exactly one shadow token exists. It is tinted to the ground hue, never
pure black on a light ground. **No coloured shadow, no glow, no inset highlight
imitating glass.**

## 12. Iconography

`SPECIFIED`, following the skill's Section 3.C.

- **Family: Heroicons** (`@heroicons/react`), set `24/outline`. Decidido em
  29/08/2026 pela PXTO.

  Heroicons não constava na lista herdada da Taste Skill (Phosphor, Hugeicons,
  Radix Icons, Tabler). Foi adotado porque **satisfaz nativamente os requisitos
  que essa lista existia para garantir**, e é o único que satisfaz:

  | Requisito deste design system | Heroicons `24/outline` |
  | --- | --- |
  | Stroke padronizado em 1.5 | `strokeWidth: 1.5` por padrão |
  | Cor herdada do tema | `stroke: "currentColor"` por padrão |
  | Sem dimensão fixa, só `viewBox` | Sim |
  | Ícone decorativo não anunciado | `aria-hidden="true"` por padrão |

  Nenhuma das quatro opções listadas vem com stroke 1.5 por padrão. Na hierarquia
  de prioridade do projeto, o Design System (4) está acima da Taste Skill (5), e
  a regra substantiva é o stroke 1.5, não a lista de nomes. MIT, 324 ícones.

- **Um único set.** `24/outline`, dimensionado por classe (`size-4`, `size-5`).
  Não misturar com os sets `solid`, `20` ou `16`.
- **Never hand-roll SVG icon paths.**
- Sizes: 16, 20, 24. Aligned optically to the text baseline, not boxed.
- Icons are `aria-hidden` when adjacent to a text label. Icon-only controls carry
  an accessible name.
- **No emoji** in interface text.

**Where icons are permitted:** form state, disclosure controls, external link
indicators, navigation affordances.

**Em uso hoje**, e só aqui:

| Componente | Ícone | Justificativa |
| --- | --- | --- |
| `FormStatus` | `CheckCircleIcon`, `ExclamationTriangleIcon` | Cor não pode ser o único sinal (WCAG 1.4.1). O ícone é a pista redundante |
| `ArrowLink` | `ArrowRightIcon` | Afordância de navegação. Substituiu o glifo `&rarr;`, que nunca alinhava opticamente |

O toggle do menu mobile **continua em texto** ("Menu" / "Fechar"). Texto é mais
claro que um hambúrguer e não custa nada.

**Where icons are banned:** as decoration beside every section heading, as a
feature-grid ornament, as a substitute for a real image, or as a brand
illustration system. §33 and the skill both treat icon feature grids as a
template tell.

## 13. Image treatment

`SPECIFIED` and partly `BLOCKED`.

### 13.1 The constraint

The skill requires real images and treats a pure-text page as incomplete work.
PRD §53 forbids anything implying work, clients or results PXTO cannot evidence.
The intersection is narrow and non-negotiable in both directions.

| Permitted | Banned |
| --- | --- |
| Cleared captures of real project interfaces and outputs | Stock photography standing in for real work |
| Honest environmental or material photography | Generated mockups of work never built |
| Diagrams that explain a real flow | Div-based fake product UI, fake dashboards, fake terminals |
| Real product output, anonymised | Blurred or pixelated client marks |
| | Hand-rolled decorative SVG illustration |
| | Placeholder or "coming soon" imagery |

### 13.2 Treatment

- **Aspect ratios:** 16:9 for figures and covers, 4:3 for interface captures, 3:2
  for environmental photography. Consistent per context.
- **`radius-none`.** Images are not rounded.
- **No overlaid pills, tags or labels on images.** A caption sits below, outside
  the image.
- **No decorative photo credits.** Credit only where a real photographer is being
  credited.
- Captions in `text-xs`, `ink-secondary`.
- Every image has meaningful alt text. Decorative images use `alt=""`.
- Formats: AVIF or WebP with fallback. Explicit `width` and `height` to prevent
  layout shift. Lazy loading below the fold, eager for the hero.

### 13.2b Como uma seção recebe imagem

`SPECIFIED`

A unidade reutilizável é a **mídia**, não a seção. Seções têm proporções de grid
genuinamente diferentes, e um componente de seção com mídia viraria um
god-component com uma prop por variação.

```
src/components/ui/Media.tsx      resolve imagem real vs slot pendente
src/components/ui/ImageSlot.tsx  o slot rotulado, usado só pelo Media
src/content/*.ts                 dono da referência do ativo
```

**A seção continua dona do seu layout.** O `Media` só entrega o quadro pronto.

**Ligar e desligar é edição de conteúdo, não de componente.** Um campo `media`
opcional no conteúdo da seção:

| Estado do conteúdo | O que renderiza |
| --- | --- |
| Sem campo `media` | A composição sem imagem da seção |
| `media` com `pending: true` | Split assimétrico com o slot rotulado |
| `media` com `pending: false` | Split assimétrico com `next/image` |

Publicar a foto é remover uma flag. Remover a foto é apagar o campo. Em nenhum
dos casos o componente muda. `Posicionamento` implementa as duas composições e
serve de referência.

**`alt` e `brief` são campos diferentes.** `alt` é texto acessível e descreve a
imagem. `brief` descreve o que precisa ser produzido, aparece somente no slot
pendente, e nunca vira texto acessível. Sem separar, um dos dois fica errado:
"Imagem principal, 1600x1100" é briefing útil e alt péssimo.

**`sizes` é obrigatório** quando a imagem existe. Sem ele o navegador baixa a
maior variante em qualquer viewport.

**O `check-assets` valida imagem de seção**, não só de projeto. Tirar `pending`
sem o arquivo existir reprova o build.

**Cuidado com o teto de zigzag** (Part I.7): no máximo duas seções consecutivas
em split assimétrico. Adicionar mídia a uma seção pode estourar esse limite sem
que ninguém perceba.

### 13.2c Foto de fundo em bloco inteiro

`SPECIFIED`. Componente: `MediaBackdrop`.

Foto ocupando a seção inteira, com o texto por cima. Três decisões, nenhuma
estética.

**1. O véu usa a cor de fundo do próprio tema, não uma cor fixa.**

Um bloco com foto normalmente vira "sempre escuro", o que seria inversão de tema
no meio da página, proibida pelo theme lock (Part I.3.3 regra 3). Com o véu
seguindo o tema, o claro fica com texto escuro sobre foto clareada e o escuro
com texto claro sobre foto escurecida. A paridade de hierarquia se mantém.

Token: `--color-scrim`, definido como a cor de fundo do tema a 72%.

**2. A opacidade é 0.72, verificada e não escolhida por gosto.**

Pior caso possível, medido no browser com foto de teste totalmente preta:

| Tema | Fundo efetivo | Contraste com tinta primária |
| --- | --- | --- |
| Claro | `rgb(181,181,181)` | **9,19:1** |
| Escuro | `rgb(10,11,12)` | **16,49:1** |

Reduzir a opacidade exige verificar contra a foto real. Abaixo de 0.65 reprova
em AA no tema escuro.

**3. O estado pendente não renderiza placeholder.**

Sem foto, o bloco fica exatamente como estava. Um slot rotulado ocupando uma
seção inteira seria pior que a ausência da foto.

#### Regra de texto sobre foto

**Dentro de `MediaBackdrop` o corpo usa tinta primária, nunca
`ink-secondary`.** A secundária reprova em AA sobre foto em qualquer opacidade
de véu, medido:

| Opacidade | Secundária, tema claro | Secundária, tema escuro |
| --- | --- | --- |
| 0.60 | 2,17:1 | 1,64:1 |
| 0.72 | 3,10:1 | 2,55:1 |
| 0.80 | 3,84:1 | 3,44:1 |

Nenhuma alcança 4,5:1. **A hierarquia vem de tamanho e peso, não de cor.**

#### O véu e a proibição de gradiente

PRD 33 proíbe uso pesado de gradiente. O véu é uma camada sólida e uniforme, e é
mecanismo de acessibilidade, não decoração: sem ele o contraste sobre foto
arbitrária não é garantido. A mesma lógica que permite movimento com função
(§32.6) permite este véu. Um véu em degradê, para efeito visual, continua
proibido.

### 13.3 Blocked

`BLOCKED`. **PXTO has no cleared images.** See Part IV.3. Until assets exist,
image regions are labelled placeholder slots in the implementation and are listed
for PXTO, which is what the skill prescribes as the last resort.

## 14. Motion principles

`SPECIFIED`. `MOTION_INTENSITY: 5`. Elevado de 3 em 29/08/2026, decisão da PXTO,
para sustentar a narrativa visual da home.

### 14.0 Revelação de entrada

Uma única adição em relação ao dial 3: elementos revelam ao entrar na viewport,
com deslocamento de 8px e opacidade.

**Implementada em CSS puro**, `animation-timeline: view()`, em
`src/styles/globals.css`. Zero JavaScript, zero client component novo. O
argumento não é peso, é modo de falha: IntersectionObserver exigiria esconder o
conteúdo até um script rodar, o que contradiz 14.2. Navegador sem suporte a
`view()` recebe a página estática, que é o estado aprovado anteriormente.

**Duplo portão, e a ordem importa:**

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) { ... }
}
```

O portão de reduced-motion **não é redundante** com o bloco `!important` de
14.3. Animação por timeline é progress-based: a duração é ignorada e o progresso
vem da posição de rolagem. Zerar `animation-duration` não desliga nada. A defesa
correta é não escrever a regra.

**`animation-range: entry 0% entry 45%`**, nunca `cover`: um elemento mais alto
que a viewport nunca completaria a faixa e ficaria travado em opacidade parcial,
que é falha de contraste, não detalhe estético. `fill-mode: both` faz o que já
está visível no carregamento renderizar em opacidade 1 de imediato.

**Onde nunca aplicar:**

1. **No Hero.** É candidato a LCP, e o Chrome atrasa LCP em elemento com
   opacidade abaixo de 1.
2. **Na raiz do `MediaBackdrop`.** A foto entraria junto com o texto. Aplicar no
   bloco de texto interno: a foto está presente, as palavras chegam.
3. **No interior de um diagrama.** Setas percorrendo o fluxo é scroll-scrub, o
   que levaria o dial para 7. O diagrama é revelado como bloco único.

**Sem `will-change`.** Com mais de dez elementos animados, promover todos a
camada custa mais do que economiza.

### 14.1 What exists

State feedback, mais a revelação de 14.0:

| Interaction | Duration | Easing |
| --- | --- | --- |
| Hover, focus, active | 120ms | `ease-out` |
| Defined term reveal | 140ms | `ease-out` |
| Disclosure open and close | 180ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Menu open and close | 180ms | same |
| Form state change | 160ms | `ease-out` |

Animated properties are limited to `opacity`, `transform`, `background-color`,
`border-color` and `color`. Never `height`, `width`, `top` or `left`.

### 14.2 What does not exist

- **Nenhum scroll-scrub, nenhum pinning, nenhum parallax.** A revelação de 14.0
  é a única animação disparada por posição, e ela move só opacidade e translate.
  O conteúdo continua presente quando a página está: sem o mecanismo, tudo
  renderiza normalmente.
- No parallax, no pinning, no scroll hijack.
- No perpetual loops, no marquee, no shimmer, no typewriter.
- No page transition.
- **No `window.addEventListener('scroll')`.** Hard ban. Use IntersectionObserver
  or CSS scroll-driven animation if a case ever arises.

### 14.3 Rules

1. **Motion must be motivated.** Justify in one sentence as hierarchy,
   storytelling, feedback, or state transition. "It looks good" is not an answer.
2. **Motion claimed is motion shown.** At intensity 3 the page is honestly still.
   Nothing half-built.
3. `prefers-reduced-motion: reduce` remove transições de transform e opacidade e
   deixa mudanças de estado instantâneas. Transições de cor podem permanecer.
   **Para a revelação de 14.0 a regra é mais forte:** ela não é sequer escrita
   sob reduced-motion, porque zerar duração não desliga animação por timeline.
   O gate `audit:a11y` verifica `animationName` e `animationTimeline`, não só
   `transitionDuration`.
4. **Tactile feedback** on `:active` is a 1px translate or `scale(0.98)`, not a
   colour flash.

## 15. Accessibility requirements

`DERIVED` from PRD §35. Target: **WCAG 2.2 AA where technically applicable.**

### 15.1 Contrast

| Content | Minimum |
| --- | --- |
| Body text | 4.5:1 |
| Large text, 18px or 14px bold and above | 3:1 |
| UI component boundaries, icons carrying meaning | 3:1 |
| Focus indicator against adjacent colours | 3:1 |
| Placeholder and helper text | 4.5:1. **Light grey placeholders are a fail** |

Every token pair is validated before use. Disabled states are exempt from the
ratio but must still be visibly distinguishable.

### 15.2 Focus

- Visible focus on every interactive element. `outline: 2px solid
  var(--color-focus)` with `outline-offset: 2px`.
- `:focus-visible` for keyboard, never `outline: none` without a replacement.
- **2.4.11 Focus Not Obscured:** a focused element is never hidden behind a
  sticky header. Sticky navigation requires `scroll-margin-top` on focus targets.
- **2.4.13 Focus Appearance:** the indicator is at least 2px thick and contrasts
  3:1 with both the component and the background.

### 15.3 Targets and input

- **2.5.8 Target Size:** interactive targets at least 24 by 24 CSS pixels. 44 by
  44 preferred for primary actions on touch.
- Full keyboard operability. Logical tab order. No keyboard trap.
- Skip link to main content, first in the tab order.
- **3.3.2 Labels:** every input has a persistent visible label. **Placeholder as
  label is banned.**
- **3.3.7 Redundant Entry:** do not ask for the same information twice in one
  flow.
- Errors identified in text, not by colour alone, and associated with the field
  by `aria-describedby`.

### 15.4 Structure

- Semantic HTML first. `button` for actions, `a` for navigation.
- One `h1` per page. No skipped levels.
- Landmarks: `header`, `nav`, `main`, `footer`.
- Language declared as `pt-BR`.
- Text resizes to 200 percent without loss of content or function.
- Content reflows at 320px width without horizontal scrolling.

## 16. Component principles

`SPECIFIED`

1. **Compose, do not duplicate.** A variant is a prop, not a new component.
2. **Every component declares its states**, at minimum default, hover, focus,
   active, disabled. Interactive data components add loading, error, empty.
3. **Every component declares its responsive collapse** in its own definition.
   "Tailwind will handle it" is not a specification.
4. **No component owns page-level spacing.** Sections own vertical rhythm.
5. **No component hardcodes colour, size or spacing.** Tokens only.
6. **Accessible by construction.** A component that requires the consumer to add
   an aria attribute to be correct is incomplete.
7. **Build on demand.** A component with no page in `PAGE_SPECS.md` that needs it
   is not built. Speculative components become drift.
8. **Cards are used only where elevation communicates real hierarchy.** Otherwise
   group with a divider or with space.

## 17. Responsive behaviour

`SPECIFIED`

| Rule | Detail |
| --- | --- |
| Mobile-first | Base styles are mobile. Breakpoints add |
| Explicit collapse | Every multi-column layout declares its behaviour below `md` |
| Asymmetry collapses | At `DESIGN_VARIANCE: 6`, offset layouts become a single full-width column below `md` |
| Type scales down | Display steps drop one to two steps at `md` and below |
| Section padding | `space-16` mobile, `space-20` at `md`, `space-24` at `lg` |
| The interval | `space-20` mobile, `space-32` at `lg` |
| Touch targets | 44px minimum on touch viewports |
| Navigation | Single line at `lg` and above, height 64 to 72px, 80px maximum. Below `lg`, a menu with the primary CTA still reachable without opening it |
| No horizontal scroll | At any width, except inside a deliberate scroll container |
| Tables and wide content | Scroll inside their own container, never the page |

## 18. Do and Don't

### Colour

| Do | Don't |
| --- | --- |
| One accent, locked site-wide | A second accent for a later section |
| Elevation by border and ground shift | Layered shadows to fake depth |
| Off-black and off-white | `#000000` and `#FFFFFF` |
| Validate every pair for contrast | Grey placeholder text at 3:1 |

### Typography

| Do | Don't |
| --- | --- |
| One family plus its mono companion | A display serif because it feels premium |
| Emphasis by weight or italic in family | A serif word injected into a sans headline |
| 60 to 72ch measure | Body text spanning the full container |
| Three weights | Six weights and two families |

### Layout

| Do | Don't |
| --- | --- |
| Four or more layout families per long page | The same split repeated down the page |
| Offset composition | Centered everything |
| Omit an empty section | Render an empty state or a placeholder |
| Equal cells for the four capabilities | One capability given more space |

### Motion

| Do | Don't |
| --- | --- |
| Feedback on interaction | Scroll-triggered entrance reveals |
| 120 to 180ms | 600ms eased choreography |
| Respect reduced motion | Ship motion the reduced-motion path breaks |

### Content surfaces

| Do | Don't |
| --- | --- |
| Real, cleared imagery | Stock photography or generated mockups |
| Caption below the image | Pills and tags overlaid on the image |
| Plain section headings | An eyebrow above every section |
| Sequence numbers only where order matters | `01 / 02 / 03` as decoration |
| Periods and commas | Em-dash, anywhere |

---

# PART II. COMPONENT INVENTORY

`DERIVED` from PRD §31. **Nothing below is implemented.** Each entry defines
purpose, variants, states, anatomy, responsive behaviour and prohibitions.

**Build order** follows PRD §55 Phase 3 and the dependency chain: primitives
first, then composites, then page-specific.

## Tier 1. Primitives

### Button

| | |
| --- | --- |
| **Purpose** | Trigger an action or navigate to a primary destination |
| **Variants** | `primary` accent fill, `secondary` outline, `ghost` text only |
| **Sizes** | `md` 40px, `lg` 48px. Two sizes only |
| **States** | default, hover, focus-visible, active, disabled, loading |
| **Anatomy** | Label, optional leading or trailing icon, optional loading indicator |
| **Responsive** | Full width below `md` when it is the only action in a block. Never full width beside another button |
| **A11y** | `button` element for actions. Icon-only variants carry an accessible name. Contrast validated for every variant against its ground |
| **Rules** | Label fits **one line at desktop**. Primary CTA labels are one to three words. `radius-sm`. Active state translates 1px. Exactly one primary button per view |
| **Never** | Pill radius. Gradient fill. Glow. Two primary buttons competing. A label that wraps |

### Link

| | |
| --- | --- |
| **Purpose** | Navigate within or outside the site |
| **Variants** | `inline` within prose, `standalone` block level, `quiet` for footer and metadata |
| **States** | default, hover, focus-visible, visited for prose links |
| **Anatomy** | Text, optional external indicator icon |
| **A11y** | Underline or another non-colour affordance in prose. External links announce that they open a new tab |
| **Rules** | Accent colour. Underline offset at least 2px so descenders stay legible |
| **Never** | Colour as the only signal in body copy. "Clique aqui" as link text |

### Heading

| | |
| --- | --- |
| **Purpose** | Establish document structure |
| **Variants** | `h1` through `h4`, each mapped to type scale steps |
| **Anatomy** | Text only |
| **Responsive** | Drops one to two scale steps below `md` |
| **A11y** | Level is semantic and set independently of visual size. One `h1` per page. No skipped levels |
| **Rules** | Offset left, not centered. Balanced wrapping on display sizes |
| **Never** | A heading level chosen for its size. An eyebrow attached by default |

### Text

| | |
| --- | --- |
| **Purpose** | Body copy and supporting text |
| **Variants** | `lead` 18px, `body` 16px, `small` 14px, `caption` 12px, `mono` utility |
| **Anatomy** | Paragraph or inline span |
| **Rules** | `container-prose` measure. `ink` for body, `ink-secondary` for captions and metadata |
| **Never** | Full-width body copy. Mono for prose |

### Container

| | |
| --- | --- |
| **Purpose** | Constrain and centre content width |
| **Variants** | `prose`, `content`, `wide`, `full` per Part I.8 |
| **Responsive** | Horizontal padding steps at `md` and `lg` |
| **Rules** | Layout only. No background, no border, no vertical spacing |

### Section

| | |
| --- | --- |
| **Purpose** | Own vertical rhythm and optional ground change |
| **Variants** | `default`, `subtle` using `ground-subtle`, `interval` applying `space-32` above |
| **Anatomy** | Semantic `section`, optional heading slot, content slot |
| **Responsive** | Padding steps per Part I.17 |
| **Rules** | The only component permitted to own page vertical spacing. Ground alternation stays within the active theme |
| **Never** | Invert the theme. Nest sections |

### Badge

| | |
| --- | --- |
| **Purpose** | Label a capability or category |
| **Variants** | `capability` for solution mapping, `category` for project technical nature |
| **Anatomy** | Mono text, 11px, `radius-sm`, subtle border, no fill by default |
| **A11y** | Decorative badges are `aria-hidden` when the label repeats adjacent text |
| **Rules** | Text only. Capability first per Project Framework §2.4 |
| **Never** | A status dot. A colour-coded system implying data. Use as a marketing pill. Overlay on an image |

### Image

| | |
| --- | --- |
| **Purpose** | Render a real visual asset |
| **Variants** | `figure` with caption, `cover` for cards, `bleed` full width |
| **States** | loading placeholder that reserves exact dimensions, error fallback |
| **A11y** | Alt required. Empty alt for decorative |
| **Rules** | Explicit dimensions. AVIF or WebP with fallback. `radius-none`. Caption below, outside |
| **Never** | Overlaid labels. Decorative credits. Stock or mockup content |

### Video

| | |
| --- | --- |
| **Purpose** | Project demonstration only |
| **States** | poster, playing, paused, error |
| **A11y** | Captions where speech exists. Controls keyboard operable. Never autoplay with sound |
| **Rules** | Lazy loaded, poster image required, respects reduced motion for any autoplay |
| **Never** | Background video. Autoplay as decoration |

## Tier 2. Form

### Input, Textarea, Select

| | |
| --- | --- |
| **Purpose** | Collect one field of contact information |
| **States** | default, hover, focus-visible, filled, disabled, error, success |
| **Anatomy** | Visible label above, control, helper text below, error text below |
| **Responsive** | Full width in all cases. 44px minimum height on touch |
| **A11y** | Label bound by `for` and `id`. Errors bound by `aria-describedby` and `aria-invalid`. Contrast validated for border, placeholder and helper text |
| **Rules** | `radius-sm`. Border `rule-strong`. Focus ring on the control, not a colour change alone. Select has a visible default option |
| **Never** | Placeholder as label. Grey-on-white placeholder below 4.5:1. Error signalled by border colour alone |

### Form

| | |
| --- | --- |
| **Purpose** | Compose fields, validation and submission for the contact page |
| **States** | idle, validating, submitting, success, error |
| **Anatomy** | Field stack, privacy notice slot, submit button, status region |
| **A11y** | Status region is `aria-live="polite"`. Focus moves to the status message on completion. Errors summarised and linked when more than one |
| **Rules** | Validation on blur and on submit, never on every keystroke. Submission blocked while invalid. Anti-spam is server side |
| **Never** | Expose credentials client side. Collect a field the PRD does not list. Promise a response time PXTO has not defined |

## Tier 3. Composites

### Card

| | |
| --- | --- |
| **Purpose** | Group related content where elevation communicates real hierarchy |
| **Variants** | `bordered` default, `subtle` ground shift. No elevated variant |
| **States** | default, hover, focus-within when the whole card is a link |
| **Anatomy** | Optional media slot, content slot, optional action slot |
| **Responsive** | Full width below `md` |
| **Rules** | `radius-none`. Border `rule`. Hover shifts border to `rule-strong`, never adds a shadow |
| **Never** | Shadow elevation. Rounded corners. Use where a divider or space would do |

### ServiceCard

| | |
| --- | --- |
| **Purpose** | Present one of the four capabilities |
| **Anatomy** | Title, PRD description, optional scope list, link to the capability page |
| **Responsive** | Equal grid, 4 at `lg`, 2 at `md`, 1 below |
| **Rules** | **All four instances are visually identical.** Equal cell size, equal content depth, equal treatment. This enforces the four-peer rule structurally |
| **Never** | An icon per service. One service styled as featured. Different content lengths creating implied hierarchy |

### ProjectCard

| | |
| --- | --- |
| **Purpose** | Represent one project on the index, on Home, and on solution pages |
| **Anatomy** | Cover image, title, capability badge, summary, link |
| **Responsive** | Full width below `md`, two columns at `md` and above |
| **Rules** | **One card format across the entire site.** Whole card is the link target. Uniform height |
| **Never** | Client logo. Any metric. A status or "confidencial" badge. A non-clickable or "em breve" state. A grid that requires a minimum count to look complete |

### Navbar

| | |
| --- | --- |
| **Purpose** | Primary navigation and permanent access to the primary CTA |
| **Anatomy** | Logo, four links, CTA button |
| **States** | default, scrolled, mobile open and closed |
| **Responsive** | Single line at `lg`, height 64 to 72px. Below `lg`, a menu. **The CTA remains reachable without opening the menu** |
| **A11y** | `nav` landmark. Current page indicated by `aria-current`. Menu toggle announces expanded state. Focus trapped while the menu is open and restored on close |
| **Rules** | Five items maximum plus the CTA. No mega menu, per §10.1 |
| **Never** | Two lines at desktop. A height above 80px. A dropdown exposing the four solutions |

### Footer

| | |
| --- | --- |
| **Purpose** | Secondary navigation and company identity |
| **Anatomy** | Descriptor line, solution links, site links, contact channels, legal line |
| **Responsive** | Columns at `md` and above, stacked below |
| **Rules** | Contact channels and legal links are `BLOCKED` on PXTO input |
| **Never** | Social proof of any kind. Placeholder social icons for accounts that do not exist. A version stamp |

### CTA

| | |
| --- | --- |
| **Purpose** | Convert intent at the end of a page or major section |
| **Anatomy** | Heading, one supporting line, one primary button |
| **Responsive** | Offset left at `lg`, stacked below |
| **Rules** | One primary action. Follows an argument, never precedes the reason to act |
| **Never** | Two CTAs of the same intent on one page. Manufactured urgency. A secondary CTA competing at equal weight |

### Accordion

| | |
| --- | --- |
| **Purpose** | Progressive disclosure of secondary detail |
| **States** | collapsed, expanded, focus-visible |
| **A11y** | `button` header with `aria-expanded` and `aria-controls`. Keyboard operable. Content is in the DOM when collapsed only if it must be findable |
| **Rules** | Animate `grid-template-rows` or `max-height` with a measured value, 180ms |
| **Status** | **No page in `PAGE_SPECS.md` currently requires this.** Do not build until one does |

### Modal

| | |
| --- | --- |
| **Purpose** | Interrupt for a required decision |
| **A11y** | Focus trap, restore focus on close, `Escape` closes, background inert, labelled by its heading |
| **Rules** | `radius-md`. The only component permitted `shadow-overlay` |
| **Status** | **Not required by any current page.** Do not build until one does |

### Tabs

| | |
| --- | --- |
| **Purpose** | Switch between peer views of comparable content |
| **A11y** | Full ARIA tabs pattern with arrow-key navigation |
| **Status** | **Not required by any current page.** Do not build until one does |

## Tier 4. Direction-specific

These exist because Direction A prime requires them. If a different direction is
approved, they are removed.

### Logo

| | |
| --- | --- |
| **Purpose** | Company mark in the navbar and footer |
| **Variants** | Full and compact, light and dark theme |
| **A11y** | Link to `/` with accessible name "PXTO, página inicial" |
| **Status** | **`BLOCKED`. No logo exists.** See Part IV.1 |

### DefinedTerm

| | |
| --- | --- |
| **Purpose** | The signature of Direction A prime. Reveals a one-line definition for an operational term inside running copy |
| **States** | default with hairline underline, hover, focus-visible, revealed |
| **Anatomy** | Term text, hairline underline, mono definition in a popover or inline expansion |
| **Responsive** | Popover on pointer devices. Tap to expand inline on touch |
| **A11y** | Keyboard reachable, `aria-describedby` binding, dismissible with `Escape`, never hover-only |
| **Rules** | At most three per page. Definitions come from PXTO, never invented |
| **Never** | Decorative use on a term that needs no definition |

### Figure

| | |
| --- | --- |
| **Purpose** | An image or diagram with a caption, referenced from the text |
| **Anatomy** | `figure`, image or diagram, `figcaption` |
| **Rules** | Caption in `text-xs` `ink-secondary`. Reference from the body copy where it aids comprehension |

### ProcessStep

| | |
| --- | --- |
| **Purpose** | One of the five steps in Como trabalhamos |
| **Anatomy** | Step name, PRD description, optional expansion line |
| **Rules** | Named by its verb. The numeral appears once, in the one place where the order carries meaning, and never as an eyebrow-styled micro-label |
| **Never** | `Stage 1` or `Phase 01` phrasing. Enumeration repeated elsewhere on the site |

### SkipLink

| | |
| --- | --- |
| **Purpose** | Keyboard bypass to main content |
| **Rules** | First element in the tab order. Visible on focus. Label "Pular para o conteúdo" |

## Component summary

| Tier | Components | Status |
| --- | --- | --- |
| Primitives | Button, Link, Heading, Text, Container, Section, Badge, Image, Video | Specified |
| Form | Input, Textarea, Select, Form | Specified. Contact page content `BLOCKED` |
| Composites | Card, ServiceCard, ProjectCard, Navbar, Footer, CTA | Specified. Footer partly `BLOCKED` |
| Deferred | Accordion, Modal, Tabs | Specified. **Not built until a page needs one** |
| Direction-specific | Logo, DefinedTerm, Figure, ProcessStep, SkipLink | Logo `BLOCKED` |

**24 components. Three deferred. Two blocked on brand or business input.**

---

# PART III. TOKEN NAMING

`SPECIFIED`

```
--color-{role}                 semantic only, never --color-blue-500
--text-{step}                  2xs xs sm base lg xl 2xl 3xl 4xl 5xl 6xl
--font-{role}                  display body utility
--weight-{name}                regular medium semibold
--space-{n}                    1 2 3 4 5 6 8 10 12 16 20 24 32
--radius-{name}                none sm md
--shadow-{name}                none overlay
--container-{name}             prose content wide full
--duration-{name}              fast 120 base 160 slow 180
--ease-{name}                  out standard
--z-{name}                     base dropdown sticky overlay modal
```

**Rules:** semantic naming only. A component never reads a palette step. `z-index`
values come from the scale, never arbitrary numbers. Theme switching replaces
values, never token names.

---

# PART IV. REQUIRED BRAND ASSETS

**Nothing in this section may be invented** (PRD §52, §53). Listed in the order
the build needs it.

### 1. Logo. `BLOCKED`
Files in SVG, full and compact lock-ups, light and dark variants, clear space and
minimum size rules, misuse rules. **Blocks:** Navbar, Footer, favicon, Open Graph
images.

### 2. Colour palette. `BLOCKED`
Brand colours mapped to the semantic roles in Part I.3.1, in both themes, with
AA contrast validated. **Blocks:** every component. Candidate values allow work to
proceed but must be replaced before launch.

### 3. Typefaces. `BLOCKED`
Display and body family plus its mono companion. Licence covering web use.
Self-hostable files. **Blocks:** the type scale in Part I.5, which is specified as
ratios and will need optical adjustment to the real faces.

### 4. Photography. `BLOCKED`. **Launch blocker.**
The site requires real images (Part I.13). PXTO currently has none cleared.
Needed: cleared project captures for both projects, one hero image, and two or
three supporting images. Until then, implementation carries labelled placeholder
slots and a list handed to PXTO.

### 5. Contact channels and legal copy. `BLOCKED`
E-mail, phone or WhatsApp, and privacy notice wording if LGPD applies. **Blocks:**
Footer and the contact Form.

### 6. Term definitions. `BLOCKED`
One-line definitions for the operational terms used by DefinedTerm. Must come
from PXTO.

---

# PART V. OPEN DECISIONS

An agent must not resolve these (§52).

1. **Approve a visual direction.** This system is specified against A prime,
   which is recommended and not approved.
2. **All six blocked assets in Part IV.**
3. **Typeface selection**, including whether Inter is acceptable.
4. **Whether the process step numerals appear at all**, given the conflict
   recorded in `VISUAL_DIRECTION.md` Part IV.1.
5. **Icon library choice** from the permitted set.
6. **Whether dark mode ships at launch** or in a second phase. This
   specification assumes both themes ship together, per the skill's protocol,
   and the PRD is silent.

---

# PART VI. NEXT STEPS

1. Approve or reject Direction A prime.
2. Supply the Part IV assets, in order.
3. Remediate `WEBSITE_COPY.md` for the em-dash and middle-dot rules
   (`VISUAL_DIRECTION.md` Part V.1).
4. Write `foundations.md` and `tokens.md` with real values once the palette and
   typefaces exist.
5. Build Tier 1 primitives, then Tier 2, then Tier 3. Skip the deferred tier.
6. Assemble pages per `PAGE_SPECS.md`.

**No component is built before step 2 delivers at least the palette and the
typefaces.** Building against candidate values means rebuilding.
