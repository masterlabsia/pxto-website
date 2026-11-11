# CLAUDE.md

Operating rules for AI-assisted development of the PXTO website.

**Read this before touching anything.** It is the entry point. It does not
replace `docs/`, it tells you which document governs what, and it states the
rules that are absolute.

**Governed by PRD §52 to §54.** AI is a development tool here, not a
decision-maker on positioning, brand, content or design system.

---

## 0. The eight absolutes

Violating any of these is a defect, not a judgement call.

1. **Never invent a factual claim.** No clients, metrics, testimonials, awards,
   certifications, partners, revenue, team size, project counts, performance
   results, years of experience, or technologies used in a project. Everything
   factual originates from PXTO (PRD §53).
2. **Never invent a capability.** The company does four things: integrações,
   automação, software, sites. Nothing else is offered. **Resultado como serviço
   é o modelo de contratação, não uma quinta oferta** (`POSITIONING.md` §18).
3. **Never change positioning** without explicit human approval.
4. **Never add a layout slot that wants social proof.** No logo wall, no
   testimonial region, no counter, no stat bar, no badge shelf, at any
   breakpoint. Not even empty. **Única exceção, decidida em 11/11/2026:** a seção
   **Parcerias** da Home, que lista só nomes de empresas autorizadas, em texto, com
   peso igual, **numa faixa que passa na tela, logo abaixo do Hero e sem título
   visível** (ver 7.9). Sem logo, número,
   depoimento, descrição ou contador, e **omitida por inteiro quando nenhuma está
   autorizada**. O registro de cada autorização está em
   `docs/parcerias.md`. Qualquer outro uso continua proibido.
5. **Never publish a project** whose `published` flag is not `true`. That flag
   requires a signed disclosure checklist.
6. **Never use an em-dash** in anything a user can see. Zero. Use a period, a
   comma, a colon, parentheses, or restructure. This applies to copy, labels,
   alt text, captions, commit messages that surface, and error strings.
7. **Never introduce a dependency** without stating what it replaces and why the
   existing stack cannot do it.
8. **Never rewrite approved content** without a stated reason. Approved copy
   lives in `docs/content/WEBSITE_COPY.md`.

When a rule here conflicts with what seems like good practice, the rule wins.
Raise the conflict instead of resolving it silently.

---

## 1. Project overview

Institutional website for **PXTO**, a technology company working at the
intersection of technology and operations.

| | |
| --- | --- |
| Repository | `pxto-website` |
| Planned domain | `pxto.co` |
| Language of the site | Portuguese (`pt-BR`) |
| Language of documentation | **Portuguese (`pt-BR`)**, decidido em 31/08/2026. Documentos anteriores a essa data estão em inglês e são reescritos quando tocados, não em massa |
| Current state | **Documentação e aplicação existem.** A Home foi refeita em 10/11/2026 a partir da exploração no Stitch. Ver "Estado atual" no fim deste arquivo |

**Nine routes:** `/`, `/solucoes`, `/solucoes/{integracoes,automacao,software,sites}`,
`/projetos`, `/projetos/[slug]`, `/sobre`, `/contato`.

**Stack:** Next.js App Router, TypeScript strict, React Server Components,
Tailwind v4, Zod. Manrope e JetBrains Mono via `next/font/google`. **Cinco dependências
de runtime** (`next`, `react`, `react-dom`, `zod`, `@heroicons/react`). See §8.

---

## 2. Business context

You need this to make correct judgement calls.

**PXTO is a new company with a limited number of publicly presentable projects.**
That is the single most important operating fact, and it shapes nearly every rule
below.

Consequences:

- **No social proof exists.** Not hidden, not pending. It does not exist. The
  site must be complete and credible without it.
- **Credibility comes from the design and the reasoning**, because the copy
  claims nothing. Under-designing is a positioning failure, not just an aesthetic
  one. So is over-designing.
- **Two projects exist**, Furniture Visualization and AI Interior Designer.
  **Neither is cleared for publication.** Both are AI-categorised, which pulls
  the brand toward "AI company", which the positioning forbids.
- **The website is the primary lead generation tool.** Every page routes toward
  `/contato`.
- **The audience** is business owners, partners, directors, and operations,
  commercial and administrative managers. Non-technical, technically literate,
  time-poor, risk-averse toward a new vendor.

---

## 3. Source of truth hierarchy

**Documentation is the source of truth (PRD §52).** Where code and documentation
disagree, the code is wrong.

| # | Document | Governs |
| --- | --- | --- |
| 1 | `docs/PRD.md` | Everything. Highest authority |
| 2 | `docs/brand/BRAND_FOUNDATION.md` | Identity, values, voice, what PXTO is and is not |
| 3 | `docs/strategy/POSITIONING.md` | Audience, value proposition, differentiators, claim limits |
| 4 | `docs/narrative/NARRATIVE.md` | Messaging, page arcs, CTA strategy, anti-patterns |
| 5 | `docs/architecture/PAGE_SPECS.md` | What each page must accomplish and contain |
| 6 | `docs/projects/PROJECT_FRAMEWORK.md` | Project content, disclosure, publication |
| 7 | `docs/content/WEBSITE_COPY.md` | The actual words |
| 8 | `docs/design-system/DESIGN_SYSTEM.md` | Tokens, components, visual rules |
| 9 | `docs/technical/TECHNICAL_ARCHITECTURE.md` | Stack, code structure, infrastructure |

