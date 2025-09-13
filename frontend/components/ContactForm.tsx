'use client'

import type React from "react"
import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Send, MapPin, Phone, Mail, Clock, Facebook, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    // Giả lập API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Logic xử lý form thực tế sẽ nằm ở đây (ví dụ: gửi đến API)
    console.log("Form submitted:", formData)
    
    // Giả lập kết quả
    setSubmitStatus("success")
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  // Dữ liệu liên hệ chính xác
  const contactInfo = [
    { icon: MapPin, title: "Địa chỉ", lines: ["279 Nguyễn Tri Phương, Phường 5,", "Phường Diên Hồng,  TP. Hồ Chí Minh"] },
    { icon: Phone, title: "Điện thoại", lines: ["(+84) 329 381 489"], link: "tel:+84329381489" },
    { icon: Mail, title: "Email", lines: ["msc.edu.vn@gmail.com"], link: "mailto:msc.edu.vn@gmail.com" },
    { icon: Clock, title: "Giờ làm việc", lines: ["Thứ 2 - Thứ 7: 8:00 - 17:30", "Chủ nhật: Nghỉ"] },
  ]
  
  const socialLinks = [
    { icon: Facebook, name: "Facebook", href: "https://www.facebook.com/msc.edu.vn" },
    { icon: MessageSquare, name: "Zalo", href: "https://zalo.me/g/acumou501" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
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
              <Send className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Kết nối với MSC</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và tư vấn. Hãy để lại lời nhắn hoặc liên hệ trực tiếp để bắt đầu hành trình phát triển của bạn.
            </p>
          </motion.div>
        </div>
      </section>

      ---

      {/* Main Content Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Form Section (3/5 width) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-2xl border-0 rounded-2xl p-4 md:p-8 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gửi lời nhắn cho chúng tôi</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Họ và tên *</label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required placeholder="Nguyễn Văn A" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="email@example.com" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Số điện thoại</label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="090 xxx xxxx" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nội dung *</label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} placeholder="Tôi cần tư vấn về khóa học..." className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg py-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400" size="lg">
                      {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                    </Button>
                    {submitStatus === 'success' && <p className="text-green-600 dark:text-green-400 text-center mt-4">Cảm ơn bạn! Tin nhắn đã được gửi thành công.</p>}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Section (2/5 width) */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg border-0 rounded-2xl dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
                <CardHeader><CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Thông tin liên hệ</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.title}</h4>
                        {item.link ? (
                          <a href={item.link} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                            {item.lines.map((line, i) => <p key={i}>{line}</p>)}
                          </a>
                        ) : (
                          item.lines.map((line, i) => <p key={i} className="text-gray-600 dark:text-gray-400">{line}</p>)
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 rounded-2xl dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
                <CardHeader><CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mạng xã hội</CardTitle></CardHeader>
                <CardContent className="flex space-x-4">
                  {socialLinks.map(link => (
                      <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="h-12 w-12 rounded-full p-0 border-gray-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                            <link.icon className="h-6 w-6 text-blue-600 dark:text-blue-300"/>
                        </Button>
                      </a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Map Section */}
      <section className="pb-24 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.0824622742025!2d106.66582407451699!3d10.761148759476423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe01ccb37b3%3A0xb9b5223950251041!2sMSC%20Center!5e1!3m2!1svi!2s!4v1754099890700!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí Trung tâm MSC"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
