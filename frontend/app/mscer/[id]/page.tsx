import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Award, TrendingUp, Users, Star, Calendar, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mscersData } from "@/data/mscer"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mscer = mscersData.find((m) => m.id === params.id)

  if (!mscer) {
    return {
      title: "MSCer không tồn tại - MSC Center",
    }
  }

  return {
    title: `${mscer.name} - ${mscer.position} | MSC Center`,
    description: mscer.testimonial,
    keywords: mscer.skills.join(", "),
  }
}

export default function MSCerDetailPage({ params }: Props) {
  const mscer = mscersData.find((m) => m.id === params.id)

  if (!mscer) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/mscer">
            <Button variant="ghost" className="hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại cộng đồng MSCer
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="relative mx-auto mb-4 w-32 h-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full p-1">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <Image
                          src={mscer.avatar || "/placeholder.svg"}
                          alt={mscer.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-600 fill-current" />
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{mscer.name}</h1>
                  <p className="text-blue-600 font-medium mb-1">{mscer.position}</p>
                  <p className="text-sm text-gray-600 mb-4">{mscer.company}</p>

                  <Badge className="bg-yellow-100 text-yellow-800 mb-4">{mscer.achievement}</Badge>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-700">{mscer.currentSalary}</div>
                    <div className="text-xs text-green-600">Mức lương hiện tại</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-700">{mscer.graduationYear}</div>
                    <div className="text-xs text-blue-600">Tốt nghiệp MSC</div>
                  </div>
                </div>

                {/* Promotion */}
                <div className="mb-6 p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Thăng tiến</span>
                  </div>
                  <p className="text-xs text-orange-700">{mscer.promotion}</p>
                </div>

                {/* Social Impact */}
                <div className="mb-6 p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Tác động</span>
                  </div>
                  <p className="text-xs text-purple-700">{mscer.socialImpact}</p>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Link href="/lien-he">
                    <Button className="w-full btn-primary">Kết nối với {mscer.name.split(" ").pop()}</Button>
                  </Link>
                  <Link href="/dao-tao">
                    <Button variant="outline" className="w-full bg-transparent">
                      Tham gia MSC Center
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Success Story */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span>Câu chuyện thành công</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="text-lg text-gray-700 italic leading-relaxed border-l-4 border-blue-200 pl-6">
                  "{mscer.testimonial}"
                </blockquote>
              </CardContent>
            </Card>

            {/* Background */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span>Thông tin cá nhân</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Học vấn</h4>
                    <p className="text-gray-700">{mscer.background.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vị trí trước đây</h4>
                    <p className="text-gray-700">{mscer.background.previousRole}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-2">Kinh nghiệm</h4>
                    <p className="text-gray-700">{mscer.background.experience}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MSC Journey */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Hành trình tại MSC Center</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Khóa học tham gia</h4>
                      <p className="text-blue-600 font-medium">{mscer.course}</p>
                      <p className="text-sm text-gray-600">Tốt nghiệp năm {mscer.graduationYear}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Thành tích đạt được</h4>
                      <p className="text-gray-700">{mscer.achievement}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Kỹ năng chính</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mscer.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span>Thành tựu nổi bật</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mscer.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Mentoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Đóng góp cho cộng đồng</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{mscer.mentoring}</p>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-50 to-teal-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Bạn cũng muốn thành công như {mscer.name.split(" ").pop()}?
                </h3>
                <p className="text-gray-700 mb-6">
                  Tham gia MSC Center và bắt đầu hành trình phát triển sự nghiệp của bạn ngay hôm nay
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dao-tao">
                    <Button size="lg" className="btn-primary">
                      Khám phá khóa học
                    </Button>
                  </Link>
                  <Link href="/lien-he">
                    <Button size="lg" variant="outline" className="bg-transparent">
                      Tư vấn miễn phí
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