Also load-bearing: `docs/architecture/SITEMAP.md` (routes, link graph, content
model) and `docs/brand/VISUAL_DIRECTION.md` (the visual concept the design system
is specified against).

**Conflict resolution:** a lower-numbered document wins. If following the higher
document makes the lower one wrong, the lower one is the defect and should be
updated, by a human, before the code changes.

**Status labels in the docs mean what they say:**

| Label | Treat as |
| --- | --- |
| `DERIVED` | Binding. Implement it |
| `SPECIFIED` | Safe to build against |
| `INTERPRETED` | Safe, but flag if you are about to depend on it heavily |
| `RECOMMENDED` | A judgement call. Follow it, and say so |
| `PROPOSAL` | **Not approved. Does not bind. Do not treat as decided** |
| `CANDIDATE` | A placeholder value. Not a selection |
| `BLOCKED` | Missing input. **Do not invent it.** Stop and report |
| `⚠ CONFIRMAR` | Unverified fact. Must not ship unconfirmed |

---

## 4. Brand rules

Source: `docs/brand/BRAND_FOUNDATION.md`.

1. **The company speaks, never a person.** "A PXTO é...", never "Eu sou...". No
   first-person singular anywhere, on any surface, ever.
2. **No founder identity.** No personal bio, no face, no personal credentials, no
   personal portfolio framing. The brand is corporate.
3. **Tone:** clear, direct, professional, modern, technical without being
   excessively technical, confident, objective, problem-oriented, human.
4. **Confident but never inflated.** Credibility here comes from restraint.
5. **Banned vocabulary:** "revolucionário", "disruptivo", "a melhor solução",
   "transformação digital" as an empty phrase, plus excessive buzzwords, empty
   corporate language, unproven promises, and superlatives without evidence.
6. **Also banned:** "inovador", "líder", "referência", "pioneiro", "exclusivo",
   "end-to-end", "soluções de ponta", "nossos clientes", "nossa equipe".
7. **Visual identity must convey** precision, technology, engineering,
   simplicity, sophistication, confidence.
8. **Must never resemble** a futuristic, cyberpunk, generic AI startup, creative
   agency or SaaS template look. No gradient-heavy, no glassmorphism-heavy.
   **Revisado em 10/11/2026:** o responsável adotou a direção do protótipo H612
   (escuro, título leve, contêineres arredondados, vidro e uma luz que segue o
   mouse), que fica perto desse limite. A credibilidade vem de contenção: luz só
   nos três contêineres da Home, vidro só no botão secundário e na navbar, nada de painel falso,
   métrica inventada, logos nem fotografia de banco. Ver `DESIGN_SYSTEM.md` 3.3.4a.
9. **Resultado como serviço nunca vira promessa.** O copy descreve um modelo de
   trabalho. Nenhuma garantia de resultado, prazo, economia ou índice de sucesso,
   e nenhuma condição de pagamento, até existir definição comercial
   (`POSITIONING.md` §18.3 e §18.4). A sigla OaaS não aparece ao visitante.

---

## 5. Positioning rules

Source: `docs/strategy/POSITIONING.md`.

1. **The problem is the position.** PXTO is defined by the space it works in, not
   by the services it sells or the technology it uses.
2. **The four capabilities are peers, permanently.** Equal visual weight, equal
   content depth, equal treatment. No capability is featured, ordered first for
   emphasis, or given more space.
3. **Technology is a means, never an identity.** The stack may change, the
   position does not.
4. **AI is a tool, not the positioning.** No AI vocabulary in any hero, any
   navigation item, any page-level metadata, or any company description. AI may
   appear inside `/solucoes/automacao` as "quando aplicável", inside
   `/solucoes/software` as an implementation capability, and inside project
   pages framed by the problem solved.
5. **Demonstrate rather than assert.** Capability is shown through work,
   reasoning and the quality of the site itself.
6. **Compete against inertia.** The main alternative is the visitor doing
   nothing. Make the cost of the current state visible before arguing capability.
7. **Newness is neither hidden nor advertised.** Never reference how long PXTO
   has existed, in either direction.
8. **Never present PXTO as** an agency, a website developer, a consultancy, an AI
   company, a low-code automation company, or a traditional software house.

---

## 6. Content rules

Source: `docs/content/WEBSITE_COPY.md` and `docs/narrative/NARRATIVE.md`.

1. **Copy lives in `docs/content/WEBSITE_COPY.md`.** Do not write new copy inside
   components. If copy must change, change it there and reference it.
