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
      "p16-sign.tiktokcdn-us.com",
      "p16-sign-va.tiktokcdn.com",
      "firebasestorage.googleapis.com",
    ],
  },
}

module.exports = nextConfig
