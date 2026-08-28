# PXTO Technical Architecture Specification

**Version:** 1.0
**Status:** Specification. Nothing is implemented.
**Sources:** [`../PRD.md`](../PRD.md) §36 to §50, [`../architecture/SITEMAP.md`](../architecture/SITEMAP.md), [`../architecture/PAGE_SPECS.md`](../architecture/PAGE_SPECS.md), [`../projects/PROJECT_FRAMEWORK.md`](../projects/PROJECT_FRAMEWORK.md), [`../design-system/DESIGN_SYSTEM.md`](../design-system/DESIGN_SYSTEM.md), [`../brand/VISUAL_DIRECTION.md`](../brand/VISUAL_DIRECTION.md)

> Zero em-dash characters, per the rule now governing this project.

---

## How to read this document

| Status | Meaning |
| --- | --- |
| `DERIVED` | Fixed by the PRD. **Binding.** |
| `SPECIFIED` | Decided here, consistent with everything upstream. Safe to build against. |
| `RECOMMENDED` | A judgement call with reasoning. PXTO may overrule. |
| `BLOCKED` | Requires a decision or asset PXTO has not supplied. |

### The governing constraint

`DERIVED` from PRD §37 and §50.15, and reinforced by the design system.

> **Minimum necessary complexity.** The site is ten pages, mostly static content,
> with one form. Every dependency, abstraction and build step must earn its place
> against that reality.

The architecture is judged on five requirements stated by PXTO: it must serve the
current institutional site, future projects, future content growth, future
integrations, maintainability, and AI-assisted development. Those are addressed
individually in Part V.

---

# PART I. STACK EVALUATION

PRD §40 proposes Next.js, TypeScript, React, Tailwind, shadcn/ui, GitHub and
Vercel, and states explicitly that this is an initial recommendation which may be
adjusted if later requirements justify another choice. What follows is that
evaluation rather than an acceptance.

## 1. Recommended stack

`RECOMMENDED`. Verdicts, then reasoning.

| Proposed | Verdict | Note |
| --- | --- | --- |
| **Next.js** | **Accept**, with conditions | Strongest alternative is Astro. See §1.1 |
| **TypeScript** | **Accept** unconditionally | §3 |
| **React** | **Accept**, follows from Next.js | §2 |
| **Tailwind CSS** | **Accept**, version 4 | §4 |
| **shadcn/ui** | **Reject at launch** | The one real disagreement. See §1.2 |
| **GitHub** | **Accept** | §20 |
| **Vercel** | **Accept** | §19 |

**Final stack:**

```
Next.js 15+ (App Router)   framework and routing
TypeScript (strict)        language
React 19 (RSC default)     rendering
Tailwind CSS v4            styling
Zod                        content and input validation
Radix UI primitives        added per component, only when needed
Resend or equivalent       transactional email, BLOCKED on PXTO decision
GitHub + GitHub Actions    source control and checks
Vercel                     hosting, previews, production
```

**Seven runtime dependencies at launch.** No animation library, no state
management library, no CSS-in-JS, no component library, no CMS, no database, no
auth. See §1.3.

### 1.1 Next.js versus Astro

This deserves a real answer, because Astro is genuinely the better fit on the
narrow technical question.

| Criterion | Next.js | Astro |
| --- | --- | --- |
| JavaScript shipped by default | Low with RSC discipline, but non-zero | **Zero.** Islands opt in |
| Fit for a ten-page content site | Good | **Excellent** |
| Content collections with type safety | Manual, and simple | **Built in** |
| Image pipeline | Excellent | Excellent |
| Form handling | **Server Actions, no API layer** | Needs an adapter or an endpoint |
| Vercel integration | **First party** | Good |
| Future CMS, integrations, dynamic features | **Excellent** | Good, more friction |
| AI-assisted development | **Largest convention corpus by a wide margin** | Smaller |
| Named in the PRD | **Yes**, §40 | No |

**Verdict: Next.js.** Astro wins on the narrow question of shipping less
JavaScript to a content site, and if that were the only criterion it would be the
choice. It is not.

Three reasons decide it. **AI-assisted development is a stated requirement**, and
it is the criterion where the gap is largest: Next.js App Router conventions are
the most heavily represented in any model's training data, which directly reduces
the rate at which generated code is subtly wrong. **Future integrations** are a
stated requirement, and PXTO is an integration company, so the probability that
this site eventually needs a server route, a webhook receiver or an authenticated
surface is high rather than speculative. **The PRD names it** (§40), and
overriding a PRD recommendation requires the alternative to be clearly better
across the board, which Astro is not.

