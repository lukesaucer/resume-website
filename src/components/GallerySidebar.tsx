'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryLightbox } from './GalleryLightbox'

interface GalleryPhoto {
  id: string
  alt: string
  caption?: string | null
  url: string
  width?: number
  height?: number
  sizes?: {
    gallerySidebar?: {
      url?: string
      width?: number
      height?: number
    }
    galleryFull?: {
      url?: string
      width?: number
      height?: number
    }
  }
}

interface GallerySidebarProps {
  photos: GalleryPhoto[]
}

export function GallerySidebar({ photos }: GallerySidebarProps) {
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null)

  return (
    <>
      {/* Right sidebar -- xl+ only */}
      <aside className="hidden xl:block fixed top-0 right-0 h-screen w-[240px] overflow-y-auto z-10 py-6 px-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-1">Gallery</h3>
        {(!photos || photos.length === 0) ? (
          <p className="text-xs text-gray-400 dark:text-gray-500 px-1">No photos yet.</p>
        ) : (
        <div className="space-y-3">
          {photos.map((photo, i) => {
            const thumbSrc = photo.sizes?.gallerySidebar?.url || photo.url
            const thumbWidth = photo.sizes?.gallerySidebar?.width || 240
            const thumbHeight = photo.sizes?.gallerySidebar?.height || 240

            return (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onClick={() => setLightboxPhoto(photo)}
                className="block w-full rounded-lg overflow-hidden hover:ring-2 hover:ring-primary/40 transition-all duration-200 group cursor-pointer"
              >
                <Image
                  src={thumbSrc}
                  alt={photo.alt}
                  width={thumbWidth}
                  height={thumbHeight}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {photo.caption && (
                  <span className="block text-[10px] text-gray-500 dark:text-gray-400 mt-1 px-1 truncate">
                    {photo.caption}
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
        )}
      </aside>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <GalleryLightbox
            photo={lightboxPhoto}
            onClose={() => setLightboxPhoto(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