2. **`FIXED` copy is verbatim from the PRD.** Do not edit it. That includes the
   hero, the problem line, the four solution descriptions, the five process
   steps, the projects title and subtitle, the four positioning lines, and the
   CTA vocabulary.
3. **The problem precedes the offer** on every page that has both.
4. **Every factual claim traces to PXTO.** If you cannot point at the source, the
   claim does not ship.
5. **Implied claims count.** "Nossos clientes", a logo strip, stock team photos,
   "já ajudamos empresas a...", "desde 2024" are all violations even though no
   single sentence states a falsehood.
6. **CTA labels:** primary is always *Fale com a PXTO*. Contextual alternatives
   are *Vamos conversar*, *Conte seu projeto*, *Quero conversar sobre meu
   projeto*, *Começar uma conversa*. Hero secondary is *Ver soluções* (revisado em
   10/11/2026, era *Ver projetos*; volta a ele quando houver projeto liberado).
7. **Banned CTAs:** "Saiba mais" as a primary CTA, "Clique aqui", "Solicite
   agora".
8. **No duplicate CTA intent on one page.** One label per intent, used
   consistently.
9. **Zero em-dashes.** Middle-dot (`·`) at most once per line, and never as the
   default separator for a list. Use real list markup or columns.
10. **Omit, never empty.** A section with no content is removed. No empty state,
    no placeholder, no "em breve".

---

## 7. Design system rules

Source: `docs/design-system/DESIGN_SYSTEM.md`.

**Dials:** `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 5`, `VISUAL_DENSITY: 5`.

1. **Tokens only.** No arbitrary values. `p-[13px]` and `text-[#333]` are review
   failures. If a value is missing, the scale is wrong and the scale gets fixed.
2. **Spacing comes from the scale**, base 4px. Vertical rhythm resolves to
   multiples of 4.
3. **Radius rule** (revisado em 10/11/2026): botão é pílula, contêiner de seção
   tem `20px`, inputs `4px`, modal `12px`. Dentro de um contêiner, listas e
   colunas ficam retas. Sem raios misturados no mesmo componente.
4. **Shadows:** exactly one token, used by modals only. Elevation is communicated
   by border and ground shift.
5. **No gradients, no glassmorphism, no glow.** Not as surface, not as accent,
   not as hover. **Exceções decididas em 10/11/2026, e só estas:** o botão
   secundário de vidro, a navbar com desfoque e a luz do mouse (`GlowField`),
   que vive no Hero, no Modelo de trabalho e no CTA da Home, nos contêineres
   arredondados e em escala menor fora do Hero. Qualquer outro uso continua proibido.
6. **One accent, locked site-wide.** If it appears, something is interactive,
   focused, or defined. Success and danger are form states only. **O acento é a
   própria tinta** (branco no escuro, preto no claro). O único tom de cor é o
   índigo da luz do Hero, que é atmosfera e nunca marca algo clicável.
7. **Dual theme.** Light and dark ship together and are both tested. One theme
   per page. No section inverts mid-page.
8. **Type:** one family plus its mono companion (Manrope e JetBrains Mono, desde
   10/11/2026), com títulos em peso 300. Three weights. No serif. Body
   measure 60 to 72 characters. Emphasis by weight or italic within the family,
   never a second family.
9. **Motion:** feedback de estado, 120 a 180ms, mais a revelação de entrada em
   CSS (`animation-timeline: view()`), que move só `opacity` e `translate`,
   **mais a régua de seção que se desenha** (`transform: scaleX`, `DESIGN_SYSTEM.md`
   §14.0, decidido em 10/11/2026): a linha no topo de cada seção se desenha ao
   entrar na tela e o conteúdo entra logo depois. É traço de estrutura, nunca decoração. (O fio que
   conectava as seções da Home foi removido em 11/11/2026.) **Exceção de 11/11/2026, e só esta: a faixa de nomes da seção Parcerias**
   (`PartnersMarquee`), que anda em `translate` e para no hover, no foco e sob
   reduced-motion. **Sem botão de pausa**, a pedido do responsável: é uma lacuna de
   WCAG 2.2.2 para quem usa só o teclado, registrada em `docs/parcerias.md`. **Exceções de 11/11/2026 (branch `feature/transicoes`),
   `DESIGN_SYSTEM.md` §14.5:** (a) o **parallax da foto de fundo** dentro dos contêineres
   arredondados (`translate`, de -6% a +6%, nunca no Hero); (b) o **zoom de entrada** do
   contêiner (`scale` de 94% a 100%); (c) a **navbar** que passa de limpa a vidro ao rolar
   (só cor e desfoque, altura fixa); (d) a **transição entre páginas** por View
   Transitions (`PageTransitions`, só `opacity` e `translate`). Tudo some sob
   reduced-motion. **Sem pinning, sem scroll hijack, sem loop perpétuo fora da faixa de
   Parcerias.** **Scroll-scrub é condicional, não proibido** (revisão de
   01/09/2026, `DESIGN_SYSTEM.md` §14.4): vale em narrativa visual, diagrama e
   visualização de sistema, quando o progresso da rolagem tem significado
   narrativo ou funcional. Nunca como decoração. Evitar no Hero, na raiz do
   `MediaBackdrop` e em card, texto ou lista. No Hero, nada depende da rolagem
   para chegar ao estado final e o elemento de LCP nunca inicia abaixo de
   opacidade 1. Sempre em CSS: nenhuma biblioteca de animação entra por causa
   disso. Sob reduced-motion a regra não é escrita, porque zerar duração não
   desliga animação por timeline, e o estado sem animação é o estado final.
