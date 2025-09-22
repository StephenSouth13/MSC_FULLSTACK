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
      name: "TS. Phan Huỳnh Anh",
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
      degree: "TLàng Kết nối Kinh doanh VABIX",
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
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-serif">
            Ban giảng huấn
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Đội ngũ giảng viên và chuyên gia hàng đầu với nhiều năm kinh nghiệm trong lĩnh vực đào tạo và phát triển
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mentors.map((mentor: any, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MentorCard {...mentor} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/mentors">
            <Button size="lg" className="btn-primary">
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
