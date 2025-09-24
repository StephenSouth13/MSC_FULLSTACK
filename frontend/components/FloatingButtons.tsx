"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, MessageCircle, Phone, Facebook, Zap, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Chatbot from "./Chatbot"

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

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
      color: "from-blue-600 to-blue-800",
      action: () => window.open("https://facebook.com/msccenter", "_blank"),
    },
    {
      icon: Zap,
      label: "Zalo",
      color: "from-blue-400 to-cyan-600",
      action: () => window.open("https://zalo.me/msccenter", "_blank"),
    },
    {
      icon: Phone,
      label: "Hotline",
      color: "from-green-500 to-green-700",
      action: () => window.open("tel:(+84) 329 381 489", "_self"),
    },
  ]

  const buttonVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: i * 0.05,
      },
    }),
    exit: { opacity: 0, x: 50, scale: 0.8 },
    hover: { scale: 1.1, x: -5 },
    tap: { scale: 0.95 },
  }

  const tooltipVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <>
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end space-y-3">

        {/* Action Buttons Container */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                }
              }}
              className="flex flex-col space-y-3"
            >
              {socialButtons.map((button, index) => (
                <motion.div
                  key={button.label}
                  variants={buttonVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative"
                >
                  <Button
                    size="icon"
                    className={`w-12 h-12 rounded-full shadow-md transition-all duration-300 relative overflow-hidden
                               bg-gradient-to-br ${button.color}
                               hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                    onClick={button.action}
                  >
                    <button.icon className="h-6 w-6 text-white" />
                  </Button>

                  {/* Tooltip */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={tooltipVariants}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  >
                    <div className="bg-gray-800/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg">
                      {button.label}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800/90"></div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Chatbot Button */}
              <motion.div
                variants={buttonVariants}
                custom={socialButtons.length}
                whileHover="hover"
                whileTap="tap"
                className="group relative"
              >
                <Button
                  size="icon"
                  className={`w-14 h-14 rounded-full shadow-md transition-all duration-300 relative overflow-hidden
                             bg-gradient-to-br from-orange-500 to-pink-500
                             hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                  onClick={() => setShowChatbot(!showChatbot)}
                >
                  <MessageCircle className="h-7 w-7 text-white" />
                </Button>

                {/* Tooltip */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tooltipVariants}
                  className="absolute right-18 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                >
                  <div className="bg-gray-800/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg">
                    MSC Assistant
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800/90"></div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Scroll to Top Button */}
              <AnimatePresence>
                {showScrollTop && (
                  <motion.div
                    variants={buttonVariants}
                    custom={socialButtons.length + 1}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover="hover"
                    whileTap="tap"
                    className="group relative"
                  >
                    <Button
                      size="icon"
                      className={`w-12 h-12 rounded-full shadow-md transition-all duration-300 relative overflow-hidden
                                 bg-gradient-to-br from-indigo-500 to-purple-600
                                 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                      onClick={scrollToTop}
                    >
                      <ArrowUp className="h-6 w-6 text-white" />
                    </Button>
                    {/* Tooltip */}
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={tooltipVariants}
                      className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    >
                      <div className="bg-gray-800/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg">
                        Lên đầu trang
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800/90"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse/Expand Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-50"
        >
          <Button
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 shadow-xl transition-all duration-300 p-0 border-2 border-white/20 hover:from-gray-600 hover:to-gray-800"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isCollapsed ? "up" : "down"}
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isCollapsed ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>

      </div>

      {/* Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 z-50 origin-bottom-right"
          >
            <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingButtons