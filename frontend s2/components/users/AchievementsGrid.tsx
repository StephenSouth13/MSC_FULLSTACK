"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Zap, Target, Award, Crown, Gem, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
  rarity: "common" | "rare" | "epic" | "legendary"
  category: string
  progress?: number
  maxProgress?: number
  isUnlocked: boolean
}

interface AchievementsGridProps {
  achievements: Achievement[]
}

const AchievementsGrid = ({ achievements }: AchievementsGridProps) => {
  const allAchievements: Achievement[] = [
    // Earned achievements
    {
      id: "1",
      name: "First Steps",
      description: "Hoàn thành khóa học đầu tiên",
      icon: "🎯",
      earnedAt: "2023-02-01",
      rarity: "common",
      category: "Learning",
      isUnlocked: true,
    },
    {
      id: "2",
      name: "Speed Demon",
      description: "Hoàn thành 5 bài học trong 1 ngày",
      icon: "⚡",
      earnedAt: "2023-03-15",
      rarity: "rare",
      category: "Performance",
      isUnlocked: true,
    },
    {
      id: "3",
      name: "Knowledge Seeker",
      description: "Đạt 100 giờ học tập",
      icon: "🧠",
      earnedAt: "2023-06-20",
      rarity: "epic",
      category: "Dedication",
      isUnlocked: true,
    },
    {
      id: "4",
      name: "Master Learner",
      description: "Hoàn thành 10 khóa học",
      icon: "👑",
      earnedAt: "2023-12-01",
      rarity: "legendary",
      category: "Mastery",
      isUnlocked: true,
    },
    {
      id: "5",
      name: "Perfect Score",
      description: "Đạt 100% trong 3 bài quiz liên tiếp",
      icon: "🌟",
      earnedAt: "2023-08-10",
      rarity: "rare",
      category: "Excellence",
      isUnlocked: true,
    },
    {
      id: "6",
      name: "Night Owl",
      description: "Học tập sau 11 giờ đêm trong 7 ngày",
      icon: "🦉",
      earnedAt: "2023-09-05",
      rarity: "common",
      category: "Dedication",
      isUnlocked: true,
    },
    // Locked achievements
    {
      id: "7",
      name: "Streak Master",
      description: "Học tập liên tục 30 ngày",
      icon: "🔥",
      earnedAt: "",
      rarity: "epic",
      category: "Consistency",
      progress: 15,
      maxProgress: 30,
      isUnlocked: false,
    },
    {
      id: "8",
      name: "Code Warrior",
      description: "Hoàn thành 50 bài tập coding",
      icon: "⚔️",
      earnedAt: "",
      rarity: "rare",
      category: "Practice",
      progress: 23,
      maxProgress: 50,
      isUnlocked: false,
    },
    {
      id: "9",
      name: "Mentor's Pride",
      description: "Nhận đánh giá 5 sao từ mentor",
      icon: "💎",
      earnedAt: "",
      rarity: "legendary",
      category: "Recognition",
      progress: 0,
      maxProgress: 1,
      isUnlocked: false,
    },
    {
      id: "10",
      name: "Community Helper",
      description: "Giúp đỡ 20 học viên khác trong forum",
      icon: "🤝",
      earnedAt: "",
      rarity: "epic",
      category: "Community",
      progress: 7,
      maxProgress: 20,
      isUnlocked: false,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common":
        return <Shield className="h-4 w-4" />
      case "rare":
        return <Star className="h-4 w-4" />
      case "epic":
        return <Gem className="h-4 w-4" />
      case "legendary":
        return <Crown className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Learning":
        return <Target className="h-4 w-4" />
      case "Performance":
        return <Zap className="h-4 w-4" />
      case "Dedication":
        return <Award className="h-4 w-4" />
      case "Mastery":
        return <Crown className="h-4 w-4" />
      case "Excellence":
        return <Star className="h-4 w-4" />
      case "Consistency":
        return <Trophy className="h-4 w-4" />
      case "Practice":
        return <Target className="h-4 w-4" />
      case "Recognition":
        return <Gem className="h-4 w-4" />
      case "Community":
        return <Shield className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const unlockedAchievements = allAchievements.filter((a) => a.isUnlocked)
  const lockedAchievements = allAchievements.filter((a) => !a.isUnlocked)

  const achievementStats = {
    total: allAchievements.length,
    unlocked: unlockedAchievements.length,
    common: unlockedAchievements.filter((a) => a.rarity === "common").length,
    rare: unlockedAchievements.filter((a) => a.rarity === "rare").length,
    epic: unlockedAchievements.filter((a) => a.rarity === "epic").length,
    legendary: unlockedAchievements.filter((a) => a.rarity === "legendary").length,
  }

  return (
    <div className="space-y-6">
      {/* Achievement Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{achievementStats.unlocked}</div>
          <div className="text-sm text-gray-600">Đã mở khóa</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-gray-600">{achievementStats.common}</div>
          <div className="text-sm text-gray-600">Thường</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{achievementStats.rare}</div>
          <div className="text-sm text-gray-600">Hiếm</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{achievementStats.epic}</div>
          <div className="text-sm text-gray-600">Sử thi</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-yellow-600">{achievementStats.legendary}</div>
          <div className="text-sm text-gray-600">Huyền thoại</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">
            {Math.round((achievementStats.unlocked / achievementStats.total) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Hoàn thành</div>
        </Card>
      </div>

      {/* Unlocked Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Thành tựu đã đạt được ({unlockedAchievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl flex-shrink-0">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{achievement.name}</h3>
                          <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {getRarityIcon(achievement.rarity)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(achievement.category)}
                            <span>{achievement.category}</span>
                          </div>
                          <span>{formatDate(achievement.earnedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-gray-600" />
            Thành tựu chưa đạt được ({lockedAchievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl flex-shrink-0 grayscale">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-700 truncate">{achievement.name}</h3>
                          <Badge className={`text-xs ${getRarityColor(achievement.rarity)} opacity-60`}>
                            {getRarityIcon(achievement.rarity)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>

                        {achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">Tiến độ</span>
                              <span className="font-medium text-gray-700">
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          {getCategoryIcon(achievement.category)}
                          <span>{achievement.category}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AchievementsGrid
