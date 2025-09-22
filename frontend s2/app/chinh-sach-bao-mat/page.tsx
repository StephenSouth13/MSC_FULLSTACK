"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Users, Database, FileText } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container py-8 sm:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6"
            >
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-serif mb-4">
              Chính sách bảo mật
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              MSC Center cam kết bảo vệ thông tin cá nhân của bạn một cách an toàn và minh bạch
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-8 lg:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              {/* Section 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Giới thiệu</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Trung tâm Kỹ năng Mekong (MSC Center) tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân mà bạn chia sẻ với chúng tôi. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng dịch vụ của MSC Center.
                </p>
              </motion.div>

              {/* Section 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Thông tin chúng tôi thu thập</h2>
                </div>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <h3 className="text-lg font-semibold">2.1. Thông tin cá nhân</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Họ tên, email, số điện thoại</li>
                    <li>Thông tin học vấn và nghề nghiệp</li>
                    <li>Địa chỉ liên hệ</li>
                    <li>Thông tin thanh toán (được mã hóa và bảo mật)</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6">2.2. Thông tin tự động</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Địa chỉ IP và thông tin thiết bị</li>
                    <li>Cookie và công nghệ theo dõi tương tự</li>
                    <li>Lịch sử truy cập website</li>
                    <li>Thời gian và tần suất sử dụng dịch vụ</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Cách chúng tôi sử dụng thông tin</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">Chúng tôi sử dụng thông tin của bạn để:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cung cấp và cải thiện dịch vụ đào tạo</li>
                    <li>Xử lý đăng ký khóa học và thanh toán</li>
                    <li>Gửi thông báo về khóa học và sự kiện</li>
                    <li>Cung cấp hỗ trợ khách hàng</li>
                    <li>Phân tích và cải thiện website</li>
                    <li>Tuân thủ các yêu cầu pháp lý</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Chia sẻ thông tin</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">MSC Center cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba, trừ khi:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Có sự đồng ý rõ ràng từ bạn</li>
                    <li>Cần thiết để cung cấp dịch vụ (ví dụ: đối tác thanh toán)</li>
                    <li>Theo yêu cầu của pháp luật</li>
                    <li>Để bảo vệ quyền lợi của MSC Center và người dùng</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 5 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Bảo mật thông tin</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">Chúng tôi áp dụng các biện pháp bảo mật tiên tiến:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mã hóa SSL/TLS cho tất cả dữ liệu truyền tải</li>
                    <li>Hệ thống firewall và giám sát bảo mật 24/7</li>
                    <li>Kiểm soát truy cập nghiêm ngặt</li>
                    <li>Sao lưu dữ liệu định kỳ</li>
                    <li>Đào tạo nhân viên về bảo mật thông tin</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 6 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Quyền của bạn</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">Bạn có quyền:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Truy cập và xem thông tin cá nhân</li>
                    <li>Chỉnh sửa hoặc cập nhật thông tin</li>
                    <li>Xóa tài khoản và dữ liệu liên quan</li>
                    <li>Từ chối nhận email marketing</li>
                    <li>Yêu cầu sao chép dữ liệu cá nhân</li>
                  </ul>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-8"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Liên hệ với chúng tôi</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Email:</strong> msc.edu.vn@gmail.com</p>
                  <p><strong>Điện thoại:</strong> (+84) 329 381 489</p>
                  <p><strong>Địa chỉ:</strong> 279 Nguyễn Tri Phương, Phường Diên Hồng, TP.Hồ Chí Minh</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