**The condition attached to accepting Next.js:** the JavaScript advantage of
Astro must be recovered by discipline rather than assumed away. Concretely,
Server Components are the default, client components are leaf nodes only, and the
performance budget in §16 is enforced in CI. If the built site cannot meet that
budget, the decision should be revisited rather than the budget relaxed.

**Revisit Astro if:** the site stays purely static for two years and the
JavaScript budget is repeatedly missed.

### 1.2 shadcn/ui: reject at launch

`RECOMMENDED`. This is the one place the PRD's stack should not be followed as
written, and the reasoning is specific rather than a preference.

**First, it conflicts with the design system.** `DESIGN_SYSTEM.md` specifies
radius 0 for structure and 2px for interaction, exactly one shadow token used
only by modals, elevation by border and ground shift, and a near-monochrome
palette with one functional accent. shadcn/ui ships the opposite defaults:
rounded corners, layered shadows, a card-and-elevation model. Adopting it means
overriding most of its visual layer, and the `design-taste-frontend` skill states
the honesty rule directly: do not import a system's tokens and then override
ninety percent of them. Doing so produces a codebase that looks like a customised
template, which is precisely the §33 prohibition.

**Second, and more decisive, this project barely needs it.** shadcn/ui earns its
place on components with complex accessible behaviour. Checking that against the
actual inventory:

| Component | Needs a primitive? |
| --- | --- |
| Button, Link, Heading, Text, Container, Section, Badge, Card, Image, Figure | No. Trivial to build correctly |
| Input, Textarea | No. Native elements with a correct label association |
| **Select** | **No.** A native `select` is the right control for one field with five options. It is more accessible on mobile, needs no JavaScript, and is what §28's simple form asks for |
| Navbar menu | Marginal. A disclosure pattern with a focus trap, roughly forty lines |
| **Accordion, Modal, Tabs** | **Yes**, but all three are deferred. No page in `PAGE_SPECS.md` needs them |

**The components that would justify shadcn/ui are exactly the components this
site does not build.**

**Recommendation:** hand-build the inventory against the design system, and add
`@radix-ui/react-*` primitives individually, per component, at the moment a
component genuinely needs one. If Accordion, Modal or Tabs are ever required, add
that single Radix primitive then and style it with project tokens.

**If PXTO overrules this** and wants shadcn/ui, the mitigation is: initialise it
with project tokens from the start, delete every unused component from the
generated set, and treat the generated files as owned project code rather than as
a library. The `components.json` config must map to the design system tokens
before the first component is generated, not after.

### 1.3 What is deliberately absent

`SPECIFIED`. Each omission is a decision, not an oversight.

| Not used | Why |
| --- | --- |
| **Animation library** (Motion, GSAP) | `MOTION_INTENSITY: 3` means state feedback only, 120 to 180ms, no scroll choreography. CSS transitions cover it entirely. Adding a library would create pressure to use it |
| **State management** (Zustand, Jotai, Redux) | There is no cross-page client state. The form is local `useState` in one leaf component |
| **CSS-in-JS** | Tailwind covers it, with no runtime cost |
| **Component library** | See §1.2 |
| **CMS** | Not at launch. §22 defines the migration seam |
| **Database** | Nothing persists. The form forwards and does not store |
| **Auth** | No authenticated surface exists |
| **i18n framework** | Single language. Adding one is a structural decision (SITEMAP §11.8) |
| **Testing framework for unit tests** | See §18. Presentational components do not benefit |

## 2. Framework

`RECOMMENDED`. **Next.js 15 or later, App Router.**

- **React Server Components are the default.** A component is a Client Component
  only when it needs state, effects, or browser APIs.
- **Static rendering by default.** Every page in `SITEMAP.md` is statically
  rendered at build time. Project pages use `generateStaticParams` over the
  published set.
- **No `getServerSideProps`, no Pages Router.** One routing model.
- **Server Actions** for the contact form, so no API layer exists for a single
  endpoint. See §13.

**Client Component boundaries.** Only four are expected at launch: the navbar
menu toggle, the contact form, the DefinedTerm control, and the theme toggle if
one ships. Each is a leaf. Layouts and pages stay on the server.

## 3. Language

`RECOMMENDED`. **TypeScript, strict.**

```jsonc
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "noFallthroughCasesInSwitch": true,
  "verbatimModuleSyntax": true
}
```

`noUncheckedIndexedAccess` matters more than it looks: most of this codebase
indexes into content arrays, and it is the setting that catches a missing project
at compile time rather than at runtime.

**Rules:** no `any`. `unknown` plus a Zod parse at every boundary. Types derived
from Zod schemas with `z.infer`, never hand-maintained in parallel. Build fails on
a type error, per §49.