10. **Layout variety:** at least four distinct layout families on a long page.
    Never three consecutive sections with the same split pattern.
11. **At most one eyebrow per three sections.** Prefer none. The headline is
    enough.
12. **No section-number eyebrows.** No `01 / INDEX`, no `001 · Capabilities`. The
    five process steps are named by their verbs; the numerals appear once, only
    where order carries meaning. **Exceções de 11/11/2026, escolhidas pelo responsável:**
    a numeração 01 a 06 das situações do Problema (marcador visual por CSS, os itens não
    têm ordem) e os nós 01 a 05 da linha do tempo do Como trabalhamos (onde a ordem é a
    informação). Nenhum outro uso.
13. **No hairline rules as decoration.** Rules separate real content or they do
    not exist.
14. **Icons:** one library, stroke width 1.5, sizes 16, 20, 24. Never hand-roll
    SVG paths. No icon beside every heading. No icon feature grids. No emoji.
15. **Images:** real only. No stock standing in for real work, no generated
    mockups, no div-based fake product UI, no hand-rolled decorative SVG, no
    placeholder imagery. Caption below the image, never overlaid. **Exceção de
    11/11/2026, e só estas duas imagens:** as imagens de atmosfera geradas por IA do
    Modelo de trabalho e do CTA da Home, que não representam trabalho,
    pessoa, cliente nem produto, e cujo alt diz que são geradas. Registro, pedidos e
    contraste medido em `docs/imagens.md`. Qualquer outra imagem gerada precisa de
    decisão própria.

---

## 8. Architecture rules

Source: `docs/technical/TECHNICAL_ARCHITECTURE.md`.

1. **Server Components by default.** A client component is a leaf, marked
   `'use client'`, and never wraps server content. Os
   previstos no lançamento eram quatro (menu da navbar, formulário, DefinedTerm, alternador
   de tema). **Hoje existem seis**, todos folhas: `Navbar` (menu móvel), `ContactForm`,
   `AnalyticsListener` e `PageEvent` (eventos), `GlowField` (a luz do mouse, 10/11/2026) e
   `PageTransitions` (transição entre páginas, 11/11/2026, não renderiza nada). A faixa de
   Parcerias (`PartnersMarquee`) é componente de servidor. `DefinedTerm` e o alternador de
   tema ainda não existem. Cada novo client leaf precisa ser listado aqui.
2. **Static rendering.** Every page prerenders. The only dynamic surface is the
   contact Server Action.
3. **`app/` composes, it does not implement.** Route files assemble sections and
   export metadata.
4. **No component reads content from disk.** Everything goes through the content
   access functions. That is the CMS migration seam and it must not be bypassed.
5. **`generateStaticParams` for projects returns only published projects.** An
   uncleared project has no route.
6. **Zod at every boundary.** Content validates at module load, so bad content
   fails the build rather than a request. Form input validates on the server
   regardless of what the client did.
7. **Types derive from schemas** with `z.infer`. Never maintain a parallel
   interface.
8. **One component per file.** No barrel files.
9. **Cinco dependências de runtime** (`next`, `react`, `react-dom`, `zod`,
   `@heroicons/react`). A contagem de sete que constava antes incluía o `geist`, removido
   em 11/11/2026 quando a fonte passou a ser a Manrope. Adding one requires stating what it replaces.
   There is deliberately no animation library, no state management library, no
   CSS-in-JS, no component library, no CMS, no database, no auth.
10. **shadcn/ui is not used at launch.** Radix primitives are added individually,
    per component, only when a component genuinely needs one. See §1.2 of the
    architecture document for the reasoning.

---

## 9. Coding standards

1. **TypeScript strict**, plus `noUncheckedIndexedAccess`. No `any`. Use
   `unknown` and parse.
2. **Build fails on a type error or a lint error.** Not a warning.
3. **Naming:** components `PascalCase`, files match the component name,
   utilities and hooks `camelCase`, content slugs `kebab-case`.
4. **Portuguese for user-visible strings, English for code.** Variables, types,
   functions and comments in English. No mixed-language identifiers.
5. **Comments explain why, not what.** Match the density of the surrounding code.
6. **No dead code, no commented-out blocks, no `TODO` without an owner.**
7. **CSS Grid for layout.** Never flexbox percentage arithmetic such as
   `calc(33% - 1rem)`.
8. **`min-height: 100dvh`**, never `100vh`.
9. **Never `window.addEventListener('scroll')`.** Use IntersectionObserver or CSS
   scroll-driven animation, in the unlikely event either is needed.
