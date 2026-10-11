'use client'

import Link from 'next/link'
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Maximize2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

export interface ProjectData {
  name: string
  type: string
  year: string
  color: string
  intro: string
  description: string
  github: string
  splash?: string
  screens: readonly string[]
  videoZoom?: number
  media?: Record<string, string>
}

export function ProjectShowcase({ project }: { project: ProjectData }) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null)

  const allScreens = [
    ...(project.splash && !project.screens.includes(project.splash)
      ? [project.splash, ...project.screens]
      : project.screens),
  ]

  // Keyboard navigation for zoom lightbox
  useEffect(() => {
    if (zoomIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomIndex(null)
      } else if (e.key === 'ArrowRight') {
        setZoomIndex((prev) =>
          prev !== null ? (prev + 1) % allScreens.length : null
        )
      } else if (e.key === 'ArrowLeft') {
        setZoomIndex((prev) =>
          prev !== null ? (prev - 1 + allScreens.length) % allScreens.length : null
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll while lightbox is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [zoomIndex, allScreens.length])

  const openZoom = (screenUrl: string) => {
    const idx = allScreens.indexOf(screenUrl)
    setZoomIndex(idx >= 0 ? idx : 0)
  }

  const renderMedia = (screen: string, isZoomed = false) => {
    const isVideo = screen.endsWith('.mp4') || screen.endsWith('.webm')
    const zoom = project.videoZoom ?? 1

    if (isVideo) {
      return (
        <video
          src={screen}
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        />
      )
    }

    return <img src={screen} alt={`${project.name} preview`} />
  }

  const activeScreen = zoomIndex !== null ? allScreens[zoomIndex] : null

  return (
    <main className="project-page">
      <header className="project-header">
        <Link className="project-back" href="/#projects">
          <ArrowLeft /> Back to projects
        </Link>
        <div className="project-header-actions">
          <span className="project-mark">Project showcase</span>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className={`project-hero project-${project.color}`}>
        <div className="project-hero-copy">
          <p className="section-label">
            {project.type} · {project.year}
          </p>
          <h1>
            {project.name}
            <em>.</em>
          </h1>
          <p className="project-intro">{project.intro}</p>
          <p className="project-description">{project.description}</p>
          <div className="project-hero-actions">
            <a
              className="github-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 /> View on GitHub <ArrowUpRight />
            </a>
            <a
              className="round-arrow"
              href="#screens"
              aria-label="Scroll to screens showcase"
            >
              <ArrowDown />
            </a>
          </div>
        </div>

        <div className="project-hero-device">
          <div
            className={`project-device project-device-hero project-${project.color} is-clickable`}
            onClick={() =>
              openZoom(project.splash ?? project.screens[0])
            }
            title="Click to zoom screen"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') openZoom(project.splash ?? project.screens[0])
            }}
          >
            <div className="device-zoom-badge" aria-hidden="true">
              <Maximize2 size={13} />
            </div>
            <div className="project-device-screen">
              {renderMedia(project.splash ?? project.screens[0])}
            </div>
          </div>
        </div>
      </section>

      {/* Screens Gallery */}
      <section id="screens" className="project-gallery-section">
        <div className="project-gallery-heading">
          <p className="section-label">The screens</p>
          <p>
            Click any screen to zoom and explore details.
          </p>
        </div>

        <div className={`project-gallery gallery-count-${project.screens.length}`}>
          {project.screens.map((screen, index) => (
            <div
              key={screen}
              className={`project-device project-device-${index + 1} project-${project.color} is-clickable`}
              onClick={() => openZoom(screen)}
              title="Click to zoom in"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') openZoom(screen)
              }}
            >
              <div className="device-zoom-badge" aria-hidden="true">
                <Maximize2 size={13} />
              </div>
              <div className="project-device-screen">
                {renderMedia(screen)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Zoom Overlay */}
      {zoomIndex !== null && activeScreen && (
        <div
          className="screen-zoom-overlay"
          onClick={() => setZoomIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} zoomed screen preview`}
        >
          {/* Close button */}
          <button
            className="zoom-close-btn"
            onClick={(e) => {
              e.stopPropagation()
              setZoomIndex(null)
            }}
            aria-label="Close zoomed screen"
          >
            <X size={20} />
          </button>

          {/* Previous Arrow */}
          {allScreens.length > 1 && (
            <button
              className="zoom-nav-btn is-prev"
              onClick={(e) => {
                e.stopPropagation()
                setZoomIndex(
                  (zoomIndex - 1 + allScreens.length) % allScreens.length
                )
              }}
              aria-label="Previous screen"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Zoomed Phone Container */}
          <div
            className="zoom-phone-shell"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="zoom-phone-speaker" />
            <div className="zoom-phone-screen">
              {renderMedia(activeScreen, true)}
            </div>
          </div>

          {/* Next Arrow */}
          {allScreens.length > 1 && (
            <button
              className="zoom-nav-btn is-next"
              onClick={(e) => {
                e.stopPropagation()
                setZoomIndex((zoomIndex + 1) % allScreens.length)
              }}
              aria-label="Next screen"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Footer Badge / Dots */}
          <div
            className="zoom-footer-pill"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {project.name} · Screen {zoomIndex + 1} of {allScreens.length}
            </span>
            {allScreens.length > 1 && (
              <div className="zoom-dots">
                {allScreens.map((_, i) => (
                  <button
                    key={i}
                    className={`zoom-dot ${i === zoomIndex ? 'is-active' : ''}`}
                    onClick={() => setZoomIndex(i)}
                    aria-label={`Go to screen ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
