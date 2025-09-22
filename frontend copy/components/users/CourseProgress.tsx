"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Clock,
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  Calendar,
  Filter,
  Search,
  Star,
  Users,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface Course {
  id: string
  title: string
  instructor: string
  thumbnail: string
  category: string
  level: string
  progress: number
  completedLessons: number
  totalLessons: number
  duration: number
  lastAccessed: string
  rating: number
  enrolledStudents: number
  certificate?: {
    id: string
    issuedAt: string
    url: string
  }
  status: "not_started" | "in_progress" | "completed"
}

const CourseProgress = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const courses: Course[] = [
    {
      id: "1",
      title: "Advanced React Patterns & Performance",
      instructor: "Nguyễn Minh Khôi",
      thumbnail: "/placeholder.svg?height=200&width=300&text=React+Course",
      category: "Frontend Development",
      level: "Advanced",
      progress: 100,
      completedLessons: 24,
      totalLessons: 24,
      duration: 18,
      lastAccessed: "2024-01-20T09:00:00Z",
      rating: 4.9,
      enrolledStudents: 1250,
      certificate: {
        id: "cert-001",
        issuedAt: "2024-01-20T10:00:00Z",
        url: "/certificates/react-advanced.pdf",
      },
      status: "completed",
    },
    {
      id: "2",
      title: "Full-Stack TypeScript Development",
      instructor: "Trần Thị Mai",
      thumbnail: "/placeholder.svg?height=200&width=300&text=TypeScript+Course",
      category: "Full-Stack Development",
      level: "Intermediate",
      progress: 65,
      completedLessons: 13,
      totalLessons: 20,
      duration: 25,
      lastAccessed: "2024-01-19T15:30:00Z",
      rating: 4.8,
      enrolledStudents: 890,
      status: "in_progress",
    },
    {
      id: "3",
      title: "AWS Cloud Architecture Fundamentals",
      instructor: "Lê Hoàng Nam",
      thumbnail: "/placeholder.svg?height=200&width=300&text=AWS+Course",
      category: "Cloud Computing",
      level: "Beginner",
      progress: 30,
      completedLessons: 6,
      totalLessons: 20,
      duration: 22,
      lastAccessed: "2024-01-18T11:00:00Z",
      rating: 4.7,
      enrolledStudents: 2100,
      status: "in_progress",
    },
    {
      id: "4",
      title: "Machine Learning with Python",
      instructor: "Phạm Văn Đức",
      thumbnail: "/placeholder.svg?height=200&width=300&text=ML+Course",
      category: "Data Science",
      level: "Intermediate",
      progress: 0,
      completedLessons: 0,
      totalLessons: 28,
      duration: 35,
      lastAccessed: "2024-01-15T08:00:00Z",
      rating: 4.6,
      enrolledStudents: 1580,
      status: "not_started",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
      case "progress":
        return b.progress - a.progress
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "not_started":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "in_progress":
        return "Đang học"
      case "not_started":
        return "Chưa bắt đầu"
      default:
        return "Không xác định"
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Vừa xong"
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} ngày trước`
  }

  return (
    <div className="space-y-6">
      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {courses.filter((c) => c.status === "completed").length}
          </div>
          <div className="text-sm text-gray-600">Hoàn thành</div>
        </Card>

        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Play className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {courses.filter((c) => c.status === "in_progress").length}
          </div>
          <div className="text-sm text-gray-600">Đang học</div>
        </Card>

        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {courses.reduce((total, course) => total + course.duration, 0)}
          </div>
          <div className="text-sm text-gray-600">Tổng giờ học</div>
        </Card>

        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">{courses.filter((c) => c.certificate).length}</div>
          <div className="text-sm text-gray-600">Chứng chỉ</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Khóa học của tôi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="in_progress">Đang học</SelectItem>
                <SelectItem value="not_started">Chưa bắt đầu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <TrendingUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Gần đây nhất</SelectItem>
                <SelectItem value="progress">Tiến độ</SelectItem>
                <SelectItem value="title">Tên khóa học</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getStatusColor(course.status)}>{getStatusText(course.status)}</Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {course.level}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">Giảng viên: {course.instructor}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.enrolledStudents.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}h</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Tiến độ</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {course.completedLessons}/{course.totalLessons} bài học
                        </p>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Truy cập: {formatTimeAgo(course.lastAccessed)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      {course.status === "completed" && course.certificate ? (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Award className="h-4 w-4 mr-2" />
                          Xem chứng chỉ
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1 btn-primary">
                          <Play className="h-4 w-4 mr-2" />
                          {course.status === "not_started" ? "Bắt đầu học" : "Tiếp tục học"}
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {sortedCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
              <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseProgress
