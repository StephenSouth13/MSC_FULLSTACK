'use client'

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock, Eye, Heart, Share2, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { api, BlogPost } from "@/lib/api"

export default function BlogPage() {
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        const response = await api.getBlogPosts(1, 20) // Fetch first 20 posts
        
        if (response.success && response.data) {
          setAllBlogPosts(response.data.data)
        } else {
          setError(response.error || 'Failed to fetch blog posts')
        }
      } catch (err) {
        setError('An error occurred while fetching blog posts')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const featuredPost = allBlogPosts[0] // Chọn bài đầu tiên làm bài nổi bật
  const blogPosts = allBlogPosts.slice(1) // Các bài còn lại

  const categories = [
    { name: "Kỹ năng mềm", count: 18, color: "bg-blue-500" },
    { name: "Phát triển bản thân", count: 25, color: "bg-green-500" },
    { name: "Coaching & Mentoring", count: 22, color: "bg-purple-500" },
    { name: "Quản trị Nhân sự", count: 15, color: "bg-orange-500" },
    { name: "Lãnh đạo", count: 12, color: "bg-red-500" },
    { name: "Xu hướng", count: 10, color: "bg-yellow-500" },
  ]

  const stats = [
    { label: "Bài viết chuyên môn", value: "50+", icon: BookOpen },
    { label: "Lượt đọc hàng tháng", value: "10K+", icon: Eye },
    { label: "Chuyên gia đóng góp", value: "10+", icon: User },
    { label: "Lĩnh vực chia sẻ", value: "8+", icon: TrendingUp },
  ]

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Lỗi tải dữ liệu</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!featuredPost) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">📝 Chưa có bài viết nào</div>
          <p className="text-gray-600">Vui lòng quay lại sau.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white">
        <div className="container">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-white/10 p-4 rounded-full mb-6">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Chia sẻ & Tri thức</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Khám phá những insights sâu sắc, xu hướng mới nhất và kiến thức thực tiễn từ các chuyên gia hàng đầu tại MSC Center.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Bài viết nổi bật</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những góc nhìn sâu sắc và quan trọng nhất được chia sẻ từ các chuyên gia của chúng tôi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 max-w-6xl mx-auto rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto">
                  <Image
                    src={featuredPost.image || '/placeholder-image.jpg'}
                    alt={featuredPost.title}
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1023px) 100vw, 50vw"
                  />
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      {featuredPost.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">{featuredPost.excerpt}</p>

                    <div className="flex items-center space-x-4 mb-8">
                      {featuredPost.author_avatar && (
                        <Image
                          src={featuredPost.author_avatar}
                          alt={featuredPost.author || 'Author'}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{featuredPost.author}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(featuredPost.publish_date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{featuredPost.read_time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href={`/chia-se/${featuredPost.slug}`}>
                    <Button size="lg" className="w-full btn-primary text-lg py-6">
                      Đọc bài viết đầy đủ
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Chủ đề chính</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá nội dung theo các lĩnh vực chuyên môn mà bạn quan tâm.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/chia-se/category/${category.name.toLowerCase().replace(/ /g, '-')}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group p-6 text-center hover:-translate-y-2 rounded-2xl">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} bài viết</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Bài viết mới nhất</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cập nhật những kiến thức và góc nhìn mới nhất từ các chuyên gia của chúng tôi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/chia-se/${post.slug}`}>
                  <Card className="h-full flex flex-col group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl">
                    <div className="relative aspect-video">
                      <Image 
                        src={post.image || '/placeholder-image.jpg'} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium absolute top-4 left-4">
                        {post.category}
                      </span>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center space-x-3 mt-auto pt-4 border-t">
                        {post.author_avatar && (
                          <Image 
                            src={post.author_avatar} 
                            alt={post.author || 'Author'} 
                            width={40} 
                            height={40} 
                            className="w-10 h-10 rounded-full" 
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.publish_date)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/chia-se/all">
              <Button size="lg" className="btn-primary text-lg py-6 px-10">
                Xem tất cả bài viết
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Đăng ký nhận tin tức</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Nhận những bài viết mới nhất và thông tin độc quyền từ các chuyên gia MSC Center thẳng vào hộp thư của bạn.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex">
              <input type="email" placeholder="Nhập email của bạn" className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" required />
              <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-r-lg">Đăng ký</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}