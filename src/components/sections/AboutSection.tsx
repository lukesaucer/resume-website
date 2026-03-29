'use client'

import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/AnimateIn'

const serviceIcons: Record<string, string> = {
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  network: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
}

interface AboutSectionProps {
  data: any
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="section-divider mb-20" />

      <AnimateIn>
        <h2 className="section-title">
          About <span>Me</span>
        </h2>
      </AnimateIn>

      <div className="grid md:grid-cols-12 gap-10 mb-16">
        {/* Bio */}
        <AnimateIn delay={0.1} className="md:col-span-7">
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
            {data.bio || ''}
          </p>
        </AnimateIn>

        {/* Personal info */}
        <AnimateIn delay={0.2} className="md:col-span-5">
          <div className="glass-card p-6">
            <ul className="space-y-4">
              {[
                { label: 'Residence', value: 'USA' },
                { label: 'Address', value: 'Kingston, New York' },
                { label: 'E-mail', value: 'lukesaucer@proton.me' },
                { label: 'Phone', value: '+1 845 293 9183' },
              ].map((item) => (
                <li key={item.label} className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-400 dark:text-gray-600 text-sm">{item.label}</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>
      </div>

      {/* Services */}
      <AnimateIn>
        <h3 className="text-2xl font-bold mb-8">
          What <span className="text-primary">I Do</span>
        </h3>
      </AnimateIn>

      <StaggerContainer className="grid md:grid-cols-2 gap-5">
        {(data.services || []).map((service: any, i: number) => (
          <StaggerItem key={i}>
            <div className="glass-card flex gap-4 p-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={serviceIcons[service.icon] || serviceIcons.code}
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1.5 text-[#222] dark:text-white">{service.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
