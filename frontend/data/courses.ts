export type Course = {
  id: string
  title: string
  duration: string
  level: string
  price: number
  image: string
  description: string
}

export const courses: Course[] = [
  {
    id: "leadership",
    title: "Leadership & Management Excellence",
    duration: "3 tháng",
    level: "Nâng cao",
    price: 15000000,
    image: "/dao-tao/leadership.webp",
    description:
      "Chương trình phát triển kỹ năng lãnh đạo toàn diện cho các nhà quản lý cấp trung và cao.",
  },
  {
    id: "project-management",
    title: "Project Management Professional (PMP)",
    duration: "4 tháng",
    level: "Chuyên nghiệp",
    price: 18000000,
    image: "/dao-tao/PMP.webp",
    description:
      "Khóa học chuẩn bị cho chứng chỉ PMP với phương pháp Agile và Scrum hiện đại.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Mastery",
    duration: "2.5 tháng",
    level: "Cơ bản đến Nâng cao",
    price: 12000000,
    image: "/dao-tao/digitalmarketing.webp",
    description:
      "Làm chủ marketing số từ cơ bản đến nâng cao với các case study thực tế.",
  },
]

export function formatCurrency(v: number) {
  return v.toLocaleString("vi-VN") + " VNĐ"
}
