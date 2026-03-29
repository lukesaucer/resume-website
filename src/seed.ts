import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Create admin user
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@lukesaucer.com',
        password: 'changeme123',
        name: 'Luke Saucer',
      },
    })
    console.log('Admin user created')
  } catch {
    console.log('Admin user already exists, skipping')
  }

  // Seed Site Settings global
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteTitle: 'Luke Saucer - Resume',
      siteDescription: 'Engineer and Analyst',
      socialLinks: [
        {
          platform: 'linkedin',
          url: 'https://www.linkedin.com/in/lukesaucer',
        },
        {
          platform: 'github',
          url: 'https://github.com/lukesaucer',
        },
        {
          platform: 'instagram',
          url: 'https://www.instagram.com/thelukesaucer',
        },
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/thelukesaucer',
        },
        {
          platform: 'x',
          url: 'https://www.x.com/thelukesaucer',
        },
      ],
      contactInfo: {
        email: 'lukesaucer@proton.me',
        phone: '845-293-9183',
        location: 'Kingston, New York',
        freelanceAvailable: true,
      },
      seo: {
        metaTitle: 'Luke Saucer - Software Engineer, Security Analyst, Network Engineer',
        metaDescription: 'Resume and portfolio of Luke Saucer, a software engineer and security analyst based in Kingston, New York.',
      },
    },
  })
  console.log('Site settings seeded')

  // Seed Home Page global
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      greeting: 'Luke Saucer',
      subtitle: 'Engineer and Analyst',
      rotatingTitles: [
        { title: 'Software Engineer' },
        { title: 'Security Analyst' },
        { title: 'Network Engineer' },
      ],
    },
  })
  console.log('Home page seeded')

  // Seed About Me global
  await payload.updateGlobal({
    slug: 'about-me',
    data: {
      bio: 'Father, husband, student, avid outdoorsman and amatuer athlete. Currently attending the State University of New York - New Paltz for the Master of Science - Computer Science Graduate Program. Seeking an employer that can help me to develop the skills necessary to become a security engineer. Interested in all aspects and topics relating to computer science and information technology including development, networking, security, radio-frequency engineering and electrical engineering.',
      services: [
        {
          title: 'Software Development',
          description: 'Experience in the development of web applications, mobile applications, computer games, assembly level programs and object-oriented programming.',
          icon: 'code',
        },
        {
          title: 'Cybersecurity',
          description: 'Lab experience through TryHackMe and CISCO Academy in securing and configuring networks, analyzing packets, and monitoring network traffic flow.',
          icon: 'shield',
        },
        {
          title: 'Network Engineering',
          description: 'Lab experience through CISCO Packet Tracer and CISCO Academy in creating and setting up residential, commercial and small industrial networks.',
          icon: 'network',
        },
        {
          title: 'Team Management',
          description: 'Previous team leadership experience within educational, business and athletic environments with a focus on communication, resource management and personal development.',
          icon: 'users',
        },
      ],
    },
  })
  console.log('About Me seeded')

  // Seed Education
  const educationData = [
    {
      degree: 'Master of Science - Computer Science',
      institution: 'State University of New York - New Paltz',
      startDate: '2023',
      endDate: 'Present',
      description: 'Started courses in the Fall of 2023. Focus of studies on web design and database management with a future focus on cryptography, security engineering and data forensics.',
      sortOrder: 1,
    },
    {
      degree: 'Computer Science and Police Basic Training',
      institution: 'State University of New York - Ulster Community College',
      startDate: '2020',
      endDate: '2023',
      description: 'Enrolled in the Police Academy for the Spring and Summer 2020 Semesters. Finished at the top of the platoon in academics and procedural knowledge. Was awarded a criminal justice scholarship for future studies at Ulster Community College. Decided to focus future studies on Computer Science and Cybersecurity in order to learn the knowledge necessary to defend against and combat cybercrime perpetrated by foreign state-sponsored terrorist and cybercrime syndicates.',
      sortOrder: 2,
    },
    {
      degree: 'Bachelor of Arts in Psychology',
      institution: 'University of Northern Iowa',
      startDate: '2008',
      endDate: '2011',
      description: 'Completed a Bachelor of Arts in Psychology in the Fall of 2011. Focus of studies was on biopsychology, neurology and drug interactions. Further studies were focused on sociology and biology.',
      sortOrder: 3,
    },
  ]

  for (const edu of educationData) {
    await payload.create({ collection: 'education', data: edu })
  }
  console.log('Education seeded')

  // Seed Experience
  const experienceData = [
    {
      jobTitle: 'Bar Manager',
      company: 'Hotel Kinsley',
      startDate: '2019',
      endDate: 'Current',
      isCurrent: true,
      description: "Managed the bar for New York City Restauranteur Taavo Somers' upstate New York boutique hotel. Increased yearly net profits from the bar by an average of $63,000 over the previous bar manager. Did this by increasing bar customers, restructuring labor costs and restructuring inventory obtained from suppliers.",
      sortOrder: 1,
    },
    {
      jobTitle: 'Work Study - Back-End Engineer',
      company: 'International Business Machines and State University of New York - Ulster Community College',
      startDate: 'Spring 2022',
      endDate: 'Spring 2022',
      isCurrent: false,
      description: 'Collaborated with a team of developers from both IBM and SUNY Ulster on a web application project as part of a work-study opportunity. Students were introduced to different software development methodologies, focusing on the Agile Development methodology as well as best practices for web applications.',
      sortOrder: 2,
    },
    {
      jobTitle: 'Floor Captain',
      company: 'Le Petit Bistro',
      startDate: '2014',
      endDate: '2019',
      isCurrent: false,
      description: "Managed front-of-house employees in Chef Joseph Delu's fast-paced, high-stress and award-winning New York French Bistro.",
      sortOrder: 3,
    },
  ]

  for (const exp of experienceData) {
    await payload.create({ collection: 'experience', data: exp })
  }
  console.log('Experience seeded')

  // Seed Skills
  const skillsData = [
    // Engineering Skills
    { name: 'Web Design', category: 'engineering' as const, sortOrder: 1 },
    { name: 'Mobile Application Design', category: 'engineering' as const, sortOrder: 2 },
    { name: 'Game Design', category: 'engineering' as const, sortOrder: 3 },
    { name: 'Assembly Level Programming', category: 'engineering' as const, sortOrder: 4 },
    { name: 'Object Oriented Programming', category: 'engineering' as const, sortOrder: 5 },
    // Analyst Skills
    { name: 'Networking', category: 'analyst' as const, sortOrder: 6 },
    { name: 'Cyber Security', category: 'analyst' as const, sortOrder: 7 },
    { name: 'Cloud Systems', category: 'analyst' as const, sortOrder: 8 },
    { name: 'Open-Source Intelligence', category: 'analyst' as const, sortOrder: 9 },
    // Soft Skills
    { name: 'Time Management', category: 'soft' as const, sortOrder: 10 },
    { name: 'Pragmatic', category: 'soft' as const, sortOrder: 11 },
    { name: 'Communication', category: 'soft' as const, sortOrder: 12 },
    { name: 'Leadership', category: 'soft' as const, sortOrder: 13 },
    { name: 'Problem-Solving', category: 'soft' as const, sortOrder: 14 },
    { name: 'Work Ethic', category: 'soft' as const, sortOrder: 15 },
    { name: 'Teamwork', category: 'soft' as const, sortOrder: 16 },
    { name: 'Adaptability', category: 'soft' as const, sortOrder: 17 },
    { name: 'Conflict Resolution', category: 'soft' as const, sortOrder: 18 },
    { name: 'Flexibility', category: 'soft' as const, sortOrder: 19 },
  ]

  for (const skill of skillsData) {
    await payload.create({ collection: 'skills', data: skill })
  }
  console.log('Skills seeded')

  // Seed Certificates
  const certificatesData = [
    { name: 'A+', issuer: 'CompTIA', dateObtained: '19 April 2018', sortOrder: 1 },
    { name: 'Network+', issuer: 'CompTIA', dateObtained: '19 April 2018', sortOrder: 2 },
    { name: 'Security+', issuer: 'CompTIA', dateObtained: '19 April 2018', sortOrder: 3 },
    { name: 'Web Application Development', issuer: 'State University of New York - UCC', dateObtained: '19 April 2018', sortOrder: 4 },
    { name: 'Mobile Application Development', issuer: 'State University of New York - UCC', dateObtained: '19 April 2018', sortOrder: 5 },
    { name: 'Computer Game Design', issuer: 'State University of New York - UCC', dateObtained: '19 April 2018', sortOrder: 6 },
    { name: 'Ham Radio Technician License', issuer: 'Federal Communications Commission', dateObtained: '19 April 2018', sortOrder: 7 },
    { name: 'Emergency Medical Technician-B', issuer: 'National Registry of EMTs', dateObtained: '19 April 2018', sortOrder: 8 },
  ]

  for (const cert of certificatesData) {
    await payload.create({ collection: 'certificates', data: cert })
  }
  console.log('Certificates seeded')

  // Seed Portfolio Categories
  const categories = [
    { name: 'Personal', slug: 'personal', sortOrder: 1 },
    { name: 'SUNY - New Paltz', slug: 'suny-new-paltz', sortOrder: 2 },
    { name: 'SUNY - UCC', slug: 'suny-ucc', sortOrder: 3 },
  ]

  for (const cat of categories) {
    await payload.create({ collection: 'portfolio-categories', data: cat })
  }
  console.log('Portfolio categories seeded')

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
