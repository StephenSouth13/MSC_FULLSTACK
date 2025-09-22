"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { X, Send, Bot, User, MessageCircle, Minimize2, Maximize2, RotateCcw, GripVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
}

interface QuickReply {
  id: string
  text: string
  response: string
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
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
  const inputRef = useRef<HTMLInputElement>(null)
  const dragControls = useDragControls()

  const quickReplies: QuickReply[] = [
    {
      id: "courses",
      text: "📚 Khóa học nào phù hợp với tôi?",
      response:
        "Tuyệt vời! Để tư vấn khóa học phù hợp nhất, bạn có thể cho tôi biết:\n\n🎯 Mục tiêu học tập của bạn?\n💼 Kinh nghiệm hiện tại?\n⏰ Thời gian có thể dành để học?\n\nHoặc bạn có thể xem danh sách khóa học tại: /dao-tao",
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
    {
      id: "roadmap",
      text: "🗺️ Lộ trình học tập",
      response:
        "MSC Center có các lộ trình học tập:\n\n🚀 Frontend Developer (6 tháng)\n⚙️ Backend Developer (8 tháng)\n📱 Mobile Developer (7 tháng)\n🤖 AI/ML Engineer (10 tháng)\n💼 Trưởng phòng CNTT (4 tháng)\n\nBạn quan tâm lộ trình nào?",
    },
    {
      id: "pricing",
      text: "💰 Học phí và ưu đãi",
      response:
        "Thông tin học phí MSC Center:\n\n💎 Khóa cơ bản: 2-5 triệu VNĐ\n🔥 Khóa nâng cao: 5-10 triệu VNĐ\n🎯 Khóa chuyên sâu: 10-20 triệu VNĐ\n\n🎁 Ưu đãi hiện tại:\n• Giảm 30% cho sinh viên\n• Giảm 20% khi đăng ký sớm\n• Học phí 0đ cho 3 bài đầu\n\nLiên hệ tư vấn: (+84) 329 381 489",
    },
    {
      id: "contact",
      text: "📞 Liên hệ trực tiếp",
      response:
        "Thông tin liên hệ MSC Center:\n\n📧 Email: msc.edu.vn@gmail.com\n📞 Hotline: (+84) 329 381 489\n🏢 Địa chỉ: 279 Nguyễn Tri Phương, Phường Diên Hồng, TP.HCM\n⏰ Giờ làm việc: 8:00 - 22:00\n\n🌐 Website: msc.edu.vn\n📱 Facebook: /msc.edu.vn\n💼 LinkedIn: /company/msc-center",
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

    if (message.includes("khóa học") || message.includes("course")) {
      return quickReplies.find((q) => q.id === "courses")?.response || botResponses.default[0]
    }

    if (message.includes("mentor") || message.includes("giảng viên")) {
      return quickReplies.find((q) => q.id === "mentors")?.response || botResponses.default[0]
    }

    if (message.includes("lỗi") || message.includes("error") || message.includes("bug")) {
      return quickReplies.find((q) => q.id === "support")?.response || botResponses.default[0]
    }

    if (message.includes("học phí") || message.includes("giá") || message.includes("price")) {
      return quickReplies.find((q) => q.id === "pricing")?.response || botResponses.default[0]
    }

    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    simulateTyping()

    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputMessage),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      },
      1500 + Math.random() * 1500,
    )
  }

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply.text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    simulateTyping()

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: reply.response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        text: "Xin chào! Tôi là MSC Assistant 🤖\n\nTôi có thể giúp bạn:\n• Tìm hiểu về các khóa học\n• Thông tin về mentors\n• Hỗ trợ kỹ thuật\n• Tư vấn lộ trình học tập\n\nBạn cần hỗ trợ gì hôm nay?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50"
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            onDrag={(event, info) => {
              setPosition({ x: info.offset.x, y: info.offset.y })
            }}
            style={{ x: position.x, y: position.y }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              >
                <MessageCircle className="h-8 w-8 text-white" />
              </motion.div>

              {/* Notification Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-xs text-white font-bold">1</span>
              </motion.div>

              {/* Pulse Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 animate-ping opacity-20" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "60px" : "600px",
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] md:w-96"
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            onDrag={(event, info) => {
              setPosition({ x: info.offset.x, y: info.offset.y })
            }}
            style={{ x: position.x, y: position.y }}
          >
            <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl overflow-hidden">
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 flex-shrink-0 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-3">
                    <div className="relative">
                      <Bot className="h-6 w-6" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <div className="font-semibold">MSC Assistant</div>
                      <div className="text-xs text-blue-100">Trực tuyến • Phản hồi nhanh</div>
                    </div>
                  </CardTitle>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onPointerDown={(e) => dragControls.start(e)}
                      className="text-white hover:bg-white/20 p-1 h-auto cursor-grab active:cursor-grabbing"
                    >
                      <GripVertical className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="text-white hover:bg-white/20 p-1 h-auto"
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetChat}
                      className="text-white hover:bg-white/20 p-1 h-auto"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 p-1 h-auto"
                    >
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
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] p-3 rounded-2xl ${
                                  message.sender === "user"
                                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-br-md"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"
                                }`}
                              >
                                <div className="flex items-start space-x-2">
                                  {message.sender === "bot" && (
                                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                                  )}
                                  {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                  <div className="flex-1">
                                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                                    <div
                                      className={`text-xs mt-2 ${
                                        message.sender === "user" ? "text-blue-100" : "text-gray-500"
                                      }`}
                                    >
                                      {message.timestamp.toLocaleTimeString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}

                          {/* Typing Indicator */}
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-md">
                                <div className="flex items-center space-x-2">
                                  <Bot className="h-4 w-4 text-blue-600" />
                                  <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <div
                                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                      style={{ animationDelay: "0.1s" }}
                                    />
                                    <div
                                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                      style={{ animationDelay: "0.2s" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>

                      {/* Quick Replies */}
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 mb-2">Câu hỏi phổ biến:</div>
                          <div className="flex flex-wrap gap-2">
                            {quickReplies.slice(0, 3).map((reply) => (
                              <Badge
                                key={reply.id}
                                variant="secondary"
                                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-xs py-1 px-2"
                                onClick={() => handleQuickReply(reply)}
                              >
                                {reply.text}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                          <Input
                            ref={inputRef}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            disabled={isTyping}
                          />
                          <Button
                            type="submit"
                            size="sm"
                            className="px-4 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                            disabled={isTyping || !inputMessage.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
