# Personal Website — Chengyang Shi

A clean, single-page academic website (inspired by the layout of
[amberljc.github.io](https://amberljc.github.io)). It is a **zero-dependency
static site**: a small Node script renders [`config.js`](config.js) into a
self-contained `public/index.html`. No frameworks, no `npm install`.

## Edit your content

Everything lives in **[`config.js`](config.js)** — name, bio, social links,
education, interests, and teaching/experience. Edit that file and rebuild.

- Bio paragraphs support inline Markdown: `**bold**` and `[text](url)`.
- Social icons use [Font Awesome](https://fontawesome.com/icons) (`['fab','github']`,
  `['fas','envelope']`) and [Academicons](https://jpswalsh.github.io/academicons/)
  (`['ai','cv']`, `['ai','google-scholar']`).
- Sections with no content (e.g. `awards`, empty `professions`) are hidden
  automatically.

## Your photo & favicon

A placeholder avatar (`static/avatar.svg`) ships by default. To use your own
photo, drop a file at `static/avatar.png` (matching the `avatar` field in
`config.js`) — the build prefers it automatically. Replace `static/favicon.svg`
to change the browser tab icon.

## Build & preview locally

```bash
node build.js          # render -> public/
npm run serve          # build, then preview at http://localhost:8080
```

(`npm run serve` and `npm run dev` are the same; both just run plain Node.)

## Deploy (GitHub Pages)

Pushing to `main` triggers [.github/workflows/main.yml](.github/workflows/main.yml),
which builds the site and publishes `public/` to the **`gh-pages`** branch.

First-time setup:

1. Create a GitHub repo named **`<username>.github.io`** and push this project to
   `main`. (Update `siteUrl` and your GitHub `social` URL in `config.js` if your
   username differs.)
2. In **Settings → Pages**, set the source to the **`gh-pages`** branch.
3. The site goes live at `https://<username>.github.io`.

## Project layout

```
config.js                  # ← your content (edit this)
build.js                   # static-site generator
serve.js                   # local preview server
static/                    # assets copied verbatim into the site (avatar, favicon, CV…)
public/                    # build output (git-ignored)
.github/workflows/main.yml # build + deploy to gh-pages
```
