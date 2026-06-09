# Personal Website

A personal academic website built with [Gatsby](https://www.gatsbyjs.com/) and
the [gatsby-theme-academic](https://www.npmjs.com/package/gatsby-theme-academic)
theme. Scaffolded from [tc-imba/tc-imba.github.io](https://github.com/tc-imba/tc-imba.github.io)
as a structural template — this is an independent repository, **not a fork**, so
none of the original author's content remains.

## What to fill in

| File / folder | What it controls |
| --- | --- |
| `config.js` | **Main file.** Your name, bio, links, education, experience, awards, tags. Look for `<placeholders>` and replace them. |
| `static/avatar.png` | Your profile photo (replace this file). |
| `static/CV.pdf` | Your CV (add this file; the home-page CV icon links to `/CV.pdf`). |
| `static/favicon.png` / `favicon.ico` | Browser tab icon (replace to taste). |
| `content/research/*/index.md` | One folder per research project. Duplicate `example-project` for each. |
| `content/posts/*/index.md` | One folder per blog post. Duplicate `2026-01-01-hello-world`. |
| `content/tags/*/index.md` | Optional descriptive pages for tags you use. |
| `gatsby-config.js` | Theme options (Google Analytics id, favicon path). Usually leave as-is. |

> **Critical:** in `config.js`, change every `<username>` to your real GitHub
> username, and set `siteUrl` to `https://<username>.github.io`.

## Run locally

Requires Node.js 18+ (you have a newer version, which is fine).

```bash
npm install            # first time only
npm run develop        # dev server at http://localhost:8000
npm run build          # production build into ./public
```

If `npm install` fails while building the native `canvas` dependency on macOS,
install its system libraries first:

```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

## Publish to GitHub Pages (no fork)

1. Create a **new** repository on GitHub named exactly `<username>.github.io`
   (replace `<username>` with your GitHub username). Create it empty — do **not**
   fork tc-imba's repo.
2. Push this folder to it:
   ```bash
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. The included GitHub Actions workflow (`.github/workflows/main.yml`) builds the
   site and pushes the result to a `gh-pages` branch on every push to `main`.
4. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, then select branch **`gh-pages`** and folder **`/ (root)`**. Save.
5. Your site goes live at `https://<username>.github.io/` after the action finishes
   (watch the **Actions** tab).

## License

The theme and tooling are MIT-licensed. Your content is yours.
