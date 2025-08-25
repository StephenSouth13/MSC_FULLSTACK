"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ArrowUp, MessageSquareText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Chatbot from "./Chatbot" // Đảm bảo component này nhận prop onClose

// --- ICON SVG CHUẨN THƯƠNG HIỆU ---
const FacebookIcon = ({ className }: { className?: string }) => ( <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" /></svg> )
const LinkedInIcon = ({ className }: { className?: string }) => ( <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-8 15V10H8v8h3zm-1.5-9.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5zM17 18h-3v-3.75c0-1.07-.39-1.8-1.35-1.8-.76 0-1.15.51-1.34.99-.07.17-.09.41-.09.65V18h-3V10h3v1.32c.4-.75 1.35-1.29 2.7-1.29 2.98 0 3.49 1.96 3.49 4.51V18z" /></svg> )
const YouTubeIcon = ({ className }: { className?: string }) => ( <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M21.582 7.376c-.22-1.204-1.22-2.2-2.427-2.427C17.505 4.5 12 4.5 12 4.5s-5.505 0-7.155.449c-1.207.227-2.207 1.223-2.427 2.427C2 8.926 2 12 2 12s0 3.074.449 4.624c.22 1.204 1.22 2.2 2.427 2.427C6.495 19.5 12 19.5 12 19.5s5.505 0 7.155-.449c1.207-.227 2.207-1.223 2.427-2.427C22 15.074 22 12 22 12s0-3.074-.418-4.624zM9.5 15.5v-7L15.5 12l-6 3.5z" /></svg> )
const PlusIcon = ({ className }: { className?: string }) => ( <svg fill="currentColor" viewBox="0 0 20 20" className={className}><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg> )

// --- ANIMATION VARIANTS TINH TẾ ---
const listVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const itemVariants = (index: number): Variants => ({
  hidden: { opacity: 0, y: 10, x: 10 },
  visible: { 
    opacity: 1, y: -(index * 76 + 76),
    transition: { type: "spring", stiffness: 400, damping: 25 } 
  },
})

// --- COMPONENT CHÍNH ---
const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // --- DỮ LIỆU SỬ DỤNG CLASS MÀU ĐÃ ĐỊNH NGHĨA TRONG CONFIG ---
  const actionButtons = [
    { name: 'Chat với MSC Assistant', icon: MessageSquareText, hoverColor: 'group-hover:text-social-msc-assistant', action: () => setShowChatbot(true) },
    { name: 'Facebook', href: 'https://www.facebook.com/msc.edu.vn', icon: FacebookIcon, hoverColor: 'group-hover:text-social-facebook' },
    { name: 'LinkedIn', href: '#', icon: LinkedInIcon, hoverColor: 'group-hover:text-social-linkedin' },
    { name: 'YouTube', href: '#', icon: YouTubeIcon, hoverColor: 'group-hover:text-social-youtube' },
  ]

  return (
    <>
      <div className="fixed right-5 bottom-5 z-40">
        <AnimatePresence>
          {showScrollTop && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="group relative mt-4">
              <Button size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-neutral-700" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <ArrowUp className="h-6 w-6 text-neutral-500 transition-colors duration-300 group-hover:text-primary dark:text-neutral-400" />
              </Button>
              <Tooltip text="Lên đầu trang" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div className="relative mt-4 flex items-end flex-col gap-y-4" variants={listVariants} initial="hidden" animate={isMenuOpen ? "visible" : "hidden"}>
          <Button size="icon" className="h-16 w-16 rounded-2xl shadow-xl bg-neutral-800 text-white transition-all duration-300 hover:bg-neutral-900 hover:shadow-2xl dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-white z-10" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Đóng menu" : "Mở menu liên hệ"}>
            <motion.div animate={{ rotate: isMenuOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <PlusIcon className="h-6 w-6" />
            </motion.div>
          </Button>

          {actionButtons.map((button, index) => (
            <motion.div key={button.name} variants={itemVariants(index)} className="group absolute bottom-0">
              <Button asChild={!!button.href} size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-neutral-700" onClick={button.action}>
                {button.href ? (
                  <Link href={button.href} target="_blank" rel="noopener noreferrer" aria-label={button.name}>
                    <button.icon className={`h-7 w-7 text-neutral-500 transition-colors duration-300 dark:text-neutral-400 ${button.hoverColor}`} />
                  </Link>
                ) : (
                  <button.icon className={`h-7 w-7 text-neutral-500 transition-colors duration-300 dark:text-neutral-400 ${button.hoverColor}`} />
                )}
              </Button>
              <Tooltip text={button.name} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {showChatbot && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed bottom-5 right-5 z-50">
            <Chatbot onClose={() => setShowChatbot(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Tooltip = ({ text }: { text: string }) => {
  return (
    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 bg-neutral-800 text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md dark:bg-neutral-600">
      {text}
      <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-neutral-800 border-y-4 border-y-transparent h-0 w-0 dark:border-l-neutral-600"></div>
    </div>
  )
}

export default FloatingButtons