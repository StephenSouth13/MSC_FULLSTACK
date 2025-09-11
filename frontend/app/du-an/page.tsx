'use client'

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, Award, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { api, Project } from "@/lib/api"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await api.getProjects()
        
        if (response.success && response.data?.data) {
          setProjects(response.data.data)
        } else {
          setError(response.error || 'Failed to fetch projects')
        }
      } catch (err) {
        setError('An error occurred while fetching projects')
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Các chỉ số thống kê (có thể cập nhật cho phù hợp)
  const stats = [
    { label: "Dự án tiêu biểu", value: `${projects.length}+`, icon: CheckCircle },
    { label: "Doanh nghiệp đối tác", value: "50+", icon: Target },
    { label: "Học viên được đào tạo", value: "5,000+", icon: Users },
    { label: "Lĩnh vực đào tạo", value: "10+", icon: TrendingUp },
  ]

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Đang tải dự án...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Thử lại
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 font-serif"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Dự án Đã Triển Khai
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Khám phá các dự án đào tạo và phát triển thực tế mà MSC Center đã triển khai, mang lại giá trị bền vững cho đối tác và học viên.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b">
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={itemVariants}>
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
                  <stat.icon className="h-10 w-10 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Các Dự Án Nổi Bật</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ các tập đoàn lớn đến những doanh nghiệp SMEs, mỗi dự án là một câu chuyện thành công.
            </p>
          </motion.div>

          {projects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col group overflow-hidden border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all duration-300 rounded-2xl">
                    <CardHeader className="p-0">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.image || '/placeholder-project.jpg'}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <Badge variant="secondary" className="absolute top-4 left-4 text-sm bg-white/90 text-black">{project.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{project.title}</CardTitle>
                      <p className="text-gray-600 mb-6 flex-grow">{project.description}</p>
                      
                      <div className="mt-auto">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Chuyên gia phụ trách:</p>
                          <div className="flex items-center space-x-2">
                             {project.mentors?.map((mentor, index) => (
                                 <div key={index} className="flex items-center space-x-2">
                                     <Image src={mentor.avatar || '/placeholder-avatar.jpg'} alt={mentor.name} width={32} height={32} className="rounded-full border-2 border-white"/>
                                     <span className="text-sm text-gray-800">{mentor.name}</span>
                                 </div>
                             ))}
                          </div>
                      </div>
                      <Link href={`/du-an/${project.slug}`} className="mt-6">
                        <Button className="w-full btn-primary group-hover:bg-blue-700 transition-colors">
                          Xem chi tiết dự án <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Hiện tại chưa có dự án nào được công bố.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container text-center">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
           >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">Bạn có dự án cần triển khai?</h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Hãy để MSC Center trở thành đối tác đồng hành, thiết kế chương trình đào tạo riêng biệt và hiệu quả cho tổ chức của bạn.
              </p>
              <Link href="/lien-he">
                  <Button size="lg" className="btn-primary text-lg px-10 py-6">
                    Tư vấn giải pháp
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              </Link>
           </motion.div>
        </div>
      </section>
    </div>
  )
}