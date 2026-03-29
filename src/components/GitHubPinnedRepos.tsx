'use client'

import type { GitHubPinnedRepo } from '@/lib/github'
import { getLanguageColor } from '@/lib/languageColors'
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/AnimateIn'

function formatRelativeDate(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`
  const diffYears = Math.floor(diffDays / 365)
  return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`
}

export function GitHubPinnedRepos({ repos }: { repos: GitHubPinnedRepo[] }) {
  if (repos.length === 0) return null

  return (
    <div className="border-t border-gray-200 dark:border-white/5 mt-16 pt-10">
      <AnimateIn>
        <div className="flex items-center gap-2.5 mb-6">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h3 className="text-lg font-semibold text-[#222] dark:text-white">More on GitHub</h3>
        </div>
      </AnimateIn>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <StaggerItem key={repo.name}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-card p-4 rounded-xl hover:border-primary/30 dark:hover:border-primary/20 transition-colors duration-200 h-full"
            >
              <h4 className="text-sm font-semibold text-primary truncate">{repo.name}</h4>

              {repo.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400 dark:text-gray-500">
                {repo.primaryLanguage && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getLanguageColor(repo.primaryLanguage.name, repo.primaryLanguage.color) }}
                    />
                    {repo.primaryLanguage.name}
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {repo.stargazerCount}
                </span>

                <span>Updated {formatRelativeDate(repo.updatedAt)}</span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
