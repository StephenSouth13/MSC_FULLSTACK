'use client'

import { mscersData } from "@/data/mscer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function DirectorsSection() {
  const directorIds = ["duong-the-khai", "pham-hoang-minh-khanh", "quach-thanh-long"]
  const directors = mscersData.filter(m => directorIds.includes(m.id))

  return (
    // bg-gray-100: xám nhạt, py-16: padding top/bottom, mt-0: sát section trên
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">BAN CHỦ NHIỆM</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Là đội ngũ nòng cốt chịu trách nhiệm vận hành và phát triển Trung tâm MSC.
            Ban Chủ Nhiệm đóng vai trò điều phối toàn diện các dự án, kết nối nguồn lực
            và đảm bảo MSC hoạt động hiệu quả, đúng định hướng.
          </p>
        </motion.div>

        {/* Avatar tròn lớn + tên + chức danh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-12 place-items-center">
          {directors.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <Link href={`/mscer/${d.id}`}>
                <Image
                  src={d.avatar}
                  alt={d.name}
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-gray-200 shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{d.name}</h3>
              <p className="text-gray-600">{d.position}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