## 4. Styling approach

`RECOMMENDED`. **Tailwind CSS v4.**

- Configuration is CSS-first via `@theme`, not a JavaScript config file.
- **Design tokens are the single source.** `DESIGN_SYSTEM.md` Part III defines
  the names. They become CSS custom properties in `@theme`, and Tailwind
  utilities resolve to them.
- **No arbitrary values for spacing, colour, radius or type.** `p-[13px]` is a
  review failure. If a value is needed and absent, the scale is wrong and the
  scale gets fixed.
- Dark mode via `@media (prefers-color-scheme: dark)` plus a `[data-theme]`
  override, so a manual toggle remains possible.
- PostCSS uses `@tailwindcss/postcss`, not the v3 plugin.
- **CSS Grid for layout.** Never flexbox percentage arithmetic.

**Why not plain CSS modules:** Tailwind's constraint system is the enforcement
mechanism for the design system. A token that is hard to bypass is a token that
survives.

## 5. Component architecture

`SPECIFIED`

```
src/
  app/                      routes only. Thin. Composition and metadata
  components/
    ui/                     Tier 1 primitives from DESIGN_SYSTEM.md Part II
    layout/                 Navbar, Footer, Container, Section
    content/                Figure, DefinedTerm, ProcessStep, Prose
    project/                ProjectCard, ProjectBlocks
    form/                   Field, ContactForm, FormStatus
  sections/                 page sections. Hero, Problema, Solucoes, and so on
  content/                  structured content. See §7
  lib/                      schemas, utilities, analytics, metadata helpers
  styles/                   globals.css with the @theme block
```

**Rules:**

1. **`app/` composes, it does not implement.** A route file assembles sections and
   exports metadata. Layout logic lives in components.
2. **`sections/` is page furniture, `components/` is reusable.** A section may be
   used on more than one page, but it is not a general-purpose component.
3. **One component per file**, named the same as the file. No barrel files, which
   defeat tree shaking and make AI-assisted edits ambiguous.
4. **No component reads content from disk.** Content arrives as props, from the
   content module in §7. This is the CMS migration seam.
5. **No component hardcodes a token value.** Tailwind classes resolving to
   `@theme` variables only.
6. **Client components are leaves**, marked `'use client'` at the top, and never
   wrap server content.

## 6. Routing

`DERIVED` from `SITEMAP.md`.

```
app/
  layout.tsx                    root. html lang="pt-BR", fonts, theme, skip link
  page.tsx                      /
  solucoes/
    page.tsx                    /solucoes
    [solucao]/page.tsx          /solucoes/integracoes | automacao | software | sites
  projetos/
    page.tsx                    /projetos
    [slug]/page.tsx             /projetos/<slug>
  sobre/page.tsx
  contato/page.tsx
  sitemap.ts
  robots.ts
  not-found.tsx
```

**Decisions:**

- **The four solution pages use one dynamic segment**, not four static routes.
  They share a template and differ only in content, so four files would be four
  places to drift. `generateStaticParams` returns the four known slugs, and any
  other value returns 404.
- **`generateStaticParams` on projects returns only `published: true` entries.**
  An uncleared project has no route at all, which is the §20 requirement enforced
  by the router rather than by a conditional.
- No route groups, no parallel routes, no intercepting routes. Nothing here needs
  them.
- Trailing slash disabled, applied consistently.
- A changed slug requires a 301 in `next.config.ts`, per SITEMAP §5.3.

## 7. Content architecture

`RECOMMENDED`. This is the most consequential decision in the document, because
it determines whether §22 is cheap or expensive.

### 7.1 The shape

```
src/content/
  projects/
    furniture-visualization.ts
    ai-interior-designer.ts
    index.ts                     collects and validates
  solutions/
    index.ts                     the four capabilities
  site.ts                        nav, footer, contact channels, metadata defaults
  schemas.ts                     Zod schemas. The contract
```

**Content is TypeScript modules validated by Zod at build time.**

### 7.2 Why not the alternatives

| Option | Rejected because |
| --- | --- |
| **MDX per project** | The project model has nine named narrative blocks, not one free body. Mapping headings back to blocks is fragile, and it invites arbitrary embedded components, which fights the design system |
| **JSON** | No comments, no type inference at the authoring site, worse editing experience |
| **Contentlayer** | Unmaintained |
| **A CMS at launch** | Two projects. The overhead exceeds the benefit, and §42 explicitly permits local structured content first |
| **Hardcoded in components** | Banned by §43 |

