import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'greeting',
      type: 'text',
      defaultValue: 'Luke Saucer',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Engineer and Analyst',
    },
    {
      name: 'rotatingTitles',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
