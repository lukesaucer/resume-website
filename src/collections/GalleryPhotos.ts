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
        name: 'galleryThumb',
        width: 240,
        height: 240,
        position: 'centre',
      },
      {
        // 480px wide for 240px sidebar at 2x retina
        name: 'gallerySidebar',
        width: 480,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'galleryFull',
        width: 1200,
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
