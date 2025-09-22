// src/components/ProjectCard.tsx

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectType } from "@/lib/data/projects" // Import kiểu dữ liệu từ file data

// Định nghĩa props mà component này nhận vào
interface ProjectCardProps {
  project: ProjectType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 group bg-white dark:bg-neutral-800">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Badge variant="secondary" className="absolute top-4 left-4 bg-white/90 text-gray-800 shadow">
            {project.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {project.title}
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        
        <div className="mt-auto">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Chuyên gia phụ trách:
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {project.mentors.map((mentor) => (
              <div key={mentor.name} className="flex items-center space-x-2">
                <Image 
                  src={mentor.avatar} 
                  alt={mentor.name} 
                  width={28} 
                  height={28} 
                  className="rounded-full border-2 border-white"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{mentor.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Link href={`/du-an/${project.slug}`} className="mt-6">
          <Button className="w-full bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold">
            Xem chi tiết dự án
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}