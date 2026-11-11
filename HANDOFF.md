# Synqop Landing Page — Developer Handoff

Last inspected: 11 November 2026. Repository state before this handoff: clean `main`, synchronized with `origin/main` at `8744304a1245b951b64334487e69da884d1dd2ba` (`added social links to the footer`).

## 1. Project overview

Synqop is a pre-launch programme-operations SaaS product. This repository contains its public marketing and early-access website, not the Synqop application itself. The page explains the product direction, shows illustrative product UI, presents a five-stage Programme Loop, collects early-access interest through Formspree, and provides footer links and status.

The static landing page is substantially implemented: responsive hero and product cards, a scroll-driven desktop workflow with 3D stage artwork and a mobile/reduced-motion stage list, an early-access form, and the dark footer with social links. The capability section called “Programme operations, in one connected place” is intentionally removed from the active page and preserved under `docs/sections/`. The product cards currently contain handcrafted HTML/CSS sample dashboard illustrations rather than final product screenshots. The form is wired to Formspree, but a successful live submission was not verified during this handoff. Deployment configuration needs clarification because the repository includes both Vercel configuration and an active GitHub Pages workflow.

## 2. Access, repository, and deployment

- Repository: <https://github.com/kainemichael/Synqop>
- Working branch: `main`
- Remote: `origin` → `https://github.com/kainemichael/Synqop.git`
- Production URL referenced by the sitemap and social metadata: <https://synqop.com/> (there is no canonical `<link>` tag in the current page head.)
- Hosting: the project has been identified as Vercel-hosted in the existing project context. Vercel project settings and preview URLs are not stored in this repository.

### Deployment behavior to verify

There are two deployment-related configurations in the repo:

1. `.github/workflows/static.yml` deploys the repository root to GitHub Pages on every push to `main`; it also supports manual `workflow_dispatch` from GitHub Actions.
2. `vercel.json` contains a rewrite from `/images/:path*` to `/public/images/:path*`. It does not define Vercel's production branch or preview behavior.

Do not assume which deployment currently owns the production domain or whether Vercel previews are enabled. Confirm the Vercel project's connected repository, production branch, domain assignment, and preview settings; also confirm whether GitHub Pages is intentionally kept active. No stable preview URL is defined in the checked-in files. Avoid changing either deployment until that ownership is clear.

## 3. Technology stack

- Framework: none. Plain static HTML, CSS, and browser-native JavaScript.
- Build system/package manager: none. There is no `package.json`, lockfile, bundler, or framework configuration.
- JavaScript dependencies: none.
- Font: Inter loaded from Google Fonts in `index.html` (variable weights 400–700); CSS has system sans-serif fallbacks. The version is not pinned.
- Icons: inline SVG and CSS/HTML illustrations; no icon library.
- Animation: CSS transitions/keyframes and custom JavaScript; no animation library.
- Form service: Formspree endpoint `https://formspree.io/f/meaelpwk`, submitted with `fetch` from the browser. The endpoint is public configuration, not a private API key.
- Footer social links: Instagram `https://www.instagram.com/synqop?mdxt=bmcyazgwYWNlc2Z2&utm_source=qr`, X `https://x.com/synqop?s=11`, and LinkedIn `https://www.linkedin.com/company/synqop-platform/`.
- Analytics/error reporting: none found in the checked-in page.
- Node: not required by the website. The local environment reported Node `v24.15.0` during inspection, but the project does not pin or require a Node version.
- Environment variables: none required by the current static page. `.gitignore` excludes `.env` and `.env.*` (except `.env.example`). No `.env.example` is present.

## 4. Setup and commands

There is nothing to install. From PowerShell:

```powershell
cd C:\Users\HP\Downloads\Synqop
py -m http.server 8000
```

Open <http://localhost:8000/>. Stop the server with `Ctrl+C`.

| Task | Command/status |
| --- | --- |
| Install | Not applicable; no dependencies or package manifest. |
| Development preview | `py -m http.server 8000` |
| Build | Not applicable; serve the static root as-is. |
| Lint | No linter configured. |
| JavaScript syntax check | `node --check src/scripts/script.js` |
| Whitespace/diff check | `git diff --check` |
| Production preview | No local build/preview command; verify in the configured hosting project. |

The existing `README.md` also describes the Python server, but it is stale about the form and active capabilities section; see Known issues.

## 5. Project structure

