"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, ExternalLink, Mail, Linkedin, Facebook } from 'lucide-react' // Bỏ MapPin vì không dùng
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MentorCardProps {
  id: string
  slug?: string
  name: string
  title: string
  degree: string
  avatar: string
  linkPrefix?: 'mentors' | 'mscers'; // Prop để quyết định loại link
  social?: {
    linkedin?: string
    facebook?: string
    email?: string
  }
}

// BƯỚC 1: TIẾP NHẬN PROP `linkPrefix` VÀ ĐẶT GIÁ TRỊ MẶC ĐỊNH
const MentorCard = ({
  id,
  slug,
  name,
  title,
  degree,
  avatar,

  linkPrefix = 'mentors', // Thêm vào đây, mặc định là 'mentors'
  social,
}: MentorCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        {/* CardHeader và CardContent giữ nguyên, không cần thay đổi */}
        <CardHeader className="text-center pb-4">
          <div className="relative mx-auto mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt={name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
              <Star className="h-4 w-4 text-white fill-current" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 min-h-[1.75rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-1 min-h-[1.25rem]">
              {title}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs min-h-[1rem]">
              {degree}
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex-1 px-6 pb-4">
          <div className="mb-4">
            
            
          </div>
          {social && (
            <div className="flex justify-center space-x-3">
              {/* Social links... */}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 px-6">
          {/* BƯỚC 2: SỬ DỤNG `linkPrefix` ĐỂ TẠO ĐƯỜNG DẪN ĐỘNG */}
          <Link href={`/${linkPrefix}/${slug || id}`} className="w-full">
            <Button className="w-full bg-[#095095] hover:bg-[#074074] text-white group/btn">
  Xem hồ sơ
  <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
</Button>

          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default MentorCard