'use client'

import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/AnimateIn'

interface ResumeSectionProps {
  experience: any[]
  education: any[]
  skills: any[]
  certificates: any[]
}

function TimelineItem({ item }: { item: any }) {
  return (
    <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0 group">
      {/* Dot on the timeline -- pulses on hover */}
      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-dark group-hover:ring-primary/20 transition-all" />

      <div className="glass-card p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            {item.startDate} - {item.endDate || 'Present'}
          </span>
        </div>
        <h4 className="font-semibold text-base mb-1">{item.jobTitle || item.degree}</h4>
        <p className="text-gray-500 text-xs mb-2 font-medium">{item.company || item.institution}</p>
        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

export function ResumeSection({ experience, education, skills, certificates }: ResumeSectionProps) {
  const engineeringSkills = skills.filter((s) => s.category === 'engineering')
  const analystSkills = skills.filter((s) => s.category === 'analyst')
  const softSkills = skills.filter((s) => s.category === 'soft')

  return (
    <section id="resume" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="section-divider mb-20" />

      <AnimateIn>
        <h2 className="section-title">Resume</h2>
      </AnimateIn>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Left column: Education and Experience */}
        <div className="md:col-span-7">
          {/* Education */}
          <AnimateIn>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
              </svg>
              Education
            </h3>
          </AnimateIn>
          <StaggerContainer className="mb-12">
            {education.map((item) => (
              <StaggerItem key={item.id}>
                <TimelineItem item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Experience */}
          <AnimateIn>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Experience
            </h3>
          </AnimateIn>
          <StaggerContainer>
            {experience.map((item) => (
              <StaggerItem key={item.id}>
                <TimelineItem item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right column: Skills and Certificates */}
        <div className="md:col-span-5">
          {/* Engineering Skills */}
          {engineeringSkills.length > 0 && (
            <AnimateIn className="mb-8">
              <h3 className="text-lg font-bold mb-4">
                Engineering <span className="text-primary">Skills</span>
              </h3>
              <div className="space-y-2">
                {engineeringSkills.map((skill) => (
                  <div key={skill.id} className="glass-card px-4 py-2.5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          )}

          {/* Analyst Skills */}
          {analystSkills.length > 0 && (
            <AnimateIn delay={0.1} className="mb-8">
              <h3 className="text-lg font-bold mb-4">
                Analyst <span className="text-primary">Skills</span>
              </h3>
              <div className="space-y-2">
                {analystSkills.map((skill) => (
                  <div key={skill.id} className="glass-card px-4 py-2.5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          )}

          {/* Soft Skills */}
          {softSkills.length > 0 && (
            <AnimateIn delay={0.2} className="mb-8">
              <h3 className="text-lg font-bold mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-white/5 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-white/5 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </AnimateIn>
          )}
        </div>
      </div>

      {/* Certificates */}
      {certificates.length > 0 && (
        <div className="mt-16">
          <AnimateIn>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              Certificates
            </h3>
          </AnimateIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <StaggerItem key={cert.id}>
                <div className="glass-card flex items-center gap-4 p-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{cert.name}</h4>
                    <p className="text-gray-600 text-xs">{cert.issuer}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
    </section>
  )
}