10. **`useEffect` with a subscription has a cleanup function.** Always.

---

## 10. Component reuse rules

1. **A variant is a prop, not a new component.** Before creating anything, check
   the inventory in `DESIGN_SYSTEM.md` Part II.
2. **Do not create a second component for a problem an existing component
   solves.** If the existing one is close but wrong, extend it or fix it.
3. **Do not build a component no page needs.** Accordion, Modal and Tabs are
   specified and deferred. Build them when a page in `PAGE_SPECS.md` requires
   one, not before.
4. **One card format across the whole site.** Home, `/projetos` and solution
   pages use the same `ProjectCard`.
5. **All four `ServiceCard` instances are visually identical.** Equal cell size,
   equal content depth. This enforces the four-peer rule structurally.
6. **No component owns page-level vertical spacing.** `Section` does.
7. **No component hardcodes a token value.**
8. **A component that needs the consumer to add an aria attribute to be correct
   is incomplete.**
9. **Cards only where elevation communicates real hierarchy.** Otherwise group
   with a divider or with space.

---

## 11. Accessibility requirements

Target: **WCAG 2.2 AA** where technically applicable. Full detail in
`DESIGN_SYSTEM.md` Part I.15.

1. Semantic HTML first. `button` for actions, `a` for navigation.
2. One `h1` per page. No skipped heading levels.
3. Visible focus on everything interactive. `:focus-visible`, 2px minimum, 3:1
   contrast, never removed without a replacement.
4. A focused element is never obscured by sticky navigation.
5. Targets at least 24 by 24 CSS pixels, 44 by 44 for primary actions on touch.
6. Every input has a persistent visible label. **Placeholder as label is banned.**
7. Errors identified in text, associated by `aria-describedby`, never signalled
   by colour alone.
8. Contrast: 4.5:1 body, 3:1 large text and UI boundaries. Placeholders and
   helper text included.
9. Alt text on every image. Empty alt for decorative.
10. `prefers-reduced-motion` respected.
11. Content reflows at 320px. Text resizes to 200 percent.
12. `eslint-plugin-jsx-a11y` errors block the build. axe runs on every route with
    zero violations allowed.

---

## 12. SEO requirements

1. Every page has title, meta description, canonical, Open Graph and Twitter
   metadata.
2. **Metadata comes from `content/`**, not from the component tree.
3. `sitemap.ts` and `robots.ts` are generated, never hand-maintained. Adding a
   project must require no manual SEO step.
4. **Only published projects appear** in the sitemap or are indexed.
5. JSON-LD: `Organization` sitewide, `WebSite` on Home, `Service` on solution
   pages, `CreativeWork` on projects.
6. **Structured data is a factual claim.** No `aggregateRating`, no `review`, no
   `award`, no `foundingDate`, no `numberOfEmployees`.
7. Preview deployments carry `X-Robots-Tag: noindex`.
8. SEO is implemented during development, never retrofitted.

---

## 13. Performance requirements

| Metric | Target |
| --- | --- |
| LCP | under 2.0s on mobile |
| INP | under 200ms |
| CLS | under 0.05 |
| First-load JS, static pages | **under 90KB gzipped** |
| First-load JS, contact page | under 120KB gzipped |
| Lighthouse Performance, mobile | 95 or above |
| Lighthouse Accessibility | 100 |

**The budget is a gate, not an aspiration.** If a change pushes first-load JS
over 90KB, the change is wrong until proven otherwise.

Fonts self-hosted and subset, with metric overrides. Images AVIF with explicit
dimensions and correct `sizes`. No third-party script other than analytics.

---

## 14. Security rules

1. **No secrets in the client.** Only `NEXT_PUBLIC_` values reach the browser,
   and no secret ever carries that prefix.
2. **Environment variables parse through Zod at startup.** A missing one fails
   the build, not a submission.
3. **Server-side validation always.** The client parse is a convenience.
4. Rate limiting on the Server Action. Honeypot and timing checks before any
   third-party captcha.
5. Security headers in `next.config.ts`: strict CSP, HSTS, `nosniff`,
   `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`.
6. Collect only the six form fields the PRD defines. Nothing is stored by the
   site.
7. LGPD respected. No tracking cookies under the recommended analytics choice.
8. Dependabot on, `npm audit` in CI.

---

## 15. Project and case rules

Source: `docs/projects/PROJECT_FRAMEWORK.md`.

1. **Projects are data, never hardcoded into components.**
2. **A new project is one content file plus assets.** No route, no component, no
   layout change. If adding a project requires structural work, the architecture
   is wrong.
3. **Every project is a story about a problem.** Technology is a supporting
   character. A case that opens with the stack is a defect.
4. **Both current projects are AI-categorised**, and the positioning forbids AI
   as identity. Frame each by the problem solved.
5. **Cards lead with capability**, not with the technology label, pending the
   category decision in `PROJECT_FRAMEWORK.md` §2.4.
