# Synqop Landing Page — Developer Handoff

Last inspected: 11 November 2026. Repository state before this handoff: clean `main`, synchronized with `origin/main` at `8744304a1245b951b64334487e69da884d1dd2ba` (`added social links to the footer`).

## 1. Project overview

Synqop is a programme-operations SaaS product, now in pilot. This repository contains its public marketing website, not the Synqop application itself. The page explains the product, shows real product UI from the Synqop UI Figma file, presents a five-stage Programme Loop, invites organisations to join the pilot through a Formspree form in a modal, and provides footer links and status.

The static landing page is implemented: responsive hero showing the Programme overview admin screen, four product cards with real UI panels, a scroll-driven desktop Programme Loop using the brand petal-progress marks (static list on mobile and reduced motion), a blue "We're looking for pilot partners" section, a Join the pilot dialog (bottom sheet on mobile), and the dark footer with social links. Branding follows the Synqop Marketing Figma file (Branding page: logo masters, petal progress, palette). The capability section called “Programme operations, in one connected place” is intentionally removed from the active page and preserved under `docs/sections/`. The form is wired to Formspree, but a successful live submission has not been verified.

## 2. Access, repository, and deployment

- Repository: <https://github.com/kainemichael/Synqop>
- Working branch: `main`
- Remote: `origin` → `https://github.com/kainemichael/Synqop.git`
- Production URL referenced by the sitemap and social metadata: <https://synqop.com/> (there is no canonical `<link>` tag in the current page head.)
- Production hosting: **synqop.com is served from a Vercel project on Abdulhameed's account, built from a fork of this repo.** After pushing to `main` here, Abdulhameed syncs the fork so the change reaches synqop.com. Pushing here does not update production on its own.

### Other deployments from this repo

1. A Vercel project in the `kaine-projects` team deploys every push to `main` (for example `synqop-dkvhh7yy1-kaine-projects.vercel.app`). It is a preview, not the production domain.
2. `.github/workflows/static.yml` deploys the repository root to GitHub Pages on every push to `main`, plus manual `workflow_dispatch`. Kept on intentionally. A run on 11 Nov 2026 failed with a transient "no github-pages artifact found" error; earlier runs with the same config succeeded.
3. `vercel.json` contains a rewrite from `/images/:path*` to `/public/images/:path*`, which the OG image URL relies on.

## 3. Technology stack

- Framework: none. Plain static HTML, CSS, and browser-native JavaScript.
- Build system/package manager: none. There is no `package.json`, lockfile, bundler, or framework configuration.
- JavaScript dependencies: none.
- Font: Inter loaded from Google Fonts in `index.html` (variable weights 400–700); CSS has system sans-serif fallbacks. The version is not pinned.
- Icons: inline SVG and CSS/HTML illustrations; no icon library.
- Animation: CSS transitions/keyframes and custom JavaScript; no animation library.
- Form service: Formspree endpoint `https://formspree.io/f/meaelpwk`, submitted with `fetch` from the browser. The endpoint is public configuration, not a private API key.
- Footer social links: Instagram `https://www.instagram.com/usesynqop/`, X `https://x.com/usesynqop`, and LinkedIn `https://www.linkedin.com/company/usesynqop/` (LinkedIn slug assumed from the @usesynqop handle; confirm it resolves).
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
│       └── synqop-logo.svg            # main logo, colour horizontal (Figma 64:800), used in header
└── src/
    ├── assets/images/
    │   ├── landscape.png              # hero landscape artwork
    │   ├── brand/
    │   │   ├── synqop-logo-on-dark.svg  # colour-on-dark horizontal logo, footer
    │   │   ├── synqop-logo-white.svg    # white horizontal logo, oversized footer wordmark
    │   │   ├── synqop-symbol.svg        # colour symbol (also the favicon source)
    │   │   └── petal-progress/          # run, track, detect, act, report SVGs (Programme Loop)
    │   └── product/                     # WebP renders of real UI from the Synqop UI Figma file
    │       ├── hero-programme-overview.webp  # Admin "Programme overview" (Figma 20:2), top-left crop
    │       └── feature-*.webp           # cohorts, attention, today, reports (Landing Page visuals)
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
| `--border` | `#e4e7ec` |
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

