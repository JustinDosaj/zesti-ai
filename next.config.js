/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: 
    [
      "m.media-amazon.com", 
      "p16-sign.tiktokcdn-us.com",
      "p16-sign-va.tiktokcdn.com"
    ],
  },
}

module.exports = nextConfig
