import type { CollectionConfig } from 'payload'

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'degree',
    defaultColumns: ['degree', 'institution', 'startDate', 'endDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'institution',
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
        description: 'Leave empty or use "Present" for current programs',
      },
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
