// next.config.ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {}
})

const nextConfig: NextConfig = {
  // IMPORTANT: no static-export options here.
  // - DO NOT set output:'export'
  // - DO NOT set distDir:'out'
  // - DO NOT set trailingSlash
  // - DO NOT set images.unoptimized

  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Serve HTML files from /public/games and add pretty URLs
  async rewrites() {
    return [
      { source: '/games/learn-cantonese', destination: '/games/learn-cantonese.html' },
      { source: '/games/toddler-types',  destination: '/games/toddler-types.html' },
      { source: '/games/:path*.html',    destination: '/games/:path*.html' }
    ]
  }
}

export default withMDX(nextConfig)
