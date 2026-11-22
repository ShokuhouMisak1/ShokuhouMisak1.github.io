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

// Author list with your own name (config.author) in bold.
function renderAuthors(authors = []) {
  // A trailing "*" marks equal contribution and is kept outside the bold name.
  return authors.map((a) => {
    const name = a.replace(/\*+$/, '');
    const mark = a.slice(name.length);
    return (name === config.author ? `<b>${esc(name)}</b>` : esc(name)) + esc(mark);
  }).join(', ');
}

const extLink = (url, inner, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}" target="_blank" rel="noopener">${inner}</a>`;

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
  const invite = isReal(config.email)
    ? `<p class="invite">I am always glad to talk about research. Feel free to reach out by <a href="mailto:${esc(config.email)}">email</a>.</p>`
    : '';
  return `
    <section class="bio" id="about">
      ${paras.map((p) => `<p>${md(p)}</p>`).join('\n      ')}
      ${invite}
    </section>`;
}

function renderInterests() {
  const items = (config.interests || []).filter((i) => isReal(i.title));
  if (!items.length) return '';
  const pills = items.map((i) => `
        <span class="interest">${iconTag(i.icon)}${esc(i.title)}</span>`).join('');
  return section('interests', 'Research Interests', 'compass', `<div class="interest-grid">${pills}
      </div>`);
}

function renderPublications() {
  const items = (config.publications || []).filter((p) => isReal(p.title));
  if (!items.length) return '';
  const rows = items.map((p) => {
    const title = p.url ? extLink(p.url, esc(p.title)) : esc(p.title);
    const links = (p.links || []).map((l) => extLink(l.url, esc(l.label))).join('');
    return `
      <article class="pub">
        <h3>${title}</h3>
        <p class="authors">${renderAuthors(p.authors)}${isReal(p.note) ? ` <span class="pub-note">(${esc(p.note)})</span>` : ''}</p>
        ${isReal(p.venue) ? `<p class="venue">${esc(p.venue)}</p>` : ''}
        ${links ? `<p class="plinks">${links}</p>` : ''}
      </article>`;
  }).join('');
  const more = config.scholarUrl
    ? `<p class="more-note">Full list on ${extLink(config.scholarUrl, 'Google Scholar')}</p>`
    : '';
  return section('publications', 'Publications', 'file-lines', `${rows}${more}`);
}

function renderPosts() {
  const items = (config.posts || []).filter((p) => isReal(p.title));
  if (!items.length) return '';
  const cards = items.map((p) => `
      <a class="note" href="${esc(p.url)}" target="_blank" rel="noopener">
        <div class="nt">${esc(p.title)}</div>
        <div class="nd">${esc(p.date)}</div>
        ${p.authors && p.authors.length ? `<div class="na">${renderAuthors(p.authors)}</div>` : ''}
        ${isReal(p.summary) ? `<div class="ns">${esc(p.summary)}</div>` : ''}
      </a>`).join('');
  return section('blog', 'Blog', 'pen-nib', `<div class="postlist">${cards}</div>`);
}

// One row: title + subtitle + optional description, with the date on the right.
function row({ date, title, sub, desc }) {
  return `
      <div class="xr">
        <div>
          <div class="org2">${md(title)}</div>
          ${isReal(sub) ? `<div class="role">${esc(sub)}</div>` : ''}
          ${isReal(desc) ? `<div class="d">${md(desc)}</div>` : ''}
        </div>
        <div class="when">${esc(date)}</div>
      </div>`;
}

function renderEducation() {
  const items = (config.education || []).filter((e) => isReal(e.title));
  if (!items.length) return '';
  const rows = items.map((e) => row({ date: e.date, title: e.title, sub: e.location })).join('');
  return section('education', 'Education', 'graduation-cap', rows);
}

function renderExperience() {
  const groups = (config.experience || []).filter((g) => g && Array.isArray(g.data) && g.data.length);
  if (!groups.length) return '';
  const blocks = groups.map((g) => {
    const rows = g.data.map((d) => row({
      date: d.date, title: d.title, sub: d.location, desc: d.description,
    })).join('');
    const heading = groups.length > 1 ? `<h3 class="grp">${esc(g.title)}</h3>` : '';
    return `${heading}${rows}`;
  }).join('\n');
  // When there is a single group (e.g. "Teaching"), use its name as the section title.
  const title = groups.length === 1 ? esc(groups[0].title) : 'Experience';
  const icon = /teach/i.test(title) ? 'chalkboard-user' : 'briefcase';
  return section('experience', title, icon, blocks);
}

function renderAwards() {
  const items = (config.awards || []).filter((a) => isReal(a.title));
  if (!items.length) return '';
  const rows = items.map((a) => row({ date: a.date, title: a.title })).join('');
  return section('awards', 'Awards', 'award', rows);
}

function section(id, title, icon, inner) {
  return `
    <section id="${id}">
      <h2 class="sec">${iconTag(icon)}${title}</h2>
      ${inner}
    </section>`;
}

