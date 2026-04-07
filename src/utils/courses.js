export const CATEGORIES = [
  'All',
  'Development',
  'Data & AI',
  'Security',
  'Cloud',
  'Design',
  'Business',
  'Fundamentals',
]

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=960&q=80&auto=format&fit=crop`

export const COURSES = [
  {
    id: 1,
    slug: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    category: 'Development',
    duration: '24 weeks',
    level: 'Intermediate',
    price: 'PKR 185,000',
    image: img('1498050108023-a5245f5961d2'),
    blurb:
      'React, Node, databases, auth, and deployment — build production-grade apps with CI/CD and observability basics.',
    overview: `Master modern web engineering from first pixel to production. You will architect REST and GraphQL APIs, implement secure authentication, optimize performance, and ship on cloud infrastructure with automated pipelines.

Each sprint mirrors a real product cycle: discovery, implementation, review, and retro. You graduate with three portfolio-grade applications and a public case study.`,
    curriculum: [
      {
        title: 'Module 1 — Web foundations & tooling',
        items: [
          'HTML semantics, accessibility, and performance budgets',
          'Modern JavaScript (ES modules, async, fetch)',
          'Git workflows, code review etiquette, and linting',
        ],
      },
      {
        title: 'Module 2 — React ecosystem',
        items: [
          'Components, hooks, state machines, and data fetching',
          'Routing, lazy loading, and error boundaries',
          'Testing with Vitest and React Testing Library',
        ],
      },
      {
        title: 'Module 3 — Backend & data',
        items: [
          'Node.js services, validation, and layered architecture',
          'SQL modeling, migrations, and query tuning',
          'Caching, rate limiting, and background jobs',
        ],
      },
      {
        title: 'Module 4 — Ship & scale',
        items: [
          'Docker images, environment parity, and secrets',
          'CI/CD with GitHub Actions or similar',
          'Logging, metrics, and on-call basics',
        ],
      },
    ],
    instructor: {
      name: 'Dr. Nadia Farooq',
      title: 'Lead — Computer Science',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Former principal engineer; focuses on teaching how teams ship, not just syntax.',
    },
    reviews: [
      { author: 'Kamran A.', rating: 5, text: 'Best structured full stack track I have taken.' },
      { author: 'Mehak S.', rating: 5, text: 'Code reviews were brutally helpful — in a good way.' },
      { author: 'Usman T.', rating: 4, text: 'Heavy workload but you leave with real repos.' },
    ],
  },
  {
    id: 2,
    slug: 'data-science-ai',
    title: 'Data Science & Applied AI',
    category: 'Data & AI',
    duration: '20 weeks',
    level: 'Intermediate',
    price: 'PKR 198,000',
    image: img('1555949963-aa79dcee981c'),
    blurb:
      'Python stack, statistics, ML pipelines, and responsible AI — from notebooks to scheduled jobs.',
    overview: `Learn the full data workflow: ingestion, cleaning, exploration, modeling, and storytelling. You will train supervised and unsupervised models, evaluate them honestly, and package outputs for stakeholders.

Ethics, drift monitoring, and documentation are first-class topics — mirroring how serious teams operate.`,
    curriculum: [
      {
        title: 'Module 1 — Python for data',
        items: ['NumPy, Pandas, visualization grammar', 'SQL for analytics', 'Reproducible environments'],
      },
      {
        title: 'Module 2 — Statistics & experimentation',
        items: ['Inference, A/B testing, and power', 'Feature engineering discipline', 'Bias and fairness checks'],
      },
      {
        title: 'Module 3 — Machine learning',
        items: ['Scikit-learn pipelines', 'Gradient boosting and calibration', 'Hyperparameter search strategies'],
      },
      {
        title: 'Module 4 — MLOps light',
        items: ['Model packaging', 'Batch scoring jobs', 'Monitoring dashboards'],
      },
    ],
    instructor: {
      name: 'Dr. Nadia Farooq',
      title: 'Lead — Computer Science',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Publishes on reproducible ML; mentors Kaggle-style capstones.',
    },
    reviews: [
      { author: 'Hira M.', rating: 5, text: 'Finally understand when *not* to use deep learning.' },
      { author: 'Ali R.', rating: 5, text: 'Capstone felt like a mini internship.' },
    ],
  },
  {
    id: 3,
    slug: 'cybersecurity-operations',
    title: 'Cybersecurity & SOC Operations',
    category: 'Security',
    duration: '18 weeks',
    level: 'Beginner',
    price: 'PKR 165,000',
    image: img('1563986768609-322da13575f3'),
    blurb:
      'Threat modeling, SIEM workflows, incident response, and hardening practices for modern enterprises.',
    overview: `Start from networking and identity fundamentals, then progress into detection engineering and tabletop exercises. You will read real-world breach postmortems and write your own runbooks.

