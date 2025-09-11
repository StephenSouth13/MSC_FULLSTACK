"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, Phone, Eye, EyeOff, Facebook, Chrome, ArrowRight, Shield, CheckCircle, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { apiClient, type RegisterData } from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Partial<RegisterData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterData> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData((prev: RegisterData) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: Partial<RegisterData>) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      console.log('Đang gửi dữ liệu đăng ký:', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: '***ẩn***'
      })

      const response = await apiClient.register(formData)
      
      console.log('Phản hồi đăng ký:', response)
      
      if (response.success) {
        toast.success('Đăng ký thành công!', {
          description: 'Chào mừng bạn đến với MSC Center. Bạn sẽ được chuyển đến trang đăng nhập.'
        })
        
        // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        setTimeout(() => {
          router.push('/login?message=registration-success')
        }, 1500)
      } else {
        // Hiển thị thông báo lỗi chi tiết từ server
        const errorMessage = response.message || 'Có lỗi xảy ra khi đăng ký'
        console.error('Đăng ký thất bại:', errorMessage)
        
        toast.error('Đăng ký thất bại', {
          description: errorMessage
        })

        // Xử lý lỗi email đã tồn tại
        if (errorMessage.includes('Email đã được sử dụng')) {
          setErrors({ email: 'Email này đã được đăng ký' })
        }
      }
      
    } catch (error: any) {
      console.error('Lỗi đăng ký:', error)
      toast.error('Đăng ký thất bại', {
        description: 'Lỗi kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative min-h-screen flex">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-teal-600 via-teal-700 to-blue-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-pattern opacity-10" />

          <div className="relative flex flex-col justify-center p-12 text-white">
            <div className="max-w-md">
              <h2 className="text-4xl font-bold mb-6">Bắt đầu hành trình thành công của bạn</h2>
              <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                Tham gia MSC Center và trở thành phiên bản tốt nhất của chính mình
              </p>

              {/* Benefits */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Miễn phí 3 bài học đầu</h3>
                    <p className="text-teal-100 text-sm">Trải nghiệm chất lượng khóa học trước khi quyết định</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Mentorship 1-1</h3>
                    <p className="text-teal-100 text-sm">Được hướng dẫn trực tiếp bởi các chuyên gia hàng đầu</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Cam kết chất lượng</h3>
                    <p className="text-teal-100 text-sm">Hoàn tiền 100% nếu không hài lòng trong 30 ngày đầu</p>
                  </div>
                </div>
              </div>

              {/* Success Stories */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <h3 className="font-semibold text-lg mb-4">Câu chuyện thành công</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm text-teal-100 mb-2">
                      "Sau 6 tháng học tại MSC, tôi đã học tập được nhiều kĩ năng về tư duy và kinh nghiệm trong mảng lập trình"
                    </p>
                    <div className="text-xs text-white font-medium">- Nguyễn Tuấn Dũng, Frontend Developer</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm text-teal-100 mb-2">
                      "MSC Center đã giúp tôi có được tư duy tầm nhìn"
                    </p>
                    <div className="text-xs text-white font-medium">- Quách Thành Long, Fullstack Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-32 w-24 h-24 bg-blue-300/20 rounded-full blur-lg animate-bounce" />
          <div className="absolute top-1/2 left-8 w-16 h-16 bg-teal-300/20 rounded-full blur-md animate-pulse" />
        </div>

        {/* Right Side - Register Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center">
              <Link href="/" className="inline-block">
                <div className="h-12 w-auto mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    MSC Center
                  </span>
                </div>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tạo tài khoản mới</h1>
              <p className="text-gray-600 dark:text-gray-400">Bắt đầu hành trình học tập cùng MSC Center</p>
            </div>

            {/* Register Form */}
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Đăng ký
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Họ và tên
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`pl-10 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 ${errors.fullName ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 ${errors.email ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Số điện thoại
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`pl-10 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 ${errors.phone ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mật khẩu
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Tạo mật khẩu"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`pl-10 pr-10 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 ${errors.password ? 'border-red-500' : ''}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`pl-10 pr-10 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4 mt-1"
                      required
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Tôi đồng ý với{" "}
                      <Link
                        href="/terms"
                        className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors"
                      >
                        Điều khoản sử dụng
                      </Link>{" "}
                      và{" "}
                      <Link
                        href="/privacy"
                        className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors"
                      >
                        Chính sách bảo mật
                      </Link>
                    </span>
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Đang tạo tài khoản...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>Tạo tài khoản</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                      Hoặc đăng ký với
                    </span>
                  </div>
                </div>

                {/* Social Register */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-300 group"
                  >
                    <Facebook className="h-5 w-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 transition-all duration-300 group"
                  >
                    <Chrome className="h-5 w-5 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Google</span>
                  </Button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Đã có tài khoản?{" "}
                    <Link
                      href="/login"
                      className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-semibold transition-colors"
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Thông tin của bạn được bảo mật tuyệt đối</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
