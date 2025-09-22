"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Bug,
  Lightbulb,
  Settings,
  Send,
  Upload,
  X,
  Clock,
  MessageCircle,
  Star,
  ThumbsUp,
  Filter,
  Search,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface FeedbackItem {
  id: string
  type: "bug" | "feature" | "improvement" | "general"
  category: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "resolved" | "closed"
  createdAt: string
  updatedAt: string
  responses: Array<{
    id: string
    message: string
    author: string
    role: string
    createdAt: string
    isInternal: boolean
  }>
  attachments?: string[]
  votes: number
  userVoted: boolean
}

const FeedbackForm = () => {
  const [activeTab, setActiveTab] = useState("new")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    type: "general" as "bug" | "feature" | "improvement" | "general",
    category: "",
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    attachments: [] as File[],
  })

  const [myFeedback] = useState<FeedbackItem[]>([
    {
      id: "1",
      type: "bug",
      category: "Video Player",
      title: "Video không tải được trên Safari",
      description:
        "Khi sử dụng Safari trên macOS, video bài học không thể tải và hiển thị màn hình đen. Vấn đề này xảy ra với tất cả các khóa học.",
      priority: "high",
      status: "in-progress",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-18T14:30:00Z",
      responses: [
        {
          id: "r1",
          message: "Cảm ơn bạn đã báo cáo. Chúng tôi đã xác nhận vấn đề và đang khắc phục.",
          author: "Nguyễn Minh Khôi",
          role: "Technical Support",
          createdAt: "2024-01-16T09:00:00Z",
          isInternal: false,
        },
        {
          id: "r2",
          message:
            "Vấn đề đã được khắc phục trong bản cập nhật mới nhất. Vui lòng thử lại và cho chúng tôi biết kết quả.",
          author: "Trần Thị Mai",
          role: "Developer",
          createdAt: "2024-01-18T14:30:00Z",
          isInternal: false,
        },
      ],
      votes: 12,
      userVoted: true,
    },
    {
      id: "2",
      type: "feature",
      category: "Learning Experience",
      title: "Thêm tính năng ghi chú trong video",
      description: "Mong muốn có thể ghi chú trực tiếp trong video tại thời điểm cụ thể để dễ dàng ôn tập lại sau này.",
      priority: "medium",
      status: "open",
      createdAt: "2024-01-10T15:30:00Z",
      updatedAt: "2024-01-10T15:30:00Z",
      responses: [
        {
          id: "r3",
          message: "Đây là một ý tưởng rất hay! Chúng tôi sẽ đưa vào kế hoạch phát triển cho phiên bản tiếp theo.",
          author: "Lê Hoàng Nam",
          role: "Trưởng phòng CNTT",
          createdAt: "2024-01-12T11:00:00Z",
          isInternal: false,
        },
      ],
      votes: 25,
      userVoted: false,
    },
    {
      id: "3",
      type: "improvement",
      category: "User Interface",
      title: "Cải thiện giao diện mobile",
      description: "Giao diện trên điện thoại còn khó sử dụng, đặc biệt là phần menu và navigation.",
      priority: "medium",
      status: "resolved",
      createdAt: "2024-01-05T08:00:00Z",
      updatedAt: "2024-01-20T16:00:00Z",
      responses: [
        {
          id: "r4",
          message: "Chúng tôi đã cập nhật giao diện mobile với thiết kế responsive mới. Cảm ơn góp ý của bạn!",
          author: "Phạm Văn Đức",
          role: "UI/UX Designer",
          createdAt: "2024-01-20T16:00:00Z",
          isInternal: false,
        },
      ],
      votes: 8,
      userVoted: false,
    },
  ])

  const feedbackTypes = [
    { value: "bug", label: "Báo lỗi", icon: Bug, color: "text-red-600", bgColor: "bg-red-100" },
    { value: "feature", label: "Tính năng mới", icon: Lightbulb, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { value: "improvement", label: "Cải thiện", icon: Settings, color: "text-blue-600", bgColor: "bg-blue-100" },
    { value: "general", label: "Góp ý chung", icon: MessageSquare, color: "text-gray-600", bgColor: "bg-gray-100" },
  ]

  const categories = [
    "Video Player",
    "Learning Experience",
    "User Interface",
    "Performance",
    "Mobile App",
    "Payment",
    "Course Content",
    "Community",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ tiêu đề và mô tả.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Thành công!",
        description: "Góp ý của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất có thể.",
      })

      // Reset form
      setFormData({
        type: "general",
        category: "",
        title: "",
        description: "",
        priority: "medium",
        attachments: [],
      })

      setActiveTab("history")
    } catch (error) {
      toast({
        title: "Lỗi!",
        description: "Không thể gửi góp ý. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({ ...formData, attachments: [...formData.attachments, ...files] })
  }

  const removeFile = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index)
    setFormData({ ...formData, attachments: newAttachments })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-300"
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Mở"
      case "in-progress":
        return "Đang xử lý"
      case "resolved":
        return "Đã giải quyết"
      case "closed":
        return "Đã đóng"
      default:
        return "Không xác định"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInDays = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Hôm nay"
    if (diffInDays === 1) return "Hôm qua"
    if (diffInDays < 7) return `${diffInDays} ngày trước`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} tuần trước`
    return `${Math.floor(diffInDays / 30)} tháng trước`
  }

  const filteredFeedback = myFeedback.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    const matchesType = filterType === "all" || item.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Gửi góp ý mới
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Lịch sử góp ý ({myFeedback.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Gửi góp ý cho bộ phận IT
              </CardTitle>
              <p className="text-sm text-gray-600">Chúng tôi luôn lắng nghe và cải thiện dựa trên phản hồi của bạn</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type Selection */}
                <div className="space-y-3">
                  <Label>Loại góp ý *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {feedbackTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <motion.div key={type.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: type.value as any })}
                            className={`w-full p-4 rounded-lg border-2 transition-all ${
                              formData.type === type.value
                                ? `border-blue-500 ${type.bgColor}`
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 mx-auto mb-2 ${
                                formData.type === type.value ? type.color : "text-gray-400"
                              }`}
                            />
                            <div
                              className={`text-sm font-medium ${
                                formData.type === type.value ? type.color : "text-gray-600"
                              }`}
                            >
                              {type.label}
                            </div>
                          </button>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Mức độ ưu tiên</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Thấp</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                        <SelectItem value="high">Cao</SelectItem>
                        <SelectItem value="urgent">Khẩn cấp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Mô tả ngắn gọn vấn đề hoặc góp ý"
                    maxLength={100}
                  />
                  <p className="text-sm text-gray-500">{formData.title.length}/100 ký tự</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả chi tiết *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả chi tiết vấn đề, các bước tái hiện, hoặc góp ý cải thiện..."
                    rows={6}
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500">{formData.description.length}/1000 ký tự</p>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Đính kèm file (tùy chọn)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Kéo thả file hoặc click để chọn</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Chọn file
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Hỗ trợ: JPG, PNG, PDF, DOC, DOCX (tối đa 10MB)</p>
                  </div>

                  {/* Uploaded Files */}
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>File đã chọn:</Label>
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="btn-primary">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isSubmitting ? "Đang gửi..." : "Gửi góp ý"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        type: "general",
                        category: "",
                        title: "",
                        description: "",
                        priority: "medium",
                        attachments: [],
                      })
                    }
                  >
                    Làm mới
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Lịch sử góp ý của bạn
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm góp ý..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="open">Mở</SelectItem>
                    <SelectItem value="in-progress">Đang xử lý</SelectItem>
                    <SelectItem value="resolved">Đã giải quyết</SelectItem>
                    <SelectItem value="closed">Đã đóng</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Loại góp ý" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="bug">Báo lỗi</SelectItem>
                    <SelectItem value="feature">Tính năng mới</SelectItem>
                    <SelectItem value="improvement">Cải thiện</SelectItem>
                    <SelectItem value="general">Góp ý chung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Feedback List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredFeedback.map((item, index) => {
                    const typeConfig = feedbackTypes.find((t) => t.value === item.type)
                    const TypeIcon = typeConfig?.icon || MessageSquare

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`p-2 rounded-lg ${typeConfig?.bgColor || "bg-gray-100"}`}>
                                <TypeIcon className={`h-5 w-5 ${typeConfig?.color || "text-gray-600"}`} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="font-semibold text-lg text-gray-900 truncate pr-4">{item.title}</h3>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                                    <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                  </div>
                                </div>

                                <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                  <span>#{item.id}</span>
                                  <span>{item.category}</span>
                                  <span>{formatTimeAgo(item.createdAt)}</span>
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{item.responses.length} phản hồi</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{item.votes} vote</span>
                                  </div>
                                </div>

                                {/* Latest Response */}
                                {item.responses.length > 0 && (
                                  <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-sm">
                                        {item.responses[item.responses.length - 1].author}
                                      </span>
                                      <Badge variant="secondary" className="text-xs">
                                        {item.responses[item.responses.length - 1].role}
                                      </Badge>
                                      <span className="text-xs text-gray-500">
                                        {formatTimeAgo(item.responses[item.responses.length - 1].createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                      {item.responses[item.responses.length - 1].message}
                                    </p>
                                  </div>
                                )}

                                <div className="flex items-center justify-between mt-4">
                                  <Button variant="outline" size="sm">
                                    Xem chi tiết
                                  </Button>
                                  {item.status === "resolved" && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-600">Hài lòng với giải pháp?</span>
                                      <Button variant="outline" size="sm">
                                        <Star className="h-4 w-4 mr-1" />
                                        Đánh giá
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {filteredFeedback.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm || filterStatus !== "all" || filterType !== "all"
                        ? "Không tìm thấy góp ý nào"
                        : "Chưa có góp ý nào"}
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm || filterStatus !== "all" || filterType !== "all"
                        ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                        : "Hãy gửi góp ý đầu tiên của bạn!"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FeedbackForm