6. **Blocks with no content are omitted**, not rendered empty. `Resultado` is
   omitted on both current projects because no result is documented or cleared.
7. **Never list a technology that PXTO has not confirmed.** Inference from the
   project type is invention.
8. **Never invent a metric.** Qualitative outcomes are sufficient and correct.
9. **No placeholder cards, no "em breve", no grid that needs a minimum count to
   look complete.**
10. **Never imply more projects exist.** No "alguns dos nossos projetos", no
    "entre outros".

---

## 16. Confidentiality rules

1. **A client is never named without written authorisation.** Default is not
   named.
2. **Confidentiality is handled at content level, never as a category.** There is
   no "Confidential Projects" section, no badge, no greyed card, no lock icon.
   Nothing on the page indicates a restriction exists.
3. **Disclosure levels** are A Named, B Described, C Abstracted. B is the
   expected default. All three use the same section, the same template and the
   same card. Only content depth changes.
4. **Never hint at identity.** No blurred logo, no "um cliente que você
   provavelmente conhece", no coy phrasing.
5. **Check indirect identification.** Sector plus process plus a recognisable
   interface can identify a company as effectively as a name.
6. **Disclosure reasoning never enters runtime data.** It stays in the editorial
   record at `docs/projects/<slug>.md`. If it is in the runtime record, it is
   publishable.
7. **No real customer data** in any screenshot, gallery or demo.
8. **You may prepare a project. You may never clear one.** Clearance is a signed
   human decision.

---

## 17. Git workflow

```
main                  protected. Production
  feature/<slug>
  fix/<slug>
  chore/<slug>
```

1. **Never commit or push unless asked.**
2. **Never work directly on `main`.** Branch first.
3. **Conventional Commits:** `feat:`, `fix:`, `chore:`, `docs:`.
4. **Pull requests carry** description, objective, list of changes, screenshots
   for any visual change, and the QA checklist.
5. **A PR that changes copy must update `docs/content/WEBSITE_COPY.md`.** A PR
   that changes a component must update its design system entry. Documentation is
   the source of truth, so a divergence is a defect, not a follow-up.
6. Required checks: typecheck, lint, content validation, build, E2E, axe,
   Lighthouse budgets. A CI (§18.0) roda todos, com os orçamentos medidos direto
   em vez de Lighthouse.
7. **Nenhum trailer de coautoria de IA na mensagem de commit.** Sem
   `Co-Authored-By: Claude`, sem `Generated with`, sem assinatura equivalente. O
   autor do commit é a pessoa. O repositório é público, e coautoria externa num
   projeto institucional da empresa não é o que a assinatura deveria comunicar.
   Vale mesmo quando a ferramenta pede o trailer por padrão.

### 17.1. Git hooks

Husky is installed, so the rules above run without anyone remembering them.
Hooks live in `.husky/` and are wired by the `prepare` script, which means
`npm install` sets them up on a fresh clone.

| Hook | Runs | Enforces |
| --- | --- | --- |
| `pre-commit` | `verify:staged`, `typecheck`, `lint`, `check:assets` | §9.1, §9.2, and the two rules below |
| `commit-msg` | `scripts/verify-commit-msg.mjs` | §17.3 Conventional Commits, §0.6 zero em-dashes, 72 character subject |

`pre-commit` deliberately **does not build**. `next build` writes into `.next/`
and would break a running dev server, which is the failure described in §18.1.
The build stays with `npm run check` and CI, on a clean tree. Measured cost of
the hook is about three seconds.

`scripts/verify-staged.mjs` covers two failures that `tsc` and ESLint let
through untouched, and both have already broken this project:

1. **An em-dash in `src/`.** §0.6 is absolute and had no commit-time gate.
   `audit-content.mjs` only inspects rendered pages, which is after the build,
   with a server up, once the text is already committed.
2. **Drift between `public/logo.svg` and `src/lib/logo-paths.ts`.** Replacing
   the SVG without running `npm run build:logo` breaks no type and no lint rule.
   The site simply keeps serving the old mark, silently. The generator records a
   hash of its source as `LOGO_SOURCE_HASH`, and the hook compares it.

Both scan only staged files, so the cost tracks the size of the commit rather
than the size of the repository.

**Bypassing with `--no-verify` is a decision, not a shortcut.** If a hook is
wrong, fix the hook.

---

## 18. Testing requirements

| Layer | Tool | Scope |
| --- | --- | --- |
| Types | `tsc --noEmit` | Whole codebase. Blocks the build |
| Lint | ESLint with `jsx-a11y` | Whole codebase. Blocks the build |
| Content | Zod at module load | Every project and solution |
| E2E smoke | Playwright | Every route renders, navigation works, no console errors |
| Form | Playwright | Validation, submission, success, error, and the no-JavaScript path |
| Accessibility | axe via Playwright | Every route, zero violations |
| Performance | Lighthouse CI | The §13 budgets |

**Do not write unit tests for presentational components.** A test asserting that
a Button renders its children tests React, not the product.

