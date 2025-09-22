"use client"

import Link from "next/link"
import { Eye, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { topPosts } from "@/data/blog-posts"

export default function TopPostsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <span>Bài viết được xem nhiều nhất</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div key={post.id} className="flex items-start space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">{index + 1}</span>
              </div>
              <div className="flex-1">
                <Link href={`/chia-se/${post.id}`}>
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                    {post.title}
                  </h4>
                </Link>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Eye className="h-3 w-3" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