**TypeScript modules win** because they give compile-time type safety at the
point of authoring, they are greppable and diff-readable, they serialise to JSON
trivially when a CMS arrives, and the Zod schema that validates them becomes the
CMS schema. Rich text fields are markdown strings rendered by a small markdown
component, which keeps the content portable.

### 7.3 The access layer

**This is the migration seam. It matters more than the storage format.**

```ts
// src/content/projects/index.ts
export function getPublishedProjects(): Project[]
export function getFeaturedProjects(): Project[]
export function getProject(slug: string): Project | null
export function getProjectsBySolution(s: SolutionSlug): Project[]
```

**No component and no route imports a content file directly.** Everything goes
through these functions. When content moves to a CMS, the function bodies change
and nothing else does. Today they read a local array; tomorrow they fetch. The
signatures are the contract.

`getPublishedProjects` filters `published === true` in one place, so an uncleared
project cannot leak through a forgotten conditional.

## 8. Project data model

`DERIVED` from PROJECT_FRAMEWORK §1.2, expressed as the Zod schema that is the
single source of truth for the type.

```ts
export const SolutionSlug = z.enum(["integracoes", "automacao", "software", "sites"]);

export const ProjectSchema = z.object({
  slug:         z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title:        z.string().min(1).max(80),
  category:     z.string().min(1),
  solutions:    z.array(SolutionSlug).min(1),
  summary:      z.string().min(40).max(320),

  context:      z.string().optional(),
  problem:      z.string().optional(),
  challenge:    z.string().optional(),
  solution:     z.string().optional(),
  process:      z.string().optional(),
  technologies: z.array(z.string()).optional(),
  results:      z.string().optional(),

  coverImage:   ImageSchema,
  gallery:      z.array(ImageSchema).optional(),
  video:        VideoSchema.optional(),

  published:    z.boolean(),
  featured:     z.boolean(),
  order:        z.number().int().optional(),
  seo:          z.object({ title: z.string(), description: z.string() }).partial().optional(),
})
.refine(p => [p.context, p.problem, p.challenge, p.solution].some(Boolean), {
  message: "A project needs at least one descriptive block (PROJECT_FRAMEWORK 1.4)",
});

export type Project = z.infer<typeof ProjectSchema>;
```

**Notes:**

- **No `client` field, no `clientLogo` field.** Client identity is never carried
  in runtime data (PROJECT_FRAMEWORK §1.1). Where naming is cleared, the name
  appears inside the cleared prose.
- **No `disclosure` field.** Disclosure reasoning stays in the editorial record at
  `docs/projects/<slug>.md`. The runtime record contains only publishable
  content, so nothing can leak that was never copied.
- The `refine` encodes the minimum viable project rule as a build-time failure
  rather than as documentation.
- **Validation runs at module load**, so an invalid project fails the build, not a
  page request.

## 9. Image architecture

`SPECIFIED`, and `BLOCKED` on assets.

```
public/images/
  projects/<slug>/cover.avif | gallery-01.avif ...
  site/                       hero and supporting imagery
```

- **`next/image`** throughout. AVIF first, WebP fallback, automatic sizing.
- **Explicit `width` and `height` on every image**, so CLS stays at zero.
- Hero image `priority`, everything else lazy.
- `sizes` declared per usage. A missing `sizes` on a responsive image is a common
  and expensive mistake.
- Aspect ratios per `DESIGN_SYSTEM.md` Part I.13.2.
- Alt text is a required field in `ImageSchema`, not an optional prop, so an image
  without alt text fails the build.

**`BLOCKED`.** PXTO has no cleared images (`VISUAL_DIRECTION.md` Part V.2). Until
assets exist, image slots render a labelled placeholder in development and the
build fails in production if a required image is missing. **The build should not
be allowed to ship an invisible gap.**

## 10. SEO architecture

`DERIVED` from PRD §36.

- **Next.js Metadata API.** Static `metadata` on static routes,
  `generateMetadata` on dynamic ones.
- **`app/sitemap.ts`** generated from the route list plus
  `getPublishedProjects()`. Never hand-maintained, so adding a project needs no
  manual step, per §42.
- **`app/robots.ts`** allowing all, disallowing nothing at launch, referencing the
  sitemap.
- **Canonical** on every page, absolute, from a single `SITE_URL`.
- **JSON-LD** injected as a script tag: `Organization` sitewide, `WebSite` on
  Home, `Service` on solution pages, `CreativeWork` on project pages.
- **Structured data is a factual claim.** No `aggregateRating`, no `review`, no
  `award`, no `foundingDate`, no `numberOfEmployees`. Bound by §53 exactly as
  visible copy is.
