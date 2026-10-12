# Saved capability section

The capability section is intentionally inactive on the landing page; it has not been deleted.

- HTML markup: `capabilities-section.html`
- Section-specific CSS: `capabilities-section.css`

## Restore the section

1. Copy the saved `<section>` markup into `index.html` between the Programme Loop and early-access sections.
2. Copy the rules from `capabilities-section.css` into `src/styles/styles.css`, or add a stylesheet link to this CSS file from `index.html`.
3. Keep the shared styles and script behavior below available when restoring it.

## Shared dependencies

The section relies on the existing `.section`, `.container`, `.section-heading`, and `.eyebrow` styles plus design tokens such as `--border`, `--blue`, `--muted`, and `--ease` in `src/styles/styles.css`. Its `data-reveal` attributes rely on the existing reveal behavior in `src/scripts/script.js`. The card icons are text glyphs and the section does not require image assets, a framework, or new dependencies.
