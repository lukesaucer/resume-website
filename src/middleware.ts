import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  )

  // Rate limit contact form submissions by checking the path
  // (basic header-based hint -- real rate limiting should be at the reverse proxy level)
  if (request.nextUrl.pathname === '/api/contact-submissions' && request.method === 'POST') {
    response.headers.set('X-RateLimit-Policy', 'contact-form')
  }

  return response
}

export const config = {
  // Apply to all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
