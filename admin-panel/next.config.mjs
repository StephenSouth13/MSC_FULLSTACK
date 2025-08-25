/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api.msc.edu.vn'],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8080/api/v1',
  },
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs'],
  },
}

export default nextConfig
