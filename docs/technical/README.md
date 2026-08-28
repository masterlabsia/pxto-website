# Technical

How the site is built, deployed, measured and verified.

**PRD sources:** §36 (SEO), §37 (performance), §38 (analytics), §39 (contact
form), §40 (technical architecture), §41 (repository), §44 (security and
privacy), §45 (domain), §46 (environments), §47 (Git workflow), §48 (CI/CD),
§49 (Definition of Done), §50 (acceptance criteria).

## What belongs here

| Document | Content |
| --- | --- |
| `TECHNICAL_ARCHITECTURE.md` | **Exists.** Stack evaluation, framework, language, styling, component architecture, routing, content architecture, project data model, images, SEO, metadata, analytics, contact form, environment variables, security, performance, accessibility, testing, deployment, Git, CI/CD, CMS migration, plus AI-assisted development conventions and build order |
| `definition-of-done.md` | The per-feature completion checklist |

Information architecture and content models belong in `../architecture/`.

## Recommended stack (§40)

```text
Next.js · TypeScript · React · Tailwind CSS · shadcn/ui · GitHub · Vercel
```

The PRD explicitly treats this as an **initial recommendation** that may be
adjusted if later technical requirements justify another choice (§40).

## Repository structure (§41)

```text
pxto-website/
├── docs/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── sections/
│   ├── lib/
│   └── styles/
├── README.md
└── package.json
```

## Environments (§45, §46)

| Environment | Host |
| --- | --- |
| Development | `localhost` |
| Preview | Vercel preview URL |
| Production | `pxto.co` |

Development must not depend on the domain existing. The domain is connected to
production infrastructure only after final validation (§45).

## Git workflow (§47)

`main` plus `feature/…`, `fix/…`, `chore/…`. Significant changes go on their own
branch. Pull requests carry: description, objective, changes, screenshots where
there is a visual change, and a QA checklist.

## CI/CD (§48)

```text
GitHub → Pull Request → Build → Checks → Preview → Review → Merge
       → Production Deploy
```

Production deploy is tied to the main branch.

## SEO (§36)

Every page: title, meta description, canonical, Open Graph, Twitter/X metadata,
semantic headings, friendly URLs, sitemap, robots.txt, structured data where
applicable. **SEO is handled during development, not afterwards.**

## Performance (§37)

Fast loading; optimised images and fonts; minimum necessary JavaScript; lazy
loading where appropriate; no unnecessary dependencies; no heavy animation.
Excellent mobile performance is the target.

## Analytics (§38)

Funnel: Page View → CTA Click → Project View → Contact Form Start → Contact Form
Submit → Lead.

Events: `cta_click`, `project_view`, `service_view`, `contact_form_start`,
`contact_form_submit`.

The analytics solution itself is to be defined during implementation (§38).

## Contact form (§39)

Must validate input, show loading, success and error states, block invalid
submissions, include anti-spam protection, record the lead at the defined
destination, and never expose credentials in the frontend.

## Security and privacy (§44)

No exposed secrets or API keys; environment variables for configuration;
backend input validation; protected endpoints; anti-spam; appropriate handling
of contact data; LGPD compliance where applicable. Collect no unnecessary
information.

## Status

**`TECHNICAL_ARCHITECTURE.md` drafted (v1.0).** Nothing has been configured and no
code exists.

The PRD §40 stack was evaluated rather than accepted. Seven of eight proposals are
accepted; **shadcn/ui is recommended for rejection at launch** (see its §1.2), on
the grounds that its defaults contradict the design system and the components that
would justify it are exactly the three this site defers. That recommendation
overrides a PRD recommendation and needs PXTO's agreement.

**Phase 1 foundation work is not blocked by anything.** It touches no UI and needs
no brand asset.

## Requires human decision

See `TECHNICAL_ARCHITECTURE.md` Part IV for the full list. Highest priority:

- [ ] **shadcn/ui**: accept the recommendation to reject it at launch and add
      Radix primitives per component instead (§1.2)
- [ ] **Lead destination** for the contact form (§39.7). Blocks the form entirely
- [ ] **Privacy notice wording** if LGPD applies (§44). Blocks the form and footer
- [ ] Analytics provider (§38). Vercel Web Analytics recommended, no consent
      banner required
- [ ] Anti-spam ceiling: whether Turnstile is added preemptively or only if the
      cheaper layers prove insufficient
- [ ] Transactional email provider, if the form sends email
- [ ] Hosting and DNS account ownership for `pxto.co` (§45)
- [ ] Node version and package manager. Node 22 LTS and pnpm recommended
