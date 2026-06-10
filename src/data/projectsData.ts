export type Project = {
  name: string
  description: string
  role?: string
  technologies: string[]
  /** Live demo / homepage URL */
  link?: string
  /** Source-code URL */
  repo?: string
  /** Thumbnail image URL */
  thumbnail?: string
}

/**
 * Fallback project list, used when the Hygraph `projects` model has no
 * published entries. Seeded from public GitHub repos (github.com/phuonganguyen)
 * with verified links — refine the copy or, better, add projects in Hygraph
 * (name, description, role, technologies, link, thumbnail) and they will
 * automatically replace this list.
 */
export const PROJECTS: Project[] = [
  {
    name: 'Phuong Culi',
    role: 'Personal blog & portfolio',
    description:
      'This very site — a statically generated Next.js blog and portfolio backed by Hygraph (GraphCMS). Features a ⌘K command palette, system-aware dark mode, ISR-powered content, and a live now-playing Spotify widget.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Hygraph'],
    link: 'https://phuongculi.com',
    repo: 'https://github.com/phuonganguyen/culi-coder',
  },
  {
    name: 'Teme Cron',
    role: 'Side project',
    description:
      'A cron-style scheduling tool built with TypeScript and deployed on Vercel.',
    technologies: ['TypeScript', 'Vercel'],
    link: 'https://teme-cron.vercel.app',
    repo: 'https://github.com/phuonganguyen/teme-cron',
  },
  {
    name: 'Gun Hunter',
    role: 'Browser game',
    description:
      'A browser-based game client, deployed on Vercel — a take on building interactive games for the web.',
    technologies: ['JavaScript', 'Vercel'],
    link: 'https://gun-hunter-client.vercel.app',
    repo: 'https://github.com/phuonganguyen/gun-hunter-client',
  },
  {
    name: 'Crypto Fan',
    role: 'Side project',
    description:
      'A cryptocurrency-themed web application built with TypeScript.',
    technologies: ['TypeScript', 'React'],
    repo: 'https://github.com/phuonganguyen/crypto-fan',
  },
  {
    name: 'RTK Query Playground',
    role: 'Learning project',
    description:
      'A hands-on demo exploring data fetching, caching, and state management with Redux Toolkit Query.',
    technologies: ['TypeScript', 'Redux Toolkit', 'RTK Query'],
    repo: 'https://github.com/phuonganguyen/RTK-Query',
  },
]
