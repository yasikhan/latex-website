# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal academic website styled to look like a typeset LaTeX document. Plain
HTML + CSS on top of [LaTeX.css](https://latex.vercel.app/). No build step, no framework,
no package manager, no tests. Edit a file, refresh the browser.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Serving (rather than opening `index.html` via `file://`) is preferred so relative links
resolve the way they do in production.

## Architecture & conventions

There is **no template engine**, so structure that would normally be shared is instead
duplicated across every page. When editing, keep these invariants in sync by hand:

- **Top nav is copied into every page.** The `<nav class="site-nav">` block is identical
  across `index.html`, `publications.html`, `cv.html`, `blog.html`, and posts. Adding or
  renaming a page means editing the nav in *all* of them. The current page is marked by
  moving `aria-current="page"` onto its own link.
- **The `<head>` boilerplate is also duplicated per page** — the two stylesheet links, the
  KaTeX CDN includes, and the theme setup.

### Theming (two-part, order matters)
Dark mode is driven by the `.latex-dark` class on `<body>` (read by LaTeX.css). It is
implemented in two places that must both be present:
1. A tiny **inline** script at the top of each `<body>` applies the saved class *before*
   first paint — this is what prevents a light-mode flash. Do not move it to an external
   file or defer it.
2. `scripts/theme.js` (loaded at end of body) wires up the `.theme-toggle` button and
   persists the choice to `localStorage["theme"]`.

### Math
KaTeX auto-render runs on `DOMContentLoaded` via the `onload` handler on the auto-render
CDN script. Delimiters: `$...$` / `\(...\)` inline, `$$...$$` / `\[...\]` display.

### Paths inside `posts/`
Post pages live one directory down, so they reference assets with `../` (e.g.
`../styles/latex.min.css`, `../scripts/theme.js`, `../index.html`). Copy
`posts/example-post.html` when creating a new post — it also documents the markup for
theorems, proofs, sidenotes, and footnotes — then add a `<li>` to the list in `blog.html`.

### CSS boundary
`styles/custom.css` is the only stylesheet to edit (nav, toggle, publications list, CV
two-column layout, etc.). `styles/latex.min.css` is vendored upstream LaTeX.css — leave it
untouched. It is self-contained with fonts embedded (works offline); note that **KaTeX is
loaded from a CDN**, so math specifically requires a network connection.

### Content markup patterns
- **Publications** (`publications.html`): each paper is one `<li>` in `.pub-list`; wrap the
  site owner's name in `<span class="me">…</span>`; BibTeX goes in a `<details>` block. The
  bracketed `[n]` counter is reset **once** on `main.numbered-pubs` (not per `<ol>`), so it
  runs continuously across year sections — don't add `counter-reset` back to `.pub-list` or
  numbering restarts at `[1]` in each section.
- **CV** (`cv.html`): each row is a `.cv-entry` (left column = date, right = detail). The
  "Download PDF" link targets `assets/cv.pdf` (not committed — add your own).

### Signature / opt-in classes (in `custom.css`)
- `main.numbered-sections` — CSS-counter numbers `h2` (`1`, `2`…) and nested `h3` (`1.1`)
  like a paper. Applied to Home, CV, and posts; **not** Publications (h2 are years) or Blog
  (no h2). An `.abstract` h2 is explicitly excluded from numbering.
- `main.numbered-pubs` — resets the publications reference counter (see above).
- Every page's `<head>` links `assets/favicon.svg` (an "HA" monogram) and carries placeholder
  Open Graph / Twitter meta — duplicated per page like the rest of the head; edit per site.
- Each `<body>` opens with a `.skip-link` (`href="#main"`) and each `<main>` has `id="main"`
  for keyboard/skip-to-content accessibility. A `@media print` block strips nav/footer for
  clean CV/post printing.