```text
Synqop/
├── .github/workflows/static.yml       # GitHub Pages deployment on main and manual dispatch
├── .gitignore                         # dependency/build/env/editor exclusions
├── HANDOFF.md                         # this handoff
├── README.md                          # local setup (some project-state text is outdated)
├── index.html                         # complete active single-page site and metadata
├── robots.txt                         # crawler rules and sitemap reference
├── sitemap.xml                        # production URL listing
├── vercel.json                        # targeted /images rewrite for Vercel
├── docs/sections/
│   ├── README.md                      # restoration notes for inactive capability section
│   ├── capabilities-section.html      # saved section markup
│   └── capabilities-section.css       # saved section-specific styles
├── public/
│   ├── icons/                         # favicon, Apple touch icon, 192px and 512px icons
│   └── images/
│       ├── og-image.jpeg              # social preview artwork
│       └── synqop-logo.svg            # public main logo
└── src/
    ├── assets/images/
    │   ├── dashboard-hero-img.png     # dashboard visual used by the hero CSS
    │   ├── landscape.png              # hero landscape artwork
    │   ├── Synqop Main Logo white.svg  # white logo used in footer
    │   ├── Synqop White Logo.svg       # oversized decorative footer wordmark
    │   └── workflow-3d-icons/         # run, track, detect, act, report PNGs
    ├── scripts/script.js              # hero/menu/tabs/reveal/form/workflow behavior
    └── styles/styles.css              # design tokens, layout, responsive styles, illustrations
```

The page is composed directly in `index.html`. Shared visual rules and CSS-drawn product mockups live in `src/styles/styles.css`; interactions live in `src/scripts/script.js`. `public/` contains files intended to be served directly, while the hero and workflow art are referenced from `src/assets/images/`.

## 6. Design system and conventions

Important custom properties in `src/styles/styles.css`:

| Token | Current value |
| --- | --- |
| `--color-primary` | `#2563eb` |
| `--color-primary-hover` | `#1d4ed8` |
| `--color-navy` / `--ink` | `#0b1220` |
| `--color-gradient-secondary` | `#41c7fd` |
| `--color-black` | `#0d0d0d` |
| `--color-neutral` | `#fafafa` |
| `--color-white` | `#ffffff` |
| `--color-footer-gradient-start` | `#071738` |
| `--muted` | `#667085` |
| `--text` | `#475467` |
| effective `--border` | `#e4e7ec` (declared a second time; this later declaration wins) |
| `--font-family-sans` | Inter, then system sans-serif fallbacks |
| Font weights | regular `400`, medium `500`, semibold `600` |
| Letter spacing | body `-0.005em`, controls `-0.02em`, display `-0.045em`, section `-0.035em` |
| Radii | `--radius: 16px`, `--radius-sm: 12px`, `--radius-md: 18px`, `--radius-lg: 32px`, `--radius-button: 24px`, `--radius-card: 48px` |
| Shadow | `0 22px 60px rgba(16, 24, 40, 0.11)` |
| Container | max `1400px`; gutter `clamp(16px, 5.1vw, 98px)` |
| Easing | `cubic-bezier(0.2, 0.75, 0.25, 1)` |

Responsive breakpoints used include `1024px`, `760px`, `680px`, and `380px`. At `max-width: 1024px`, the shared gutter is `20px`; at `max-width: 380px`, it is `16px`. The workflow switches from scroll-driven circular presentation to a static illustrated stage list at `max-width: 680px` and when reduced motion is requested.

Use existing tokens and section selectors. Keep the site dependency-free and preserve native semantic HTML. Button labels use clipped duplicate text for the vertical hover/focus text-swap. The footer social icons are inline SVG anchors. There are no reusable framework components or prop APIs.

Visual references so far have been screenshots attached in the project conversation (hero, buttons, product grid, workflow, footer). No Figma URL or Figma file is tracked here.

## 7. Page sections and status

1. **Header/navigation — needs polish / partially inactive.** Brand logo and “Get early access” CTA are active. The primary navigation and mobile menu button markup are currently commented out; the associated JS is guarded and does nothing without those elements.
2. **Hero — implemented, needs final visual review.** Copy, status, dual CTAs, trust note, landscape, and dashboard artwork are present. The dashboard visual is a CSS frame using `dashboard-hero-img.png`; its wrapper still has “pending” wording in its accessible label, which may be stale.
3. **Product vision (`#product`) — implemented with illustrative UI; final feature art may still be pending.** Four cards cover programme setup, attention signals, progress, and reporting. Their visuals are hand-built HTML/CSS sample dashboards, not live product UI. Several labels explicitly say “SAMPLE” or “ILLUSTRATIVE”. The repository does not contain a separate feature-section screenshot asset. Confirm which final image/visual is expected before replacing these.
4. **Programme Loop (`#workflow`) — implemented.** Five stages in order: Run → Track → Detect → Act → Report. Desktop uses five SVG progress arc paths, a sticky scroll sequence, persistent completion markers, and stage-specific 3D icons. Mobile and reduced-motion layouts show the five stages in a static vertical list with the same icons.
5. **Early access (`#early-access`) — implemented; live delivery needs verification.** Two required fields (`email`, `organisation`) and required consent (`consent=agreed`) submit to Formspree via `fetch`. The script validates, disables the button while sending, displays status, clears only after success, and preserves entries on failure. Do not claim submission works until a deliberate test is made against Formspree.
6. **Footer — implemented.** Dark vertical gradient, regular white logo, navigation links, oversized decorative logo, bottom development status/copyright, and three social links (Instagram, X, LinkedIn).
7. **Capabilities — intentionally inactive, preserved.** Saved HTML/CSS are in `docs/sections/`; restoration dependencies and steps are in `docs/sections/README.md`.

