"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, Shield, Users, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth/AuthProvider"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await signIn(email, password)
      router.replace("/student/dashboard")
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Truy cập hơn 100+ khóa học chất lượng cao"
    },
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      text: "Kết nối với 50+ mentors chuyên nghiệp"
    },
    {
      icon: <Award className="h-5 w-5 text-purple-500" />,
      text: "Nhận chứng chỉ được công nhận"
    },
    {
      icon: <Shield className="h-5 w-5 text-orange-500" />,
      text: "Hỗ trợ học tập 24/7"
    }
  ]

  const testimonials = [
    {
      name: "Nguyễn Tuấn Dũng",
      role: "IT Fullstack",
      company: "UEH",
      content: "MSC Center đã giúp tôi môi trường phát triển một cách toàn diện.",
      avatar: "/MSCers/NTD.webp"
    },
    {
      name: "Quách Thành Long",
      role: "CTO",
      company: "MSC",
      content: "Những khóa học tại đây rất thực tế và ứng dụng được ngay vào công việc.",
      avatar: "/MSCers/QTL.webp"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-blue-200/20 dark:bg-blue-800/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/Users/login.webp"
                  alt="MSC Center"
                  width={200}
                  height={60}
                  className="h-12 w-auto mx-auto"
                />
              </Link>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Chào mừng trở lại!
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Đăng nhập để tiếp tục hành trình học tập của bạn
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Demo helper */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => { setEmail("quachthanhlong2k3@gamil.com"); setPassword("123456") }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Dùng tài khoản demo (auto điền)
                  </button>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang đăng nhập...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Đăng nhập</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </form>

              <Separator className="my-6" />

              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Image
                    src="/placeholder.svg?height=20&width=20&text=G"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Đăng nhập với Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Image
                    src="/placeholder.svg?height=20&width=20&text=F"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Đăng nhập với Facebook
                </Button>
              </div>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Chưa có tài khoản?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right Side - Benefits & Testimonials */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 p-12 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center max-w-lg">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Tham gia cộng đồng học tập hàng đầu Việt Nam
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Hơn 10,000+ học viên đã tin tưởng và phát triển cùng MSC Center. Hãy trở thành một phần của cộng đồng này!
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                {benefit.icon}
                <span className="text-blue-100">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Học viên nói gì về chúng tôi</h3>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <p className="text-blue-100 mb-3 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-blue-200 text-sm">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="font-medium text-green-400">Bảo mật tuyệt đối</span>
            </div>
            <p className="text-blue-100 text-sm">
              Thông tin của bạn được mã hóa và bảo vệ bằng công nghệ SSL 256-bit
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