- Semantic headings, one `h1`, friendly URLs, per `DESIGN_SYSTEM.md`.

## 11. Metadata

`SPECIFIED`

Per-page title and description come from `content/`, never from the component
tree, so copy lives in one place.

```ts
// lib/metadata.ts
buildMetadata({ title, description, path, image? }): Metadata
```

- Title pattern `{Página} - PXTO`, Home excepted. `BLOCKED` pending confirmation
  (`PAGE_SPECS.md` §11.11).
- Open Graph and Twitter card on every page.
- **OG images:** static files per page shape, not runtime-generated. Runtime OG
  generation needs the logo and the typefaces, both `BLOCKED`, and it adds a
  serverless surface for marginal benefit at this size.
- `lang="pt-BR"` on `html`.
- No `keywords` meta. It does nothing.

## 12. Analytics

`RECOMMENDED`, provider `BLOCKED` per PRD §38.

**Recommendation: Vercel Web Analytics plus Speed Insights at launch.**

| Option | Assessment |
| --- | --- |
| **Vercel Web Analytics** | **Recommended.** No cookies, no personal data collected, so no consent banner is required under LGPD. First party on the named host. Custom events cover the §38 funnel. Zero configuration |
| Plausible or Fathom | Equivalent privacy posture, small recurring cost, one more vendor |
| GA4 | Most capable, and it brings a consent banner, a cookie policy and an LGPD obligation to a site whose entire conversion path is one form. The cost is disproportionate |

**Events**, per §38:

```ts
track("cta_click",           { location, label, destination })
track("service_view",        { solution })
track("project_view",        { slug })
track("contact_form_start",  {})
track("contact_form_submit", { need })
```

Wrapped in `lib/analytics.ts` so the provider can be swapped without touching
components. **No personal data in any event payload.** The `need` field carries
the category only, never the message.

## 13. Contact form architecture

`SPECIFIED`, partly `BLOCKED`.

**Server Action, not an API route.** One endpoint, one consumer, no external
caller. A Server Action keeps validation, submission and the destination on the
server, and the client component holds only form state.

```
Client form (leaf, 'use client')
  ↓ progressive enhancement: works without JS
Server Action
  ↓ Zod parse. Same schema the client uses for field hints
  ↓ anti-spam: honeypot + submission timing + optional Turnstile
  ↓ rate limit by IP
  ↓ deliver to the destination
  ↓ return typed result
Client renders idle | submitting | success | error
```

**Validation:** one Zod schema shared by client and server. The server never
trusts the client parse.

**Anti-spam**, `RECOMMENDED`. Layered, cheapest first:

1. **Honeypot field**, hidden from users and from assistive technology, rejected
   silently if filled
2. **Timing check**, reject submissions faster than roughly two seconds
3. **Rate limit** by IP, a small fixed window
4. **Cloudflare Turnstile** only if the first three prove insufficient. It is
   privacy-respecting and invisible, but it is a third-party script and should not
   be added preemptively

**Delivery.** `BLOCKED`. §39.7 says "the defined destination" and does not define
it. Candidates: transactional email through Resend, a CRM webhook, or both. The
Server Action calls one `deliverLead()` function so the destination is a single
implementation detail.

**Required states**, per §39 and the design system: validation, loading, success,
error, invalid-submission blocking. The success message promises no response time
until PXTO defines one.

**LGPD.** Only the six fields in §28 are collected. Nothing is stored by the site
itself. The privacy notice wording is `BLOCKED`.

## 14. Environment variables

`SPECIFIED`

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | client | yes | Canonical URLs, sitemap, OG |
| `CONTACT_TO_EMAIL` | server | yes | Lead destination. `BLOCKED` |
| `RESEND_API_KEY` | server | if email | Transactional email. `BLOCKED` |
| `CONTACT_WEBHOOK_URL` | server | if CRM | Alternative destination |
| `TURNSTILE_SECRET_KEY` | server | if used | Anti-spam verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | client | if used | Anti-spam widget |

**Rules:** only `NEXT_PUBLIC_` values reach the browser, and no secret ever
carries that prefix. `.env.example` is committed with empty values and comments.
`.env.local` is git-ignored. Variables are parsed through a Zod schema at startup
so a missing one fails the build rather than failing a submission at three in the
morning.

## 15. Security requirements

`DERIVED` from PRD §44.