1. **Header/navigation — intentionally partial.** Navigation stays off until further notice. Brand logo and “Join the pilot” CTA are active. The primary navigation and mobile menu button markup are currently commented out; the associated JS is guarded and does nothing without those elements.
2. **Hero — implemented.** “Now in pilot” status, copy aimed at training academies, bootcamps and skills-development programmes, “Join the pilot” and “Explore the vision” CTAs, trust note, landscape, and the Programme overview screenshot (`<img class="hero-product-image">`).
3. **Product vision (`#product`) — implemented.** Four cards: cohorts panel, explainable Needs attention flag, trainer day and grading queue, report options. Cards 1 and 3 span 4 of 10 columns and cards 2 and 4 span 6, so each row's images come out at similar heights. To refresh a panel, re-export the matching Figma node at 2x and replace the WebP.
4. **Programme Loop (`#workflow`) — implemented.** Five stages in order: Run → Track → Detect → Act → Report. Desktop uses five SVG progress arc paths, a sticky scroll sequence, persistent completion markers, and stage-specific petal-progress marks from the brand file (one petal lit per stage, all lit for Report). Mobile and reduced-motion layouts show the five stages in a static vertical list with the same icons.
5. **Pilot section (`#pilot`) and Join the pilot dialog (`#join-pilot`) — implemented; live delivery needs verification.** The blue band invites pilot partners. Every `[data-open-pilot]` trigger (header, hero, pilot band, footer) opens a native `<dialog>` holding the form: centred modal on desktop, bottom sheet at 680px and below; Esc, the close button and the backdrop close it, and `/#join-pilot` opens it on load. Two required fields (`email`, `organisation`), required consent (`consent=agreed`) and `_subject` submit to Formspree via `fetch`. The script validates, disables the button while sending, shows status, clears only after success, and preserves entries on failure. The old early-access section was removed. Do not claim submission works until a deliberate test is made against Formspree.
6. **Footer — implemented.** Dark vertical gradient, colour-on-dark logo, “Now in pilot” tagline, navigation links (including Join the pilot), oversized white wordmark, “Now in pilot” status pill, copyright, and three @usesynqop social links.
7. **Capabilities — intentionally inactive, preserved.** Saved HTML/CSS are in `docs/sections/`; restoration dependencies and steps are in `docs/sections/README.md`.

There are no intentionally blank section placeholders in the current active DOM. The feature-section imagery now uses real UI panels from the Synqop UI Figma file.

## 8. Decisions and conventions

- Keep this as a static marketing site. Do not turn it into the Synqop SaaS app or add frameworks/dependencies for routine changes.
- Keep the capability section saved but out of the active page. Restore it only intentionally, using its documentation.
- Preserve the established light content surfaces and dark footer treatment, shared 1400px container, and responsive order/layout when editing sections.
- The desktop Programme Loop has a final Report-to-Run transition so the whole loop can complete; mobile/reduced-motion intentionally use a static list instead of forcing the sticky scroll effect.
- The Formspree form has no private key in the client. The consent value is included in the submitted data.
- Do not treat illustrative dashboard figures/names as actual product data or imply capabilities are already live.
- Avoid new animation libraries, unnecessary dependencies, unapproved copy changes, and unrelated section redesigns. Existing code uses plain classes, CSS custom properties, and `data-*` hooks.

## 9. Known issues and risks

- **Navigation is commented out:** The header currently has only the brand and CTA; menu/navigation controls and their link to the inactive capabilities section are comments. The menu JavaScript remains but safely exits when markup is absent.
- **Feature visual expectation unresolved:** Four card illustrations are custom sample UI, not a supplied final feature image. Do not invent or silently substitute an asset.
- **No automated project test suite or linter.** Only manual checks and `node --check`/`git diff --check` are available without adding tooling.
- **Form and layout browser verification:** Do not assume the Formspree endpoint, all mobile breakpoints, reduced-motion behavior, or complete workflow reverse-scroll have been freshly tested; verify before release.

## 10. Prioritized next steps

1. Test the Join the pilot form against the real Formspree endpoint with a designated test submission; check success, validation, failure retry, consent payload, and the Formspree dashboard receipt.
2. Run a desktop/tablet/mobile browser pass on the active page: header (including the currently absent menu), product-card visuals, workflow forward/reverse and final arc, the Join the pilot dialog and bottom sheet, footer social links, keyboard focus, and reduced motion. Check for overflow and console/network errors.
3. Test the public social preview for synqop.com once the fork is synced (metadata now declares `image/jpeg`, 1200x630, with canonical and `og:url`).
4. Consider small cleanup after behavior is verified: remove or re-enable dormant navigation markup/JS intentionally once navigation is decided.

Resolved on 11 Nov 2026: production deployment (Abdulhameed's fork), Pages workflow stays, primary navigation stays off for now, OG image is a 1200x630 JPEG. Resolved later the same day: brand refresh (new logo, real product UI, petal-progress loop icons), pilot launch copy, @usesynqop socials, and the Join the pilot dialog. Still open: switching marketing type from Inter to Geist as the brand guide specifies, and confirming the LinkedIn URL.
