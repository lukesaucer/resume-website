import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'issuer', 'dateObtained'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'issuer',
      type: 'text',
      required: true,
    },
    {
      name: 'dateObtained',
      type: 'text',
      admin: {
        description: 'Date the certificate was obtained',
      },
    },
    {
      name: 'credentialUrl',
      type: 'text',
      admin: {
        description: 'URL to verify the credential',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
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