| Requirement | Implementation |
| --- | --- |
| No exposed secrets or API keys | Server-only env vars. Zod-validated at startup |
| Backend input validation | Zod parse inside the Server Action. Client parse is a convenience only |
| Protected endpoints | Rate limiting on the Server Action. No other endpoint exists |
| Anti-spam | §13 |
| Contact data handled properly | Forwarded, never stored. Only the six PRD fields |
| LGPD | Privacy notice `BLOCKED`. No tracking cookies given the §12 recommendation |
| Dependency hygiene | Dependabot on. `npm audit` in CI. Seven runtime dependencies keeps the surface small |

**Desenvolvimento e produção têm CSPs diferentes.** O `next dev` usa `eval()`
para hot module replacement e um websocket para notificar o browser. Sem
`'unsafe-eval'` no `script-src` e `ws:` no `connect-src`, a CSP bloqueia os dois:
a página carrega, mas **para de atualizar sozinha** e o console enche de erro.

As permissões extras existem somente em desenvolvimento. A CSP de produção é a
estrita, e a auditoria de segurança roda contra o build de produção, então a
diferença não afrouxa o que é verificado.

**Headers**, set in `next.config.ts`:

```
Content-Security-Policy       strict. self, plus the analytics origin
Strict-Transport-Security     max-age 63072000, includeSubDomains, preload
X-Content-Type-Options        nosniff
Referrer-Policy               strict-origin-when-cross-origin
Permissions-Policy            camera, microphone, geolocation all denied
X-Frame-Options               DENY
```

The CSP is achievable here precisely because the stack is small. No inline
scripts beyond the JSON-LD block, which gets a nonce.

## 16. Performance requirements

`DERIVED` from PRD §37, with numbers attached so they are testable.

| Metric | Target | Enforcement |
| --- | --- | --- |
| LCP | under 2.0s on mobile 4G | Lighthouse CI budget |
| INP | under 200ms | Speed Insights |
| CLS | under 0.05 | Explicit image dimensions, font metric overrides |
| First-load JS, static pages | **under 90KB gzipped** | CI budget, fails the build |
| First-load JS, contact page | under 120KB gzipped | CI budget |
| Lighthouse Performance, mobile | 95 or above | CI |
| Lighthouse Accessibility | 100 | CI |

**How the budget is met:**

- Server Components by default. Four client leaves at launch
- No animation library. CSS transitions only
- Fonts self-hosted, subset to Latin plus the Portuguese diacritics, `swap`, with
  `size-adjust` metric overrides to remove layout shift
- AVIF images, correct `sizes`, lazy below the fold
- No third-party script other than analytics
- `@next/bundle-analyzer` available, run before each release

**The budget is a gate, not an aspiration.** If a change pushes first-load JS
over 90KB, the change is wrong until proven otherwise.

## 17. Accessibility

`DERIVED` from PRD §35. Target WCAG 2.2 AA. The full requirement set is in
`DESIGN_SYSTEM.md` Part I.15. This section covers only enforcement.

| Layer | Mechanism |
| --- | --- |
| Authoring | Semantic HTML first. `button` for actions, `a` for navigation |
| Lint | `eslint-plugin-jsx-a11y`, errors not warnings |
| Component | Alt text required by the schema. Labels required by the Field component API |
| Automated test | `@axe-core/playwright` on every route, zero violations |
| CI | Lighthouse Accessibility at 100 |
| Manual | Keyboard-only pass and a screen reader pass per page before launch. Automation catches roughly half of real issues |

## 18. Testing strategy

`RECOMMENDED`. Proportionate to a ten-page content site with one form.

**What is tested:**

| Layer | Tool | Scope |
| --- | --- | --- |
| Types | `tsc --noEmit` | Whole codebase. Fails the build |
| Lint | ESLint with `jsx-a11y` | Whole codebase. Fails the build |
| Content validation | Zod at module load | Every project and solution. Fails the build |
| E2E smoke | Playwright | Every route renders, navigation works, no console errors |
| Form | Playwright | Validation, submission, success, error, and the no-JavaScript path |
| Accessibility | axe via Playwright | Every route, zero violations |
| Performance | Lighthouse CI | Budgets in §16 |
| Visual regression | Playwright screenshots | **After** the design stabilises, not before |

**What is deliberately not tested:**

- **Unit tests for presentational components.** A test asserting that a Button
  renders its children tests React, not the product. It adds maintenance cost and
  catches nothing.
- Snapshot tests of markup. They fail on every intentional change and train people
  to update them without reading.

**The highest-value tests here are the content-validation schema and the form
E2E**, because those are the two places where a failure is silent and expensive.
A broken form loses a lead with no error anywhere.

## 19. Deployment architecture

`DERIVED` from PRD §45 and §46.

| Environment | Trigger | URL |
| --- | --- | --- |
| Development | local | `localhost:3000` |
| Preview | every pull request | Vercel preview URL |
| Production | merge to `main` | `pxto.co` |

