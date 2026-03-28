'use client'

import { useState, useEffect } from 'react'
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/AnimateIn'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface ContactSectionProps {
  siteSettings: any
}

export function ContactSection({ siteSettings }: ContactSectionProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  // Load reCAPTCHA v3 script when key is configured
  useEffect(() => {
    if (!recaptchaSiteKey) return
    if (document.querySelector('script[src*="recaptcha"]')) return

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
    script.async = true
    document.head.appendChild(script)
  }, [recaptchaSiteKey])

  const contactInfo = siteSettings.contactInfo || {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      let recaptchaToken: string | undefined

      // Get reCAPTCHA token if configured
      if (recaptchaSiteKey && window.grecaptcha) {
        recaptchaToken = await new Promise<string>((resolve) => {
          window.grecaptcha!.ready(async () => {
            const token = await window.grecaptcha!.execute(recaptchaSiteKey, { action: 'contact' })
            resolve(token)
          })
        })
      }

      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      })

      if (res.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contactCards = [
    {
      show: contactInfo.location,
      icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
      label: 'Location',
      value: contactInfo.location,
    },
    {
      show: contactInfo.phone,
      icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
      label: 'Phone',
      value: contactInfo.phone,
    },
    {
      show: contactInfo.email,
      icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
      label: 'Email',
      value: contactInfo.email,
    },
    {
      show: contactInfo.freelanceAvailable,
      icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      label: 'Status',
      value: 'Freelance Available',
    },
  ]

  return (
    <section id="contact" className="py-20 px-6 md:px-12 lg:px-16 pb-32">
      <div className="section-divider mb-20" />

      <AnimateIn>
        <h2 className="section-title">Contact</h2>
      </AnimateIn>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Contact info cards */}
        <StaggerContainer className="md:col-span-4 space-y-3">
          {contactCards
            .filter((c) => c.show)
            .map((card) => (
              <StaggerItem key={card.label}>
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider">{card.label}</p>
                    <p className="text-gray-300 text-sm font-medium">{card.value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
        </StaggerContainer>

        {/* Contact form */}
        <AnimateIn delay={0.2} className="md:col-span-8">
          <h3 className="text-xl font-bold mb-6">
            How Can I <span className="text-primary">Help You?</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs text-gray-600 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                             text-white text-sm placeholder-gray-700
                             focus:border-primary/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-primary/25
                             transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs text-gray-600 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                             text-white text-sm placeholder-gray-700
                             focus:border-primary/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-primary/25
                             transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs text-gray-600 mb-1.5 uppercase tracking-wider">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                           text-white text-sm placeholder-gray-700
                           focus:border-primary/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-primary/25
                           transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs text-gray-600 mb-1.5 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                           text-white text-sm placeholder-gray-700
                           focus:border-primary/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-primary/25
                           transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'submitting'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {formState === 'success' && (
              <p className="text-green-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Message sent successfully!
              </p>
            )}
            {formState === 'error' && (
              <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
            )}
          </form>
        </AnimateIn>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-white/5 text-center">
        <p className="text-gray-700 text-xs">
          &copy; {new Date().getFullYear()} Luke Saucer. All rights reserved.
        </p>
      </div>
    </section>
  )
}
