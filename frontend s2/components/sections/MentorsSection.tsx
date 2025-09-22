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
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiêu đề */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">
          BAN GIẢNG HUẤN
        </h2>
        <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-14 leading-relaxed">
          Đội ngũ trực tiếp tư vấn, thiết kế và huấn luyện cho các chương trình đào tạo
          và dự án tại MSC.
        </p>

        {/* Grid mentor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 lg:gap-x-12 place-items-center">
          {mentors.map((m) => (
            <Link
              key={m.id}
              href={`/mentors/${m.slug}`}
              className="group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              {/* Ảnh to và đổ bóng xịn */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
                <Image
                  src={m.avatar}
                  alt={m.name}
                  fill
                  sizes="(max-width:768px) 192px, 224px"
                  className="rounded-full object-cover shadow-2xl ring-4 ring-white group-hover:ring-indigo-300 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{m.name}</h3>
              <p className="text-md text-indigo-600 mt-1">{m.title}</p>
              <p className="text-sm text-gray-600 mt-0.5">{m.degree}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
