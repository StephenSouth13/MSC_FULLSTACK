"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../language-provider"
import { Button } from "@/components/ui/button"
import MentorCard from "../MentorCard"

const MentorsSection = () => {
  const { t } = useLanguage()

  const mentors = [
    {
      id: "phan-huynh-anh",
      slug: "phan-huynh-anh",
      name: "Phan Huỳnh Anh",
      title: "Tiến Sĩ Kinh tế",
      degree: "Chủ tịch HĐQT Công ty Smentor",
      avatar: "/Mentors/PHA.webp",
    },
    {
      id: "hoang-cuu-long",
      slug: "hoang-cuu-long",
      name: "Hoàng Cửu Long",
      title: "Phó Giáo Sư - Tiến Sĩ",
      degree: "Giảng viên Đại học Kinh tế TP. Hồ Chí Minh",
      avatar: "/Mentors/HCL.webp",
    },
    {
      id: "doan-duc-minh",
      slug: "doan-duc-minh",
      name: "Đoàn Đức Minh",
      title: "Thạc Sĩ - Nghiên cứu sinh",
      degree: "Giảng viên Đại học Western Sydney",
      avatar: "/Mentors/DDM.webp",
    },
    {
      id: "nguyen-chi-thanh",
      slug: "nguyen-chi-thanh",
      name: "Nguyễn Chí Thành",
      title: "CEO",
      degree: "Làng Kết nối Kinh doanh VABIX",
      avatar: "/Mentors/NCT.webp",
    },
    {
      id: "le-nhat-truong-chinh",
      slug: "le-nhat-truong-chinh",
      name: "Lê Nhật Trường Chinh",
      title: "CEO & Founder",
      degree: "SUCCESS Partner Co.Ltd",
      avatar: "/Mentors/LNTC.webp",
    },
    {
      id: "phan-phat-huy",
      slug: "phan-phat-huy",
      name: "Phan Phát Huy",
      title: "CEO & Founder",
      degree: "HILTOW LANDMARK",
      avatar: "/Mentors/PPH.webp",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            BAN GIẢNG HUẤN
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Đội ngũ trực tiếp tư vấn, thiết kế và huấn luyện cho các chương trình đào tạo và dự án tại MSC
          </p>
        </motion.div>

        {/* Grid mentors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* MentorCard đã hiển thị avatar tròn, tên, title, degree */}
              <MentorCard {...mentor} />
            </motion.div>
          ))}
        </div>

        {/* Nút xem tất cả */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/mentors">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6"
            >
              Xem tất cả mentors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default MentorsSection
