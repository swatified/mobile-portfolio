import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Code2 } from 'lucide-react'

const projects = {
  verbix: {
    name: 'Verbix', type: 'Educational Platform', year: '2025', color: 'coral',
    intro: 'A calm command center for busy minds.',
    description: 'Verbix turns the noisy parts of a day into a clear, tactile rhythm. I designed the experience around focus, gentle momentum, and the small feedback moments that make planning feel rewarding.',
    github: 'https://github.com/',
    screens: ['verbix-01', 'verbix-02', 'verbix-03', 'verbix-04'],
  },
  orbit: {
    name: 'Verbix', type: 'Educational Platform', year: '2025', color: 'coral',
    intro: 'A calm command center for busy minds.',
    description: 'Verbix turns the noisy parts of a day into a clear, tactile rhythm. I designed the experience around focus, gentle momentum, and the small feedback moments that make planning feel rewarding.',
    github: 'https://github.com/',
    screens: ['orbit-01', 'orbit-02', 'orbit-03', 'orbit-04'],
  },
  safebite: {
    name: 'SafeBite', type: 'Health/Cooking ', year: '2025', color: 'lavender',
    intro: 'Small rituals for a softer everyday.',
    description: 'SafeBite is a pocket-sized space for guided breathing, evening rituals, and intentional pauses. The visual system uses soft contrast and slow motion to make the interface feel quieter than the world around it.',
    github: 'https://github.com/',
    screens: ['safebite-01', 'safebite-02', 'safebite-03', 'safebite-04', 'safebite-05'],
  },
  attune: {
    name: 'Attune', type: 'Finance', year: '2024', color: 'mint',
    intro: 'Money clarity, without the spreadsheet energy.',
    description: 'Attune makes everyday money decisions easier to see. The app pairs a simple visual language with useful daily context, so progress feels understandable instead of intimidating.',
    github: 'https://github.com/',
    screens: ['attune-01', 'attune-02', 'attune-03'],
  },
  tara: {
    name: 'Tara', type: 'Women Safety', year: '2023', color: 'yellow',
    intro: 'A curious guide to good places and better days.',
    description: 'Tara helps curious people find places worth the walk. I explored editorial layouts, location-aware discovery, and a playful way to save the details that make a place memorable.',
    github: 'https://github.com/',
    screens: ['tara-01', 'tara-02', 'tara-03', 'tara-04'],
  },
  nori: {
    name: 'Tara', type: 'Women Safety', year: '2023', color: 'yellow',
    intro: 'A curious guide to good places and better days.',
    description: 'Tara helps curious people find places worth the walk. I explored editorial layouts, location-aware discovery, and a playful way to save the details that make a place memorable.',
    github: 'https://github.com/',
    screens: ['nori-01', 'nori-02', 'nori-03', 'nori-04'],
  },
  quiz: {
    name: 'Android Quiz', type: 'Themed Quiz', year: '2023', color: 'blue',
    intro: 'Find your pace. Then lose yourself in it.',
    description: 'Android Quiz is an interactive trivia app built around movement and mood. Big artwork, expressive playback states, and lightweight gestures keep the experience feeling alive.',
    github: 'https://github.com/',
    screens: ['quiz-01', 'quiz-02', 'quiz-03'],
  },
  tempo: {
    name: 'Android Quiz', type: 'Themed Quiz', year: '2023', color: 'blue',
    intro: 'Find your pace. Then lose yourself in it.',
    description: 'Android Quiz is an interactive trivia app built around movement and mood. Big artwork, expressive playback states, and lightweight gestures keep the experience feeling alive.',
    github: 'https://github.com/',
    screens: ['tempo-01', 'tempo-02', 'tempo-03'],
  },
  verbixv1: {
    name: 'Verbix V1', type: 'Education', year: '2025', color: 'peach',
    intro: 'A softer way to get things done.',
    description: 'A focused companion for daily planning, built as an exploration of warm surfaces, useful constraints, and motion that rewards completion without shouting for attention.',
    github: 'https://github.com/',
    screens: ['verbixv1-01', 'verbixv1-02', 'verbixv1-03', 'verbixv1-04'],
  },
  'orbit-daily': {
    name: 'Verbix V1', type: 'Education', year: '2025', color: 'peach',
    intro: 'A softer way to get things done.',
    description: 'A focused companion for daily planning, built as an exploration of warm surfaces, useful constraints, and motion that rewards completion without shouting for attention.',
    github: 'https://github.com/',
    screens: ['orbit-daily-01', 'orbit-daily-02', 'orbit-daily-03', 'orbit-daily-04'],
  },
} as const

type Project = (typeof projects)[keyof typeof projects]

function MediaPlaceholder({ project, screen, index }: { project: Project; screen: string; index: number }) {
  const media = (project as Project & { media?: Record<string, string> }).media?.[screen]
  return (
    <div className={`project-device project-device-${index + 1} project-${project.color}`}>
      <div className="project-device-screen">
        {media ? <img src={media} alt={`${project.name} screen ${index + 1}`} /> : <div className="media-placeholder"><span>{project.name}</span><small>Add {screen}.png or .gif</small></div>}
      </div>
    </div>
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects] ?? projects.verbix

  return (
    <main className="project-page">
      <header className="project-header">
        <Link className="project-back" href="/"><ArrowLeft /> Back to work</Link>
        <span className="project-mark">Android / case study</span>
      </header>
      <section className={`project-hero project-${project.color}`}>
        <div className="project-hero-copy">
          <p className="section-label">{project.type} · {project.year}</p>
          <h1>{project.name}<em>.</em></h1>
          <p className="project-intro">{project.intro}</p>
          <p className="project-description">{project.description}</p>
          <a className="github-link" href={project.github} target="_blank" rel="noreferrer"><Code2 /> View on GitHub <ArrowUpRight /></a>
        </div>
        <div className="project-hero-device"><MediaPlaceholder project={project} screen={project.screens[0]} index={0} /></div>
      </section>
      <section className="project-gallery-section">
        <div className="project-gallery-heading"><p className="section-label">The screens</p><p>Swipe through the details<br />that make it feel real.</p></div>
        <div className={`project-gallery gallery-count-${project.screens.length}`}>
          {project.screens.map((screen, index) => <MediaPlaceholder key={screen} project={project} screen={screen} index={index} />)}
        </div>
      </section>
    </main>
  )
}
