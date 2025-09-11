"use client"

import { useAuth } from "@/contexts/auth-context"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  User, Mail, Calendar, BookOpen, Award, Users, TrendingUp, 
  Play, Clock, Star, Target, MessageSquare, Bell, Settings,
  ChevronRight, Zap, Trophy, Heart, Coffee, Brain,
  Code, Palette, Database, Globe, Smartphone, Server
} from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium text-gray-600 dark:text-gray-300">Đang tải trang chủ...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Chào mừng đến với MSC Center
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Hệ thống học tập trực tuyến hàng đầu Việt Nam. Đăng nhập để bắt đầu hành trình học tập của bạn.
            </p>
            <div className="space-x-4">
              <Link href="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">
                  Đăng ký ngay
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') {
      return 'U'
    }
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getCurrentTime = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Chào buổi sáng"
    if (hour < 18) return "Chào buổi chiều"
    return "Chào buổi tối"
  }

  const stats = [
    { icon: <BookOpen className="h-6 w-6" />, label: "Khóa học đã tham gia", value: "8", total: 12, color: "text-blue-600", bg: "bg-blue-100" },
    { icon: <Trophy className="h-6 w-6" />, label: "Chứng chỉ đạt được", value: "3", total: 8, color: "text-green-600", bg: "bg-green-100" },
    { icon: <Target className="h-6 w-6" />, label: "Dự án hoàn thành", value: "5", total: 8, color: "text-purple-600", bg: "bg-purple-100" },
    { icon: <TrendingUp className="h-6 w-6" />, label: "Điểm trung bình", value: "8.7", total: 10, color: "text-orange-600", bg: "bg-orange-100" }
  ]

  const recentCourses = [
    {
      id: 1,
      title: "React & Next.js Masterclass",
      instructor: "Quách Thành Long",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      thumbnail: "/courses/react.webp",
      category: "Frontend",
      level: "Nâng cao",
      duration: "45h",
      rating: 4.8
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      instructor: "Nguyễn Tuấn Dũng",
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      thumbnail: "/courses/nodejs.webp",
      category: "Backend",
      level: "Trung bình",
      duration: "38h",
      rating: 4.9
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Lê Minh Tân",
      progress: 30,
      totalLessons: 20,
      completedLessons: 6,
      thumbnail: "/courses/uiux.webp",
      category: "Design",
      level: "Cơ bản",
      duration: "25h",
      rating: 4.7
    }
  ]

  const popularCourses = [
    { title: "Python for Data Science", students: 1234, icon: <Brain className="h-5 w-5" />, category: "Data Science" },
    { title: "Mobile App Development", students: 987, icon: <Smartphone className="h-5 w-5" />, category: "Mobile" },
    { title: "Web Security & Penetration", students: 756, icon: <Server className="h-5 w-5" />, category: "Security" },
    { title: "Digital Marketing Strategy", students: 654, icon: <Globe className="h-5 w-5" />, category: "Marketing" }
  ]

  const achievements = [
    { title: "Learner of the Month", description: "Hoàn thành 5 khóa học trong tháng", icon: <Star className="h-5 w-5" />, date: "Tháng 8, 2024" },
    { title: "Code Master", description: "Hoàn thành 100 bài tập coding", icon: <Code className="h-5 w-5" />, date: "Tháng 7, 2024" },
    { title: "Team Player", description: "Tham gia 3 dự án nhóm", icon: <Users className="h-5 w-5" />, date: "Tháng 6, 2024" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                MSC Center
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm">
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white border-0 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
            
            <CardContent className="p-8 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-20 w-20 border-4 border-white/20">
                      <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        {getCurrentTime()}, {user.fullName}! 👋
                      </h1>
                      <div className="flex items-center space-x-6 text-blue-100">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Tham gia từ tháng 3, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-100 text-lg mb-6 max-w-2xl">
                    Hôm nay là một ngày tuyệt vời để học điều gì đó mới! Bạn đã hoàn thành <span className="font-bold text-white">68%</span> mục tiêu học tập tuần này.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                      <Play className="h-4 w-4 mr-2" />
                      Tiếp tục học
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Xem lộ trình
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Zap className="h-16 w-16 text-yellow-300" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      / {stat.total}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-3">
                  {stat.label}
                </p>
                <Progress 
                  value={(parseInt(stat.value) / stat.total) * 100} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span>Tiếp tục học tập</span>
                  </CardTitle>
                  <Link href="/dao-tao">
                    <Button variant="ghost" size="sm">
                      Xem tất cả
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCourses.map((course, index) => (
                      <div key={course.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{Math.round(course.progress)}%</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {course.title}
                            </h3>
                            <Badge variant="secondary">{course.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <span>Bởi {course.instructor}</span>
                            <span>•</span>
                            <span>{course.completedLessons}/{course.totalLessons} bài</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Popular Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <span>Khóa học phổ biến</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {popularCourses.map((course, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                          {course.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <Users className="h-3 w-3" />
                            <span>{course.students.toLocaleString()} học viên</span>
                            <Badge variant="outline" className="text-xs">{course.category}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Learning Streak */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">7 ngày</h3>
                    <p className="text-orange-100 text-sm mb-4">Chuỗi học tập liên tục</p>
                    <p className="text-orange-100 text-xs">
                      Tuyệt vời! Bạn đang duy trì thói quen học tập tốt. Hãy tiếp tục!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span>Thành tích gần đây</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {achievement.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dao-tao" className="block">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Khám phá khóa học mới
                    </Button>
                  </Link>
                  <Link href="/mentors" className="block">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Tìm mentor
                    </Button>
                  </Link>
                  <Link href="/profile" className="block">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Cập nhật hồ sơ
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                    size="sm"
                    onClick={logout}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Study Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-indigo-600" />
                <span>Mục tiêu học tập tuần này</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">12h / 15h</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Thời gian học</p>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">8 / 10 bài</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Bài học hoàn thành</p>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">2 / 3 dự án</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Dự án hoàn thành</p>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
