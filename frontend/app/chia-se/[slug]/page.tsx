import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, Tag, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogPostsData, topPosts } from "@/data/blog-posts"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPostsData.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Bài viết không tồn tại - MSC Center",
    }
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPostsData.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPostsData
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3)

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/chia-se">
            <Button variant="ghost" className="hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách bài viết
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-96">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-blue-600 text-white mb-4">{post.category}</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                </div>
              </div>

              {/* Article Meta */}
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{post.author.name}</p>
                      <p className="text-sm text-gray-600">{post.author.bio}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishDate).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views.toLocaleString()} lượt xem</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes} lượt thích</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-4 w-4" />
                      <span>{post.shares} chia sẻ</span>
                    </div>
                  </div>

                  {/* Social Share */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 mr-2">Chia sẻ:</span>
                    <Button variant="outline" size="sm" className="p-2 bg-transparent">
                      <Facebook className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2 bg-transparent">
                      <Twitter className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2 bg-transparent">
                      <Linkedin className="h-4 w-4 text-blue-700" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="hover:bg-blue-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Về tác giả</h3>
                      <p className="text-gray-700 mb-4">{post.author.bio}</p>
                      <Link href="/mentors">
                        <Button variant="outline" size="sm">
                          Xem hồ sơ đầy đủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Bài viết liên quan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          width={400}
                          height={200}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 left-3 bg-blue-600 text-white">{relatedPost.category}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.readTime}</span>
                          <span>{relatedPost.views.toLocaleString()} views</span>
                        </div>
                        <Link href={`/chia-se/${relatedPost.slug}`} className="mt-3 block">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Đọc thêm
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Top Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Bài viết được xem nhiều nhất</h3>
                  <div className="space-y-4">
                    {topPosts.map((topPost, index) => (
                      <div key={topPost.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <Link href={`/chia-se/${topPost.id}`}>
                            <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-1">
                              {topPost.title}
                            </h4>
                          </Link>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Badge variant="outline" className="text-xs">
                              {topPost.category}
                            </Badge>
                            <span>{topPost.views.toLocaleString()} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-blue-50 to-teal-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Đăng ký nhận tin</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Nhận những bài viết mới nhất và insights độc quyền từ MSC Center
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email của bạn"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button className="w-full btn-primary">Đăng ký</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Chủ đề</h3>
                  <div className="space-y-2">
                    {[
                      "Leadership",
                      "Digital Marketing",
                      "Soft Skills",
                      "Project Management",
                      "Innovation",
                      "HR Management",
                    ].map((category) => (
                      <Link key={category} href={`/chia-se/category/${category.toLowerCase()}`}>
                        <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <span className="text-sm text-gray-700">{category}</span>
                          <span className="text-xs text-gray-500">12</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
