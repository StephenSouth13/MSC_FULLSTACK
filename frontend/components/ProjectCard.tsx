"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  category: string
  mentors: Array<{
    name: string
    avatar: string
  }>
}

const ProjectCard = ({ id, title, description, image, category, mentors }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        {/* Image Header */}
        <div className="relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white">
            {category}
          </Badge>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
            {description}
          </p>

          {/* Mentors */}
          <div className="mt-4 flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <div className="flex -space-x-2">
              {mentors.slice(0, 3).map((mentor, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
                >
                  <Image
                    src={mentor.avatar || "/placeholder.svg"}
                    alt={mentor.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {mentors.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    +{mentors.length - 3}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 ml-2">
              {mentors.length} mentor{mentors.length > 1 ? "s" : ""}
            </span>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Link href={`/du-an/${id}`} className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white group/btn">
              Xem chi tiết
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ProjectCard
