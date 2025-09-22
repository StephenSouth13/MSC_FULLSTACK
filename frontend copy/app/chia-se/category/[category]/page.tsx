import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogPostsData } from "@/data/blog-posts"
import TopPostsWidget from "@/components/sections/TopPostsWidget"

interface Props {
  params: { category: string }
}

const categoryNames: Record<string, string> = {
  leadership: "Leadership",
  "soft skills": "Soft Skills",
  "digital marketing": "Digital Marketing",
  "project management": "Project Management",
  innovation: "Innovation",
  "hr management": "HR Management",
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = categoryNames[params.category.toLowerCase()]

  if (!categoryName) {
    return {
      title: "Danh mục không tồn tại - MSC Center",
    }
  }

  return {
    title: `${categoryName} - Bài viết và chia sẻ | MSC Center`,
    description: `Khám phá các bài viết về ${categoryName} từ các chuyên gia tại MSC Center`,
  }
}

export default function CategoryPage({ params }: Props) {
  const categoryName = categoryNames[params.category.toLowerCase()]

  if (!categoryName) {
    notFound()
  }

  const categoryPosts = blogPostsData.filter((post) => post.category.toLowerCase() === categoryName.toLowerCase())

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/chia-se">
            <Button variant="ghost" className="hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại tất cả bài viết
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">{categoryName}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {categoryPosts.length} bài viết về {categoryName} từ các chuyên gia MSC Center
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {categoryPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">{post.category}</Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center space-x-2 mb-4">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(post.publishDate).toLocaleDateString("vi-VN")}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>

                      <Link href={`/chia-se/${post.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-blue-700 group-hover:text-white group-hover:border-blue-700 transition-all duration-300 bg-transparent"
                        >
                          Đọc thêm
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Chưa có bài viết nào trong danh mục này.</p>
                <Link href="/chia-se">
                  <Button className="mt-4 btn-primary">Xem tất cả bài viết</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TopPostsWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
