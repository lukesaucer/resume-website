'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface GalleryLightboxProps {
  photo: {
    alt: string
    caption?: string | null
    url: string
    width?: number
    height?: number
    sizes?: {
      galleryFull?: {
        url?: string
        width?: number
        height?: number
      }
    }
  }
  onClose: () => void
}

export function GalleryLightbox({ photo, onClose }: GalleryLightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const imgSrc = photo.sizes?.galleryFull?.url || photo.url
  const imgWidth = photo.sizes?.galleryFull?.width || photo.width || 1200
  const imgHeight = photo.sizes?.galleryFull?.height || photo.height || 800

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-4xl max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imgSrc}
          alt={photo.alt}
          width={imgWidth}
          height={imgHeight}
          className="rounded-lg object-contain max-h-[80vh] w-auto"
        />
        {photo.caption && (
          <p className="text-center text-sm text-gray-300 mt-3">{photo.caption}</p>
        )}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Close lightbox"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}
