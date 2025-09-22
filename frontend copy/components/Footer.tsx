"use client"

import type React from "react"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Youtube, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react'
// import { useLanguage } from "./language-provider" // Bỏ comment nếu bạn dùng đa ngôn ngữ
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Giả sử bạn có một component FacebookSDKLoader riêng
const FacebookSDKLoader = () => {
    useEffect(() => {
        // Kiểm tra xem script đã tồn tại chưa để tránh tải lại
        if (document.getElementById('facebook-jssdk')) {
            // Nếu đã có, chỉ cần parse lại
            if (window.FB) {
                window.FB.XFBML.parse();
            }
            return;
        }

        // Tạo thẻ div #fb-root
        const fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.insertBefore(fbRoot, document.body.firstChild);

        // Tạo và thêm thẻ script
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0&appId=YOUR_APP_ID&autoLogAppEvents=1"; // THAY APP ID CỦA BẠN
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        
        // Parse lại XFBML sau khi SDK tải xong
        script.onload = () => {
            // Lỗi đã được giải quyết ở đây vì TypeScript giờ đã biết 'window.FB' có thể tồn tại
            if (window.FB) { 
                window.FB.XFBML.parse();
            }
        };

        document.body.appendChild(script);

    }, []);

    return null; 
};

const Footer = () => {
    // const { t } = useLanguage()

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Xử lý logic đăng ký nhận tin tại đây
        console.log("Newsletter subscription submitted")
    }

    return (
        <footer className="relative bg-gradient-to-br from-blue-900 via-sky-900 to-teal-800 text-white overflow-hidden">

             <FacebookSDKLoader /> {/* Gọi component tải và khởi tạo SDK */}
            
            {/* Hiệu ứng nền */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-300/20 to-transparent transform skew-y-12 animate-pulse delay-1000" />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-500/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(-45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 20px, transparent 20px, transparent 40px)",
                    }}
                />
            </div>

            {/* Nội dung chính của Footer */}
            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Cột 1: Logo, Thông tin chung & Fanpage */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <Link href="/" className="inline-block mb-6">
  <div className="relative inline-block rounded-2xl p-4 transition-all duration-300 hover:shadow-xl">
    
    {/* Nền sáng nhẹ phía sau logo */}
    <div className="absolute inset-0 rounded-2xl bg-white/100 backdrop-blur-md shadow-inner z-0 pointer-events-none" />

    {/* Logo nằm trên nền sáng */}
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

                        <p className="text-blue-100 mb-6 leading-relaxed max-w-md">
                            MSC Center - Trung tâm đào tạo và phát triển kỹ năng chuyên nghiệp hàng đầu Việt Nam cho người đi làm và sinh viên.
                        </p>

                        <div className="mt-6 bg-white/5 p-1 rounded-lg backdrop-blur-sm border border-white/10" style={{ maxWidth: 320 }}>
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

                    {/* Cột 2: Thông tin liên hệ */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold mb-6 font-serif text-teal-200">Thông tin liên hệ</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-teal-400/30">
                                    <MapPin className="h-5 w-5 text-teal-300" />
                                </div>
                                <div>
                                    <p className="text-blue-100">279 Nguyễn Tri Phương, Phường Diên Hồng, TP.Hồ Chí Minh</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-teal-400/30">
                                    <Phone className="h-5 w-5 text-teal-300" />
                                </div>
                                <p className="text-blue-100 hover:text-white transition-colors"><a href="tel:+84329381489">Điện Thoại: (+84) 329 381 489</a></p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-teal-400/30">
                                    <Mail className="h-5 w-5 text-teal-300" />
                                </div>
                                <p className="text-blue-100 hover:text-white transition-colors"><a href="mailto:msc.edu.vn@gmail.com">Email: msc.edu.vn@gmail.com</a></p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cột 3: Đăng ký & Mạng xã hội */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold mb-6 font-serif text-teal-200">Kết nối với chúng tôi</h3>
                        <p className="text-blue-100 mb-4">Đăng ký để nhận thông tin về các khóa học và sự kiện mới nhất.</p>

                        <form onSubmit={handleNewsletterSubmit} className="mb-8">
                            <div className="flex">
                                <Input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="rounded-r-none bg-white/10 border-white/20 text-white placeholder-blue-200 backdrop-blur-sm focus:ring-teal-400 focus:border-teal-400"
                                    required
                                />
                                <Button type="submit" className="rounded-l-none bg-teal-500 hover:bg-teal-600 px-4 transition-colors">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>

                        <div className="flex space-x-4">
                            <Link
                                href="https://www.facebook.com/msc.edu.vn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 border border-white/20 hover:scale-110"
                                aria-label="Facebook của MSC"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://www.youtube.com/@MSCLifeLongLearning" // <-- Cập nhật link Youtube của bạn
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 border border-white/20 hover:scale-110"
                                aria-label="Youtube của MSC"
                            >
                                <Youtube className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://zalo.me/g/acumou501" // <-- Cập nhật link Zalo của bạn
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 border border-white/20 hover:scale-110"
                                aria-label="Zalo của MSC"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Thanh dưới cùng */}
            <div className="relative z-10 border-t border-white/20 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
                        <p className="text-blue-200 text-sm"> © {new Date().getFullYear()} MSC Center. Phát triển bởi Phòng Công nghệ thông tin.</p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/chinh-sach-bao-mat" className="text-blue-200 hover:text-white transition-colors">
                                Chính sách bảo mật
                            </Link>
                            <Link href="/dieu-khoan-su-dung" className="text-blue-200 hover:text-white transition-colors">
                                Điều khoản sử dụng
                            </Link>
                            <Link href="/so-do-trang-web" className="text-blue-200 hover:text-white transition-colors">
                                Sơ đồ trang web
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
// /global.d.ts

declare global {
  interface Window {
    FB?: any; // Khai báo rằng window CÓ THỂ có thuộc tính FB
  }
}

// Dòng này rất quan trọng để đảm bảo file được coi là một module.
export {};
export default Footer