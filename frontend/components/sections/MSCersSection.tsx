"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const MSCersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const mscers = [
    {
      id: 1,
      name: "Dương Thế Khải",
      position: "Phó Giám Đốc MSC",
      company: "MSC",
      avatar: "/MSCers/DTK.webp",
      achievement: "Tốt nghiệp và trưởng thành từ MSC",
      testimonial: "MSC Center đã giúp tôi phát triển kỹ năng lãnh đạo và tư duy chiến lược một cách toàn diện.",
    },
    {
      id: 2,
      name: "Quách Thành Long",
      position: "Trưởng phòng CNTT",
      company: "MSC",
      avatar: "/MSCers/QTL.webp",
      achievement: "Tốt nghiệp và trưởng thành từ HKDN",
      testimonial: "Những kiến thức về quản lý dự án tại MSC đã giúp tôi thành công trong vai trò Trưởng phòng CNTT.",
    },
    {
      id: 3,
      name: "Lã Phương Uyên",
      position: "Nhân sự Marketing",
      company: "MSC",
      avatar: "/MSCers/LPU.webp",
      achievement: "Tốt nghiệp và trưởng thành từ HKDN",
      testimonial: "MSC Center không chỉ dạy kiến thức mà còn giúp tôi xây dựng network chuyên nghiệp.",
    },
    {
      id: 4,
      name: "Nguyễn Ngọc Thiên Hương",
      position: "Nhân sự Marketing",
      company: "MSC",
      avatar: "/MSCers/NNTH.webp",
      achievement: "Tốt nghiệp và trưởng thành từ HKDN",
      testimonial: "Chương trình đào tạo tại MSC rất thực tế và ứng dụng được ngay vào công việc.",
    },
    {
      id: 5,
      name: "Phạm Ngọc Thuỳ Trang",
      position: "Nhân sự Marketing",
      company: "MSC",
      avatar: "/MSCers/PNTT.webp",
      achievement: "Tốt nghiệp và trưởng thành từ HKDN 2022",
      testimonial: "MSC đã trang bị cho tôi nền tảng vững chắc để phát triển sự nghiệp trong lĩnh vực tài chính.",
    },
    {
      id: 6,
      name: "Trần Hoàng Minh Thư",
      position: "Thư ký dự án",
      company: "MSC ",
      avatar: "/MSCers/THMT.webp",
      achievement: "Tốt nghiệp và trưởng thành từ HKDN 2023",
      testimonial: "Khóa học Design Thinking tại MSC đã mở ra góc nhìn mới về thiết kế và trải nghiệm người dùng.",
    },
    {
      id: 7,
      name: "Huỳnh Nguyên Quân",
      position: "Nhân sự Marketing",
      company: "Google Vietnam",
      avatar: "/MSCers/HNQ.webp",
      achievement: "Tốt nghiệp và trưởng thành từ HKDN 2024",
      testimonial: "MSC Center đã giúp tôi phát triển từ một developer thành tech leader tự tin.",
    },
    {
      id: 8,
      name: "Phan Bích Hợp",
      position: "Nhân sự Marketing",
      company: "MSC",
      avatar: "/MSCers/PBH.webp",
      achievement: "Tốt nghiệp và trưởng thành từ HKDN 2022",
      testimonial: "MSC Center đã giúp tôi phát triển từ một developer thành tech leader tự tin.",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mscers.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mscers.length) % mscers.length)
  }

  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % mscers.length
      cards.push(mscers[index])
    }
    return cards
  }

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Award className="h-8 w-8 text-teal-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif">MSCers Members</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            Những học viên xuất sắc và trưởng thành từ MSC
          </p>
          <div className="flex items-center justify-center space-x-2 text-teal-600">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-8">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-teal-600" />
            </Button>

            {/* Cards Container */}
            <div className="flex space-x-6 overflow-hidden">
              {getVisibleCards().map((mscer, index) => (
                <motion.div
                  key={`${mscer.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0"
                >
                  <Card className="w-80 h-96 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                      {/* Avatar */}
                      <div className="relative mx-auto mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 p-1">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <Image
                              src={mscer.avatar || "/placeholder.svg"}
                              alt={mscer.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-600 fill-current" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{mscer.name}</h3>
                        <p className="text-teal-600 font-medium mb-1">{mscer.position}</p>
                        <p className="text-gray-600 text-sm mb-3">{mscer.company}</p>

                        <div className="bg-teal-50 rounded-lg p-3 mb-4">
                          <p className="text-teal-700 text-sm font-medium">{mscer.achievement}</p>
                        </div>

                        <blockquote className="text-gray-600 text-sm italic leading-relaxed">
                          "{mscer.testimonial}"
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-teal-600" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {mscers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-teal-500 scale-125" : "bg-teal-200 hover:bg-teal-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MSCersSection