There are no other intentionally blank section placeholders identified in the current active DOM. The pending item mentioned previously as “the image for the features section” should be reconciled with the active CSS/HTML sample illustrations and the actual approved design asset before implementation.

## 8. Decisions and conventions

- Keep this as a static marketing site. Do not turn it into the Synqop SaaS app or add frameworks/dependencies for routine changes.
- Keep the capability section saved but out of the active page. Restore it only intentionally, using its documentation.
- Preserve the established light content surfaces and dark footer treatment, shared 1400px container, and responsive order/layout when editing sections.
- The desktop Programme Loop has a final Report-to-Run transition so the whole loop can complete; mobile/reduced-motion intentionally use a static list instead of forcing the sticky scroll effect.
- The Formspree form has no private key in the client. The consent value is included in the submitted data.
- Do not treat illustrative dashboard figures/names as actual product data or imply capabilities are already live.
- Avoid new animation libraries, unnecessary dependencies, unapproved copy changes, and unrelated section redesigns. Existing code uses plain classes, CSS custom properties, and `data-*` hooks.

## 9. Known issues and risks

- **Deployment ambiguity:** `static.yml` deploys GitHub Pages from `main`, while the project context identifies Vercel as the live host and `vercel.json` has an image rewrite. Confirm the production source and decide whether both deployment pipelines should remain enabled.
- **Stale README:** `README.md` says the form is a local demo with no submission endpoint and describes capabilities as part of the active site. Both statements conflict with the inspected current implementation.
- **Navigation is commented out:** The header currently has only the brand and CTA; menu/navigation controls and their link to the inactive capabilities section are comments. The menu JavaScript remains but safely exits when markup is absent.
- **Open Graph type mismatch:** `index.html` references an `.jpeg` image but declares `og:image:type` as `image/png`. Verify the actual file format and align metadata. No canonical `<link>` or `og:url` is present in the inspected head.
- **Feature visual expectation unresolved:** Four card illustrations are custom sample UI, not a supplied final feature image. Do not invent or silently substitute an asset.
- **No automated project test suite or linter.** Only manual checks and `node --check`/`git diff --check` are available without adding tooling.
- **Form and layout browser verification:** Do not assume the Formspree endpoint, all mobile breakpoints, reduced-motion behavior, or complete workflow reverse-scroll have been freshly tested; verify before release.
- **Token cleanup opportunity:** `--border` is declared twice in `:root`; the second value (`#e4e7ec`) currently wins.

## 10. Prioritized next steps

1. Confirm production deployment ownership: Vercel project/repo/branch/domain and whether the GitHub Pages `main` workflow is intentional. Then document the actual preview and deployment URLs/triggers.
2. Update `README.md` so it matches the current Formspree integration and the intentionally inactive capability section.
3. Resolve the requested feature visual with the product/design team: identify the approved image or confirm that the current four HTML/CSS mockups are the intended shipped visuals.
4. Test the early-access form against the real Formspree endpoint with a designated test submission; check success, validation, failure retry, consent payload, and the Formspree dashboard receipt.
5. Run a desktop/tablet/mobile browser pass on the active page: header (including the currently absent menu), product-card visuals, workflow forward/reverse and final arc, early-access form, footer social links, keyboard focus, and reduced motion. Check for overflow and console/network errors.
6. Verify the OG image file's actual encoding/dimensions and correct the `image/jpeg` vs `image/png` metadata discrepancy. Test the public social preview URL after the deployment route is confirmed.
7. Consider small cleanup after behavior is verified: remove stale hero “pending” accessible wording if the artwork is final, reconcile the duplicate border token, and remove or re-enable dormant navigation markup/JS intentionally.

Open confirmations are limited to the intended production deployment target, the final feature-section artwork, whether primary navigation should be active, and the OG image's actual encoding. The project can be run locally without those answers.