The capstone is a simulated multi-stage incident with executive comms templates.`,
    curriculum: [
      {
        title: 'Module 1 — Foundations',
        items: ['TCP/IP, DNS, TLS', 'Identity and access patterns', 'Risk registers'],
      },
      {
        title: 'Module 2 — Defensive tooling',
        items: ['SIEM queries', 'EDR concepts', 'Phishing forensics'],
      },
      {
        title: 'Module 3 — Offense informs defense',
        items: ['MITRE mapping', 'Purple team drills', 'Secure SDLC touchpoints'],
      },
      {
        title: 'Module 4 — Response',
        items: ['Containment playbooks', 'Evidence handling', 'Post-incident reviews'],
      },
    ],
    instructor: {
      name: 'Fahad Iqbal',
      title: 'Cyber Defense Instructor',
      image:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      bio: 'Runs live-fire exercises weekly; ex-enterprise SOC lead.',
    },
    reviews: [
      { author: 'Saad K.', rating: 5, text: 'Drills were intense and incredibly practical.' },
      { author: 'Noor F.', rating: 4, text: 'Great community — study groups actually meet.' },
    ],
  },
  {
    id: 4,
    slug: 'cloud-devops-engineering',
    title: 'Cloud & DevOps Engineering',
    category: 'Cloud',
    duration: '16 weeks',
    level: 'Intermediate',
    price: 'PKR 172,000',
    image: img('1451187580459-43490279c0fa'),
    blurb:
      'IaC, Kubernetes fundamentals, observability, and cost-aware architecture on major clouds.',
    overview: `Treat infrastructure as software: declarative configs, immutable images, and automated rollouts. You will stand up multi-environment pipelines and practice failure injection safely.

We emphasize cost dashboards and tagging hygiene — skills hiring managers explicitly look for.`,
    curriculum: [
      {
        title: 'Module 1 — Cloud primitives',
        items: ['IAM least privilege', 'VPC design', 'Object storage patterns'],
      },
      {
        title: 'Module 2 — Containers',
        items: ['Dockerfiles that cache well', 'Compose for local parity', 'Registry strategies'],
      },
      {
        title: 'Module 3 — Orchestration',
        items: ['Kubernetes workloads', 'Ingress and TLS', 'Autoscaling signals'],
      },
      {
        title: 'Module 4 — Reliability',
        items: ['SLOs and error budgets', 'Tracing and structured logs', 'Game days'],
      },
    ],
    instructor: {
      name: 'Omar Siddiqui',
      title: 'Principal Instructor — Cloud & DevOps',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      bio: 'Shipped global platforms; obsessed with developer experience.',
    },
    reviews: [
      { author: 'Waleed H.', rating: 5, text: 'Finally grokked Kubernetes without magic.' },
      { author: 'Amina Z.', rating: 5, text: 'Labs mirrored my employer’s stack.' },
    ],
  },
  {
    id: 5,
    slug: 'mobile-app-development',
    title: 'Cross-Platform Mobile Development',
    category: 'Development',
    duration: '14 weeks',
    level: 'Intermediate',
    price: 'PKR 155,000',
    image: img('1512941937669-90a1b58e7e9c'),
    blurb:
      'React Native or Flutter track options — offline-first patterns, push, and store releases.',
    overview: `Design mobile experiences that feel native while sharing business logic. You will integrate analytics ethically, handle permissions gracefully, and publish checklist-driven releases.

Includes deep dives into animations, navigation, and performance profiling on real devices.`,
    curriculum: [
      {
        title: 'Module 1 — Mobile UX craft',
        items: ['Touch targets and motion', 'Navigation paradigms', 'Accessibility on small screens'],
      },
      {
        title: 'Module 2 — App architecture',
        items: ['State management', 'Networking and caching', 'Secure storage'],
      },
      {
        title: 'Module 3 — Platform services',
        items: ['Push notifications', 'Maps and deep links', 'Background tasks'],
      },
      {
        title: 'Module 4 — Release engineering',
        items: ['Store listings', 'Beta tracks', 'Crash analytics'],
      },
    ],
    instructor: {
      name: 'Dr. Nadia Farooq',
      title: 'Lead — Computer Science',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Shipped consumer apps with millions of MAU.',
    },
    reviews: [
      { author: 'Rafay Q.', rating: 5, text: 'My Play Store release was smooth.' },
    ],
  },
  {
    id: 6,
    slug: 'ui-ux-design-professional',
    title: 'UI/UX Design Professional',
    category: 'Design',
    duration: '12 weeks',
    level: 'Beginner',
    price: 'PKR 138,000',
    image: img('1561070791-2526d30994b5'),
    blurb:
      'Research, IA, design systems in Figma, prototyping, and usability testing with real participants.',
    overview: `Learn to discover problems before decorating solutions. You will facilitate interviews, synthesize insights, and craft flows that survive contact with engineering constraints.

