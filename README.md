# LaTeX Academic Website Template

A template for a personal academic website that looks like a typeset **LaTeX document**.
Built with plain HTML and CSS on top of [LaTeX.css](https://latex.vercel.app/) — no build
step, no framework, no dependencies to install. Edit a file, refresh the browser, done.

![status: template](https://img.shields.io/badge/status-template-blue)

## Features

- 📄 **LaTeX look** — Latin Modern-style type, justified prose, numbered theorems (via LaTeX.css, vendored locally so it works offline).
- 🧮 **Math** — LaTeX equations render with [KaTeX](https://katex.dev/) (inline `$...$` and display `$$...$$`).
- 🌗 **Dark mode** — a toggle button that remembers the visitor's choice (no flash on load).
- 📚 Ready-made **Home / About**, **Publications**, **CV**, and **Blog** pages.
- 🚀 Deploys anywhere — GitHub Pages, Netlify, or any static host.

## Project structure

```
.
├── index.html            # Home / About
├── publications.html     # Numbered, LaTeX-style reference list
├── cv.html               # Two-column CV (dates | details)
├── blog.html             # Post index
├── posts/
│   └── example-post.html # Sample post: math, theorem, proof, sidenote, footnote
├── styles/
│   ├── latex.min.css     # LaTeX.css, vendored (MIT) — self-contained, fonts embedded
│   └── custom.css         # The only CSS you'll edit: nav, toggle, pubs, CV layout
├── scripts/
│   └── theme.js          # Dark-mode toggle
├── assets/
│   ├── profile.svg       # Placeholder headshot — replace with your photo
│   └── cv.pdf            # (add your own) target of the "Download PDF" link
├── README.md
└── LICENSE
```

## Run it locally

It's just static files. Either open `index.html` directly, or serve it (recommended, so
relative links behave exactly like production):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Customize

1. **Your name & bio** — edit `index.html` (the `<header>` and the `.intro` section).
2. **Photo** — replace `assets/profile.svg` with your own image and update the `src` in `index.html`.
3. **Publications** — edit `publications.html`. Each paper is one `<li>` in a `.pub-list`.
   Wrap your own name in `<span class="me">…</span>` to underline it. The `<details>` block
   holds the BibTeX.
4. **CV** — edit `cv.html`. Each row is a `.cv-entry` (left = date, right = detail). Drop your
   real CV PDF at `assets/cv.pdf`.
5. **Blog** — write a post by copying `posts/example-post.html`, then add a line to the list in
   `blog.html`. That sample post also documents how to use math, theorems, sidenotes, and footnotes.
6. **Colors / spacing** — tweak `styles/custom.css`. Leave `styles/latex.min.css` alone (it's the
   upstream library).

### Adding a new page

There is no template engine, so the top nav is copied into each page. To add a page:

1. Copy an existing page (e.g. `blog.html`) as your starting point.
2. In the new page's `<nav class="site-nav">` block, move `aria-current="page"` onto the new link.
3. Add a `<li>` for the new page to the nav in **every** page so it's linked everywhere.

Pages inside `posts/` reference `../styles/…`, `../scripts/…`, and `../index.html` (note the `../`).

## Deploy

**GitHub Pages**

1. Create a repo and push these files.
2. Repo → *Settings* → *Pages* → *Build and deployment* → *Deploy from a branch* → `main` / `root`.
3. Your site appears at `https://<username>.github.io/<repo>/`.
   (For a `username.github.io` repo it's served at the root.)

**Netlify / Cloudflare Pages / any static host** — point it at this folder; there's no build command.

## Credits & license

- Styling by [LaTeX.css](https://github.com/vincentdoerig/latex-css) by Vincent Doerig (MIT).
- Math by [KaTeX](https://github.com/KaTeX/KaTeX) (MIT), loaded from a CDN.
- This template is released under the MIT License — see `LICENSE`. Make it yours.
