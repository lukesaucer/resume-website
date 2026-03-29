import { getPayload } from 'payload'
import config from '@payload-config'

// Force dynamic rendering -- the page fetches CMS data at runtime, not build time
export const dynamic = 'force-dynamic'
import { Sidebar } from '@/components/Sidebar'
import { HomeSection } from '@/components/sections/HomeSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ResumeSection } from '@/components/sections/ResumeSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { GallerySidebar } from '@/components/GallerySidebar'
import { fetchPinnedRepos } from '@/lib/github'

export default async function Home() {
  const payload = await getPayload({ config })

  // Fetch all data from Payload CMS in parallel
  const [
    siteSettings,
    homePage,
    aboutMe,
    experience,
    education,
    skills,
    certificates,
    portfolioItems,
    portfolioCategories,
    galleryPhotos,
    pinnedRepos,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'home-page' }),
    payload.findGlobal({ slug: 'about-me' }),
    payload.find({ collection: 'experience', sort: 'sortOrder', limit: 50 }),
    payload.find({ collection: 'education', sort: 'sortOrder', limit: 50 }),
    payload.find({ collection: 'skills', sort: 'sortOrder', limit: 50 }),
    payload.find({ collection: 'certificates', sort: 'sortOrder', limit: 50 }),
    payload.find({ collection: 'portfolio-items', sort: 'sortOrder', limit: 50 }),
    payload.find({ collection: 'portfolio-categories', sort: 'sortOrder', limit: 50 }),
    payload.find({
      collection: 'gallery-photos',
      where: { showInGallery: { equals: true } },
      sort: 'sortOrder',
      limit: 30,
    }),
    fetchPinnedRepos(),
  ])

  return (
    <div className="flex min-h-screen">
      <Sidebar siteSettings={siteSettings} homePage={homePage} />

      <main className="flex-1 lg:ml-[280px] xl:mr-[240px]">
        <HomeSection data={homePage} />
        <AboutSection data={aboutMe} />
        <ResumeSection
          experience={experience.docs}
          education={education.docs}
          skills={skills.docs}
          certificates={certificates.docs}
        />
        <PortfolioSection
          items={portfolioItems.docs}
          categories={portfolioCategories.docs}
          pinnedRepos={pinnedRepos}
        />
        <ContactSection siteSettings={siteSettings} />
      </main>

      <GallerySidebar photos={galleryPhotos.docs} />
    </div>
  )
}
