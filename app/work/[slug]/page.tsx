import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Code2 } from 'lucide-react'

const projects = {
  verbix: {
    name: 'Verbix', type: 'Educational Platform', year: '2025', color: 'coral',
    intro: 'An AI-assisted learning platform for children with Dyslexia and other LDs.',
    description: 'Verbix is a cross-platform app that uses OCR and speech recognition to help children with dyslexia improve their reading and writing skills through personalized exercises and real-time feedback in a gamified manner.',
    github: 'https://github.com/swatified/Verbix-flutter',
    splash: '/verbix/splash.jpg',
    screens: ['/verbix/v1.mp4', '/verbix/v2.mp4', '/verbix/v3.mp4', '/verbix/v4.mp4', '/verbix/v5.mp4', '/verbix/v6.mp4'],
  },
  safebite: {
    name: 'SafeBite', type: 'Health/Cooking ', year: '2024', color: 'lavender',
    intro: 'Alternative recipes app for people with allergies and food intolerances.',
    description: 'SafeBite is an Android application designed to help individuals with food allergies discover safe and delicious recipes. The app provides personalized recipe recommendations while ensuring all suggested dishes are free from user-specific allergens while still providing them the same amount of nutrition and similar taste than the allergen would have.',
    github: 'https://github.com/swatified/safebite',
    splash: '/safebite/splash.jpg',
    videoZoom: 1.40,
    screens: ['/safebite/v1.mp4', '/safebite/v2.mp4', '/safebite/v3.mp4', '/safebite/v4.mp4'],
  },
  attune: {
    name: 'Attune', type: 'Music & Lifestyle', year: '2025', color: 'mint',
    intro: 'Conversation and mood-based music playlists.',
    description: 'Attune is an LLM-powered application that engages users in meaningful conversations about their day, analyzes their emotional state, and creates personalized Spotify playlists that resonate with their current mood.',
    github: 'https://github.com/swatified/Attune',
    splash: '/attune/splash.jpg',
    screens: ['/attune/p1.png', '/attune/p2.png', '/attune/p3.png', '/attune/p4.png', '/attune/p5.png'],
  },
  tara: {
    name: 'Tara', type: 'Women Safety', year: '2025', color: 'yellow',
    intro: 'Women Safety App.',
    description: 'Tara helps you navigate your journey based on the heatmaps generated through its risk zone prediction system and provides alternative safer pathways. It also has inbuilt emergency shake features, and helpline numbers.',
    github: 'https://drive.google.com/file/d/1vOKsS2QLxIbWfG0qALItO_Ea-HMF9-D5/view',
    splash: '/tara/splash.jpg',
    screens: ['/tara/splash.jpg', '/tara/p2.jpg', '/tara/p4.jpg', '/tara/p3.jpg', '/tara/p5.jpg',],
  },
  quiz: {
    name: 'Android Quiz', type: 'Quiz', year: '2024', color: 'blue',
    intro: ' ',
    description: 'A Christmas-themed Android quiz application designed to test and enhance your Android development knowledge through an engaging, and interactive learning experience.',
    github: 'https://github.com/swatified/AndroidQuiz',
    splash: '/quiz/splash.jpg',
    videoZoom: 1.40,
    screens: ['/quiz/v1.mp4', '/quiz/v2.mp4'],
  },
  'verbixv1': {
    name: 'Verbix V1', type: 'Daily planning', year: '2024', color: 'peach',
    intro: 'Learning app for speech and written exercises.',
    description: 'The app utilizes advanced OCR and speech recognition technology to analyze handwriting patterns and speech, providing real-time feedback for improved learning outcomes.',
    github: 'https://github.com/swatified/Verbix',
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
