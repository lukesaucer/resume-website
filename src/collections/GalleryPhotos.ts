import type { CollectionConfig } from 'payload'

export const GalleryPhotos: CollectionConfig = {
  slug: 'gallery-photos',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'caption', 'category', 'sortOrder'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: '../public/gallery',
    imageSizes: [
      {
        // Grid card thumbnail (matches Portfolio aspect ratio)
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        // Full size for lightbox
        name: 'galleryFull',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Life', value: 'life' },
        { label: 'Travel', value: 'travel' },
        { label: 'Pets', value: 'pets' },
        { label: 'Hobbies', value: 'hobbies' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'life',
    },
    {
      name: 'showInGallery',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  defaultSort: 'sortOrder',
}
