"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { courses, formatCurrency } from "@/data/courses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AddToCartButton from "@/components/cart/AddToCartButton"

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const course = courses.find((c) => c.id === params.id)

  if (!course) {
    if (typeof window !== "undefined") router.replace("/dao-tao")
    return null
  }

  return (
    <div className="container py-10 grid lg:grid-cols-[1fr_360px] gap-8">
      <Card className="overflow-hidden">
        <Image src={course.image} alt={course.title} width={1000} height={560} className="w-full h-64 object-cover" />
        <CardHeader>
          <CardTitle className="text-2xl">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="text-sm text-gray-600">Thời lượng: {course.duration} • Trình độ: {course.level}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Đăng ký khóa học</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold">{formatCurrency(course.price)}</div>
          <AddToCartButton courseId={course.id} className="w-full" />
          <Button variant="outline" className="w-full" onClick={() => router.push("/checkout")}>Thanh toán ngay</Button>
        </CardContent>
      </Card>
    </div>
  )
}
