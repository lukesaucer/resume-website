import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
    ],
  },
  webpack: (config) => {
    // Alias to allow importing handleServerFunctions which is not
    // in @payloadcms/next's public exports field
    config.resolve.alias['@payloadcms/next/handleServerFunctions'] = path.resolve(
      __dirname,
      'node_modules/@payloadcms/next/dist/utilities/handleServerFunctions.js',
    )
    return config
  },
}

export default withPayload(nextConfig)
