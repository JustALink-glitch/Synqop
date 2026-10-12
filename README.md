# Synqop

A responsive pre-launch marketing website for Synqop, a programme operations SaaS platform. The site includes an illustrative dashboard, product workflow, capabilities, and an early-access interest form. The form is a local demo and has no submission endpoint.

This is a static HTML, CSS, and JavaScript project. It is a pre-launch marketing website, not the complete Synqop SaaS application.

## Structure

```text
Synqop/
├── index.html
├── public/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   ├── scripts/
│   │   └── script.js
│   ├── sections/
│   ├── styles/
│   │   └── styles.css
│   └── utils/
├── docs/
├── .gitignore
└── README.md
```

The empty directories are placeholders for relevant assets or code as the project grows. There is no package manifest, lockfile, build configuration, or dependency to install at this stage.

## Run locally

Open `index.html` in a browser, or from this directory start a simple local server with Python:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>.

No `npm install` or build command applies because this project has no package manager configuration or build step.
