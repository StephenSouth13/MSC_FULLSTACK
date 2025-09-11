'use client'

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Users, Award, Handshake, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PartnersPage() {
  // Dữ liệu đối tác thực tế
  const corporatePartners = [
    { id: 1, name: "ASL", logo: "/carousel/ASL.webp" },
    { id: 2, name: "Binemo", logo: "/carousel/Binemo.webp" },
    { id: 4, name: "CP Group", logo: "/carousel/CP.webp" },
    { id: 6, name: "Greenfeed", logo: "/carousel/Greenfeed.webp" },
    { id: 7, name: "Happy Land", logo: "/carousel/Happyland.webp" },
    { id: 8, name: "HTO Group", logo: "/carousel/HTOGroup.webp" },
    { id: 11, name: "NAB", logo: "/carousel/NAB.webp" },
    { id: 12, name: "Richs Vietnam", logo: "/carousel/Richs.webp" },
    { id: 13, name: "Satra", logo: "/carousel/Satra.webp" },
    { id: 14, name: "Schindler", logo: "/carousel/Schindler.webp" },
    { id: 15, name: "SGC", logo: "/carousel/SGC.webp" },
    { id: 16, name: "SGF", logo: "/carousel/SGF.webp" },
    { id: 17, name: "SGGG", logo: "/carousel/SGGG.webp" },
    { id: 18, name: "SGL", logo: "/carousel/SGL.webp" },
    { id: 19, name: "Shinhan Bank", logo: "/carousel/Shinhan.webp" },
    { id: 20, name: "Smar", logo: "/carousel/Smar.webp" },
    { id: 21, name: "Smentor", logo: "/carousel/Smentor.webp" },
    { id: 22, name: "SP", logo: "/carousel/SP.webp" },
    { id: 23, name: "Tâm Châu", logo: "/carousel/TC.webp" },
    { id: 28, name: "VNPT", logo: "/carousel/VNPT.webp" },
    { id: 32, name: "WK", logo: "/carousel/WK.webp" },
    { id: 33, name: "YESCO", logo: "/carousel/YESCO.webp" },
  ];

  const educationAndAssociationPartners = [
    { id: 3, name: "BNI Vietnam", logo: "/carousel/BNI.webp" },
    { id: 5, name: "CSMO Vietnam", logo: "/carousel/CSMO.webp" },
    { id: 9, name: "HUIT", logo: "/carousel/HUIT.webp" },
    { id: 10, name: "Kỷ lục Quốc gia", logo: "/carousel/KNQG.webp" },
    { id: 24, name: "UEH", logo: "/carousel/UEH.webp" },
    { id: 25, name: "UFM", logo: "/carousel/UFM.webp" },
    { id: 26, name: "VCCI", logo: "/carousel/VCCI.webp" },
    { id: 27, name: "VK", logo: "/carousel/VK.webp" },
    { id: 29, name: "VRA", logo: "/carousel/VRA.webp" },
    { id: 30, name: "VSM", logo: "/carousel/VSM.webp" },
    { id: 31, name: "VTF", logo: "/carousel/VTF.webp" },
  ];

  const stats = [
    { label: "Đối tác tin cậy", value: "30+", icon: Handshake },
    { label: "Dự án hợp tác", value: "100+", icon: Award },
    { label: "Học viên được đào tạo", value: "5,000+", icon: Users },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Handshake className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Đối tác & Đồng hành</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Sức mạnh của MSC Center được tạo nên từ mạng lưới đối tác uy tín, cùng chung một tầm nhìn về phát triển giáo dục và nguồn nhân lực chất lượng cao.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
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

      {/* Corporate Partners Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full mb-4">
              <Handshake className="h-6 w-6" />
              <h2 className="text-3xl font-bold font-serif">Đối tác Doanh nghiệp & Tập đoàn</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Những doanh nghiệp hàng đầu đã tin tưởng và lựa chọn MSC Center làm đối tác đào tạo và phát triển nguồn nhân lực.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {corporatePartners.map(partner => (
              <motion.div key={partner.id} variants={itemVariants}>
                <Card className="p-6 flex items-center justify-center h-40 bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl border">
                   <Image
                       src={partner.logo}
                        alt={partner.name}
                         width={560}
                          height={350}
                 className="max-h-24 w-auto object-contain"
                     />
              </Card>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

       {/* Education & Association Partners Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
             <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full mb-4">
              <Building2 className="h-6 w-6" />
              <h2 className="text-3xl font-bold font-serif">Đối tác Giáo dục & Hiệp hội</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Hợp tác chặt chẽ với các trường đại học, viện nghiên cứu và hiệp hội ngành nghề để nâng cao chất lượng đào tạo.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {educationAndAssociationPartners.map(partner => (
              <motion.div key={partner.id} variants={itemVariants}>
                <Card className="p-6 flex items-center justify-center h-32 bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl border">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={700}
                    height={550}
                    className="max-h-[6.8rem] w-auto object-contain"
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container text-center">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
           >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Trở thành Đối tác của MSC</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                Cùng chúng tôi kiến tạo những giá trị bền vững cho cộng đồng và doanh nghiệp thông qua các chương trình đào tạo chất lượng cao.
              </p>
              <Link href="/lien-he">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6">
                    Liên hệ Hợp tác
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              </Link>
           </motion.div>
        </div>
      </section>
    </div>
  )
}