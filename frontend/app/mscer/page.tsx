'use client' //app/mscer/page.tsx

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, Award, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MSCerPage() {
  const mscers = [
    {
      id: "pham-hoang-minh-khanh",
      name: "Phạm Hoàng Minh Khánh",
      position: "Giám Đốc",
      company: "Trung tâm MSC",
      avatar: "/MSCers/PHMK.webp",
      testimonial: "MSC là nơi tôi không chỉ học hỏi mà còn trưởng thành. Môi trường năng động đã giúp tôi định hình con đường sự nghiệp của mình.",
      skills: ["Lãnh đạo chiến lược", "Phát triển kinh doanh", "Quản lý giáo dục"],
    },
    {
      id: "duong-the-khai",
      name: "Dương Thế Khải",
      position: "Phó Giám Đốc",
      company: "Trung tâm MSC",
      avatar: "/MSCers/DTK.webp",
      testimonial: "Với những kiến thức từ MSC, tôi tự tin trong việc mở rộng mạng lưới đối tác và thúc đẩy sự tăng trưởng bền vững cho tổ chức.",
      skills: ["Phát triển đối tác", "Vận hành", "Quản lý đội nhóm"],
    },
    {
      id: "quach-thanh-long",
      name: "Quách Thành Long",
      position: "Trưởng phòng CNTT",
      company: "Trung tâm MSC",
      avatar: "/MSCers/QTL.webp",
      testimonial: "Từ những khóa học đầu tiên, tôi đã tìm thấy đam mê công nghệ. MSC đã cho tôi cơ hội để biến đam mê đó thành sự nghiệp.",
      skills: ["Quản lý dự án", "Phát triển sản phẩm", "Lãnh đạo kỹ thuật"],
    },
    {
      id: "la-phuong-uyen",
      name: "Lã Phương Uyên",
      position: "MSCer",
      company: "Trung tâm MSC",
      avatar: "/MSCers/LPU.webp",
      testimonial: "Kiến thức về marketing chiến lược từ MSC là nền tảng vững chắc giúp tôi tự tin chinh phục các vị trí quan trọng tại tập đoàn đa quốc gia.",
      skills: ["Chiến lược thương hiệu", "Marketing kỹ thuật số", "Nghiên cứu thị trường"],
    },
    {
      id: "nguyen-ngoc-thien-huong",
      name: "Nguyễn Ngọc Thiên Hương",
      position: "MSCer",
      company: "Trung tâm MSC",
      avatar: "/MSCers/NNTH.webp",
      testimonial: "Chương trình đào tạo nhân sự tại MSC rất thực tiễn. Tôi đã áp dụng thành công nhiều mô hình để xây dựng và phát triển đội ngũ nhân tài.",
      skills: ["Đối tác nhân sự (HRBP)", "Phát triển nhân tài", "Văn hóa doanh nghiệp"],
    },
    {
      id: "phan-bich-hop",
      name: "Phan Bích Hợp",
      position: "MSCer",
      company: "Trung tâm MSC",
      avatar: "/MSCers/PBH.webp",
      testimonial: "Tư duy sáng tạo và phương pháp tiếp cận thị trường từ MSC đã giúp tôi rất nhiều trong việc xây dựng các chiến dịch toàn cầu.",
      skills: ["Content Marketing", "Digital Advertising", "Brand Strategy"],
    },
    {
      id: "pham-ngoc-thuy-trang",
      name: "Phạm Ngọc Thuỳ Trang",
      position: "MSCer",
      company: "Trung tâm MSC",
      avatar: "/MSCers/PNTT.webp",
      testimonial: "MSC đã trang bị cho tôi nền tảng vững chắc để phát triển sự nghiệp trong lĩnh vực tài chính. Các case study thực tế rất giá trị.",
      skills: ["Phân tích tài chính", "Quản lý rủi ro", "Mô hình hóa tài chính"],
    },
    {
      id: "tran-hoang-minh-thu",
      name: "Trần Hoàng Minh Thư",
      position: "MSCer",
      company: "Trung tâm MSC",
      avatar: "/MSCers/THMT.webp",
      testimonial: "Khóa học Design Thinking đã mở ra một góc nhìn mới, giúp tôi giải quyết vấn đề thiết kế lấy người dùng làm trung tâm.",
      skills: ["Thiết kế trải nghiệm", "Nghiên cứu người dùng", "Prototyping"],
    },
    {
      id: "huynh-nguyen-quan",
      name: "Huỳnh Nguyên Quân",
      position: "MSCer",
      company: "Trung tâm MSC",
      avatar: "/MSCers/HNQ.webp",
      testimonial: "Khóa học Tech Leadership đã giúp tôi nâng cao kỹ năng mềm và quản lý, một bước đệm quan trọng để phát triển sự nghiệp.",
      skills: ["Software Engineering", "System Design", "Tech Leadership"],
    },
  ];

  const successStats = [
    { label: "MSCer thành công", value: "5,000+", icon: Users },
    { label: "Doanh nghiệp đối tác", value: "100+", icon: Award },
    { label: "Câu chuyện truyền cảm hứng", value: "Hàng trăm", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white">
        <div className="container">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-white/10 p-4 rounded-full mb-6">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Cộng đồng MSCer</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Nơi hội tụ những câu chuyện thành công, những gương mặt ưu tú đã trưởng thành từ các chương trình đào tạo của MSC Center.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {successStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-6 bg-gray-50 rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MSCers Profiles Section - ĐÃ NÂNG CẤP */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Câu Chuyện Thành Công</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những MSCer tiêu biểu với hành trình phát triển sự nghiệp ấn tượng sau khi hoàn thành các chương trình đào tạo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mscers.map((mscer, index) => (
              <motion.div
                key={mscer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col group overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl text-center border">
                  <CardContent className="p-8 flex flex-col flex-grow items-center">
                    <div className="relative mb-6">
                      <Image
                        src={mscer.avatar}
                        alt={mscer.name}
                        width={128}
                        height={128}
                        className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-teal-400 p-2 rounded-full shadow-md">
                        <Star className="h-5 w-5 text-white fill-white" />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900">{mscer.name}</CardTitle>
                    <p className="text-blue-600 font-semibold text-base mb-4">{mscer.position}</p>
                    
                    <blockquote className="text-base text-gray-600 italic leading-relaxed mb-6 flex-grow">
                      "{mscer.testimonial}"
                    </blockquote>
                    
                    <div className="mt-auto w-full">
                      <Link href={`/mscer/${mscer.id}`}>
                        <Button className="w-full btn-primary group-hover:bg-blue-700 transition-colors">
                          Xem Hồ Sơ
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join MSCer Community Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container text-center">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
           >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Viết nên câu chuyện của riêng bạn</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                Bắt đầu hành trình phát triển sự nghiệp cùng MSC Center và trở thành gương mặt thành công tiếp theo trong cộng đồng MSCer.
              </p>
              <Link href="/dao-tao">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6">
                    Khám phá các khóa học
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              </Link>
           </motion.div>
        </div>
      </section>
    </div>
  )
}
