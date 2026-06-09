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

// Explicitly type optional siteMetadata fields.
//
// The theme's useSiteMetadata hook queries a fixed list of fields. Gatsby infers
// the schema from config.js, so a field that is empty (e.g. `professions: []`)
// or omitted has no inferable type and the query fails with
// "Cannot query field <x> on type SiteSiteMetadata". Declaring the types here
// lets those fields be empty/absent without breaking the build. These extra
// type definitions merge with Gatsby's inference for everything else.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type SiteSiteMetadata {
      professions: [String]
    }
  `);
};
