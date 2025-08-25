"use client"

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  FileText, 
  Users, 
  UserCheck, 
  Clock, 
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { apiClient } from '@/lib/api'
import { DashboardStats } from '@/types'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user, canManageContent } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/login')
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (canManageContent) {
          const response = await apiClient.getDashboardStats()
          setStats(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    if (isAuthenticated && canManageContent) {
      fetchStats()
    } else {
      setStatsLoading(false)
    }
  }, [isAuthenticated, canManageContent])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const statCards = [
    {
      title: "Tổng khóa học",
      value: stats?.total_courses || 0,
      icon: BookOpen,
      description: "Khóa học trên hệ thống",
      color: "text-blue-600"
    },
    {
      title: "Tổng bài viết",
      value: stats?.total_posts || 0,
      icon: FileText,
      description: "Bài viết đã xuất bản",
      color: "text-green-600"
    },
    {
      title: "Tổng học viên",
      value: stats?.total_users || 0,
      icon: Users,
      description: "Học viên đã đăng ký",
      color: "text-purple-600"
    },
    {
      title: "Tổng đăng ký",
      value: stats?.total_enrollments || 0,
      icon: UserCheck,
      description: "Lượt đăng ký khóa học",
      color: "text-orange-600"
    },
    {
      title: "Chờ phê duyệt",
      value: stats?.pending_reviews || 0,
      icon: Clock,
      description: "Nội dung cần duyệt",
      color: "text-yellow-600"
    },
    {
      title: "Doanh thu",
      value: `${stats?.revenue?.toLocaleString('vi-VN') || 0} ₫`,
      icon: DollarSign,
      description: "Tổng doanh thu",
      color: "text-green-600"
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Chào mừng trở lại, {user?.name}! 
            {user?.roles && user.roles.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {user.roles.map(role => role.name).join(', ')}
              </Badge>
            )}
          </p>
        </div>

        {/* Stats Cards */}
        {canManageContent && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? (
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Hoạt động gần đây
              </CardTitle>
              <CardDescription>
                Các hành động mới nhất trên hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Khóa học mới được tạo</p>
                    <p className="text-xs text-muted-foreground">2 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Bài viết được phê duyệt</p>
                    <p className="text-xs text-muted-foreground">5 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Học viên mới đăng ký</p>
                    <p className="text-xs text-muted-foreground">1 ngày trước</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Cần chú ý
              </CardTitle>
              <CardDescription>
                Các vấn đề cần được xử lý
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.pending_reviews && stats.pending_reviews > 0 ? (
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {stats.pending_reviews} nội dung chờ phê duyệt
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cần xem xét và phê duyệt
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Không có vấn đề cần chú ý
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
