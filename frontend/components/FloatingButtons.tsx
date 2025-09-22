"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, MessageCircle, Phone, Facebook, Zap, Sparkles, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Chatbot from "./Chatbot"

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialButtons = [
    {
      icon: Facebook,
      label: "Facebook",
      color: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      action: () => window.open("https://facebook.com/msccenter", "_blank"),
    },
    {
      icon: Zap,
      label: "Zalo",
      color: "from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600",
      action: () => window.open("https://zalo.me/msccenter", "_blank"),
    },
    {
      icon: Phone,
      label: "Hotline",
      color: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
      action: () => window.open("tel:(+84) 329 381 489", "_self"),
    },
  ]

  return (
    <>
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end space-y-3">
        {/* Collapse/Expand Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 p-0 border-2 border-white/20"
          >
            {isCollapsed ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </motion.div>

        {/* Social Media Buttons */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-2"
            >
              {socialButtons.map((button, index) => (
                <motion.div
                  key={button.label}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <Button
                    size="sm"
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${button.color} shadow-lg hover:shadow-xl transition-all duration-300 p-0 border-2 border-white/20`}
                    onClick={button.action}
                  >
                    <button.icon className="h-6 w-6" />
                  </Button>

                  {/* Tooltip */}
                  <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                      {button.label}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chatbot Button */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <Button
                size="sm"
                className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 p-0 border-2 border-white/20 relative overflow-hidden"
                onClick={() => setShowChatbot(!showChatbot)}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <MessageCircle className="h-7 w-7 relative z-10" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="h-2 w-2 text-yellow-600" />
                </motion.div>
              </Button>

              {/* Tooltip */}
              <div className="absolute right-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  MSC Assistant
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <Button
                size="sm"
                className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0 border-2 border-white/20"
                onClick={scrollToTop}
              >
                <ArrowUp className="h-6 w-6" />
              </Button>

              {/* Tooltip */}
              <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  Lên đầu trang
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 z-50"
          >
            <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingButtons
