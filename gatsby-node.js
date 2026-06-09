// Remove the theme's orphan `/tags` index page.
//
// gatsby-theme-academic ships a /tags page that renders one card per bundled
// tag image and looks each up in `config.tags`. If you don't define `config.tags`
// (or trim it), that page crashes at build time. It isn't linked from the nav,
// so we simply delete it. Per-tag pages (/tags/<name>/) are untouched and still
// work for tag links on posts/research.
//
// If you later want a real /tags page, re-enable the `tags` array in config.js
// (keep all nine theme tag ids) and delete this file.
exports.onCreatePage = ({ page, actions }) => {
  const { deletePage } = actions;
  if (page.path === '/tags/' || page.path === '/tags') {
    deletePage(page);
  }
};
