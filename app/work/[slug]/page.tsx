import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Code2 } from 'lucide-react'

const projects = {
  verbix: {
    name: 'Verbix', type: 'Educational Platform', year: '2025', color: 'coral',
    intro: 'A calm command center for busy minds.',
    description: 'verbix turns the noisy parts of a day into a clear, tactile rhythm. I designed the experience around focus, gentle momentum, and the small feedback moments that make planning feel rewarding.',
    github: 'https://github.com/',
    splash: '/verbix/splash.jpg',
    screens: ['verbix-01', 'verbix-02', 'verbix-03', 'verbix-04'],
  },
  safebite: {
    name: 'SafeBite', type: 'Health/Cooking ', year: '2025', color: 'lavender',
    intro: 'Small rituals for a softer everyday.',
    description: 'SafeBite is a pocket-sized space for guided breathing, evening rituals, and intentional pauses. The visual system uses soft contrast and slow motion to make the interface feel quieter than the world around it.',
    github: 'https://github.com/',
    splash: '/safebite/splash.jpg',
    videoZoom: 1.40,
    screens: ['/safebite/v1.mp4', '/safebite/v2.mp4', '/safebite/v3.mp4', '/safebite/v4.mp4'],
  },
  attune: {
    name: 'Attune', type: 'Finance', year: '2024', color: 'mint',
    intro: 'Money clarity, without the spreadsheet energy.',
    description: 'Attune makes everyday money decisions easier to see. The app pairs a simple visual language with useful daily context, so progress feels understandable instead of intimidating.',
    github: 'https://github.com/',
    splash: '/attune/splash.jpg',
    screens: ['/attune/p1.png', '/attune/p2.png', '/attune/p3.png', '/attune/p4.png', '/attune/p5.png'],
  },
  tara: {
    name: 'Tara', type: 'Food & culture', year: '2023', color: 'yellow',
    intro: 'A curious guide to good places and better days.',
    description: 'Tara helps curious people find places worth the walk. I explored editorial layouts, location-aware discovery, and a playful way to save the details that make a place memorable.',
    github: 'https://github.com/',
    splash: '/tara/splash.jpg',
    screens: ['/tara/splash.jpg', '/tara/p2.jpg', '/tara/p4.jpg', '/tara/p3.jpg', '/tara/p5.jpg',],
  },
  quiz: {
    name: 'Android Quiz', type: 'Music', year: '2023', color: 'blue',
    intro: 'Find your pace. Then lose yourself in it.',
    description: 'quiz is a music companion built around movement and mood. Big artwork, expressive playback states, and lightweight gestures keep the listening experience feeling alive.',
    github: 'https://github.com/',
    splash: '/quiz/splash.jpg',
    videoZoom: 1.40,
    screens: ['/quiz/v1.mp4', '/quiz/v2.mp4'],
  },
  'verbixv1': {
    name: 'Verbix V1', type: 'Daily planning', year: '2025', color: 'peach',
    intro: 'A softer way to get things done.',
    description: 'A focused companion for daily planning, built as an exploration of warm surfaces, useful constraints, and motion that rewards completion without shouting for attention.',
    github: 'https://github.com/',
    splash: '/verbix_v1/splash.jpg',
    videoZoom: 1.40,
    screens: ['/verbix_v1/v1.mp4', '/verbix_v1/v4.mp4', '/verbix_v1/v5.mp4', '/verbix_v1/v3.mp4', '/verbix_v1/v2.mp4'],
  },
} as const

type Project = (typeof projects)[keyof typeof projects]

function MediaPlaceholder({ project, screen, index }: { project: Project; screen: string; index: number }) {
  const media =
    (project as Project & { media?: Record<string, string> }).media?.[screen] ??
    (screen && (screen.startsWith('/') || screen.includes('.')) ? screen : null)
  const isVideo = media ? media.endsWith('.mp4') || media.endsWith('.webm') : false
  const zoom = (project as { videoZoom?: number }).videoZoom ?? 1

  return (
    <div className={`project-device project-device-${index + 1} project-${project.color}`}>
      <div className="project-device-screen">
        {media ? (
          isVideo ? (
            <video
              src={media}
              autoPlay
              loop
              muted
              playsInline
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            />
          ) : (
            <img src={media} alt={`${project.name} screen ${index + 1}`} />
          )
        ) : (
          <div className="media-placeholder">
            <span>{project.name}</span>
            <small>Add {screen}.mp4 or image</small>
          </div>
        )}
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
        <div className="project-hero-device"><MediaPlaceholder project={project} screen={(project as { splash?: string }).splash ?? project.screens[0]} index={0} /></div>
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