- **Vercel**, named in §40 and §46. First-party Next.js support, preview
  deployments per PR which §48 requires, and edge caching by default.
- **Static output.** Every page prerendered. The only dynamic surface is the
  Server Action.
- **Preview deployments carry `X-Robots-Tag: noindex`**, so a preview URL never
  competes with production in search.
- **The domain is connected only after final validation**, per §45. Development
  and preview must not depend on it existing.
- Rollback is the previous deployment, one action, no rebuild.

## 20. Git workflow

`DERIVED` from PRD §47.

```
main                    protected. Production
  feature/<slug>        new work
  fix/<slug>            corrections
  chore/<slug>          tooling, dependencies, docs
```

**Branch protection on `main`:** no direct pushes, PR required, checks must pass,
branch must be current.

**Pull requests carry**, per §47: description, objective, list of changes,
screenshots for any visual change, and the QA checklist from §49.

**Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`). Not for
ceremony, but because it makes the history greppable and a changelog derivable
later at no cost.

**One further rule:** a PR that changes copy must also update
`docs/content/WEBSITE_COPY.md`, and a PR that changes a component must update its
entry in the design system. **Documentation is the source of truth (§52), so a
divergence is a defect rather than a follow-up.**

## 21. CI/CD

`DERIVED` from PRD §48.

```
Push to a branch
  ↓ GitHub Actions: typecheck, lint, content validation, build
  ↓ Vercel: preview deployment
Pull request
  ↓ the above, plus Playwright E2E and axe against the preview URL
  ↓ Lighthouse CI against the preview URL, budgets enforced
  ↓ human review
Merge to main
  ↓ Vercel production deployment
