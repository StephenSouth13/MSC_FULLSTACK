"use client"

import { motion } from "framer-motion"
import { Scale, Book, Users, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-2xl mb-6"
            >
              <Scale className="h-10 w-10 text-teal-600 dark:text-teal-400" />
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-serif mb-4">
              Điều khoản sử dụng
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quy định và điều kiện khi sử dụng dịch vụ đào tạo và phát triển kỹ năng của MSC Center
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
                  <Book className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Giới thiệu chung</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Chào mừng bạn đến với Trung tâm Kỹ năng Mekong (MSC Center). Bằng việc truy cập và sử dụng website hoặc dịch vụ của chúng tôi, bạn đồng ý tuân theo các điều khoản và điều kiện được quy định dưới đây.
                  </p>
                  <p>
                    MSC Center cung cấp các dịch vụ đào tạo, coaching, mentoring và phát triển kỹ năng chuyên nghiệp. Việc sử dụng dịch vụ của chúng tôi đồng nghĩa với việc bạn chấp nhận toàn bộ các điều khoản này.
                  </p>
                </div>
              </motion.div>

              {/* Section 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Quyền và trách nhiệm của học viên</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <h3 className="text-lg font-semibold">2.1. Quyền lợi của học viên</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Được tham gia đầy đủ các khóa học đã đăng ký</li>
                    <li>Nhận chứng chỉ khi hoàn thành khóa học</li>
                    <li>Được hỗ trợ kỹ thuật và học thuật trong suốt quá trình học</li>
                    <li>Tiếp cận tài liệu học tập và video bài giảng</li>
                    <li>Tham gia các hoạt động networking và sự kiện của MSC</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6">2.2. Trách nhiệm của học viên</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cung cấp thông tin chính xác khi đăng ký</li>
                    <li>Tham gia học tập nghiêm túc và đầy đủ</li>
                    <li>Thanh toán học phí đúng hạn</li>
                    <li>Tôn trọng giảng viên, mentor và học viên khác</li>
                    <li>Không chia sẻ tài liệu học tập cho bên thứ ba</li>
                    <li>Tuân thủ quy định của trung tâm</li>
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
                  <CreditCard className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Chính sách thanh toán và hoàn tiền</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <h3 className="text-lg font-semibold">3.1. Thanh toán</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Học phí phải được thanh toán đầy đủ trước khi bắt đầu khóa học</li>
                    <li>Chấp nhận thanh toán qua chuyển khoản ngân hàng, thẻ tín dụng hoặc tiền mặt</li>
                    <li>Hóa đơn VAT sẽ được cung cấp theo yêu cầu</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6">3.2. Hoàn tiền</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hoàn 100% học phí nếu hủy trước 7 ngày khai giảng</li>
                    <li>Hoàn 50% học phí nếu hủy từ 3-7 ngày trước khai giảng</li>
                    <li>Không hoàn tiền nếu hủy trong vòng 3 ngày trước khai giảng</li>
                    <li>Hoàn tiền theo tỷ lệ nếu MSC hủy khóa học do lý do bất khả kháng</li>
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
                  <CheckCircle className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Quy định về chứng chỉ và hoàn thành khóa học</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>Để nhận được chứng chỉ hoàn thành khóa học, học viên cần:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Tham dự tối thiểu 80% tổng số buổi học</li>
                    <li>Hoàn thành các bài tập và project được yêu cầu</li>
                    <li>Đạt điểm đánh giá tối thiểu (nếu có)</li>
                    <li>Thanh toán đầy đủ học phí</li>
                  </ul>
                  <p className="mt-4">
                    Chứng chỉ sẽ được cấp trong vòng 2 tuần sau khi hoàn thành khóa học và có thể được gửi qua email hoặc nhận trực tiếp tại trung tâm.
                  </p>
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
                  <AlertTriangle className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Quy định về sở hữu trí tuệ</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>
                    Tất cả tài liệu, nội dung khóa học, video bài giảng thuộc quyền sở hữu trí tuệ của MSC Center và các đối tác. Học viên cam kết:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Không sao chép, phân phối hoặc chia sẻ tài liệu cho bên thứ ba</li>
                    <li>Không ghi âm, quay phim các buổi học mà không có sự đồng ý</li>
                    <li>Chỉ sử dụng tài liệu cho mục đích học tập cá nhân</li>
                    <li>Không sử dụng thương mại hoặc khai thác tài liệu vì mục đích lợi nhuận</li>
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
                  <Scale className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Giới hạn trách nhiệm</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>MSC Center cam kết cung cấp dịch vụ chất lượng cao, tuy nhiên:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Không đảm bảo kết quả học tập cụ thể cho từng cá nhân</li>
                    <li>Không chịu trách nhiệm về thiệt hại gián tiếp hoặc hậu quả</li>
                    <li>Có quyền thay đổi lịch học, gi��ng viên khi cần thiết</li>
                    <li>Có quyền từ chối cung cấp dịch vụ nếu học viên vi phạm quy định</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 7 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-10"
              >
                <div className="flex items-center mb-4">
                  <Book className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Thay đổi điều khoản</h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p>
                    MSC Center có quyền cập nhật và thay đổi các điều khoản này bất cứ lúc nào. Các thay đổi sẽ được thông báo trên website và có hiệu lực ngay khi được đăng tải. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
                  </p>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 mt-8"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Thông tin liên hệ</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng, vui lòng liên hệ:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Trung tâm Kỹ năng Mekong (MSC Center)</strong></p>
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
