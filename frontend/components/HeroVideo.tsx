"use client"
import Link from 'next/link';
import { motion } from "framer-motion"
import { ChevronDown, Play, Pause } from "lucide-react"
import { useState, useRef } from "react"
import { useLanguage } from '@/components/language-provider'

const HeroVideo = () => {
  // Add error boundary or conditional check
  let language = 'vi'; // default fallback
  let t = (key: string) => key; // fallback translation function
  
  try {
    const context = useLanguage();
    language = context.language;
    t = context.t;
  } catch (error) {
    console.warn('LanguageProvider not available, using fallback');
  }

  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=1080&width=1920&text=MSC+Center+Video+Poster"
        >
          <source src="/Intro.mp4" type="video/mp4" />
          {/* Fallback gradient background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
              `,
            }}
          />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Animated waves overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent transform skew-y-12 animate-pulse delay-1000" />
        </div>
      </div>

      {/* Video Controls */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={toggleVideo}
        className="absolute top-6 right-6 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
      >
        {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white ml-1" />}
      </motion.button>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo 
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="mx-auto w-96 h-32 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">MSC CENTER</h1>
                <p className="text-lg text-gray-200">Life Long Learning</p>
              </div>
            </div>
          </motion.div> */}

          {/* Title 
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif"
          >
            {t("hero.title")}
          </motion.h2>*/}

          {/* Subtitle 
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>*/}

           
        </motion.div>
      </div>
    </section>
  )
}

export default HeroVideo
