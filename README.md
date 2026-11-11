# Synqop

A responsive marketing website for Synqop, a programme operations SaaS platform now in pilot. The page covers the product, real product UI, the five-stage Programme Loop, and a Join the pilot form (in a modal) that submits to Formspree.

This is a static HTML, CSS, and JavaScript project with no dependencies or build step. It is the marketing site, not the Synqop SaaS application.

See `HANDOFF.md` for the full developer handoff: design tokens, section status, conventions, and known issues.

## Structure

```text
Synqop/
├── index.html              # the complete single-page site and metadata
├── public/
│   ├── icons/              # favicon and app icons
│   └── images/             # logo and social preview image
├── src/
│   ├── assets/images/      # hero, footer, and workflow artwork
│   ├── scripts/script.js   # interactions, workflow animation, form submission
│   └── styles/styles.css   # tokens, layout, responsive styles, illustrations
├── docs/sections/          # inactive capabilities section, kept for later restoration
├── robots.txt
├── sitemap.xml
└── vercel.json
```

## Run locally

From this directory, start a simple local server:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>. There is nothing to install or build.

## Join the pilot form

The form lives in a `<dialog>` (`#join-pilot`) that opens from any `[data-open-pilot]` link: a centred modal on desktop and a bottom sheet on mobile. It posts to Formspree (`https://formspree.io/f/meaelpwk`) with `fetch`. It sends `email`, `organisation`, `consent`, and `_subject`. The endpoint is public configuration, not a secret.

## Inactive sections

- **Capabilities** ("Programme operations, in one connected place") is intentionally removed from the live page. Its markup and styles are saved in `docs/sections/` with restoration notes.
- **Primary navigation** is commented out in the header for now. The header shows only the logo and the "Join the pilot" button.

## Deployment

- **synqop.com** is served from a Vercel project on a collaborator's account, built from a fork of this repository. After pushing to `main` here, the fork must be synced (pulled) for changes to reach synqop.com.
- This repository also deploys automatically on every push to `main` to a Vercel preview project (`kaine-projects`) and to GitHub Pages via `.github/workflows/static.yml`. Neither of these serves the production domain.
