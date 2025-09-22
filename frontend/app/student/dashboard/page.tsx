"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { useCart } from "@/components/cart/CartProvider"
import { courses, formatCurrency } from "@/data/courses"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function StudentDashboard() {
  const { user } = useAuth()
  const { items } = useCart()

  const recommended = courses.slice(0, 3)

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Chào mừng {user?.name}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Tiếp tục học</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">Bạn chưa có khóa học nào. Thêm vào giỏ và thanh toán để bắt đầu.</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Giỏ hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-sm text-gray-600">Giỏ hàng trống. <Link className="text-blue-600" href="/dao-tao">Xem khóa học</Link></div>
          ) : (
            <Link href="/cart"><Button>Xem giỏ hàng</Button></Link>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Gợi ý cho bạn</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <Image src={c.image} alt={c.title} width={400} height={200} className="w-full h-36 object-cover" />
              <CardHeader>
                <CardTitle className="text-base">{c.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-sm font-semibold">{formatCurrency(c.price)}</div>
                <Link href={`/dao-tao/${c.id}`}>
                  <Button variant="outline" size="sm">Chi tiết</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
