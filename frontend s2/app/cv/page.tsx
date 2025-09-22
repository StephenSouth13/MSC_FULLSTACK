import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Download, Eye, Star, Award, Briefcase, GraduationCap, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Hồ sơ năng lực - MSC Center",
  description: "Tạo và quản lý hồ sơ năng lực chuyên nghiệp với MSC Center",
}

export default function CVPage() {
  const cvTemplates = [
    {
      id: "executive-modern",
      name: "Executive Modern",
      description: "Template chuyên nghiệp cho các vị trí lãnh đạo và quản lý cấp cao",
      image: "/placeholder.svg?height=400&width=300&text=Executive+Modern+CV",
      category: "Leadership",
      downloads: "2,847",
      rating: 4.9,
      features: ["ATS-friendly", "Modern Design", "Executive Focus", "2 Pages"],
      suitable: ["CEO", "Director", "VP", "Senior Manager"],
    },
    {
      id: "creative-designer",
      name: "Creative Designer",
      description: "Template sáng tạo dành cho các vị trí thiết kế và marketing",
      image: "/placeholder.svg?height=400&width=300&text=Creative+Designer+CV",
      category: "Creative",
      downloads: "1,923",
      rating: 4.8,
      features: ["Visual Impact", "Portfolio Section", "Color Scheme", "Creative Layout"],
      suitable: ["Designer", "Marketer", "Creative Director", "Brand Manager"],
    },
    {
      id: "tech-professional",
      name: "Tech Professional",
      description: "Template tối ưu cho các vị trí công nghệ và kỹ thuật",
      image: "/placeholder.svg?height=400&width=300&text=Tech+Professional+CV",
      category: "Technology",
      downloads: "3,156",
      rating: 4.9,
      features: ["Skills Matrix", "Project Showcase", "Clean Code", "Technical Focus"],
      suitable: ["Developer", "Engineer", "Tech Lead", "Data Scientist"],
    },
    {
      id: "business-analyst",
      name: "Business Analyst",
      description: "Template chuyên biệt cho các vị trí phân tích và tư vấn kinh doanh",
      image: "/placeholder.svg?height=400&width=300&text=Business+Analyst+CV",
      category: "Business",
      downloads: "2,234",
      rating: 4.7,
      features: ["Data Visualization", "Achievement Focus", "Professional", "Metrics Driven"],
      suitable: ["Business Analyst", "Consultant", "Project Manager", "Strategy Manager"],
    },
    {
      id: "fresh-graduate",
      name: "Fresh Graduate",
      description: "Template dành cho sinh viên mới tốt nghiệp và người mới vào nghề",
      image: "/placeholder.svg?height=400&width=300&text=Fresh+Graduate+CV",
      category: "Entry Level",
      downloads: "4,567",
      rating: 4.6,
      features: ["Education Focus", "Skills Highlight", "Clean Layout", "Entry Level"],
      suitable: ["Graduate", "Intern", "Junior", "Entry Level"],
    },
    {
      id: "sales-marketing",
      name: "Sales & Marketing",
      description: "Template năng động cho các vị trí bán hàng và marketing",
      image: "/placeholder.svg?height=400&width=300&text=Sales+Marketing+CV",
      category: "Sales",
      downloads: "2,789",
      rating: 4.8,
      features: ["Results Oriented", "Dynamic Design", "Achievement Focus", "Sales Metrics"],
      suitable: ["Sales Manager", "Marketing Manager", "Account Manager", "BD Manager"],
    },
  ]

  const cvServices = [
    {
      title: "CV Review & Feedback",
      description: "Chuyên gia MSC Center sẽ review và đưa ra feedback chi tiết cho CV của bạn",
      price: "500,000 VNĐ",
      duration: "2-3 ngày",
      features: [
        "Review toàn diện CV hiện tại",
        "Feedback chi tiết từ HR experts",
        "Gợi ý cải thiện cụ thể",
        "ATS optimization tips",
      ],
      icon: Eye,
    },
    {
      title: "CV Writing Service",
      description: "Dịch vụ viết CV chuyên nghiệp từ đầu với sự hỗ trợ của chuyên gia",
      price: "1,500,000 VNĐ",
      duration: "5-7 ngày",
      features: ["Consultation 1-on-1", "CV hoàn toàn mới", "2 rounds revision", "LinkedIn profile optimization"],
      icon: User,
    },
    {
      title: "Interview Coaching",
      description: "Coaching chuẩn bị phỏng vấn với mock interviews và feedback",
      price: "1,200,000 VNĐ",
      duration: "3 sessions",
      features: [
        "3 sessions mock interview",
        "Behavioral questions practice",
        "Industry-specific preparation",
        "Confidence building techniques",
      ],
      icon: Award,
    },
    {
      title: "Career Consultation",
      description: "Tư vấn định hướng nghề nghiệp và lập kế hoạch phát triển sự nghiệp",
      price: "2,000,000 VNĐ",
      duration: "2 sessions",
      features: ["Career assessment", "Industry insights", "Career roadmap planning", "Skill gap analysis"],
      icon: Briefcase,
    },
  ]

  const successStories = [
    {
      name: "Nguyễn Minh Tú",
      position: "Senior Trưởng phòng CNTT",
      company: "Grab Vietnam",
      avatar: "/placeholder.svg?height=60&width=60&text=Tu",
      story:
        "Sau khi sử dụng dịch vụ CV Writing của MSC, tôi đã nhận được 5 lời mời phỏng vấn trong vòng 2 tuần và cuối cùng được nhận vào vị trí mơ ước tại Grab.",
      salaryIncrease: "+150%",
      timeToJob: "3 tuần",
    },
    {
      name: "Trần Thị Hoa",
      position: "Marketing Director",
      company: "Unilever Vietnam",
      avatar: "/placeholder.svg?height=60&width=60&text=Hoa",
      story:
        "CV template Executive Modern và dịch vụ Interview Coaching đã giúp tôi tự tin hơn và thành công trong việc chuyển đổi sang vai trò Director.",
      salaryIncrease: "+200%",
      timeToJob: "1 tháng",
    },
    {
      name: "Lê Văn Nam",
      position: "Tech Lead",
      company: "FPT Software",
      avatar: "/placeholder.svg?height=60&width=60&text=Nam",
      story:
        "Template Tech Professional và Career Consultation đã giúp tôi định hướng rõ ràng và thăng tiến từ Senior Developer lên Tech Lead.",
      salaryIncrease: "+80%",
      timeToJob: "2 tuần",
    },
  ]

  const stats = [
    { label: "CV Templates", value: "50+", icon: GraduationCap },
    { label: "Successful Placements", value: "2,000+", icon: Briefcase },
    { label: "Average Salary Increase", value: "+120%", icon: Star },
    { label: "Success Rate", value: "95%", icon: Award },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">Hồ sơ Năng lực Chuyên nghiệp</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Tạo CV ấn tượng và nhận được công việc mơ ước với sự hỗ trợ từ các chuyên gia HR hàng đầu tại MSC Center
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                Tạo CV miễn phí
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                Xem templates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CV Templates */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">CV Templates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chọn từ bộ sưu tập templates CV chuyên nghiệp được thiết kế bởi các chuyên gia HR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cvTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {template.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{template.rating}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{template.description}</p>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Tính năng:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Phù hợp với:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.suitable.slice(0, 2).map((role, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{template.downloads} downloads</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 btn-primary text-sm">Tải xuống</Button>
                    <Button variant="outline" className="bg-transparent text-sm">
                      Xem trước
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CV Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Dịch vụ CV chuyên nghiệp</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nhận sự hỗ trợ từ các chuyên gia HR để tối ưu hóa CV và tăng cơ hội được tuyển dụng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cvServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">{service.price}</span>
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Bao gồm:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <Link href="/lien-he" className="flex-1">
                      <Button className="w-full btn-primary">Đặt dịch vụ</Button>
                    </Link>
                    <Button variant="outline" className="bg-transparent">
                      Chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Câu chuyện thành công</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những thành công thực tế từ các khách hàng đã sử dụng dịch vụ CV của MSC Center
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={story.avatar || "/placeholder.svg"}
                      alt={story.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{story.name}</h3>
                      <p className="text-blue-600 font-medium text-sm">{story.position}</p>
                      <p className="text-gray-600 text-sm">{story.company}</p>
                    </div>
                  </div>

                  <blockquote className="text-gray-600 italic mb-4 leading-relaxed">"{story.story}"</blockquote>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-700">{story.salaryIncrease}</div>
                      <div className="text-xs text-green-600">Tăng lương</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{story.timeToJob}</div>
                      <div className="text-xs text-blue-600">Thời gian</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Sẵn sàng tạo CV ấn tượng?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Bắt đầu hành trình tìm kiếm công việc mơ ước với CV chuyên nghiệp từ MSC Center
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
              Tạo CV ngay
            </Button>
            <Link href="/lien-he">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                Tư vấn miễn phí
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
