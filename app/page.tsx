'use client'

import { ArrowDown, ArrowUpRight, Code2, Link2, Mail, Menu, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'

const apps = [
  { id: '01', name: 'Verbix', slug: 'verbix', type: 'Education', color: 'coral', className: 'app-verbix', stat: 'Focus, in motion', note: 'AI-assisted learning for children with Dyslexia.', image: '/verbix/splash.jpg' },
  { id: '02', name: 'SafeBite', slug: 'safebite', type: 'Health/Cooking', color: 'lavender', className: 'app-safebite', stat: 'Breathe deeper', note: 'Alternative recipes app for people with food intolerances.', image: '/safebite/splash.jpg' },
  { id: '03', name: 'Attune', slug: 'attune', type: 'Entertainment', color: 'mint', className: 'app-attune', stat: '€ 2,480.90', note: 'Conversation and mood-based music playlists.', image: '/attune/splash.jpg' },
  { id: '04', name: 'Tara', slug: 'tara', type: 'Women Safety', color: 'yellow', className: 'app-tara', stat: 'Tokyo · 24°', note: 'Women safety app for risk zone predictions and many more.', image: '/tara/splash.jpg' },
  { id: '05', name: 'Android Quiz', slug: 'quiz', type: 'Themed Quiz', color: 'blue', className: 'app-quiz', stat: '04:32', note: 'A Christmas-themed quiz application to test your Android fundamentals.', image: '/quiz/splash.jpg' },
  { id: '06', name: 'Verbix V1', slug: 'verbixv1', type: 'Education', color: 'peach', className: 'app-verbix', stat: 'Flow state', note: 'Learning app for speech and written exercises.', image: '/verbix_v1/splash.jpg' },
]

function PhoneScreen({ app }: { app: (typeof apps)[number] }) {
  return (
    <div className={`phone ${app.className}`} aria-label={`${app.name} app preview`}>
      <div className="phone-speaker" />
      <div className={`phone-screen ${app.image ? 'has-image' : ''}`}>
        {app.image ? (
          <img src={app.image} alt={`${app.name} preview`} />
        ) : (
          <>
            <div className="status-bar"><span>9:41</span><span>● )))</span></div>
            {app.className === 'app-verbix' && <><div className="screen-top"><span>Tuesday, Sep 17</span><span>•••</span></div><div className="verbix-sun"><Sparkles /></div><p className="screen-kicker">Good morning, Alex</p><h3>Make space<br />for what matters.</h3><div className="verbix-card"><span>Today's focus</span><strong>Ship the beautiful thing</strong><div className="progress"><i /></div><small>3 of 5 tasks complete</small></div><div className="screen-row"><b>09:00</b><span>Design review</span></div><div className="screen-row"><b>11:30</b><span>Walk & think</span></div></>}
            {app.className === 'app-safebite' && <><div className="screen-top"><span>safebite</span><span>♡</span></div><div className="safebite-orb" /><p className="screen-kicker">Your evening ritual</p><h3>Release the<br />busy mind.</h3><div className="safebite-wave"><span /><span /><span /><span /><span /><span /><span /></div><button className="play-button">▶</button><small className="center-small">4:32 · Night tide</small></>}
            {app.className === 'app-attune' && <><div className="screen-top"><span>September</span><span>⌄</span></div><p className="screen-kicker">Your balance</p><h3 className="money">€ 2,480<sup>.90</sup></h3><div className="attune-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="money-row"><span>Spent this month</span><b>€ 1,240.40</b></div><div className="money-row"><span>Safe to spend</span><b>€ 38 / day</b></div></>}
            {app.className === 'app-tara' && <><div className="tara-image"><span>↗</span></div><p className="screen-kicker">Good morning, Tokyo</p><h3>Eat something<br />worth the walk.</h3><div className="tara-place"><strong>Soba Kanda</strong><span>0.8 km · ¥¥</span></div></>}
            {app.className === 'app-quiz' && <><div className="quiz-art"><div className="quiz-disc" /><div className="quiz-sticker">NEW MIX</div></div><p className="screen-kicker">Made for your Monday</p><h3>Keep going,<br />keep moving.</h3><div className="quiz-player"><span>‹</span><strong>▶</strong><span>›</span></div><small className="center-small">Bram Inscore · All I Need</small></>}
          </>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Swati Sharma home"><span className="brand-mark">S</span><span>Swati Sharma<span className="brand-dot">.</span></span></a>
        <div className="header-actions">
          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation"><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="/resume/resume.pdf" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Resume</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>
          <ThemeToggle />
          <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="eyebrow"><span className="eyebrow-dot" /> Android · Flutter developer · visual thinker</div>
        <h1>Small screens. <br /> <em>Bigger</em> ideas</h1>
        <div className="hero-bottom"><p>I design and develop mobile applications for people who care about the details.</p><a className="round-arrow" href="#projects" aria-label="Scroll to projects"><ArrowDown /></a></div>
        <div className="hero-art" aria-hidden="true">
          <svg className="hero-scribble" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 177C116 95 204 54 288 69" stroke="var(--coral)" strokeWidth="5" strokeLinecap="round" />
            <path d="M103 400C159 446 257 467 345 420" stroke="var(--mint)" strokeWidth="12" strokeLinecap="round" opacity=".9" />
            <g transform="translate(155 54) rotate(9 106 196)">
              <rect x="4" y="4" width="214" height="392" rx="38" fill="var(--ink)" opacity=".16" />
              <rect width="214" height="392" rx="38" fill="#171717" stroke="var(--ink)" strokeWidth="2" />
              <rect x="10" y="11" width="194" height="370" rx="29" fill="var(--paper)" />
              <rect x="76" y="20" width="62" height="12" rx="6" fill="#171717" />
              <circle cx="107" cy="27" r="3" fill="var(--coral)" />
              <text x="28" y="68" fill="var(--muted-ink)" fontSize="10" fontFamily="Arial" letterSpacing="1.5">MONDAY, 09:41</text>
              <text x="28" y="105" fill="var(--ink)" fontSize="25" fontWeight="700" fontFamily="Arial">Good morning.</text>
              <rect x="26" y="128" width="162" height="88" rx="17" fill="var(--coral)" />
              <circle cx="57" cy="158" r="17" fill="var(--yellow)" />
              <path d="M50 158L56 164L67 151" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="86" y="160" fill="var(--ink)" fontSize="12" fontWeight="700" fontFamily="Arial">Today&apos;s focus</text>
              <text x="86" y="180" fill="var(--ink)" fontSize="10" fontFamily="Arial">Ship something lovely</text>
              <rect x="26" y="238" width="76" height="76" rx="17" fill="var(--mint)" />
              <rect x="112" y="238" width="76" height="76" rx="17" fill="var(--yellow)" />
              <path d="M45 289C55 268 72 267 84 276" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
              <path d="M130 288L147 271L170 288" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="77" y="347" width="60" height="5" rx="2.5" fill="var(--ink)" opacity=".3" />
            </g>
            <circle cx="425" cy="112" r="14" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
            <circle cx="86" cy="314" r="10" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M405 330C430 311 449 283 454 252" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="hero-art-note">from pixels to products</span>
        </div>
      </section>

      <section id="projects" className="work-section">
        <span id="work" aria-hidden="true" />
        <div className="section-heading"><div><p className="section-label">01 / Personal projects</p><h2>A few things<br /><em>I've made.</em></h2></div><p className="section-intro">Apps built to solve real-world problems, <br /> focusing on accessibility, intuitive interfaces, and dependable code.</p></div>
        <div className="app-grid">{apps.map((app, index) => <Link className={`app-card card-${index + 1}`} href={`/work/${app.slug}`} key={app.id}><div className="card-meta"><span>{app.id}</span><span>{app.type}</span><ArrowUpRight /></div><div className="phone-wrap"><PhoneScreen app={app} /></div><div className="card-footer"><div><h3>{app.name}</h3><p>{app.note}</p></div><span className={`color-dot ${app.color}`} /></div></Link>)}</div>
      </section>

      <footer id="contact" className="site-footer"><div><p className="section-label">02 / Say hello</p><h2><em>Connect</em><br /> with me.</h2></div><div className="footer-right"><a className="contact-link" href="mailto:25sharmswati@gmail.com">Let's talk <ArrowUpRight /></a><div className="social-links"><a href="https://github.com/swatified" target="_blank" rel="noreferrer"><Code2 /> GitHub</a><a href="https://www.linkedin.com/in/dev-swati/" target="_blank" rel="noreferrer"><Link2 /> LinkedIn</a><a href="mailto:25sharmswati@gmail.com"><Mail /> Email</a></div><p className="copyright">© 2026 Swati Sharma</p></div></footer>
    </main>
  )
}
