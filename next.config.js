/** @type {import('next').NextConfig} */

const { version } = require('./package.json');

const nextConfig = {
  publicRuntimeConfig: {
    version,
  },
  reactStrictMode: true,
  images: {
    domains: 
    [
      "m.media-amazon.com", 
      "firebasestorage.googleapis.com",
      "images.ctfassets.net",
      "downloads.ctfassets.net"
    ],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
