"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  vi: {
    "nav.about": "Giới thiệu",
    "nav.training": "Đào tạo",
    "nav.projects": "Dự án",
    "nav.mentors": "Mentors",
    "nav.mscer": "MSCer",
    "nav.partners": "Đồng hành",
    "nav.blog": "Chia sẻ",
    "nav.contact": "Liên hệ",
    "nav.login": "Đăng nhập",
    "nav.register": "Đăng ký",
    "nav.profile": "Hồ sơ năng lực",
    "hero.title": "MSC Center – Viện đào tạo kĩ năng",
    "hero.subtitle": "Trung tâm đào tạo và phát triển kỹ năng chuyên nghiệp",
    "hero.cta": "Đăng ký ngay",
    "footer.contact": "Liên hệ",
    "footer.social": "Mạng xã hội",
    "footer.newsletter": "Đăng ký nhận tin",
    "footer.copyright": "© 2025 MSC Center. Phát triển bởi Phòng Công nghệ thông tin",
    "about.learning.title": "HỌC TẬP VÀ NỖ LỰC SUỐT ĐỜI",
    "about.learning.subtitle": "MSC được thành lập bởi những người tâm huyết trong lĩnh vực \"Giáo Dục và Truyền Thừa\" của Việt Nam",
    "about.yolo.title": "#YOLO",
    "about.yolo.subtitle": "You Only Live Once",
    "about.yolo.description": "Chúng ta chỉ sống một lần trên đời, nên hãy sống một cuộc đời thật trọn vẹn!",
    "about.pdca.title": "PDCA",
    "about.pdca.description": "PDCA được MSC ứng dụng để quản lý công việc, vận hành dự án và phát triển cá nhân.",
    "about.kaizen.title": "Kaizen",
    "about.kaizen.description": "Là nền tảng để phát triển mô hình học tập suốt đời và phát triển không giới hạn.",
  },
  en: {
    "nav.about": "About",
    "nav.training": "Training",
    "nav.projects": "Projects",
    "nav.mentors": "Mentors",
    "nav.mscer": "MSCer",
    "nav.partners": "Partners",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.profile": "Profile",
    "hero.title": "MSC Center – Mekong Skill Center",
    "hero.subtitle": "Professional Training and Skill Development Center",
    "hero.cta": "Register Now",
    "footer.contact": "Contact",
    "footer.social": "Social Media",
    "footer.newsletter": "Newsletter",
    "footer.copyright": "© 2025 MSC Center. Developed by IT Department",
    "about.learning.title": "LIFELONG LEARNING AND EFFORT",
    "about.learning.subtitle": "MSC was founded by passionate people in the field of \"Education and Heritage\" of Vietnam",
    "about.yolo.title": "#YOLO",
    "about.yolo.subtitle": "You Only Live Once",
    "about.yolo.description": "We only live once in life, so let's live a truly fulfilling life!",
    "about.pdca.title": "PDCA",
    "about.pdca.description": "PDCA is applied by MSC to manage work, operate projects and develop individuals.",
    "about.kaizen.title": "Kaizen",
    "about.kaizen.description": "It is the foundation for developing lifelong learning models and unlimited development.",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
