// =============================================================================
// PERSONAL SITE CONFIG  —  edit everything below to make this site yours.
// Anything in ALL_CAPS or wrapped in << >> is a placeholder to replace.
// Theme docs: https://www.npmjs.com/package/gatsby-theme-academic
// =============================================================================

module.exports = {
  pathPrefix: '', // keep '' for a <username>.github.io site
  // IMPORTANT: replace `your-username` with your real GitHub username.
  // (Don't use < > brackets here — they make the URL invalid and break the build.)
  siteUrl: 'https://ShokuhouMisak1.github.io',
  title: 'Chengyang Shi',
  description: 'Personal Website of Chengyang Shi',
  author: 'Chengyang Shi',
  authorAlternative: '', // e.g. your name in another language; leave '' to hide

  // Each string is one paragraph on the home page. Markdown links work: [text](url)
  introduction: [
    'I\'m an undergraduate student majoring in Mathematics and Computer Science at the University of Michigan and Electrical & Computer Engineering at Shanghai Jiao Tong University. '
    + 'My interests lie in **AI for Scientific Research**, especially **Autoresearch**, where AI agents carry out the research loop themselves, from forming hypotheses to running experiments, '
    + 'and **LLM Evaluation**, which measures whether what these agents claim is actually earned.',
    'My recent work, [Open-Endedness Bench](https://arxiv.org/abs/2610.02588), evaluates research agents by reading their full records and checking each conclusion against what actually ran, rather than grading only the final score. '
    + 'I want to keep building evaluations like this, so that progress in automated research is something we can trust.',
  ],

  avatar: 'avatar.png', // replace static/avatar.png with your own photo
  // The theme requires this field to exist and renders it under your name.
  // Empty array = no subtitle shown. Add strings (e.g. 'Student') to show them.
  professions: [],
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
      url: 'CV.pdf', // static/CV.pdf; also linked as "CV" in the top nav
      icon: ['ai', 'cv'],
    },
    {
      url: 'https://github.com/ShokuhouMisak1',
      icon: ['fab', 'github'],
    }, {
      url: 'mailto:chengysh@umich.edu',
      icon: ['fas', 'envelope'],
    },
    { url: 'https://www.linkedin.com/in/chengyang-shi-91844738b/', icon: ['fab', 'linkedin'] },
    { url: 'https://scholar.google.com/citations?user=Ya1cdNUAAAAJ&hl=en', icon: ['ai', 'google-scholar'] },
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

  // ----- Publications ------------------------------------------------------
  // Newest first. Your own name (config.author) is bolded automatically.
  // `url` links the title; `links` render as small buttons under the entry.
  scholarUrl: 'https://scholar.google.com/citations?user=Ya1cdNUAAAAJ&hl=en',
  publications: [
    {
      title: 'ChipRSI: Learning an RTL Optimization Methodology from EDA-Graded Runs',
      url: 'papers/ChipRSI_DAC2027.pdf', // static/papers/ChipRSI_DAC2027.pdf
      authors: ['Jiachen Liu*', 'Chengyang Shi*', 'Yiqian Min'],
      note: '*Equal contribution',
      venue: 'Under review at DAC 2027',
      links: [
        { label: 'PDF', url: 'papers/ChipRSI_DAC2027.pdf' },
      ],
    },
    {
      title: 'Open-Endedness Bench: Measuring Epistemic Process from Agent Records',
      url: 'https://arxiv.org/abs/2610.02588',
      authors: ['Chengyang Shi', 'Xianglin Ji', 'Jintao Huang', 'Jicheng Wang', 'Yifeng He', 'Jiachen Liu'],
      venue: 'Under review at ICLR 2027',
      links: [
        { label: 'arXiv', url: 'https://arxiv.org/abs/2610.02588' },
        { label: 'Code', url: 'https://github.com/ARA-Labs/oeb' },
        { label: 'Data', url: 'https://huggingface.co/datasets/AgentNativeResearchLab/oeb-scored-runs' },
        { label: 'Blog', url: 'https://www.agenticresearch.sh/blog/science-in-broad-daylight' },
      ],
    },
    {
      title: 'A11yLTLNav: Automatic Detection of Accessibility Navigation Failures',
      url: 'https://arxiv.org/abs/2609.17959',
      authors: ['Chenming Ge', 'Kewen Peng', 'Chengyang Shi', 'Ben Greenman', 'Yue Jiang'],
      venue: 'Under review at CHI 2027',
      links: [
        { label: 'arXiv', url: 'https://arxiv.org/abs/2609.17959' },
      ],
    },
    {
      title: 'The Greatness of Science Cannot Be Planned: Agentic Auto-Research is Fuzz Testing',
      url: 'https://arxiv.org/abs/2608.09855',
      authors: ['Yifeng He', 'Jicheng Wang', 'Yinzhe Zhao', 'Chengyang Shi', 'Jiachen Liu', 'Hao Chen'],
      venue: 'arXiv preprint, 2026',
      links: [
        { label: 'arXiv', url: 'https://arxiv.org/abs/2608.09855' },
        { label: 'Blog', url: 'https://www.agenticresearch.sh/blog/the-goal-of-science-is-not-to-win' },
      ],
    },
  ],

  // ----- Blog posts (external) ---------------------------------------------
  posts: [
    {
      title: 'Science in Broad Daylight',
      url: 'https://www.agenticresearch.sh/blog/science-in-broad-daylight',
      date: 'October 2, 2026',
      authors: ['Chengyang Shi', 'Xianglin Ji', 'Jintao Huang', 'Jicheng Wang', 'Yifeng He', 'Jiachen Liu'],
      summary: 'AI agents are the first researchers to show all their work, and we still grade them on the answer.',
    },
    {
      title: 'The Goal of Science Is Not to Win',
      url: 'https://www.agenticresearch.sh/blog/the-goal-of-science-is-not-to-win',
      date: 'August 19, 2026',
      authors: ['Yifeng He', 'Jicheng Wang', 'Yinzhe Zhao', 'Chengyang Shi', 'Jiachen Liu', 'Hao Chen'],
      summary: 'Before AI can discover what humanity does not know, it must first learn to discover what it does not know.',
    },
    {
      title: 'AI Should Build Its Own Research World Model',
      url: 'https://www.agenticresearch.sh/blog/research-world-model',
      date: 'July 1, 2026',
      authors: ['Chengyang Shi', 'Xianglin Ji', 'Jiachen Liu'],
      summary: 'Opus 4.8 cleared ARC-AGI’s final level in one shot.',
    },
  ],

  // ----- Resume page data --------------------------------------------------
  education: [
    {
      date: 'Aug 2025 - Present',
      icon: 'university',
      title: 'B.S. in Mathematics and Computer Science',
      location: 'University of Michigan, Ann Arbor, USA',
    },
    {
      date: 'Aug 2023 - Present',
      icon: 'university',
      title: 'B.Eng. in Electrical & Computer Engineering',
      location: 'Shanghai Jiao Tong University, China',
    },
  ],

  interests: [
    { icon: 'flask', title: 'AI for Scientific Research' },
    { icon: 'robot', title: 'Autoresearch' },
    { icon: 'scale-balanced', title: 'LLM Evaluation' },
  ],

  experience: [
    // Work hidden for now — uncomment to restore:
    // {
    //   title: 'Work',
    //   position: 'left',
    //   data: [
    //     {
    //       date: '20XX - Present',
    //       title: '<Job title>',
    //       location: '<Company / Lab>',
    //       description: '<What you did>',
    //     },
    //   ],
    // },
    {
      title: 'Teaching',
      // `position` is ignored now: the experience page is shadowed to show a
      // single centered column (see src/gatsby-theme-academic/pages/experience).
      position: 'right',
      data: [
        {
          date: '2025 SU',
          title: 'Teaching Assistant',
          // The description renders Markdown, so [text](url) becomes a real link.
          description: 'MATH2550J, Honors Calculus II ([Course Repo](https://github.com/MathematicsJI/MATH2550J))',
          location: 'Shanghai Jiaotong University, China',
        },
        {
          date: '2024 FA',
          title: 'Teaching Assistant',
          description: 'MATH1560J, Honors Calculus I ([Course Repo](https://github.com/MathematicsJI/MATH1560J))',
          location: 'Shanghai Jiaotong University, China',
        },
      ],
    },
  ],

  // awards: [
  //   {
  //     date: '<Month Year>',
  //     title: '<Award name>',
  //   },
  // ],

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
  // tags: [
  //   {
  //     id: 'javascript',
  //     name: 'javascript',
  //     description: 'JavaScript is an object-oriented language used with HTML and CSS to add behavior to web pages.',
  //     color: '#f0da50',
  //   },
  //   {
  //     id: 'nodejs',
  //     name: 'Node.js',
  //     description: 'Node.js is a runtime for executing JavaScript outside the browser.',
  //     color: '#90c53f',
  //   },
  //   {
  //     id: 'rxjs',
  //     name: 'RxJS',
  //     description: 'RxJS is a library for reactive programming using Observables.',
  //     color: '#eb428e',
  //   },
  //   {
  //     id: 'typescript',
  //     name: 'typescript',
  //     description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
  //     color: '#257acc',
  //   },
  //   {
  //     id: 'reactjs',
  //     name: 'reactjs',
  //     description: 'React is a JavaScript library for building user interfaces.',
  //     color: '#61dbfa',
  //   },
  //   {
  //     id: 'gatsby',
  //     name: 'Gatsby.js',
  //     description: 'A React-based framework for generating static web sites.',
  //     color: '#6f309f',
  //   },
  //   {
  //     id: 'html',
  //     name: 'HTML',
  //     description: 'The markup language that structures content on the web.',
  //     color: '#dd3431',
  //   },
  //   {
  //     id: 'css',
  //     name: 'css',
  //     description: 'CSS styles HTML elements and controls the look of a web page.',
  //     color: '#43ace0',
  //   },
  //   {
  //     id: 'python',
  //     name: 'python',
  //     description: 'A general-purpose programming language widely used across many domains.',
  //     color: '#f9c646',
  //   },
  //   // ---- Your own tags below (used by content; no /tags card needed) ----
  //   {
  //     id: 'example',
  //     name: 'example',
  //     description: 'An example tag. Add your own tags here.',
  //     color: '#9254de',
  //   },
  //   {
  //     id: 'blog',
  //     name: 'blog',
  //     description: 'Blog posts.',
  //     color: '#13c2c2',
  //   },
  // ],
};
