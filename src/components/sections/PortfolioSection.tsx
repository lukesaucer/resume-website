'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimateIn } from '@/components/AnimateIn'

interface PortfolioSectionProps {
  items: any[]
  categories: any[]
}

export function PortfolioSection({ items, categories }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [lightboxItem, setLightboxItem] = useState<any | null>(null)

  const filteredItems = activeCategory
    ? items.filter((item) => {
        const catId = typeof item.category === 'string' ? item.category : item.category?.id
        return catId === activeCategory
      })
    : items

  const mediaTypeIcons: Record<string, string> = {
    image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    youtube: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    vimeo: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    soundcloud: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    detailed: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  }

  return (
    <section id="portfolio" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="section-divider mb-20" />

      <AnimateIn>
        <h2 className="section-title">Portfolio</h2>
      </AnimateIn>

      {/* Category filters */}
      <AnimateIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${!activeCategory
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-gray-700 dark:hover:text-white border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-gray-700 dark:hover:text-white border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </AnimateIn>

      {/* Portfolio grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.figure
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
              onClick={() => setLightboxItem(item)}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] glass-card">
                {item.thumbnail ? (
                  <Image
                    src={typeof item.thumbnail === 'string' ? item.thumbnail : item.thumbnail.url || ''}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/5 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary/30 dark:text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={mediaTypeIcons[item.mediaType] || mediaTypeIcons.detailed} />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                    <span className="text-gray-300 text-xs">
                      {typeof item.category === 'object' ? item.category.name : ''}
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="mt-3 font-semibold text-sm text-[#222] dark:text-white">{item.title}</h4>
              <span className="text-gray-400 text-xs">
                {typeof item.category === 'object' ? item.category.name : ''}
              </span>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <p className="text-gray-400 dark:text-gray-600 text-center py-16">No portfolio items yet.</p>
      )}

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#222] dark:text-white">{lightboxItem.title}</h3>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white transition-colors p-1"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {['youtube', 'vimeo', 'soundcloud'].includes(lightboxItem.mediaType) && lightboxItem.embedUrl && (
                <div className="aspect-video mb-4">
                  <iframe
                    src={lightboxItem.embedUrl}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                  />
                </div>
              )}

              {lightboxItem.mediaType === 'image' && lightboxItem.fullImage && (
                <div className="relative w-full aspect-video mb-4">
                  <Image
                    src={typeof lightboxItem.fullImage === 'string' ? lightboxItem.fullImage : lightboxItem.fullImage.url || ''}
                    alt={lightboxItem.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}

              {lightboxItem.externalUrl && (
                <a
                  href={lightboxItem.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block mt-4"
                >
                  View Project
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