**The two highest-value tests are content validation and the form E2E**, because
those are the two places where a failure is silent. A broken form loses a lead
with no error anywhere.

### 18.0. A CI (criada em 11/11/2026)

`.github/workflows/ci.yml` roda, em todo PR e em todo push em `main` e `develop`:
tipos, lint, assets, o build de produção em `.next-audit` e as **seis auditorias** de
`scripts/` (funcional, responsiva, acessibilidade com axe, conteúdo, segurança e
performance), contra o site servido localmente. Antes disso, nada rodava sozinho: as
auditorias dependiam de alguém lembrar de executá-las.

- **Não há framework de teste unitário** (nem Jest nem Vitest), de propósito: o código
  é quase todo apresentação e conteúdo, e o conteúdo já é validado pelo Zod no
  carregamento. As auditorias fazem o papel de E2E.
- **A performance é medida direto** pela Performance API (`audit-perf.mjs`), e não por
  Lighthouse. O script foi escrito quando o ambiente tinha Node 20, e Lighthouse exige
  Node 22. A CI usa Node 22, então dá para adicionar Lighthouse depois.
- **Para a CI vermelha bloquear a mesclagem**, a proteção do ramo `main` precisa
  exigir o check `verificar`. É uma configuração do repositório no GitHub, manual.
- **Ainda não rodou num runner de verdade.** Os passos foram validados localmente, um a
  um, mas o primeiro PR é o teste real.

### 18.1. Never audit against the dev server's build directory

`next dev` and `next start` share `.next/` by default. Running the audit, which
builds and then serves, while a dev server is up rewrites `.next/` underneath
it. The dev server keeps module IDs in memory that point at chunks that no
longer exist, and every route starts answering with

    TypeError: __webpack_modules__[moduleId] is not a function

**The code is fine; the cache is not.** The symptom is misleading because it
reads as an application error, and the reflex of clearing `.next` fixes it just
long enough to be confusing.

`distDir` is configurable through `NEXT_DIST_DIR` (see `next.config.ts`), and
the audit scripts point at `.next-audit`:

```bash
npm run dev                     # .next,       porta 3000
npm run audit:build             # .next-audit, nao toca no dev
npm run audit:start -- -p 7500  # .next-audit
npm run audit                   # as seis suites contra a 7500
```

`npm run check` still builds into `.next`, because it is the production gate and
runs on a clean tree. **Do not run it with a dev server up.**

---

## 19. Definition of Done

From PRD §49. A page or feature is not done until every applicable box is
checked. Full list in `docs/technical/definition-of-done.md`.

**Content:** copy reviewed, links working, CTA defined, SEO configured.
**Design:** design system respected, desktop validated, mobile validated, states
defined.
**Development:** TypeScript clean, lint clean, build working, components reused,
no unnecessary duplication.
**QA:** links tested, forms tested, responsiveness tested, navigation tested,
console free of critical errors, performance reviewed, accessibility reviewed.

**Additional gates specific to this project:**

- [ ] Zero em-dashes in anything user-visible
- [ ] No arbitrary Tailwind values introduced
- [ ] No new layout slot that would want social proof
- [ ] Every factual claim traceable to PXTO
- [ ] Any `⚠ CONFIRMAR` item either confirmed or removed
- [ ] Sections with no content omitted, not emptied
- [ ] First-load JS within budget
- [ ] Both themes checked

**Report completion honestly.** If tests fail, say so and show the output. If a
step was skipped, say which and why. Never report done when partially done.

---

## 20. Handling ambiguity

**The rule (PRD §52):**

> **Technical ambiguity:** choose the simplest option consistent with the
> existing architecture and this documentation, then proceed. State the choice
> in your response.
>
> **Business, content, brand or positioning ambiguity:** stop. Report it. Do not
> resolve it by writing a plausible answer.

**How to tell which one you have.** If the answer changes what the reader
believes about PXTO, it is not a technical question.

| Ambiguity | Kind | Action |
| --- | --- | --- |
| Which utility class produces this spacing | Technical | Pick the token, proceed |
| Whether to extract a shared component | Technical | Simplest that avoids duplication, proceed |
| What the Diferenciais section should say | Content | **Stop and ask** |
| Whether a client may be named | Business | **Stop and ask** |
| Which technology a project used | Factual | **Stop and ask.** Never infer |
| What the response time promise should be | Business | **Stop and ask** |
| Whether a section should exist at all | Product | **Stop and ask** |

**When you stop, report it like this:** what is ambiguous, which document should
settle it, what the options are, which one you would pick and why, and what is
blocked until it is answered. Then continue with everything that does not depend
on the answer.

**Never fill a gap with an invention.** An empty section marked as blocked is
correct. An invented one is a defect that discredits the whole site, because the
brand's entire differentiation is that it does not overclaim.

---

## Estado atual e bloqueios

**Atualizado em 10/11/2026.** Esta seção antes dizia que nada estava implementado.
O repositório tem aplicação: rotas, componentes, tokens, conteúdo e auditorias.

