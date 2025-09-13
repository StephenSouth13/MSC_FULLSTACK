"use client"
import Image from "next/image"
import Link from "next/link"

interface Mentor {
  id: string
  slug: string
  name: string
  title: string
  degree: string
  avatar: string
}

const mentors: Mentor[] = [
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

export default function MentorsSection() {
  return (
    // mt-0 để không có margin-top, pt-6 để giảm padding trên xuống còn 1.5rem
    <section className="bg-gray-50 mt-0 pt-6 pb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">BAN GIẢNG HUẤN</h2>
        <p className="text-center text-gray-600 mb-10">
          Đội ngũ trực tiếp tư vấn, thiết kế và huấn luyện cho các chương trình đào tạo và dự án tại MSC
        </p>

        {/* Các card mentor: bỏ khoảng ngang (gap-x-0) và giữ gap-y cho dọc */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-10">
          {mentors.map((m) => (
            <Link
              key={m.id}
              href={`/mentors/${m.slug}`}
              className="block text-center hover:scale-105 transition-transform"
            >
              <div className="w-36 h-36 mx-auto mb-4">
                <Image
                  src={m.avatar}
                  alt={m.name}
                  width={300}
                  height={300}
                  className="rounded-full object-cover shadow-md"
                />
              </div>
              <h3 className="text-lg font-semibold">{m.name}</h3>
              <p className="text-sm text-gray-700 mt-1">{m.title}</p>
              <p className="text-sm text-gray-500">{m.degree}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
