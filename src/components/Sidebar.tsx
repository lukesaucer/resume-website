'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
}

interface SidebarProps {
  siteSettings: any
  homePage: any
}

const navItems = [
  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'about', label: 'About Me', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'resume', label: 'Resume', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
  { id: 'portfolio', label: 'Portfolio', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export function Sidebar({ siteSettings, homePage }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy()

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2.5 bg-dark-card/90 backdrop-blur-sm rounded-xl border border-white/10"
        aria-label="Toggle menu"
      >
        <div className="space-y-1.5">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-dark-lighter border-r border-white/5 z-40
          flex flex-col items-center py-8 px-5 overflow-y-auto
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Profile photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-primary/50 ring-offset-2 ring-offset-dark-lighter mb-4 flex-shrink-0">
          {homePage.profilePhoto ? (
            <Image
              src={typeof homePage.profilePhoto === 'string' ? homePage.profilePhoto : homePage.profilePhoto.url || ''}
              alt="Luke Saucer"
              width={112}
              height={112}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="w-full h-full bg-dark-card flex items-center justify-center text-3xl font-bold text-primary">
              LS
            </div>
          )}
        </div>

        {/* Name and title */}
        <h2 className="text-lg font-bold mt-2">{homePage.greeting || 'Luke Saucer'}</h2>
        <p className="text-xs text-gray-500 mb-6 tracking-wider uppercase">{homePage.subtitle || 'Engineer and Analyst'}</p>

        {/* Navigation */}
        <nav className="w-full mb-6">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                    ${activeSection === item.id
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                    }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-6" />

        {/* Social links */}
        {siteSettings.socialLinks && siteSettings.socialLinks.length > 0 && (
          <div className="flex gap-3 mb-6">
            {siteSettings.socialLinks.map((link: any, i: number) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center
                           text-gray-500 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label={link.platform}
              >
                {socialIcons[link.platform] || link.platform}
              </a>
            ))}
          </div>
        )}

        {/* Download buttons */}
        <div className="w-full space-y-2 mt-auto flex-shrink-0">
          <a href="/api/media/resume" target="_blank" className="block text-center text-xs py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-medium tracking-wide uppercase">
            Resume
          </a>
          <a href="/api/media/cover-letter" target="_blank" className="block text-center text-xs py-2.5 px-4 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-primary/50 transition-all font-medium tracking-wide uppercase">
            Cover Letter
          </a>
          <a href="/api/media/references" target="_blank" className="block text-center text-xs py-2.5 px-4 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-primary/50 transition-all font-medium tracking-wide uppercase">
            References
          </a>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
