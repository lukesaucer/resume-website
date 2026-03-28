import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'jobTitle',
    defaultColumns: ['jobTitle', 'company', 'startDate', 'endDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'text',
      required: true,
    },
    {
      name: 'endDate',
      type: 'text',
      admin: {
        description: 'Leave empty or use "Present" for current positions',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
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
