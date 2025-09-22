"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface MentorCardProps {
  id: string
  slug?: string
  name: string
  title: string
  degree: string
  avatar: string
  linkPrefix?: "mentors" | "mscers"
}

export default function MentorCard({
  id,
  slug,
  name,
  title,
  degree,
  avatar,
  linkPrefix = "mentors",
}: MentorCardProps) {
  return (
    <Link href={`/${linkPrefix}/${slug || id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="text-center cursor-pointer"
      >
        <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          {name}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
          {title}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {degree}
        </p>
      </motion.div>
    </Link>
  )
}
