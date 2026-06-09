// =============================================================================
// PERSONAL SITE CONFIG  —  edit everything below to make this site yours.
// Anything in ALL_CAPS or wrapped in << >> is a placeholder to replace.
// Theme docs: https://www.npmjs.com/package/gatsby-theme-academic
// =============================================================================

module.exports = {
  pathPrefix: '', // keep '' for a <username>.github.io site
  // IMPORTANT: replace `your-username` with your real GitHub username.
  // (Don't use < > brackets here — they make the URL invalid and break the build.)
  siteUrl: 'https://your-username.github.io',
  title: 'Chengyang Shi',
  description: 'Personal Website of Chengyang Shi',
  author: 'Chengyang Shi',
  authorAlternative: '', // e.g. your name in another language; leave '' to hide

  // Each string is one paragraph on the home page. Markdown links work: [text](url)
  introduction: [
    'I\'m a <YOUR ROLE, e.g. graduate student> at the University of Michigan. ' +
    'Write a short bio here describing what you work on and what excites you.',
    'Add a second paragraph about your research interests, projects, or background. ' +
    'You can use **bold**, *italic*, and [links](https://example.com).',
  ],

  avatar: 'avatar.png', // replace static/avatar.png with your own photo
  professions: [
    'Student',
    'Developer',
  ],
  birthday: '', // optional, e.g. 'January 1, 2000'; leave '' to hide
  location: 'Ann Arbor, MI, USA',
  email: 'chengysh@umich.edu',

  tocMaxDepth: 2,
  excerptMaxLength: 500,
  postsForArchivePage: 3,
  defaultLanguage: 'en',

  // Comments (optional). Create a free Disqus shortname or leave the default off.
  disqusScript: process.env.DISQUS_SCRIPT || '',

  // Navigation pages — keep the ones you want.
  pages: {
    home: '/',
    posts: 'posts',
    contact: 'contact',
    resume: 'resume',
    tags: 'tags',
    research: 'research',
  },

  // Social / external links shown as icons.
  // Icons use Font Awesome: ['fab', 'github'], ['fas', 'envelope'], ['ai', 'cv'] (academicons)
  social: [
    {
      url: '/CV.pdf', // add your CV as static/CV.pdf, or remove this entry
      icon: ['ai', 'cv'],
    }, {
      url: 'https://github.com/your-username',
      icon: ['fab', 'github'],
    }, {
      url: 'mailto:chengysh@umich.edu',
      icon: ['fas', 'envelope'],
    },
    // { url: 'https://www.linkedin.com/in/<you>', icon: ['fab', 'linkedin'] },
    // { url: 'https://scholar.google.com/citations?user=<id>', icon: ['ai', 'google-scholar'] },
  ],

  // Optional WakaTime coding-stats widget. Remove this block if you don't use WakaTime.
  // wakatime: {
  //   username: '',
  //   activity: '',
  //   language: '',
  //   editor: '',
  //   os: '',
  // },

  // Contact-form backend (e.g. https://getform.io or https://formspree.io). Optional.
  contactFormUrl: process.env.CONTACT_FORM_ENDPOINT || '',
  googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',

  // ----- Resume page data --------------------------------------------------
  education: [
    {
      date: 'Sept 20XX - Present',
      icon: 'graduation-cap',
      title: '<Degree, e.g. M.S. in Computer Science>',
      location: 'University of Michigan, USA',
    },
    {
      date: 'Sept 20XX - June 20XX',
      icon: 'university',
      title: '<Bachelor degree>',
      location: '<Your undergraduate university>',
    },
  ],

  interests: [
    { icon: 'code', title: '<Interest 1>' },
    { icon: 'cubes', title: '<Interest 2>' },
    { icon: ['fab', 'linux'], title: '<Interest 3>' },
  ],

  experience: [
    {
      title: 'Work',
      position: 'left',
      data: [
        {
          date: '20XX - Present',
          title: '<Job title>',
          location: '<Company / Lab>',
          description: '<What you did>',
        },
      ],
    },
    {
      title: 'Teaching',
      position: 'right',
      data: [
        {
          date: '<Term Year>',
          title: 'Teaching Assistant',
          description: '<Course code and name>',
          location: 'University of Michigan, USA',
        },
      ],
    },
  ],

  awards: [
    {
      date: '<Month Year>',
      title: '<Award name>',
    },
  ],

  // ----- Tag styling (used by blog posts & research) -----------------------
  tagColors: [
    'magenta', 'red', 'volcano', 'orange', 'gold',
    'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
  ],
  // NOTE: The /tags page renders one card per tag image that ships with the
  // theme (css, gatsby, html, javascript, nodejs, python, reactjs, rxjs,
  // typescript). Each of those names MUST have a matching entry below or the
  // build crashes. Keep all nine; edit their text/colors freely. You can add
  // your own tags too (extra entries without a theme image just won't get a
  // card on the /tags page, which is fine).
  tags: [
    {
      id: 'javascript',
      name: 'javascript',
      description: 'JavaScript is an object-oriented language used with HTML and CSS to add behavior to web pages.',
      color: '#f0da50',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      description: 'Node.js is a runtime for executing JavaScript outside the browser.',
      color: '#90c53f',
    },
    {
      id: 'rxjs',
      name: 'RxJS',
      description: 'RxJS is a library for reactive programming using Observables.',
      color: '#eb428e',
    },
    {
      id: 'typescript',
      name: 'typescript',
      description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      color: '#257acc',
    },
    {
      id: 'reactjs',
      name: 'reactjs',
      description: 'React is a JavaScript library for building user interfaces.',
      color: '#61dbfa',
    },
    {
      id: 'gatsby',
      name: 'Gatsby.js',
      description: 'A React-based framework for generating static web sites.',
      color: '#6f309f',
    },
    {
      id: 'html',
      name: 'HTML',
      description: 'The markup language that structures content on the web.',
      color: '#dd3431',
    },
    {
      id: 'css',
      name: 'css',
      description: 'CSS styles HTML elements and controls the look of a web page.',
      color: '#43ace0',
    },
    {
      id: 'python',
      name: 'python',
      description: 'A general-purpose programming language widely used across many domains.',
      color: '#f9c646',
    },
    // ---- Your own tags below (used by content; no /tags card needed) ----
    {
      id: 'example',
      name: 'example',
      description: 'An example tag. Add your own tags here.',
      color: '#9254de',
    },
    {
      id: 'blog',
      name: 'blog',
      description: 'Blog posts.',
      color: '#13c2c2',
    },
  ],
};
