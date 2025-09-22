import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, ArrowLeft, Home } from "lucide-react"

export default function MentorNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-8">
            <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-serif mb-4">
            Mentor không tồn tại
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            Mentor bạn đang tìm kiếm không tồn tại hoặc đã được thay đổi đường dẫn. 
            Hãy quay lại trang danh sách mentor để khám phá các chuyên gia khác.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentors">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Quay lại danh sách Mentor
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                <Home className="mr-2 h-5 w-5" />
                Về trang chủ
              </Button>
            </Link>
          </div>
          
          {/* Help Text */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nếu bạn tin rằng đây là một lỗi, vui lòng{" "}
              <Link href="/lien-he" className="text-blue-600 dark:text-blue-400 hover:underline">
                liên hệ với chúng tôi
              </Link>{" "}
              để được hỗ trợ.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
