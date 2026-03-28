import type { GlobalConfig } from 'payload'

export const AboutMe: GlobalConfig = {
  slug: 'about-me',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon class name (e.g., "code", "shield", "network", "users")',
          },
        },
      ],
    },
    {
      name: 'documents',
      type: 'group',
      fields: [
        {
          name: 'resume',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'coverLetter',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'references',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
