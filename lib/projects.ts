export type Project = {
  id: string
  slug: string
  name: string
  type: string
  color: string
  className: string
  stat: string
  note: string
  description: string
  github: string
  screens: (string | null)[]
}

export const apps: Project[] = [
  { id: '01', slug: 'verbix', name: 'Verbix', type: 'Productivity', color: 'coral', className: 'app-verbix', stat: 'Focus, in motion', note: 'A calm command center for busy minds.', description: 'verbix turns a full day into a calm, considered flow. A focused productivity companion built around clarity, rhythm, and the small wins that keep momentum going.', github: 'https://github.com', screens: [null, null, null, null] },
  { id: '02', slug: 'safebite', name: 'SafeBite', type: 'Wellness', color: 'lavender', className: 'app-safebite', stat: 'Breathe deeper', note: 'Small rituals for a softer everyday.', description: 'Muse creates room to pause. Gentle audio rituals, thoughtful transitions, and a quiet interface make wellness feel natural instead of demanding.', github: 'https://github.com', screens: [null, null, null, null, null] },
  { id: '03', slug: 'attune', name: 'Attune', type: 'Finance', color: 'mint', className: 'app-attune', stat: '€ 2,480.90', note: 'Money clarity, without the spreadsheet energy.', description: 'attune makes personal finance feel human. It surfaces the numbers that matter, gives context to every choice, and keeps the path forward visible.', github: 'https://github.com', screens: [null, null, null] },
  { id: '04', slug: 'tara', name: 'Tara', type: 'Food & culture', color: 'yellow', className: 'app-tara', stat: 'Tokyo · 24°', note: 'A curious guide to good places and better days.', description: 'tara is a visual guide for curious eaters. Discover places through mood, story, and neighborhood context rather than a list of stars.', github: 'https://github.com', screens: [null, null, null, null] },
  { id: '05', slug: 'quiz', name: 'Android Quiz', type: 'Music', color: 'blue', className: 'app-quiz', stat: '04:32', note: 'Find your pace. Then lose yourself in it.', description: 'quiz is a music experience for movement. It pairs expressive artwork with a tactile player that keeps the feeling of a song front and center.', github: 'https://github.com', screens: [null, null] },
  { id: '06', slug: 'verbixv1', name: 'Verbix V1', type: 'Daily planning', color: 'peach', className: 'app-verbix', stat: 'Flow state', note: 'A softer way to get things done.', description: 'A lighter daily-planning companion from the verbix family, designed for a fast glance and a satisfying sense of progress.', github: 'https://github.com', screens: [null, null, null] },
]

export function getProject(slug: string) {
  return apps.find((app) => app.slug === slug)
}

export function projectAccent(color: string) {
  return `var(--${color})`
}

export type { Project as AppProject }

export const projectPhoneClass = 'project-phone'
export const placeholderLabels = ['Welcome screen', 'Main experience', 'Detail view', 'A closer look', 'Final moment']
export const projectImageHint = 'Replace a null screen with a path such as /projects/verbix/screen-1.gif or /projects/verbix/screen-1.png.'
export const projectRoutePrefix = '/work/'
export const projectCount = apps.length
export const projectSlugs = apps.map((app) => app.slug)
export const projectNameBySlug = Object.fromEntries(apps.map((app) => [app.slug, app.name]))
export const projectTypes = [...new Set(apps.map((app) => app.type))]
export const projectColors = [...new Set(apps.map((app) => app.color))]
