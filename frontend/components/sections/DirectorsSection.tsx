'use client'

import { mscersData } from "@/data/mscer";
import MentorCard from "@/components/MentorCard";
import { motion } from "framer-motion";

export default function DirectorsSection() {
  // Lọc ra các giám đốc từ danh sách MSCer.
  // Đây là ví dụ, bạn có thể thay đổi logic lọc tùy theo cấu trúc dữ liệu của mình.
  const directorIds = ["pham-hoang-minh-khanh", "duong-the-khai", "quach-thanh-long"];
  const directors = mscersData.filter(mscer => directorIds.includes(mscer.id));

  // Nếu không có dữ liệu giám đốc, có thể hiển thị một thông báo hoặc trả về null.
  if (directors.length === 0) {
    return (
      <div className="container py-12 text-center text-gray-500">
        Không có dữ liệu giám đốc để hiển thị.
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            BAN CHỦ NHIỆM
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gặp gỡ những người lãnh đạo đã tạo nên MSC Center và định hướng sự phát triển của cộng đồng.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directors.map((director, index) => (
            <motion.div
              key={director.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MentorCard
                id={director.id}
                name={director.name}
                title={director.position}
                degree={director.company}
                avatar={director.avatar}
                specialties={director.skills}
                linkPrefix="mscer" // Đường dẫn sẽ là /mscer/[id]
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
