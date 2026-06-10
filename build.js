// =============================================================================
// build.js — zero-dependency static-site generator.
//
// Reads ./config.js and renders a single, self-contained index.html into
// ./public, then copies everything in ./static alongside it. No frameworks,
// no install step — just `node build.js`.
//
// To change the site's CONTENT, edit config.js (not this file).
// To change the site's LOOK, edit the CSS block or the render* functions below.
// =============================================================================

const fs = require('fs');
const path = require('path');

const config = require('./config.js');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'public');
const STATIC = path.join(ROOT, 'static');

// ---------- small helpers ----------------------------------------------------

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Minimal inline-markdown: **bold** and [text](url). Escapes HTML first.
function md(s = '') {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
    (_, t, u) => `<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return out;
}

// config icons are either 'name' (Font Awesome solid) or ['prefix', 'name'].
// prefix: 'fab' brands, 'fas' solid, 'far' regular, 'ai' academicons.
function iconClass(icon) {
  if (!icon) return 'fa-solid fa-circle';
  if (Array.isArray(icon)) {
    const [prefix, name] = icon;
    if (prefix === 'ai') return `ai ai-${name}`;
    const map = { fab: 'fa-brands', fas: 'fa-solid', far: 'fa-regular' };
    return `${map[prefix] || 'fa-solid'} fa-${name}`;
  }
  return `fa-solid fa-${icon}`;
}

const iconTag = (icon, extra = '') => `<i class="${iconClass(icon)} ${extra}" aria-hidden="true"></i>`;

const isReal = (s) => typeof s === 'string' && s.trim() && !s.includes('<') ;

// ---------- section renderers ------------------------------------------------

function renderHeader() {
  const avatarFile = fs.existsSync(path.join(STATIC, config.avatar)) ? config.avatar : 'avatar.svg';
  const professions = (config.professions || []).filter(isReal);

  const meta = [];
  if (isReal(config.location)) {
    meta.push(`<span class="meta-item">${iconTag('location-dot')} ${esc(config.location)}</span>`);
  }
  if (isReal(config.email)) {
    meta.push(`<span class="meta-item">${iconTag('envelope')} <a href="mailto:${esc(config.email)}">${esc(config.email)}</a></span>`);
  }

  const socials = (config.social || []).map((s) => `
        <a class="social-link" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="link">${iconTag(s.icon)}</a>`).join('');

  return `
    <header class="hero" id="top">
      <img class="avatar" src="./${esc(avatarFile)}" alt="${esc(config.author)}" />
      <div class="hero-text">
        <h1 class="name">${esc(config.title)}</h1>
        ${isReal(config.authorAlternative) ? `<p class="name-alt">${esc(config.authorAlternative)}</p>` : ''}
        ${professions.length ? `<p class="professions">${professions.map(esc).join(' &middot; ')}</p>` : ''}
        <div class="meta">${meta.join('')}</div>
        <div class="socials">${socials}</div>
      </div>
    </header>`;
}

function renderAbout() {
  const paras = (config.introduction || []).filter(isReal);
  if (!paras.length) return '';
  return section('about', 'About', `
      <div class="prose">
        ${paras.map((p) => `<p>${md(p)}</p>`).join('\n        ')}
      </div>`);
}

function renderInterests() {
  const items = (config.interests || []).filter((i) => isReal(i.title));
  if (!items.length) return '';
  const cards = items.map((i) => `
        <div class="interest">
          <span class="interest-icon">${iconTag(i.icon)}</span>
          <span>${esc(i.title)}</span>
        </div>`).join('');
  return section('interests', 'Research Interests', `<div class="interest-grid">${cards}</div>`);
}

function renderEducation() {
  const items = (config.education || []).filter((e) => isReal(e.title));
  if (!items.length) return '';
  const rows = items.map((e) => `
        <li class="tl-item">
          <div class="tl-date">${esc(e.date)}</div>
          <div class="tl-body">
            <div class="tl-title">${esc(e.title)}</div>
            <div class="tl-sub">${esc(e.location)}</div>
          </div>
        </li>`).join('');
  return section('education', 'Education', `<ul class="timeline">${rows}</ul>`);
}

function renderExperience() {
  const groups = (config.experience || []).filter((g) => g && Array.isArray(g.data) && g.data.length);
  if (!groups.length) return '';
  const blocks = groups.map((g) => {
    const rows = g.data.map((d) => `
        <li class="tl-item">
          <div class="tl-date">${esc(d.date)}</div>
          <div class="tl-body">
            <div class="tl-title">${esc(d.title)}</div>
            ${isReal(d.location) ? `<div class="tl-sub">${esc(d.location)}</div>` : ''}
            ${isReal(d.description) ? `<div class="tl-desc">${md(d.description)}</div>` : ''}
          </div>
        </li>`).join('');
    const heading = groups.length > 1 ? `<h3 class="subhead">${esc(g.title)}</h3>` : '';
    return `${heading}<ul class="timeline">${rows}</ul>`;
  }).join('\n');
  // When there is a single group (e.g. "Teaching"), use its name as the section title.
  const title = groups.length === 1 ? esc(groups[0].title) : 'Experience';
  return section('experience', title, blocks);
}

function renderAwards() {
  const items = (config.awards || []).filter((a) => isReal(a.title));
  if (!items.length) return '';
  const rows = items.map((a) => `
        <li class="tl-item">
          <div class="tl-date">${esc(a.date)}</div>
          <div class="tl-body"><div class="tl-title">${md(a.title)}</div></div>
        </li>`).join('');
  return section('awards', 'Awards', `<ul class="timeline">${rows}</ul>`);
}

function section(id, title, inner) {
  return `
    <section class="section" id="${id}">
      <h2 class="section-title">${title}</h2>
      ${inner}
    </section>`;
}

// ---------- navigation -------------------------------------------------------

function renderNav(sections) {
  const links = sections.map((s) => `<a href="#${s.id}">${s.label}</a>`).join('');
  return `
    <nav class="nav">
      <div class="nav-inner">
        <a class="nav-brand" href="#top">${esc(config.title)}</a>
        <div class="nav-links">${links}</div>
      </div>
    </nav>`;
}

// ---------- page -------------------------------------------------------------

function page() {
  const about = renderAbout();
  const interests = renderInterests();
  const education = renderEducation();
  const experience = renderExperience();
  const awards = renderAwards();

  const navSections = [
    about && { id: 'about', label: 'About' },
    interests && { id: 'interests', label: 'Interests' },
    education && { id: 'education', label: 'Education' },
    experience && { id: 'experience', label: 'Experience' },
    awards && { id: 'awards', label: 'Awards' },
    { id: 'contact', label: 'Contact' },
  ].filter(Boolean);

  const socials = (config.social || []).map((s) => `
          <a class="social-link" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="link">${iconTag(s.icon)}</a>`).join('');

  const contact = section('contact', 'Contact', `
      <p class="prose">Feel free to reach out${isReal(config.email) ? ` at <a href="mailto:${esc(config.email)}">${esc(config.email)}</a>` : ''}.</p>
      <div class="socials">${socials}</div>`);

  const year = config.buildYear || '';

  return `<!DOCTYPE html>
<html lang="${esc(config.defaultLanguage || 'en')}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(config.title)}</title>
  <meta name="description" content="${esc(config.description)}" />
  <meta name="author" content="${esc(config.author)}" />
  <meta property="og:title" content="${esc(config.title)}" />
  <meta property="og:description" content="${esc(config.description)}" />
  <meta property="og:type" content="website" />
  <link rel="icon" type="image/png" href="./favicon.png" />
  <link rel="apple-touch-icon" href="./favicon.png" />
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@500;600;700&display=swap" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/academicons/1.9.4/css/academicons.min.css" referrerpolicy="no-referrer" />
  <style>${css()}</style>
</head>
<body>
${renderNav(navSections)}
  <main class="container">
${renderHeader()}
${about}
${interests}
${education}
${experience}
${awards}
${contact}
  </main>
  <footer class="footer">
    <p>&copy; ${esc(config.author)}${year ? ` &middot; ${esc(year)}` : ''}</p>
  </footer>
</body>
</html>
`;
}

// ---------- styles -----------------------------------------------------------

function css() {
  return `
:root{
  --bg:#f5f4ef; --card:#ffffff; --fg:#23232a; --muted:#74747e; --soft:#9a9aa4;
  --line:#edece5; --card-line:#eae9e1;
  --accent:#33569f; --accent-soft:#eef2fa; --accent-line:#dde6f6;
  --serif:'Lora',Georgia,'Times New Roman',serif;
  --sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  --maxw:820px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;color:var(--fg);background:var(--bg);
  font-family:var(--sans);line-height:1.72;font-size:16.5px;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
a{color:var(--accent);text-decoration:none;text-underline-offset:2px}
a:hover{text-decoration:underline}
::selection{background:var(--accent-soft)}

/* nav */
.nav{position:sticky;top:0;z-index:20;background:rgba(245,244,239,.82);
  backdrop-filter:saturate(180%) blur(10px);border-bottom:1px solid var(--line)}
.nav-inner{max-width:var(--maxw);margin:0 auto;padding:14px 28px;
  display:flex;align-items:center;justify-content:space-between;gap:16px}
.nav-brand{font-family:var(--serif);font-weight:600;font-size:18px;color:var(--fg);letter-spacing:-.01em}
.nav-brand:hover{text-decoration:none;color:var(--accent)}
.nav-links{display:flex;gap:22px;flex-wrap:wrap}
.nav-links a{color:var(--muted);font-size:14px;font-weight:500;letter-spacing:.01em}
.nav-links a:hover{color:var(--accent);text-decoration:none}

/* content card on the warm base */
.container{max-width:var(--maxw);margin:30px auto 26px;background:var(--card);
  border:1px solid var(--card-line);border-radius:18px;
  box-shadow:0 1px 2px rgba(31,35,40,.04),0 22px 48px -18px rgba(31,35,40,.16);
  padding:16px 54px 42px}

/* hero */
.hero{display:flex;gap:36px;align-items:center;padding:36px 0 32px;scroll-margin-top:78px}
.avatar{width:166px;height:166px;border-radius:50%;object-fit:cover;
  border:4px solid #fff;outline:1px solid var(--line);
  box-shadow:0 8px 26px -6px rgba(31,35,40,.22);flex:none;background:#eee}
.hero-text{min-width:0}
.name{margin:0 0 7px;font-family:var(--serif);font-size:40px;font-weight:600;
  letter-spacing:-.015em;line-height:1.08;color:var(--fg)}
.name-alt{margin:0 0 6px;color:var(--muted);font-size:18px}
.professions{margin:0 0 10px;color:var(--accent);font-weight:600;letter-spacing:.01em}
.meta{display:flex;flex-wrap:wrap;gap:6px 22px;color:var(--muted);font-size:14.5px;margin:2px 0 14px}
.meta-item i{color:var(--accent);margin-right:7px}
.meta a{color:var(--muted)}
.meta a:hover{color:var(--accent)}
.socials{display:flex;gap:17px;font-size:20px}
.social-link{color:var(--soft);transition:color .18s,transform .18s}
.social-link:hover{color:var(--accent);transform:translateY(-2px)}

/* sections */
.section{padding:30px 0;border-top:1px solid var(--line);scroll-margin-top:78px}
.section-title{font-family:var(--serif);font-size:23px;font-weight:600;letter-spacing:-.01em;
  margin:0 0 18px;color:var(--fg);position:relative;padding-bottom:11px}
.section-title::after{content:"";position:absolute;left:0;bottom:0;width:40px;height:2px;
  background:var(--accent);border-radius:2px}
.subhead{font-size:13px;color:var(--soft);margin:20px 0 8px;font-weight:600;
  text-transform:uppercase;letter-spacing:.06em}
.prose{font-size:16.5px;color:#36363d}
.prose p{margin:0 0 14px}
.prose p:last-child{margin-bottom:0}
.prose strong{font-weight:600;color:var(--fg)}

/* interests */
.interest-grid{display:flex;flex-wrap:wrap;gap:12px}
.interest{display:flex;align-items:center;gap:10px;padding:9px 18px;
  background:var(--accent-soft);border:1px solid var(--accent-line);border-radius:999px;
  font-weight:500;font-size:15px;color:#2e3954}
.interest-icon i{color:var(--accent)}

/* timeline (education / experience / awards) */
.timeline{list-style:none;margin:0;padding:0}
.tl-item{display:flex;gap:26px;padding:14px 0;border-bottom:1px solid var(--line)}
.tl-item:last-child{border-bottom:none}
.tl-date{flex:none;width:118px;color:var(--soft);font-size:12.5px;font-weight:600;
  padding-top:4px;letter-spacing:.04em;text-transform:uppercase;font-variant-numeric:tabular-nums}
.tl-body{min-width:0}
.tl-title{font-weight:600;font-size:16.5px;color:var(--fg)}
.tl-sub{color:var(--muted);font-size:14.5px;margin-top:1px}
.tl-desc{font-size:15px;margin-top:4px;color:#3d3d45}

/* footer */
.footer{max-width:var(--maxw);margin:0 auto;padding:6px 28px 44px;
  text-align:center;color:var(--soft);font-size:13px}

/* responsive */
@media (max-width:680px){
  body{font-size:16px}
  .nav-inner{padding:12px 18px}
  .container{margin:16px 14px 20px;padding:8px 22px 26px;border-radius:14px}
  .hero{flex-direction:column;text-align:center;gap:18px;padding:26px 0 24px}
  .avatar{width:132px;height:132px}
  .meta,.socials,.interest-grid{justify-content:center}
  .name{font-size:31px}
  .tl-item{flex-direction:column;gap:3px}
  .tl-date{width:auto}
  .nav-brand{max-width:55%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
}
`;
}

// ---------- write output -----------------------------------------------------

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  copyDir(STATIC, OUT);
  fs.writeFileSync(path.join(OUT, 'index.html'), page());
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  // eslint-disable-next-line no-console
  console.log('Built site -> public/index.html');
}

build();
