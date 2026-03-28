import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'read', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation }) => {
        if (operation !== 'create') return data

        const secret = process.env.RECAPTCHA_SECRET_KEY
        // Skip verification if reCAPTCHA is not configured (dev mode)
        if (!secret) return data

        const token = data?.recaptchaToken
        if (!token) {
          throw new Error('reCAPTCHA verification required')
        }

        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        })

        const result = await res.json()

        if (!result.success || result.score < 0.5) {
          throw new Error('reCAPTCHA verification failed')
        }

        // Strip the token so it's not stored in the database
        const { recaptchaToken: _, ...cleanData } = data || {}
        return cleanData
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
