import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Experience } from './collections/Experience'
import { Education } from './collections/Education'
import { Skills } from './collections/Skills'
import { Certificates } from './collections/Certificates'
import { PortfolioItems } from './collections/PortfolioItems'
import { PortfolioCategories } from './collections/PortfolioCategories'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { BlogPosts } from './collections/BlogPosts'
import { GalleryPhotos } from './collections/GalleryPhotos'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutMe } from './globals/AboutMe'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Experience,
    Education,
    Skills,
    Certificates,
    PortfolioItems,
    PortfolioCategories,
    ContactSubmissions,
    BlogPosts,
    GalleryPhotos,
  ],
  globals: [
    SiteSettings,
    HomePage,
    AboutMe,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
