"use client"


import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, X, Eye } from 'lucide-react'
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatePresence, motion } from "framer-motion"

const AboutPageClient = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Gallery images
  const galleryImages = [
    {
      id: 1,
      src: "/gioi-thieu/4.webp",
      title: "Buổi đào tạo Leadership Skills",
      description: "Khóa học phát triển kỹ năng lãnh đạo cho các nhà quản lý trẻ",
      category: "Training",
    },
    {
      id: 2,
      src: "/gioi-thieu/8.webp",
      title: "Workshop Team Building",
      description: "Hoạt động xây dựng tinh thần đồng đội và gắn kết nhóm",
      category: "Workshop",
    },
    {
      id: 3,
      src: "/gioi-thieu/6.webp",
      title: "Hội thảo Digital Transformation",
      description: "Chia sẻ về xu hướng chuyển đổi số trong doanh nghiệp",
      category: "Seminar",
    },
    {
      id: 4,
      src: "/gioi-thieu/19.webp",
      title: "Lễ tốt nghiệp khóa Project Management",
      description: "Trao chứng chỉ cho học viên hoàn thành khóa học",
      category: "Event",
    },
    {
      id: 5,
      src: "/gioi-thieu/9.webp",
      title: "Phiên Mentoring 1-on-1",
      description: "Buổi coaching cá nhân giữa mentor và học viên",
      category: "Mentoring",
    },
    {
      id: 6,
      src: "/gioi-thieu/1.webp",
      title: "Hội nghị thường niên MSC",
      description: "Sự kiện tổng kết và định hướng phát triển",
      category: "Conference",
    },
    {
      id: 7,
      src: "/gioi-thieu/20.webp",
      title: "Innovation Lab Session",
      description: "Phòng thí nghiệm sáng tạo và phát triển ý tưởng",
      category: "Innovation",
    },
    {
      id: 8,
      src: "/gioi-thieu/21.webp",
      title: "Networking Event",
      description: "Sự kiện kết nối và giao lưu giữa các học viên",
      category: "Networking",
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const getVisibleThumbnails = () => {
    const thumbnails = []
    for (let i = 0; i < 4; i++) {
      const index = (currentImageIndex + i) % galleryImages.length
      thumbnails.push(galleryImages[index])
    }
    return thumbnails
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white font-serif">
              Giới thiệu MSC Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Trung tâm đào tạo và phát triển kỹ năng chuyên nghiệp hàng đầu Việt Nam, cam kết mang đến những chương trình học chất lượng cao và trải nghiệm học tập tuyệt vời.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Philosophy Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-serif">
              {t("about.learning.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              {t("about.learning.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* YOLO */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center cursor-pointer"
              onClick={() => setSelectedImage('/Introduction/yolo.png')}
            >
              <Image
                src="/Introduction/yolo.png"
                alt="YOLO"
                width={300}
                height={200}
                className="rounded-lg shadow-lg mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {t("about.yolo.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.yolo.description")}
              </p>
            </motion.div>

            {/* PDCA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center cursor-pointer"
              onClick={() => setSelectedImage('/Introduction/pdca.png')}
            >
              <Image
                src="/Introduction/pdca.png"
                alt="PDCA"
                width={300}
                height={200}
                className="rounded-lg shadow-lg mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {t("about.pdca.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.pdca.description")}
              </p>
            </motion.div>

            {/* Kaizen */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center cursor-pointer"
              onClick={() => setSelectedImage('/Introduction/kaizen.png')}
            >
              <Image
                src="/Introduction/kaizen.png"
                alt="Kaizen"
                width={300}
                height={200}
                className="rounded-lg shadow-lg mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {t("about.kaizen.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.kaizen.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
       {/* Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Enlarged"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-5xl max-h-[90vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-serif">
              Thư viện hình ảnh
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Những khoảnh khắc đáng nhớ trong hành trình phát triển và đào tạo tại MSC Center
            </p>
          </motion.div>

          {/* Main Carousel */}
          <div className="relative mb-8">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
                alt={galleryImages[currentImageIndex].title}
                fill
                className="object-cover transition-all duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
                  {galleryImages[currentImageIndex].category}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {galleryImages[currentImageIndex].title}
                </h3>
                <p className="text-blue-100 text-lg">
                  {galleryImages[currentImageIndex].description}
                </p>
              </div>

              {/* View Button */}
              <button
                onClick={() => openLightbox(currentImageIndex)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <Eye className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? "bg-blue-600 scale-125" 
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getVisibleThumbnails().map((image, index) => {
              const actualIndex = (currentImageIndex + index) % galleryImages.length
              return (
                <motion.div
                  key={`${image.id}-${actualIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => setCurrentImageIndex(actualIndex)}
                >
                  <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {image.category}
                    </Badge>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {image.title}
                    </h4>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image
                src={galleryImages[lightboxIndex].src || "/placeholder.svg"}
                alt={galleryImages[lightboxIndex].title}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Image Info */}
            <div className="mt-4 text-center text-white">
              <Badge className="mb-2 bg-blue-600">
                {galleryImages[lightboxIndex].category}
              </Badge>
              <h3 className="text-xl font-bold mb-2">
                {galleryImages[lightboxIndex].title}
              </h3>
              <p className="text-gray-300">
                {galleryImages[lightboxIndex].description}
              </p>
              <div className="mt-4 text-sm text-gray-400">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AboutPageClient