// ---------- navigation -------------------------------------------------------

function renderNav(sections) {
  const links = sections.map((s) => `<a href="#${s.id}">${s.label}</a>`).join('')
    + (fs.existsSync(path.join(STATIC, 'CV.pdf')) ? '<a href="./CV.pdf" target="_blank" rel="noopener">CV</a>' : '');
  return `
  <nav class="nav">
    <div class="nav-inner">
      <a class="nav-brand" href="#top">${esc(config.title)}</a>
      <div class="nav-links">${links}</div>
    </div>
  </nav>`;
}

// Highlights the tab of the section currently in view.
const scrollSpy = `
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var secs=tabs.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
  function update(){
    var y=window.scrollY+120, cur=secs[0];
    secs.forEach(function(s){ if(s.offsetTop<=y) cur=s; });
    if(window.innerHeight+window.scrollY>=document.body.scrollHeight-4) cur=secs[secs.length-1];
    tabs.forEach(function(a){ a.classList.toggle('on', cur && a.getAttribute('href')==='#'+cur.id); });
  }
  window.addEventListener('scroll',update,{passive:true}); update();
})();`;

// ---------- page -------------------------------------------------------------

function page() {
  const about = renderAbout();
  const interests = renderInterests();
  const publications = renderPublications();
  const posts = renderPosts();
  const education = renderEducation();
  const experience = renderExperience();
  const awards = renderAwards();

  const navSections = [
    about && { id: 'about', label: 'About' },
    interests && { id: 'interests', label: 'Interests' },
    publications && { id: 'publications', label: 'Publications' },
    posts && { id: 'blog', label: 'Blog' },
    education && { id: 'education', label: 'Education' },
    experience && { id: 'experience', label: (config.experience.length === 1 && config.experience[0].title) || 'Experience' },
    awards && { id: 'awards', label: 'Awards' },
  ].filter(Boolean);

  const year = config.buildYear || new Date().getFullYear();

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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/academicons/1.9.4/css/academicons.min.css" referrerpolicy="no-referrer" />
  <style>${css()}</style>
</head>
<body>
${renderNav(navSections)}
  <main class="wrap">
${renderHeader()}
${about}
${interests}
${publications}
${posts}
${education}
${experience}
${awards}
    <footer>&copy; ${esc(year)} ${esc(config.author)}</footer>
  </main>
  <script>${scrollSpy}</script>
</body>
</html>
`;
}

// ---------- styles -----------------------------------------------------------
// Ivory paper, ink text, oxblood accent. Serif for display, sans for reading.

function css() {
  return `
:root{--bg:#faf7f0;--paper:#fffdf8;--fg:#1b1d24;--muted:#6b6862;--line:#e7e0d2;--line2:#cfc6b4;
  --accent:#8c2f39;--accent2:#a8464f;--soft:#f3eee3;--bar:rgba(250,247,240,.9);
  --serif:Newsreader,'Iowan Old Style',Georgia,serif;
  --sans:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
@media (prefers-color-scheme:dark){:root{--bg:#15130f;--paper:#1c1a15;--fg:#ece7dc;--muted:#a49e92;
  --line:#2e2a22;--line2:#4a4436;--accent:#e39aa2;--accent2:#f0b3b9;--soft:#211e18;--bar:rgba(21,19,15,.9)}}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:70px;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:19px/1.72 var(--sans);-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none}
a:hover{color:var(--accent2);text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
::selection{background:var(--soft)}

/* nav */
.nav{position:sticky;top:0;z-index:5;background:var(--bar);backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav-inner{max-width:980px;margin:0 auto;padding:14px 32px;display:flex;align-items:center;
  justify-content:space-between;gap:16px}
.nav-brand{font-family:var(--serif);font-weight:600;font-size:1.15rem;color:var(--fg);letter-spacing:-.01em}
.nav-brand:hover{text-decoration:none;color:var(--accent)}
.nav-links{display:flex;gap:24px;font-size:.92rem}
.nav-links a{color:var(--muted);font-weight:500;letter-spacing:.01em;padding-bottom:3px}
.nav-links a:hover{color:var(--fg);text-decoration:none}
.nav-links a.on{color:var(--fg);box-shadow:inset 0 -2px 0 var(--accent)}

.wrap{max-width:980px;margin:0 auto;padding:0 32px 110px}

/* hero */
.hero{display:flex;gap:40px;align-items:center;padding:56px 0 8px}
.avatar{width:176px;height:176px;border-radius:50%;object-fit:cover;flex:none;background:var(--paper);
  border:1px solid var(--line);box-shadow:0 10px 30px -12px rgba(60,40,20,.4)}
.hero-text{min-width:0}
.name{margin:0 0 8px;font-family:var(--serif);font-size:3rem;font-weight:500;letter-spacing:-.015em;line-height:1.08}
.name-alt{margin:0 0 6px;color:var(--muted);font-size:1.1rem}
.professions{margin:0 0 10px;color:var(--accent);font-weight:600}
.meta{display:flex;flex-wrap:wrap;gap:6px 22px;color:var(--muted);font-size:.9rem;margin:2px 0 14px}
.meta-item i{color:var(--accent);margin-right:7px}
.meta a{color:var(--muted)}
.meta a:hover{color:var(--accent)}
.socials{display:flex;gap:18px;font-size:1.25rem}
.social-link{color:var(--muted);transition:color .18s,transform .18s}
.social-link:hover{color:var(--accent);transform:translateY(-2px);text-decoration:none}

/* research interests */
.interest-grid{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}
.interest{display:inline-flex;align-items:center;gap:10px;padding:8px 18px;background:var(--paper);
  border:1px solid var(--line2);border-radius:999px;font-weight:500;font-size:.95rem}
.interest i{color:var(--accent)}

/* bio */
.bio{margin-top:40px;border-top:1px solid var(--line);padding-top:30px}
.bio p{font-family:var(--serif);font-size:1.42rem;line-height:1.68;color:var(--fg);margin:0 0 18px}
.bio p b,.bio p strong{font-weight:600}
.bio p.invite{font-size:1.2rem;color:var(--muted)}

/* section heads */
h2.sec{font-family:var(--serif);font-size:1.32rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
  color:var(--fg);margin:84px 0 8px;padding-bottom:14px;border-bottom:1px solid var(--line);
  display:flex;align-items:center;gap:12px}
h2.sec i{color:var(--accent);font-size:1.05rem}
h3.grp{font-family:var(--serif);font-size:1.35rem;font-weight:500;margin:46px 0 4px}

/* publications */
.pub{padding:20px 0;border-bottom:1px solid var(--line)}
.pub:last-of-type{border-bottom:0}
.pub h3{font-family:var(--serif);font-size:1.22rem;line-height:1.35;margin:0 0 6px;font-weight:600}
.pub h3 a{color:var(--fg)}
.pub h3 a:hover{color:var(--accent);text-decoration:none}
.pub p{margin:0}
.authors{font-size:.95rem;color:var(--muted)}
.authors b,.na b{color:var(--fg);font-weight:600}
.venue{font-size:.86rem;margin-top:6px!important;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:var(--accent)}
.pub-note{color:var(--muted);font-size:.86em}
.plinks{margin-top:10px!important}
.plinks a{display:inline-block;margin:0 8px 4px 0;padding:2px 12px;border-radius:3px;font-size:.8rem;
  font-weight:600;letter-spacing:.02em;border:1px solid var(--line2);color:var(--fg)}
.plinks a:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}
.more-note{color:var(--muted);font-size:.92rem;margin:26px 0 0}

/* blog cards */
.note{display:block;margin-top:18px;padding:22px 24px;background:var(--paper);border:1px solid var(--line);
  border-radius:12px;color:var(--fg);transition:border-color .15s}
.note:hover{border-color:var(--accent);text-decoration:none;color:var(--fg)}
.note .nt{font-family:var(--serif);font-size:1.35rem;font-weight:600;line-height:1.3}
.note .nd{color:var(--muted);font-size:.86rem;margin:6px 0 4px;letter-spacing:.03em}
.note .na{color:var(--muted);font-size:.86rem;margin-bottom:8px}
.note .ns{color:var(--fg);font-size:1rem;opacity:.85}
.postlist{margin-top:4px}

/* education / teaching rows */
.xr{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:start;padding:20px 0;
  border-bottom:1px solid var(--line)}
.xr:last-child{border-bottom:0}
.xr .org2{font-family:var(--serif);font-size:1.25rem;font-weight:600;line-height:1.3}
.xr .role{font-size:1rem;color:var(--fg);margin-top:2px}
.xr .d{font-size:.96rem;color:var(--muted);margin-top:6px;line-height:1.6}
.xr .when{font-size:.88rem;color:var(--muted);white-space:nowrap;padding-top:4px;letter-spacing:.02em}

footer{margin-top:90px;color:var(--muted);font-size:.88rem;border-top:1px solid var(--line);padding-top:22px}

@media(max-width:760px){
  body{font-size:16.5px}
  .wrap{padding:0 20px 80px}
  .nav-inner{padding:12px 20px}
  .nav-brand{display:none}
  .nav-links{gap:18px;font-size:.88rem;overflow-x:auto;scrollbar-width:none;white-space:nowrap}
  .nav-links::-webkit-scrollbar{display:none}
  .hero{flex-direction:column;text-align:center;gap:18px;padding:32px 0 4px}
  .avatar{width:136px;height:136px}
  .meta,.socials{justify-content:center}
  .name{font-size:2.3rem}
  .bio p{font-size:1.2rem}
  .bio p.invite{font-size:1.05rem}
  h2.sec{margin-top:60px;font-size:1.15rem}
  .xr{grid-template-columns:1fr;gap:2px}
  .xr .when{padding-top:4px}
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