**A Home segue o protótipo H612 do Stitch** e comunica resultado como serviço
(a seção Parcerias lista Play9ContentGroup e Casaeaser, com autorização declarada e
comprovante escrito ainda a anexar, ver `docs/parcerias.md`):
Hero em contêiner arredondado com a luz do mouse, Problema, Posicionamento, Modelo
de trabalho, Soluções em 4 colunas, Como trabalhamos sem numeração e CTA final em
contêiner arredondado. O Footer virou um cartão em largura total, no espírito do rodapé da Apple. Projetos e
Diferenciais saíram dela.
Detalhes em `docs/architecture/PAGE_SPECS.md` §1 e
`docs/content/WEBSITE_COPY.md` §1.

**Movimento (branch `feature/transicoes`, 11/11/2026):** zoom de entrada dos contêineres,
parallax da foto de fundo, navbar que passa de limpa a vidro ao rolar, transição entre
páginas por View Transitions e a luz do mouse também no Posicionamento e no rodapé.
Regras e limites em `docs/design-system/DESIGN_SYSTEM.md` §14.5. As seções Problema,
Posicionamento, Modelo de trabalho, Soluções, Como trabalhamos e CTA foram redesenhadas a
partir de uma segunda exploração do Stitch, só no desenho e com o texto aprovado.

**Código que existe e hoje não tem uso, deixado de propósito:** as seções `Projetos` e
`Diferenciais` da Home (voltam quando houver projeto liberado e conteúdo aprovado), os
componentes `Media` e `Diagram` com o diagrama `sistemas-conectados` (plano de diagramas) e
a foto `posicionamento.avif`. O resto que ficou sem uso foi removido.

**Rascunhos sem aprovação formal do posicionamento:** a seção Modelo de trabalho,
o CTA final "Conte o resultado que você precisa." e o corpo curto do Problema.
Estão marcados como `DRAFT` nos documentos e no código.

**Ainda bloqueado, e não pode ser inventado:**

| Bloqueio | Bloqueia |
| --- | --- |
| Comprovante escrito das autorizações de parceria | A seção Parcerias está no ar com autorização só declarada. O comprovante e a grafia oficial dos nomes são do responsável (`docs/parcerias.md`) |
| Liberação de projeto assinada | `/projetos`, `/projetos/[slug]` e a seção de projetos da Home |
| Fotografia real | Páginas de projeto e `/sobre`. O Modelo de trabalho e o CTA da Home usam imagem de atmosfera gerada por IA (`docs/imagens.md`), que pode ser trocada por foto real sem mexer no resto. O Problema e o Hero seguem sem imagem |
| Canais de contato e destino dos leads | `/contato`, o footer, o formulário |
| Texto do aviso de privacidade | O formulário e o footer |
| Visão, origem do nome, visibilidade do fundador | `/sobre` não pode ser concluída |
| Definição comercial de "resultado" | Qualquer promessa além do modelo de trabalho (`POSITIONING.md` §18.4) |
| Aprovação formal de paleta e fonte | Os valores em uso (neutros, Manrope, JetBrains Mono) são `SPECIFIED`, sem aprovação de marca |

**Decisões ainda não aprovadas que o código não deve assumir além do que já está
em uso:** o território de posicionamento, a direção de headline e o eixo de
categoria dos projetos.

---

## Frontend Design Skill

When implementing or reviewing the PXTO frontend, use the
`design-taste-frontend` skill.

The skill must be treated as a design-engineering constraint,
not as permission to override the PXTO Brand Foundation,
Narrative, Design System or Page Specifications.

Use the skill to improve:
- visual hierarchy
- layout composition
- typography
- spacing
- visual rhythm
- interaction design
- motion
- responsive composition
- avoidance of generic AI-generated UI patterns

PXTO brand and project documentation always take precedence over
generic stylistic decisions from the skill.

---

## Where things live

```
docs/PRD.md                                  the requirement
docs/brand/BRAND_FOUNDATION.md               identity, values, voice
docs/brand/VISUAL_DIRECTION.md               the visual concept
docs/strategy/POSITIONING.md                 audience, claims, differentiators
docs/narrative/NARRATIVE.md                  messaging and page arcs
docs/architecture/SITEMAP.md                 routes, links, content model
docs/architecture/PAGE_SPECS.md              per-page requirements
docs/projects/PROJECT_FRAMEWORK.md           project content and disclosure
docs/content/WEBSITE_COPY.md                 the words
docs/design-system/DESIGN_SYSTEM.md          tokens and components
docs/technical/TECHNICAL_ARCHITECTURE.md     stack and code structure
docs/technical/definition-of-done.md         the completion checklist
docs/imagens.md                              registro das imagens: origem, pedidos, contraste medido
docs/parcerias.md                            registro das empresas citadas e das autorizações
docs/content/PROPOSTA_COPY_2026-11-11.md     proposta de copy aprovada em 11/11/2026
```

Each `docs/<area>/README.md` explains that area's role and lists its open
decisions.