Motion and micro-interaction modules borrow from product cinema — tasteful, not noisy.`,
    curriculum: [
      {
        title: 'Module 1 — Discovery',
        items: ['Interview scripts', 'Journey maps', 'Jobs-to-be-done'],
      },
      {
        title: 'Module 2 — Structure',
        items: ['Information architecture', 'Wireflows', 'Content design'],
      },
      {
        title: 'Module 3 — Visual systems',
        items: ['Type scales', 'Color systems', 'Component libraries'],
      },
      {
        title: 'Module 4 — Validation',
        items: ['Prototype fidelity ladder', 'Moderated tests', 'Iterating with data'],
      },
    ],
    instructor: {
      name: 'Zainab Tariq',
      title: 'Design Systems Lead',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      bio: 'Speaker on inclusive design; former lead at a product studio.',
    },
    reviews: [
      { author: 'Eman L.', rating: 5, text: 'Critiques leveled up my eye fast.' },
      { author: 'Taha B.', rating: 5, text: 'Portfolio reviews with real PMs.' },
    ],
  },
  {
    id: 7,
    slug: 'digital-growth-marketing',
    title: 'Digital Growth & Performance Marketing',
    category: 'Business',
    duration: '10 weeks',
    level: 'Beginner',
    price: 'PKR 112,000',
    image: img('1460925895917-afdab827c52f'),
    blurb:
      'Funnels, attribution, creative testing, and analytics — ethical growth without dark patterns.',
    overview: `Blend storytelling with measurement. You will build landing pages, run structured experiments, and interpret results without vanity metrics.

Compliance-aware modules cover consent, cookies, and regional regulations at a practical level.`,
    curriculum: [
      {
        title: 'Module 1 — Growth foundations',
        items: ['North star metrics', 'Cohort thinking', 'Channel overview'],
      },
      {
        title: 'Module 2 — Acquisition',
        items: ['Paid search basics', 'Creative testing', 'Landing page anatomy'],
      },
      {
        title: 'Module 3 — Retention',
        items: ['Email journeys', 'Lifecycle triggers', 'Surveys that work'],
      },
      {
        title: 'Module 4 — Analytics',
        items: ['Event taxonomy', 'Dashboard design', 'Experiment analysis'],
      },
    ],
    instructor: {
      name: 'Zainab Tariq',
      title: 'Design Systems Lead',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      bio: 'Growth advisor for B2B SaaS; emphasizes creative ops.',
    },
    reviews: [
      { author: 'Sana I.', rating: 4, text: 'Numbers finally clicked for me.' },
    ],
  },
  {
    id: 8,
    slug: 'office-automation-it-fundamentals',
    title: 'Office Automation & IT Fundamentals',
    category: 'Fundamentals',
    duration: '8 weeks',
    level: 'Beginner',
    price: 'PKR 68,000',
    image: img('1516321310765-759a1e97e2b2'),
    blurb:
      'Excel power workflows, docs collaboration, intro networking, and workplace security hygiene.',
    overview: `Perfect for early-career professionals and career switchers. You will automate repetitive tasks, communicate data clearly, and understand how IT keeps organizations safe.

Graduates frequently ladder into specialized tracks with confidence.`,
    curriculum: [
      {
        title: 'Module 1 — Productivity stack',
        items: ['Spreadsheet modeling', 'Presentation storytelling', 'Async collaboration'],
      },
      {
        title: 'Module 2 — Automation',
        items: ['Macros and scripts intro', 'Forms and approvals', 'File organization'],
      },
      {
        title: 'Module 3 — IT literacy',
        items: ['Hardware overview', 'Networking vocabulary', 'Support tickets that get solved'],
      },
      {
        title: 'Module 4 — Security awareness',
        items: ['Phishing signals', 'Password managers', 'Safe remote work'],
      },
    ],
    instructor: {
      name: 'Omar Siddiqui',
      title: 'Principal Instructor — Cloud & DevOps',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      bio: 'Started as IT support; loves foundational clarity.',
    },
    reviews: [
      { author: 'Imran D.', rating: 5, text: 'Great on-ramp before cloud track.' },
    ],
  },
]

export function getCourseBySlug(slug) {
  return COURSES.find((c) => c.slug === slug) || null
}

export function courseTitlesForSelect() {
  return COURSES.map((c) => ({ value: c.slug, label: c.title }))
}
