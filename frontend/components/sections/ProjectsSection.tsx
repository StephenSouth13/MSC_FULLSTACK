"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../language-provider"
import { Button } from "@/components/ui/button"
import ProjectCard from "../ProjectCard"

const ProjectsSection = () => {
  const { t } = useLanguage()

  const projects = [
  {
    id: "1",
    slug:"Fdeli",
    title: "🛠️ Dự án: Công ty TNHH F Deli",
    description: "👉Mentoring & Coaching: Chuẩn hoá quy trình làm việc.",
    instructors: "🧑‍🏫 Ban Giảng Huấn: Phan Huỳnh Anh & MSC Teams",
    image: "/Projects/Fdeli.webp",
    category: "Mentoring",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "ThS. Đoàn Đức Minh", avatar: "/Mentors/DDM.webp" },
    ],
  },
  {
    id: "2",
    title: "🛠️ Dự án: Khu du lịch Happy Land",
    description: "🎯 Đào tạo đội ngũ Sales & Marketing, nâng cao kỹ năng giao tiếp, bán hàng và chăm sóc khách hàng trong môi trường du lịch chuyên nghiệp.",
    instructors: "🧑‍🏫 Ban Giảng Huấn: Phan Huỳnh Anh & MSC Teams",
    image: "/Projects/Happyland.webp",
    category: "Mentoring, Training",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
    ],
  },
  {
    id: "3",
    title: "🛠️ Dự án: Einstein School HCM - ESH",
    description: "🎯 Đào tạo đội ngũ Sales & Marketing và tư vấn tuyển sinh, xây dựng chiến lược truyền thông và chăm sóc phụ huynh chuyên sâu.",
    instructors: "🧑‍🏫 Ban Giảng Huấn: Phan Huỳnh Anh & Đoàn Đức Minh",
    image: "/Projects/einsteinschool.webp",
    category: "Giáo dục",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "Th.S Đoàn Đức Minh", avatar: "/Mentors/DDM.webp" },
    ],
  },
  {
    id: "4",
    title: "🛠️ Dự án: Tâm Châu",
    description: "🎯 Phát triển năng lực đội ngũ quản lý dự án thông qua huấn luyện thực tiễn và định hướng tư duy lãnh đạo chiến lược.",
    instructors: "🧑‍🏫 Ban Giảng Huấn: Phan Huỳnh Anh & MSCer Team",
    image: "/Projects/Tam-Chau.webp",
    category: "Quản lý dự án",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "MSC Teams", avatar: "/MSCers/mscteam.webp" },
    ],
  },
  {
    id: "5",
    title: "🛠️ Dự án: Đôi Dép - Không thể thiếu nhau",
    description: "🎯 Chương trình coaching cá nhân hoá giúp từng thành viên tìm lại mục tiêu, giá trị cốt lõi và phát triển năng lực quản trị cảm xúc.",
    instructors: "🧑‍🏫 Ban Giảng Huấn: Phan Huỳnh Anh & Trần Lê Bảo Châu",
    image: "/Projects/DoiDep.webp",
    category: "Coaching",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "Trần Lê Bảo Châu", avatar: "/Mentors/TLBC.webp" },
    ],
  },
  {
    id: "6",
    title: "🛠️ Dự án: VNPT",
    description: "🎯 Xây dựng và lan toả văn hoá doanh nghiệp tích cực, thúc đẩy hiệu suất làm việc v�� tinh thần đồng đội qua chuỗi hội thảo & mentoring.",
    instructors: "🧑‍🏫 Ban Giảng Huấn: Phan Huỳnh Anh & Nguyễn Chí Thành",
    image: "/Projects/VNPT.webp",
    category: "Workshop",
    mentors: [
      { name: "TS. Phan Huỳnh Anh", avatar: "/Mentors/PHA.webp" },
      { name: "Nguyễn Chí Thành", avatar: "/Mentors/NCT.webp" },
    ],
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
            Dự án đã triển khai
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Khám phá các dự án đào tạo và phát triển kỹ năng chuyên nghiệp mà MSC Center đã và đang triển khai.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
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
          <Link href="/du-an">
            <Button size="lg" className="btn-primary">
              Xem tất cả dự án
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
