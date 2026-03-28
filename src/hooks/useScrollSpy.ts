'use client'

import { useEffect, useState } from 'react'

const sectionIds = ['home', 'about', 'resume', 'portfolio', 'contact']

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Track which sections are currently visible and their intersection ratios
    const visibleSections = new Map<string, number>()

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio)
            } else {
              visibleSections.delete(id)
            }
          })

          // Activate the section with the highest visibility
          let maxRatio = 0
          let maxId = 'home'
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio
              maxId = sectionId
            }
          })
          setActiveSection(maxId)
        },
        {
          // Fire at multiple thresholds for finer-grained tracking
          threshold: [0, 0.25, 0.5, 0.75, 1],
          // Slight negative margin so the section activates a bit before fully visible
          rootMargin: '-10% 0px -10% 0px',
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return activeSection
}
