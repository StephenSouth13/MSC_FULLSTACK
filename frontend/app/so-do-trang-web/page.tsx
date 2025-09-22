"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  MapPin, 
  Home, 
  Info, 
  GraduationCap, 
  FolderOpen, 
  Users, 
  UserCheck, 
  Handshake, 
  FileText, 
  Phone, 
  LogIn, 
  UserPlus, 
  User,
  Shield,
  Scale,
  ExternalLink
} from "lucide-react"



interface SiteMapItem {
  title: string
  href: string
  icon: React.ReactNode
  description: string
  isDynamic?: boolean
  children?: SiteMapItem[]
}

export default function SiteMapPage() {
  const siteMapData: SiteMapItem[] = [
    {
      title: "Trang chủ",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      description: "Trang chủ giới thiệu tổng quan về MSC Center"
    },
    {
      title: "Giới thiệu",
      href: "/gioi-thieu",
      icon: <Info className="h-5 w-5" />,
      description: "Thông tin về MSC Center, tầm nhìn, sứ mệnh và giá trị cốt lõi"
    },
    {
      title: "Đào tạo",
      href: "/dao-tao",
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Các khóa học và chương trình đào tạo chuyên nghiệp"
    },
    {
      title: "Dự án",
      href: "/du-an",
      icon: <FolderOpen className="h-5 w-5" />,
      description: "Danh sách các dự án đã và đang triển khai"
    },
    {
      title: "Mentors",
      href: "/mentors",
      icon: <Users className="h-5 w-5" />,
      description: "Đội ngũ mentor và chuyên gia của MSC Center",
      children: [
        {
          title: "Chi tiết mentor",
          href: "/mentors/[id]",
          icon: <User className="h-4 w-4" />,
          description: "Thông tin chi tiết về từng mentor",
          isDynamic: true
        }
      ]
    },
    {
      title: "MSCers",
      href: "/mscer",
      icon: <UserCheck className="h-5 w-5" />,
      description: "Cộng đồng học viên và cựu học viên MSC",
      children: [
        {
          title: "Hồ sơ MSCer",
          href: "/mscer/[id]",
          icon: <User className="h-4 w-4" />,
          description: "Thông tin chi tiết về từng MSCer",
          isDynamic: true
        }
      ]
    },
    {
      title: "Đồng hành",
      href: "/dong-hanh",
      icon: <Handshake className="h-5 w-5" />,
      description: "Đối tác và nhà tài trợ của MSC Center"
    },
    {
      title: "Chia sẻ",
      href: "/chia-se",
      icon: <FileText className="h-5 w-5" />,
      description: "Blog, bài viết và tin tức từ MSC Center",
      children: [
        {
          title: "Danh mục bài viết",
          href: "/chia-se/category/[category]",
          icon: <FolderOpen className="h-4 w-4" />,
          description: "Bài viết theo danh mục",
          isDynamic: true
        },
        {
          title: "Chi tiết bài viết",
          href: "/chia-se/[slug]",
          icon: <FileText className="h-4 w-4" />,
          description: "Nội dung chi tiết của từng bài viết",
          isDynamic: true
        }
      ]
    },
    {
      title: "Liên hệ",
      href: "/lien-he",
      icon: <Phone className="h-5 w-5" />,
      description: "Thông tin liên hệ và form gửi tin nhắn"
    }
  ]

  const accountPages: SiteMapItem[] = [
    {
      title: "Đăng nhập",
      href: "/login",
      icon: <LogIn className="h-5 w-5" />,
      description: "Đăng nhập vào tài khoản cá nhân"
    },
    {
      title: "Đăng ký",
      href: "/register",
      icon: <UserPlus className="h-5 w-5" />,
      description: "Tạo tài khoản mới"
    },
    {
      title: "Hồ sơ cá nhân",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
      description: "Quản lý thông tin và tiến độ học tập"
    },
    {
      title: "CV Builder",
      href: "/cv",
      icon: <FileText className="h-5 w-5" />,
      description: "Công cụ tạo CV trực tuyến"
    }
  ]

  const legalPages: SiteMapItem[] = [
    {
      title: "Chính sách bảo mật",
      href: "/chinh-sach-bao-mat",
      icon: <Shield className="h-5 w-5" />,
      description: "Chính sách bảo vệ thông tin cá nhân"
    },
    {
      title: "Điều khoản sử dụng",
      href: "/dieu-khoan-su-dung",
      icon: <Scale className="h-5 w-5" />,
      description: "Quy định và điều kiện sử dụng dịch vụ"
    },
    {
      title: "Sơ đồ trang web",
      href: "/so-do-trang-web",
      icon: <MapPin className="h-5 w-5" />,
      description: "Trang hiện tại - Bản đồ điều hướng website"
    }
  ]

  const renderSiteMapSection = (items: SiteMapItem[], title: string, delay: number = 0) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-serif">{title}</h2>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + index * 0.1 }}
            className="bg-white dark:bg-gray-700 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1">
                {item.isDynamic ? (
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                      Dynamic Route
                    </span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="group flex items-center space-x-2 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                )}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {item.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                    {item.href}
                  </span>
                </div>
                
                {/* Children pages */}
                {item.children && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trang con:</p>
                    {item.children.map((child) => (
                      <div key={child.href} className="flex items-center space-x-2 mb-2">
                        {child.icon}
                        {child.isDynamic ? (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {child.title}
                            <span className="ml-2 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                              Dynamic
                            </span>
                          </span>
                        ) : (
                          <Link
                            href={child.href}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {child.title}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container py-8 sm:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6"
            >
              <MapPin className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-serif mb-4">
              Sơ đồ trang web
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Khám phá tất cả các trang và dịch vụ có sẵn trên website MSC Center
            </p>
          </div>

          {/* Main Navigation */}
          {renderSiteMapSection(siteMapData, "Trang chính", 0.1)}

          {/* Account Pages */}
          {renderSiteMapSection(accountPages, "Tài khoản người dùng", 0.3)}

          {/* Legal Pages */}
          {renderSiteMapSection(legalPages, "Thông tin pháp lý", 0.5)}

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Cần hỗ trợ thêm?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Nếu bạn không tìm thấy thông tin cần thiết hoặc gặp khó khăn trong việc điều hướng, 
              đừng ngần ngại liên hệ với chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/lien-he"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Liên hệ hỗ trợ
              </Link>
              <Link 
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors border border-blue-500"
              >
                <Home className="h-5 w-5 mr-2" />
                Về trang chủ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
