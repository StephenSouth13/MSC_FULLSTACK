"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { getMyCourses } from "@/lib/storage"
import { courses } from "@/data/courses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function MyCoursesPage() {
  const { user } = useAuth()
  if (!user) return null
  const my = getMyCourses(user.id)
  const list = courses.filter((c) => my.includes(c.id))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Khóa học của tôi</h1>
      {list.length === 0 ? (
        <div className="text-gray-600 text-sm">Chưa có khóa học nào.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <Image src={c.image} alt={c.title} width={400} height={200} className="w-full h-36 object-cover" />
              <CardHeader>
                <CardTitle className="text-base">{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">{c.duration} • {c.level}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
