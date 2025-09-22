'use client'

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, Award, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Metadata có thể giữ lại hoặc chuyển sang component server nếu cần
// export const metadata: Metadata = {
//   title: "Dự án - MSC Center",
//   description: "Khám phá các dự án đào tạo và phát triển đã triển khai thành công tại MSC Center",
// }

export default function ProjectsPage() {
  // Thay thế dữ liệu mockup bằng dữ liệu dự án thực tế
  const projects = [
    {
      id: "1",
      slug:"Fdeli",
      title: "Công ty TNHH F-Deli",
      description: "Mentoring & Coaching: Chuẩn hoá quy trình làm việc toàn diện, tối ưu hóa hiệu suất và xây dựng văn hóa doanh nghiệp bền vững.",
      image: "/Projects/Fdeli.webp",
      category: "Mentoring & Coaching",
      status: "Hoàn thành",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "ThS. Đoàn Đức Minh", avatar: "/Mentors/DDM.webp" },
      ],
    },
    {
      id: "2",
      title: "Khu du lịch Happy Land",
      description: "Đào tạo và nâng cao năng lực cho đội ngũ Sales & Marketing, tập trung vào chiến lược thu hút khách hàng và kỹ năng bán hàng hiện đại.",
      image: "/Projects/Happyland.webp",
      category: "Đào tạo In-house",
      status: "Hoàn thành",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
      ],
    },
    {
      id: "3",
      title: "Einstein School HCM - ESH",
      description: "Tư vấn chiến lược tuyển sinh và đào tạo đội ngũ Sales & Marketing, giúp trường đạt được mục tiêu tăng trưởng và nhận diện thương hiệu.",
      image: "/Projects/einsteinschool.webp",
      category: "Tư vấn & Đào tạo",
      status: "Hoàn thành",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "Th.S Đoàn Đức Minh", avatar: "/Mentors/DDM.webp" },
      ],
    },
    {
      id: "4",
      title: "Công ty Tâm Châu",
      description: "Mentoring & Coaching cho đội ngũ quản lý cấp trung, tập trung vào kỹ năng quản lý dự án hiệu quả và phát triển năng lực lãnh đạo.",
      image: "/Projects/Tam-Chau.webp",
      category: "Quản lý dự án",
      status: "Đang triển khai",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
      ],
    },
    {
      id: "5",
      title: "Đôi Dép - Không thể thiếu nhau",
      description: "Dịch vụ coaching 1-1 chuyên sâu, giúp các cá nhân khai phá tiềm năng, vượt qua rào cản và đạt được các mục tiêu trong sự nghiệp và cuộc sống.",
      image: "/Projects/DoiDep.webp",
      category: "Coaching 1-1",
      status: "Đang triển khai",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
      ],
    },
    {
      id: "6",
      title: "Tập đoàn VNPT",
      description: "Tổ chức chuỗi workshop về xây dựng và phát triển văn hóa doanh nghiệp, thúc đẩy sự gắn kết và đổi mới trong toàn Tập đoàn.",
      image: "/Projects/VNPT.webp",
      category: "Workshop",
      status: "Hoàn thành",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
      ],
    },
    {
      id: "7",
      title: "Hội ngộ Kỷ lục lần thứ 38",
      description: "Đồng hành Mentoring & Coaching, nâng cao năng lực cho đội ngũ Quản lý Dự án, đảm bảo sự kiện diễn ra thành công và chuyên nghiệp.",
      image: "/Projects/hoingokyluc.webp", // Giả định tên file ảnh
      category: "Quản lý sự kiện",
      status: "Hoàn thành",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
      ],
    },
    {
      id: "8",
      title: "Viện Bách Niên Trường Thọ",
      description: "Cung cấp chương trình Mentoring & Coaching chuyên sâu cho đội ngũ Quản lý Dự án, giúp Viện xây dựng và vận hành các dự án một cách bài bản.",
      image: "/Projects/vienbachnien.webp", // Giả định tên file ảnh
      category: "Quản lý dự án",
      status: "Hoàn thành",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
      ],
    },
    {
      id: "9",
      title: "Dự án Binemo",
      description: "Đào tạo và tư vấn chiến lược cho đội ngũ Sales & Marketing của Binemo, tập trung vào việc mở rộng thị trường và tăng trưởng doanh số bền vững.",
      image: "/Projects/binemo.webp", // Giả định tên file ảnh
      category: "Sales & Marketing",
      status: "Hoàn thành",
      mentors: [
        { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
        { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
      ],
    },
  
  ]

  // Các chỉ số thống kê (có thể cập nhật cho phù hợp)
  const stats = [
    { label: "Dự án ti��u biểu", value: `${projects.length}+`, icon: CheckCircle },
    { label: "Doanh nghiệp đối tác", value: "50+", icon: Target },
    { label: "Học viên được đào tạo", value: "5,000+", icon: Users },
    { label: "Lĩnh vực đào tạo", value: "10+", icon: TrendingUp },
  ]

  // Animation variants
  const containerVariants: Variants = { // <--- THÊM KIỂU Ở ĐÂY
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = { // <--- THÊM KIỂU Ở ĐÂY
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 font-serif"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Dự án Đã Triển Khai
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Khám phá các dự án đào tạo và phát triển thực tế mà MSC Center đã triển khai, mang lại giá trị bền vững cho đối tác và học viên.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b">
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={itemVariants}>
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
                  <stat.icon className="h-10 w-10 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Các Dự Án Nổi Bật</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ các tập đoàn lớn đến những doanh nghiệp SMEs, mỗi dự án là một câu chuyện thành công.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="h-full flex flex-col group overflow-hidden border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all duration-300 rounded-2xl">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                       <Badge variant="secondary" className="absolute top-4 left-4 text-sm bg-white/90 text-black">{project.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{project.title}</CardTitle>
                    <p className="text-gray-600 mb-6 flex-grow">{project.description}</p>
                    
                    <div className="mt-auto">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Chuyên gia phụ trách:</p>
                        <div className="flex items-center space-x-2">
                           {project.mentors.map(mentor => (
                               <div key={mentor.name} className="flex items-center space-x-2">
                                   <Image src={mentor.avatar} alt={mentor.name} width={32} height={32} className="rounded-full border-2 border-white"/>
                                   <span className="text-sm text-gray-800">{mentor.name}</span>
                               </div>
                           ))}
                        </div>
                    </div>
                    <Link href={`/du-an/${project.id}`} className="mt-6">
                      <Button className="w-full btn-primary group-hover:bg-blue-700 transition-colors">
                        Xem chi tiết dự án <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container text-center">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
           >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Bạn có dự án cần triển khai?</h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Hãy để MSC Center trở thành đối tác đồng hành, thiết kế chương trình đào tạo riêng biệt và hiệu quả cho tổ chức của bạn.
              </p>
              <Link href="/lien-he">
                  <Button size="lg" className="btn-primary text-lg px-10 py-6">
                    Tư vấn giải pháp
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              </Link>
           </motion.div>
        </div>
      </section>
    </div>
  )
}
