export interface GitHubPinnedRepo {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  primaryLanguage: { name: string; color: string } | null
  updatedAt: string
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

const PINNED_REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            primaryLanguage { name color }
            updatedAt
          }
        }
      }
    }
  }
`

export async function fetchPinnedRepos(): Promise<GitHubPinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME || 'lukesaucer'

  if (!token) {
    return []
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: PINNED_REPOS_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      console.error(`GitHub API returned ${res.status}`)
      return []
    }

    const json = await res.json()
    const nodes = json?.data?.user?.pinnedItems?.nodes

    if (!Array.isArray(nodes)) {
      return []
    }

    return nodes.filter((node: any) => node && node.name)
  } catch (err) {
    console.error('Failed to fetch GitHub pinned repos:', err)
    return []
  }
}
