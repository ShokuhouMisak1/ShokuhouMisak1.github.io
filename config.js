// =============================================================================
// PERSONAL SITE CONFIG  —  edit everything below to make this site yours.
// Anything in ALL_CAPS or wrapped in << >> is a placeholder to replace.
// Theme docs: https://www.npmjs.com/package/gatsby-theme-academic
// =============================================================================

module.exports = {
  pathPrefix: '', // keep '' for a <username>.github.io site
  // IMPORTANT: change <username> to your GitHub username (must match repo name)
  siteUrl: 'https://<username>.github.io',
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
      url: 'https://github.com/<username>',
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
  tags: [
    {
      id: 'example',
      name: 'example',
      description: 'An example tag. Add your own tags here.',
      color: '#6f309f',
    },
    {
      id: 'blog',
      name: 'blog',
      description: 'Blog posts.',
      color: '#43ace0',
    },
  ],
};
