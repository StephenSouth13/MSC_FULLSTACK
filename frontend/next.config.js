/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,          // kiểm tra lỗi sớm
  swcMinify: true,                // nén JavaScript nhanh hơn
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  },

  // Bật các header CORS cho API (giữ nguyên)
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },

  images: {
    domains: ['res.cloudinary.com'],
    // Để Next tối ưu ảnh, bỏ unoptimized hoặc đặt false
    unoptimized: false,
    formats: ['image/avif', 'image/webp'], // định dạng ảnh nén tốt hơn
  },

  experimental: {
    optimizeCss: true, // giảm kích thước CSS
  },
}

module.exports = nextConfig
