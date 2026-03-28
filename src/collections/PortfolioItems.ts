import type { CollectionConfig } from 'payload'

export const PortfolioItems: CollectionConfig = {
  slug: 'portfolio-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'mediaType'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'portfolio-categories',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'mediaType',
      type: 'select',
      required: true,
      options: [
        { label: 'Image', value: 'image' },
        { label: 'YouTube Video', value: 'youtube' },
        { label: 'Vimeo Video', value: 'vimeo' },
        { label: 'SoundCloud Audio', value: 'soundcloud' },
        { label: 'Detailed Project', value: 'detailed' },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'embedUrl',
      type: 'text',
      admin: {
        description: 'URL for video/audio embeds',
        condition: (data) =>
          ['youtube', 'vimeo', 'soundcloud'].includes(data?.mediaType),
      },
    },
    {
      name: 'fullImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Full-size image for lightbox',
        condition: (data) => data?.mediaType === 'image',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'Link to live project or repository',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  defaultSort: 'sortOrder',
}
