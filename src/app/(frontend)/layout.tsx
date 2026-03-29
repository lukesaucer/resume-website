import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Luke Saucer - Engineer and Analyst',
  description:
    'Resume and portfolio of Luke Saucer - Software Engineer, Security Analyst, and Network Engineer based in Kingston, New York.',
  keywords: ['resume', 'portfolio', 'software engineer', 'cybersecurity', 'network engineer', 'Luke Saucer'],
  authors: [{ name: 'Luke Saucer' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lukesaucer.com'),
  openGraph: {
    title: 'Luke Saucer - Engineer and Analyst',
    description: 'Resume and portfolio of Luke Saucer - Software Engineer, Security Analyst, and Network Engineer.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Luke Saucer',
  },
  twitter: {
    card: 'summary',
    title: 'Luke Saucer - Engineer and Analyst',
    description: 'Resume and portfolio of Luke Saucer - Software Engineer, Security Analyst, and Network Engineer.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// JSON-LD structured data for search engines -- static content only, no user input
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Luke Saucer',
  jobTitle: 'Software Engineer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lukesaucer.com',
  email: 'lukesaucer@proton.me',
  telephone: '+1-845-293-9183',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kingston',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.linkedin.com/in/lukesaucer',
    'https://github.com/lukesaucer',
    'https://www.instagram.com/thelukesaucer',
    'https://www.facebook.com/thelukesaucer',
    'https://www.x.com/thelukesaucer',
  ],
  knowsAbout: [
    'Software Engineering',
    'Cybersecurity',
    'Network Engineering',
    'Web Development',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'State University of New York - New Paltz',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Northern Iowa',
    },
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'CompTIA A+' },
    { '@type': 'EducationalOccupationalCredential', name: 'CompTIA Network+' },
    { '@type': 'EducationalOccupationalCredential', name: 'CompTIA Security+' },
  ],
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body className="bg-white text-gray-700 dark:bg-dark dark:text-gray-300 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
