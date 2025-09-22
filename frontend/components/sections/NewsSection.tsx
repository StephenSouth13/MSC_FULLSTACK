"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../language-provider"
import { Button } from "@/components/ui/button"
import BlogCard from "../BlogCard"

const NewsSection = () => {
  const { t } = useLanguage()

  const blogPosts = [
    {
      id: "1",
      title: "Muốn phát triển liên tục - Phải có Kaizen!",
      excerpt:
        "Kaizen là triết lý cải tiến liên tục, giúp doanh nghiệp luôn đổi mới và nâng cao chất lượng.",
      image: "/News/kaizen.webp",
      author: "Dương Thế Khải",
      publishDate: "15/01/2025",
      category: "Kỹ năng mềm",
      readTime: "5 phút đọc",
    },
    {
      id: "2",
      title: "IKIGAI – Tìm ra lẽ sống của cuộc đời bạn",
      excerpt:
        "Khám phá ý nghĩa cuộc sống và cách Ikigai giúp bạn đạt được sự cân bằng trong công việc và đam mê.",
      image: "/News/ikigai.webp",
      author: "TS Phan Huỳnh Anh",
      publishDate: "12/01/2025",
      category: "Coaching",
      readTime: "7 phút đọc",
    },
    {
      id: "3",
      title: "Trainer - Coach - Mentor khác nhau như thế nào?",
      excerpt:
        "Hiểu rõ vai trò và giá trị của từng hình thức hỗ trợ phát triển cá nhân và nghề nghiệp.",
      image: "/News/trainer-mentor-coach.webp",
      author: "TS. Phan Huỳnh Anh",
      publishDate: "10/01/2025",
      category: "Xu hướng",
      readTime: "6 phút đọc",
    },
    {
      id: "4",
      title: "ASK - Mô hình đánh giá năng lực chuẩn quốc tế",
      excerpt:
        "Đo lường năng lực nhân sự hiệu quả với mô hình ASK: Attitude, Skills, Knowledge.",
      image: "/News/ASK.webp",
      author: "TS. Phan Huỳnh Anh",
      publishDate: "10/01/2025",
      category: "Xu hướng",
      readTime: "6 phút đọc",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-serif">
            Tin tức & Chia sẻ
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cập nhật những thông tin mới nhất về đào tạo, phát triển kỹ năng và chia sẻ kinh nghiệm từ các chuyên gia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogCard {...post} />
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
          <Link href="/chia-se">
            <Button size="lg" className="btn-primary">
              Xem tất cả tin tức
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsSection
