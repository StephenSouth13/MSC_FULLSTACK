"use client"

import type React from "react"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Youtube, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const FacebookSDKLoader = () => {
    useEffect(() => {
        if (document.getElementById('facebook-jssdk')) {
            if (window.FB) window.FB.XFBML.parse()
            return
        }
        const fbRoot = document.createElement('div')
        fbRoot.id = 'fb-root'
        document.body.insertBefore(fbRoot, document.body.firstChild)

        const script = document.createElement('script')
        script.id = 'facebook-jssdk'
        script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0&appId=YOUR_APP_ID&autoLogAppEvents=1"
        script.async = true
        script.defer = true
        script.crossOrigin = "anonymous"
        script.onload = () => {
            if (window.FB) window.FB.XFBML.parse()
        }
        document.body.appendChild(script)
    }, [])
    return null
}

const Footer = () => {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Newsletter subscription submitted")
    }

    return (
        <footer className="relative bg-[#095095] text-white">
            <FacebookSDKLoader />

            {/* Nội dung chính */}
            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Logo + giới thiệu */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <Link href="/" className="inline-block mb-6">
                            <div className="relative inline-block rounded-2xl p-4 transition-all duration-300 hover:shadow-xl bg-white">
                                <Image
                                    src="/logo.webp"
                                    alt="MSC Center - UEH University"
                                    width={450}
                                    height={100}
                                    className="relative z-10 h-auto w-auto max-w-full md:max-w-[450px]"
                                    priority
                                />
                            </div>
                        </Link>

                        <p className="text-white/80 mb-6 leading-relaxed max-w-md">
                            MSC Center - Trung tâm đào tạo và phát triển kỹ năng chuyên nghiệp hàng đầu Việt Nam cho người đi làm và sinh viên.
                        </p>

                        <div className="mt-6 bg-white/10 p-1 rounded-lg backdrop-blur-sm border border-white/20" style={{ maxWidth: 320 }}>
                            <div
                                className="fb-page"
                                data-href="https://www.facebook.com/msc.edu.vn"
                                data-tabs="timeline"
                                data-width="320"
                                data-height="150"
                                data-small-header="true"
                                data-adapt-container-width="true"
                                data-hide-cover="false"
                                data-show-facepile="true"
                            >
                                <blockquote
                                    cite="https://www.facebook.com/msc.edu.vn"
                                    className="fb-xfbml-parse-ignore"
                                >
                                    <a href="https://www.facebook.com/msc.edu.vn">MSC - Life Long Learning</a>
                                </blockquote>
                            </div>
                        </div>
                    </motion.div>

                    {/* Liên hệ */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold mb-6 font-serif text-white">Thông tin liên hệ</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <p className="text-white/80">279 Nguyễn Tri Phương, Phường Diên Hồng, TP.Hồ Chí Minh</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Phone className="h-5 w-5 text-white" />
                                </div>
                                <a href="tel:+84329381489" className="text-white/80 hover:text-white">Điện Thoại: (+84) 329 381 489</a>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-white" />
                                </div>
                                <a href="mailto:msc.edu.vn@gmail.com" className="text-white/80 hover:text-white">Email: msc.edu.vn@gmail.com</a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Đăng ký & MXH */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold mb-6 font-serif text-white">Kết nối với chúng tôi</h3>
                        <p className="text-white/80 mb-4">Đăng ký để nhận thông tin về các khóa học và sự kiện mới nhất.</p>

                        <form onSubmit={handleNewsletterSubmit} className="mb-8">
                            <div className="flex">
                                <Input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="rounded-r-none bg-white/20 border-white/20 text-white placeholder-white/60 focus:ring-white focus:border-white"
                                    required
                                />
                                <Button type="submit" className="rounded-l-none bg-white text-[#095095] px-4 hover:bg-gray-200">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>

                        <div className="flex space-x-4">
                            <Link href="https://www.facebook.com/msc.edu.vn" target="_blank" rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#095095] transition-all duration-300">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.youtube.com/@MSCLifeLongLearning" target="_blank" rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-300">
                                <Youtube className="h-5 w-5" />
                            </Link>
                            <Link href="https://zalo.me/g/acumou501" target="_blank" rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#095095] transition-all duration-300">
                                <MessageCircle className="h-5 w-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Dòng cuối */}
            <div className="relative z-10 border-t border-white/20 bg-[#074070]">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
                        <p className="text-white/70 text-sm">© {new Date().getFullYear()} MSC Center. Phát triển bởi Phòng Công nghệ thông tin.</p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/chinh-sach-bao-mat" className="text-white/70 hover:text-white">Chính sách bảo mật</Link>
                            <Link href="/dieu-khoan-su-dung" className="text-white/70 hover:text-white">Điều khoản sử dụng</Link>
                            <Link href="/so-do-trang-web" className="text-white/70 hover:text-white">Sơ đồ trang web</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

declare global {
  interface Window {
    FB?: any;
  }
}

export default Footer