```

**Two workflows, no more:**

| Workflow | Trigger | Jobs |
| --- | --- | --- |
| `ci.yml` | push, pull request | typecheck, lint, validate content, build |
| `e2e.yml` | pull request | Playwright plus axe plus Lighthouse against the preview |

Deployment itself is Vercel's, not a GitHub Action. Duplicating it in Actions adds
a second thing that can break for no benefit.

**Required checks before merge:** typecheck, lint, build, E2E, axe, Lighthouse
budgets.

## 22. Future CMS migration strategy

`SPECIFIED`. §42 requires that the architecture permit migration **without
rebuilding the interface.**

### 22.1 The seam already exists

Three properties make the migration cheap, and all three are decisions taken now
rather than later:

1. **The access layer in §7.3.** Components never touch storage. Only four
   function bodies change.
2. **The Zod schema in §8.** It is already the content contract, so it becomes
   the CMS schema definition rather than a translation of it.
3. **Rich text is markdown strings.** Portable to any CMS without conversion.

### 22.2 The trigger

Migrate when **an editor who is not a developer needs to publish**, or when
project count passes roughly fifteen and editing TypeScript files becomes the
bottleneck. **Not before.** Two projects in a CMS is overhead with no return.

### 22.3 Candidates

`RECOMMENDED`, to be decided at migration time rather than now.

| Option | Fit |
| --- | --- |
| **Keystatic** | Git-based, edits become commits, content stays in the repository, no vendor, no database. **Best fit for the likely trigger**, which is editing convenience rather than scale |
| **Sanity** | Strong if content structure grows genuinely complex. Real-time, good editor, external dependency |
| **Payload** | Self-hosted, powerful, brings a database and infrastructure this project does not otherwise need |
| **Contentful** | Mature, priced for larger teams, more than required |

**Leaning Keystatic**, because it preserves the property that content is
reviewable in a pull request, which matters for a site where every factual claim
is governed by a disclosure checklist (PROJECT_FRAMEWORK §20). **A CMS that lets
content bypass review would weaken that control.** That is a governance argument
rather than a technical one, and it is the stronger argument here.

### 22.4 What migration must not change

Routes, the Project schema shape, component APIs, the sitemap generation, or the
publication gate. If a migration proposal requires touching those, it is the wrong
proposal.

---

# PART II. HOW THE ARCHITECTURE MEETS THE STATED REQUIREMENTS

`SPECIFIED`. The six requirements PXTO named, answered individually.

| Requirement | How it is met |
| --- | --- |
| **Current institutional site** | Ten static pages, four templates, seven dependencies. The whole site prerenders |
| **Future projects** | A new project is one content file plus assets. Route, card, sitemap entry and internal links all follow from the data. No structural change, satisfying §50.6 |
| **Future content growth** | The content module scales to dozens of entries without change. Beyond that, §22 is a swap of four function bodies |
| **Future integrations** | Next.js provides Server Actions, route handlers and middleware when needed. Nothing needs to be added now to keep that door open, which is the point |
| **Maintainability** | Small dependency surface, strict types, validation at boundaries, one styling system, documentation as source of truth. The main maintenance risk on a site like this is dependency churn, and seven dependencies is the mitigation |
| **AI-assisted development** | Part III |

## Part III. Architecture for AI-assisted development

`SPECIFIED`. PXTO named this as a requirement, and PRD §52 to §54 govern it. Some
of these choices exist specifically to make generated code reliable.

| Decision | Why it helps |
| --- | --- |
| **Next.js App Router** | The most heavily represented convention set in model training data. Fewer subtly wrong outputs |
| **Strict TypeScript** | The compiler catches the failure mode generated code most often exhibits: plausible but wrong shapes |
| **Zod at every boundary** | Runtime enforcement of what types promise. Generated content fails validation rather than rendering wrong |
| **One component per file, no barrel files** | Unambiguous edit targets. A barrel file makes "where does this live" answerable in two ways |
| **No arbitrary Tailwind values** | Constrains generated styling to the token system rather than to invented values |
| **Documentation as source of truth** | `docs/` answers product questions so an agent does not resolve ambiguity by inventing |
| **`CLAUDE.md` at the repository root** | Points at the docs, states the hard rules: never invent content, never add a social-proof slot, zero em-dashes, tokens only, omit rather than empty |
| **Definition of Done in CI** | §49 becomes checks rather than a checklist someone remembers |

**The hard rules an agent must not violate**, restated here because this is the
file an agent reads first when working on the code:

1. Never invent a client, a number, a result, a testimonial, a technology used in
   a project, or any factual claim (§53)
2. Never add a layout slot that wants social proof (Positioning §13.6)
3. Never publish a project without `published: true`, which requires a signed §20
   checklist
4. Never introduce an em-dash into user-visible text
5. Never use an arbitrary value where a token exists
6. Never add a dependency without stating what it replaces
7. When a section has no content, omit it rather than rendering an empty state
8. Technical ambiguity resolves to the simplest option consistent with this
   document. Business, content or positioning ambiguity **stops and asks** (§52)

---

# PART IV. BLOCKED AND OPEN

## Blocked

| # | Item | Blocks |
| --- | --- | --- |
| 1 | Lead destination, §13 and §14 | The contact form cannot ship |
| 2 | Privacy notice wording, §15 | The contact form and the footer |
| 3 | Real images, §9 | Every page with a visual |
| 4 | Brand assets: logo, palette, typefaces | Every component (`DESIGN_SYSTEM.md` Part IV) |
| 5 | Contact channels | Footer and contact page |
| 6 | Title tag pattern confirmation, §11 | Metadata helper |

## Open decisions

An agent must not resolve these (§52).

1. **shadcn/ui**, §1.2. Recommendation is to reject it at launch and add Radix
   primitives individually. This overrides a PRD §40 recommendation and needs
   PXTO's agreement
2. **Analytics provider**, §12. Vercel Web Analytics recommended
3. **Anti-spam ceiling**, §13. Whether Turnstile is added preemptively or only if
   needed
4. **Transactional email provider**, §13
5. **Whether dark mode ships at launch**, carried from `DESIGN_SYSTEM.md` Part V.6
6. **Node version and package manager.** Recommendation: Node 22 LTS, pnpm
7. **CMS timing and choice**, §22. Not now. Keystatic leaning

---

# PART V. BUILD ORDER

Nothing is implemented. When work starts, this is the sequence.

1. **Phase 1, foundation.** Next.js, TypeScript strict, Tailwind v4, ESLint,
   folder structure, `CLAUDE.md`, CI workflow. No UI
2. **Blocked gate.** Palette and typefaces must exist before any component
3. **Phase 2, tokens.** `@theme` block from `DESIGN_SYSTEM.md` Part III, both
   themes, contrast validated
4. **Phase 3, primitives.** Tier 1, then Tier 2 form components. Skip the
   deferred tier
5. **Phase 4, layout.** Navbar, Footer, Container, Section
6. **Phase 5, content layer.** Schemas, content modules, access functions
7. **Phase 6, pages.** In `PAGE_SPECS.md` order, unblocked pages first
8. **Phase 7, infrastructure.** Form, analytics, SEO, sitemap, robots, headers
9. **Phase 8, QA.** Against §49 and §50
10. **Phase 9, launch.** Domain after validation, per §45

**Steps 1 and 2 of the blocked list are the only things preventing Phase 1 from
starting today.** Phase 1 touches no UI and depends on no brand asset.
