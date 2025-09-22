//app/mentors/page.tsx
'use client'

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Users, BookOpen, ChevronRight, GraduationCap, Briefcase, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"; 

export default function MentorsPage() {
  const [activeTab, setActiveTab] = useState('faculty')

  const faculty = [
    {
      id: "phan-huynh-anh",
      name: "Phan Huỳnh Anh",
      title: "Tiến Sĩ Kinh tế",
      description: "Chủ tịch HĐQT Công ty Smentor",
      avatar: "/Mentors/PHA.webp",
  
    },
    {
      id: "hoang-cuu-long",
      name: "Hoàng Cửu Long",
      title: "Phó Giáo Sư - Tiến Sĩ",
      description: "Giảng viên Đại học Kinh tế TP. Hồ Chí Minh",
      avatar: "/Mentors/HCL.webp",
      specialties: ["Kinh tế học", "Nghiên cứu thị trường", "Phân tích chính sách"],
    },
    {
      id: "doan-duc-minh",
      name: "Đoàn Đức Minh",
      title: "Thạc Sĩ - Nghiên cứu sinh",
      description: "Giảng viên Đại học Western Sydney",
      avatar: "/Mentors/DDM.webp",
      specialties: ["Quản trị kinh doanh", "Marketing quốc tế", "Giáo dục đại học"],
    },
    {
      id: "nguyen-chi-thanh",
      name: "Nguyễn Chí Thành",
      title: "CEO",
      description: "Làng Kết nối Kinh doanh VABIX",
      avatar: "/Mentors/NCT.webp",
      specialties: ["Kết nối kinh doanh", "Xây dựng hệ sinh thái", "Khởi nghiệp"],
    },
    {
      id: "le-nhat-truong-chinh",
      name: "Lê Nhật Trường Chinh",
      title: "CEO & Founder",
      description: "SUCCESS Partner Co.Ltd",
      avatar: "/Mentors/LNTC.webp",
      specialties: ["Tư vấn chiến lược", "Phát triển đối tác", "Tối ưu vận hành"],
    },
    {
      id: "phan-phat-huy",
      name: "Phan Phát Huy",
      title: "CEO & Founder",
      description: "HILTOW LANDMARK",
      avatar: "/Mentors/PPH.webp",
      specialties: ["Quản lý bất động sản", "Phát triển dự án", "Đầu tư"],
    },
  ]
  
  const teachingMethods = {
    title: "Phương pháp giảng huấn độc đáo",
    description: "Chúng tôi áp dụng mô hình đào tạo 70-20-10, kết hợp lý thuyết, thực hành và học hỏi qua trải nghiệm thực tế để đảm bảo hiệu quả cao nhất.",
    points: [
      {
        icon: GraduationCap,
        title: "10% - Học tập chính quy (Formal Learning)",
        text: "Nắm vững kiến thức nền tảng và các mô hình tiên tiến nhất thông qua các bài giảng, hội thảo từ các chuyên gia hàng đầu.",
      },
      {
        icon: Users,
        title: "20% - Học hỏi xã hội (Social Learning)",
        text: "Tương tác, thảo luận và học hỏi từ các cố vấn (mentors) và các học viên khác trong cộng đồng MSCer ưu tú.",
      },
      {
        icon: Briefcase,
        title: "70% - Học qua trải nghiệm (Experiential Learning)",
        text: "Áp dụng kiến thức trực tiếp vào các dự án thực tế, case study, và các tình huống mô phỏng để giải quyết vấn đề và phát triển kỹ năng.",
      }
    ]
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    // Nền tổng thể của trang
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <Users className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Ban Giảng Huấn </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Gặp gỡ đội ngũ chuyên gia, những người thầy tâm huyết sẽ đồng hành và dẫn dắt bạn trên hành trình chinh phục những đỉnh cao mới.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      {/* Sticky tab cần có nền mờ trong dark mode để hòa hợp */}
      <section className="sticky top-[79px] bg-white/80 backdrop-blur-lg z-30 border-b shadow-sm dark:bg-gray-800/80 dark:border-gray-700">
        <div className="container">
          <div className="flex justify-center items-center space-x-2 md:space-x-4 py-4">
            {/* Nút phương pháp */}
            <Button
              onClick={() => setActiveTab('methods')}
              variant={activeTab === 'methods' ? 'default' : 'ghost'}
              className={`transition-all duration-300 rounded-full px-4 md:px-6 
                          ${activeTab === 'methods' ? 'btn-primary' : 'dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              <BookOpen className="mr-2 h-4 w-4" /> Phương pháp
            </Button>
            {/* Nút ban giảng huấn */}
            <Button
              onClick={() => setActiveTab('faculty')}
              variant={activeTab === 'faculty' ? 'default' : 'ghost'}
              className={`transition-all duration-300 rounded-full px-4 md:px-6 
                          ${activeTab === 'faculty' ? 'btn-primary' : 'dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              <Users className="mr-2 h-4 w-4" /> Ban Giảng Huấn
            </Button>
            {/* Nút nhân sự kế thừa */}
            <Button
              onClick={() => setActiveTab('successors')}
              variant={activeTab === 'successors' ? 'default' : 'ghost'}
              className={`transition-all duration-300 rounded-full px-4 md:px-6 
                          ${activeTab === 'successors' ? 'btn-primary' : 'dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              <Sparkles className="mr-2 h-4 w-4" /> Nhân sự Kế thừa
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="py-24 bg-gray-50 dark:bg-gray-900"> {/* Nền main content */}
        <div className="container">
          <AnimatePresence mode="wait">
            {activeTab === 'faculty' && (
              <motion.div
                key="faculty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {faculty.map((mentor) => (
                    <motion.div key={mentor.id} variants={itemVariants}>
                      <Card 
                        className="h-full flex flex-col group overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl text-center border hover:-translate-y-2
                                   dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500" // Card trong dark mode
                      >
                        <CardContent className="p-8 flex flex-col flex-grow items-center">
                          <Image
                            src={mentor.avatar}
                            alt={mentor.name}
                            width={160}
                            height={160}
                            className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-lg mb-6 dark:border-gray-700" // Border ảnh mentor
                          />
                          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{mentor.name}</CardTitle> {/* Tên mentor */}
                          <Badge 
                            variant="secondary" 
                            className="my-3 text-sm bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200" // Badge title
                          >
                            {mentor.title}
                          </Badge>
                          <p className="text-gray-600 mb-6 flex-grow dark:text-gray-300">{mentor.description}</p> {/* Mô tả mentor */}
                          <div className="mt-auto w-full">
                            <Link href={`/mentors/${mentor.id}`}>
                              <Button 
                                variant="outline" 
                                className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors
                                           dark:text-white dark:border-gray-600 dark:hover:bg-blue-700" // Nút xem hồ sơ
                              >
                                Xem Hồ Sơ <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'methods' && (
               <motion.div
                key="methods"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                  <div className="text-center mb-12">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-serif">{teachingMethods.title}</h2> {/* Tiêu đề phương pháp */}
                      <p className="text-xl text-gray-600 dark:text-gray-300">{teachingMethods.description}</p> {/* Mô tả phương pháp */}
                  </div>
                  <motion.div 
                    className="space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                      {teachingMethods.points.map((point, index) => (
                          <motion.div key={index} variants={itemVariants}>
                              <Card 
                                className="p-8 flex items-start space-x-6 bg-white shadow-lg rounded-2xl
                                           dark:bg-gray-800 dark:border-gray-700" // Card phương pháp
                              >
                                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center">
                                      <point.icon className="w-8 h-8 text-white"/>
                                  </div>
                                  <div>
                                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{point.title}</h3> {/* Tiêu đề điểm */}
                                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{point.text}</p> {/* Mô tả điểm */}
                                  </div>
                              </Card>
                          </motion.div>
                      ))}
                  </motion.div>
              </motion.div>
            )}

            {activeTab === 'successors' && (
              <motion.div
                key="successors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                  <Sparkles className="mx-auto h-16 w-16 text-yellow-500 mb-6 dark:text-yellow-400"/> {/* Icon Sparkles */}
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-serif">Nhân sự Kế thừa</h2> {/* Tiêu đề */}
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"> {/* Mô tả */}
                    Nội dung về chương trình "Nhân sự Kế thừa" đang được chúng tôi xây dựng và sẽ sớm ra mắt. Đây là chương trình chiến lược nhằm phát hiện, đào tạo và phát triển những tài năng trẻ để trở thành thế hệ lãnh đạo tiếp theo cho MSC và các doanh nghiệp đối tác.
                  </p>
                  <Link href="/lien-he" className="mt-8 inline-block">
                    <Button size="lg" className="btn-primary">Tìm hiểu thêm</Button> {/* Nút chính giữ nguyên */}
                  </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-800"> {/* Nền CTA */}
        <div className="container text-center">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
           >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-serif">Sẵn sàng nâng tầm sự nghiệp?</h2> {/* Tiêu đề CTA */}
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto dark:text-gray-300"> {/* Mô tả CTA */}
                Hãy để đội ngũ chuyên gia của MSC Center đồng hành cùng bạn. Khám phá các khóa học phù hợp hoặc liên hệ để được tư vấn trực tiếp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dao-tao">
                    <Button size="lg" className="btn-primary text-lg px-10 py-6">
                      Khám phá các khóa học
                    </Button>
                </Link>
                <Link href="/lien-he">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-10 py-6 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700" // Nút outline CTA
                  >
                    Liên hệ tư vấn
                  </Button>
                </Link>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
  )
}