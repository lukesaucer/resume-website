// Fetches recent media from Instagram using the Instagram Graph API.
// Requires a long-lived access token stored in INSTAGRAM_ACCESS_TOKEN env var.
// Token lasts 60 days and is auto-refreshed on each call if within the refresh window.

export interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

const INSTAGRAM_API = 'https://graph.instagram.com'

// Refresh the long-lived token (valid for 60 days, refreshable if not expired)
async function refreshToken(token: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${INSTAGRAM_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.access_token || null
  } catch {
    return null
  }
}

export async function fetchInstagramMedia(limit = 12): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  try {
    // Attempt to refresh the token on each server-side call to keep it alive
    await refreshToken(token)

    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
    const res = await fetch(
      `${INSTAGRAM_API}/me/media?fields=${fields}&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!res.ok) {
      console.error('Instagram API error:', res.status, await res.text())
      return []
    }

    const data = await res.json()
    // Filter to only images and carousel albums (skip standalone videos)
    return (data.data || []).filter(
      (post: InstagramPost) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM',
    )
  } catch (err) {
    console.error('Failed to fetch Instagram media:', err)
    return []
  }
}
