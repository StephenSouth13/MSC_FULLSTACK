"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { X, Send, Bot, User, Minimize2, Maximize2, RotateCcw, GripVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// --- SỬA 1: Định nghĩa các props mà component này sẽ nhận ---
interface ChatbotProps {
  onClose: () => void; // Bắt buộc phải có một hàm để thông báo cho component cha khi cần đóng
}

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface QuickReply {
  id: string
  text: string
  response: string
}

// --- SỬA 2: Nhận prop `onClose` ---
const Chatbot = ({ onClose }: ChatbotProps) => {
  // --- SỬA 3: Loại bỏ state `isOpen` vì component cha sẽ quản lý việc này ---
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Xin chào! Tôi là MSC Assistant 🤖\n\nTôi có thể giúp bạn:\n• Tìm hiểu về các khóa học\n• Thông tin về mentors\n• Hỗ trợ kỹ thuật\n• Tư vấn lộ trình học tập\n\nBạn cần hỗ trợ gì hôm nay?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  
  // (Tất cả các hàm xử lý logic bên trong như handleSendMessage, getBotResponse... giữ nguyên)
  const quickReplies: QuickReply[] = [
    {
      id: "courses",
      text: "📚 Khóa học nào phù hợp với tôi?",
      response:
        "Tuyệt vời! Để tư vấn khóa học phù hợp nhất, bạn có thể cho tôi biết:\n\n🎯 Mục tiêu học tập của bạn?\n💼 Kinh nghiệm hiện tại?\n⏰ Thời gian có thể dành để học?\n\nHoặc bạn có thể xem danh sách khóa học tại mục Đào tạo",
    },
    {
      id: "mentors",
      text: "👨‍🏫 Thông tin về mentors",
      response:
        "MSC Center có đội ngũ mentors giàu kinh nghiệm:\n\n⭐ 50+ mentors chuyên nghiệp\n🏢 Từ các công ty hàng đầu\n🎓 Kinh nghiệm 5-15 năm\n💡 Chuyên môn đa dạng\n\nXem chi tiết tại: /mentors\n\nBạn muốn tìm mentor theo lĩnh vực nào?",
    },
    {
      id: "support",
      text: "🔧 Hỗ trợ kỹ thuật",
      response:
        "Tôi có thể hỗ trợ bạn:\n\n🔐 Vấn đề đăng nhập\n📱 Lỗi trên mobile/desktop\n🎥 Không xem được video\n📊 Theo dõi tiến độ học\n💳 Thanh toán khóa học\n\nVui lòng mô tả chi tiết vấn đề bạn gặp phải!",
    },
  ]
   const botResponses = {
    greeting: [
      "Xin chào! Tôi có thể giúp gì cho bạn? 😊",
      "Chào bạn! Rất vui được hỗ trợ bạn hôm nay! 🌟",
      "Hello! Tôi là MSC Assistant, sẵn sàng giúp đỡ bạn! 🤖",
    ],
    thanks: [
      "Không có gì! Tôi luôn sẵn sàng hỗ trợ bạn! 😊",
      "Rất vui được giúp đỡ bạn! Còn gì khác không? 🌟",
      "Cảm ơn bạn! Hãy liên hệ bất cứ khi nào cần hỗ trợ! 💙",
    ],
    default: [
      "Tôi hiểu bạn đang quan tâm về vấn đề này. Để được hỗ trợ tốt nhất, bạn có thể:\n\n📞 Gọi hotline: (+84) 329 381 489\n📧 Email: msc.edu.vn@gmail.com\n💬 Chat với tư vấn viên\n\nHoặc chọn một trong các câu hỏi phổ biến bên dưới! 👇",
      "Cảm ơn bạn đã liên hệ! Tôi sẽ chuyển yêu cầu của bạn đến đội ngũ chuyên môn để được hỗ trợ tốt nhất.\n\nTrong lúc chờ đợi, bạn có thể tham khảo:\n📚 Khóa học: /dao-tao\n👨‍🏫 Mentors: /mentors\n📝 Blog: /chia-se",
      "Tôi đang học hỏi thêm để trả lời câu hỏi này tốt hơn! 🤖\n\nHiện tại, bạn có thể:\n• Liên hệ trực tiếp qua hotline\n• Gửi email chi tiết\n• Đặt lịch tư vấn miễn phí\n\nTeam MSC sẽ phản hồi trong 24h! ⚡",
    ],
  }
   const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
   useEffect(() => {
    scrollToBottom()
  }, [messages])
   const simulateTyping = () => {
    setIsTyping(true)
    setTimeout(
      () => {
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }
   const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("xin chào") || message.includes("hello") || message.includes("hi")) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
    }

    if (message.includes("cảm ơn") || message.includes("thanks") || message.includes("thank you")) {
      return botResponses.thanks[Math.floor(Math.random() * botResponses.thanks.length)]
    }
    // ... các logic getBotResponse khác ...
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
  }
   const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = { id: Date.now().toString(), text: inputMessage, sender: "user", timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    simulateTyping()

    setTimeout(() => {
        const botResponse: Message = { id: (Date.now() + 1).toString(), text: getBotResponse(inputMessage), sender: "bot", timestamp: new Date() }
        setMessages((prev) => [...prev, botResponse])
      }, 1500 + Math.random() * 1500)
  }

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = { id: Date.now().toString(), text: reply.text, sender: "user", timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    simulateTyping()
    setTimeout(() => {
      const botResponse: Message = { id: (Date.now() + 1).toString(), text: reply.response, sender: "bot", timestamp: new Date() }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        text: "Xin chào! Tôi là MSC Assistant 🤖\n\n...", // nội dung welcome
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }


  return (
    // --- SỬA 4: Loại bỏ toàn bộ phần Floating Chat Button và thẻ AnimatePresence bao ngoài ---
    // Component này bây giờ chỉ là cửa sổ chat.
    <motion.div
      // Loại bỏ các animation `initial`, `animate`, `exit` vì component cha sẽ xử lý
      // Giữ lại các thuộc tính drag
      drag
      dragControls={dragControls}
      dragListener={false} // Chỉ cho phép kéo từ header
      dragMomentum={false}
      className="w-96 max-w-[calc(100vw-2rem)]"
      style={{ height: isMinimized ? "60px" : "600px", transition: 'height 0.3s ease-out' }} // Chuyển animation height qua CSS
    >
      <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl overflow-hidden rounded-2xl">
        {/* Header */}
        <CardHeader 
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 flex-shrink-0 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => dragControls.start(e)} // Cho phép kéo từ header
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-3">
              <Bot className="h-6 w-6" />
              <div>
                <div className="font-semibold">MSC Assistant</div>
                <div className="text-xs text-blue-100">Trực tuyến</div>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={resetChat} className="text-white hover:bg-white/20 h-8 w-8">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:bg-white/20 h-8 w-8">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              {/* --- SỬA 5: Khi nhấn nút X, gọi hàm `onClose` đã được truyền từ cha --- */}
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex-1 flex flex-col min-h-0"
            >
              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  {/* ... (Phần hiển thị tin nhắn giữ nguyên) ... */}
                </ScrollArea>
                {/* Quick Replies & Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                   {/* ... (Phần câu hỏi & input giữ nguyên) ... */}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export default Chatbot