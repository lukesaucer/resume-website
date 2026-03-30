'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimateIn } from '@/components/AnimateIn'
import type { InstagramPost } from '@/lib/instagram'

interface GalleryPhoto {
  id: string
  alt: string
  caption?: string | null
  category?: string | null
  url: string
  width?: number
  height?: number
  sizes?: {
    card?: { url?: string; width?: number; height?: number }
    galleryFull?: { url?: string; width?: number; height?: number }
  }
}

interface GallerySectionProps {
  photos: GalleryPhoto[]
  instagramPosts: InstagramPost[]
  instagramHandle?: string
}

type LightboxItem = {
  src: string
  alt: string
  caption?: string
  link?: string
}

export function GallerySection({ photos, instagramPosts, instagramHandle }: GallerySectionProps) {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(photos.map((p) => p.category).filter(Boolean))) as string[]

  const filteredPhotos = activeCategory
    ? photos.filter((p) => p.category === activeCategory)
    : photos

  const categoryLabels: Record<string, string> = {
    life: 'Life',
    travel: 'Travel',
    pets: 'Pets',
    hobbies: 'Hobbies',
    other: 'Other',
  }

  return (
    <section id="gallery" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="section-divider mb-20" />

      <AnimateIn>
        <h2 className="section-title">Gallery</h2>
      </AnimateIn>

      {/* Category filters for pinned photos */}
      {categories.length > 1 && (
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
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-gray-700 dark:hover:text-white border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'}`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </AnimateIn>
      )}

      {/* Pinned photos grid -- styled like Portfolio */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredPhotos.map((photo) => {
            const thumbSrc = photo.sizes?.card?.url || photo.url
            const fullSrc = photo.sizes?.galleryFull?.url || photo.url

            return (
              <motion.figure
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => setLightboxItem({ src: fullSrc, alt: photo.alt, caption: photo.caption || undefined })}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] glass-card">
                  <Image
                    src={thumbSrc}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      {photo.caption && (
                        <h4 className="font-semibold text-sm text-white">{photo.caption}</h4>
                      )}
                      {photo.category && (
                        <span className="text-gray-300 text-xs">
                          {categoryLabels[photo.category] || photo.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {photo.caption && (
                  <h4 className="mt-3 font-semibold text-sm text-[#222] dark:text-white">{photo.caption}</h4>
                )}
                {photo.category && (
                  <span className="text-gray-400 text-xs">
                    {categoryLabels[photo.category] || photo.category}
                  </span>
                )}
              </motion.figure>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredPhotos.length === 0 && instagramPosts.length === 0 && (
        <p className="text-gray-400 dark:text-gray-600 text-center py-16">No photos yet.</p>
      )}

      {/* Instagram feed -- like the GitHub pinned repos pattern */}
      {instagramPosts.length > 0 && (
        <div className="mt-16">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <h3 className="text-xl font-bold text-[#222] dark:text-white">More on Instagram</h3>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {instagramPosts.map((post) => {
              const displayUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
              // Truncate caption for display
              const shortCaption = post.caption
                ? post.caption.length > 80 ? post.caption.slice(0, 80) + '...' : post.caption
                : undefined

              return (
                <motion.figure
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setLightboxItem({
                    src: displayUrl || post.media_url,
                    alt: post.caption || 'Instagram photo',
                    caption: post.caption,
                    link: post.permalink,
                  })}
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] glass-card">
                    {displayUrl ? (
                      <Image
                        src={displayUrl}
                        alt={post.caption || 'Instagram photo'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center">
                        <svg className="w-10 h-10 text-pink-500/30" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      {shortCaption && (
                        <p className="text-sm text-white line-clamp-2">{shortCaption}</p>
                      )}
                    </div>
                  </div>
                  {shortCaption && (
                    <p className="mt-3 text-sm text-[#222] dark:text-white line-clamp-1">{shortCaption}</p>
                  )}
                  <span className="text-gray-400 text-xs">
                    {new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </motion.figure>
              )
            })}
          </div>

          {instagramHandle && (
            <AnimateIn>
              <div className="text-center mt-8">
                <a
                  href={`https://www.instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-gray-700 dark:hover:text-white border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                  </svg>
                  Follow @{instagramHandle}
                </a>
              </div>
            </AnimateIn>
          )}
        </div>
      )}

      {/* Lightbox */}
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
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  {lightboxItem.caption && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{lightboxItem.caption}</p>
                  )}
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white transition-colors p-1 flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  fill
                  className="object-contain rounded-lg"
                  unoptimized
                />
              </div>

              {lightboxItem.link && (
                <a
                  href={lightboxItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block mt-2"
                >
                  View on Instagram
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
