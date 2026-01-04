/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'yourdomain.com'], // هر دامنه‌ای که تصاویر ازش میاد
  },
  experimental: {
    appDir: true, // اگه از App Router استفاده می‌کنی
  },
}

module.exports = nextConfig
