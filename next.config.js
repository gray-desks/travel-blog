/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Sanity CDN からの画像最適化を許可
    domains: ['cdn.sanity.io'],
  },
}

module.exports = nextConfig

