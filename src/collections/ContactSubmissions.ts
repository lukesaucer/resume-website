import type { CollectionConfig } from 'payload'
import nodemailer from 'nodemailer'

// Lazily create transporter only when SMTP is configured
function getTransporter() {
  const host = process.env.SMTP_HOST
  if (!host) return null

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  })
}

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

        const { recaptchaToken: _, ...cleanData } = data || {}
        return cleanData
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return

        const transporter = getTransporter()
        if (!transporter) return

        const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || 'lukesaucer@proton.me'

        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || notifyEmail,
            to: notifyEmail,
            subject: `New Contact Form Submission: ${doc.subject}`,
            text: [
              `Name: ${doc.name}`,
              `Email: ${doc.email}`,
              `Subject: ${doc.subject}`,
              '',
              'Message:',
              doc.message,
            ].join('\n'),
            replyTo: doc.email,
          })
        } catch (err) {
          // Log but don't fail the submission -- the message is already saved
          console.error('Failed to send contact notification email:', err)
        }
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
