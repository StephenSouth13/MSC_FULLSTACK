//components/sections/PartnersCarousel.tsx
"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const PartnersCarousel = () => {
   const partners = [
  { id: 1, name: "ASL", logo: "/carousel/ASL.webp" },
  { id: 2, name: "Binemo", logo: "/carousel/Binemo.webp" },
  { id: 3, name: "BNI", logo: "/carousel/BNI.webp" },
  { id: 4, name: "CP", logo: "/carousel/CP.webp" },
  { id: 5, name: "CSMO", logo: "/carousel/CSMO.webp" },
  { id: 6, name: "Greenfeed", logo: "/carousel/Greenfeed.webp" },
  { id: 7, name: "Happy Land", logo: "/carousel/Happyland.webp" },
  { id: 8, name: "HTO Group", logo: "/carousel/HTOGroup.webp" },
  { id: 9, name: "HUIT", logo: "/carousel/HUIT.webp" },
  { id: 10, name: "KNQG", logo: "/carousel/KNQG.webp" },
  { id: 11, name: "NAB", logo: "/carousel/NAB.webp" },
  { id: 12, name: "Richs", logo: "/carousel/Richs.webp" },
  { id: 13, name: "Satra", logo: "/carousel/Satra.webp" },
  { id: 14, name: "Schindler", logo: "/carousel/Schindler.webp" },
  { id: 15, name: "SGC", logo: "/carousel/SGC.webp" },
  { id: 16, name: "SGF", logo: "/carousel/SGF.webp" },
  { id: 17, name: "SGGG", logo: "/carousel/SGGG.webp" },
  { id: 18, name: "SGL", logo: "/carousel/SGL.webp" },
  { id: 19, name: "Shinhan", logo: "/carousel/Shinhan.webp" },
  { id: 20, name: "Smar", logo: "/carousel/Smar.webp" },
  { id: 21, name: "Smentor", logo: "/carousel/Smentor.webp" },
  { id: 22, name: "SP", logo: "/carousel/SP.webp" },
  { id: 23, name: "TC", logo: "/carousel/TC.webp" },
  { id: 24, name: "UEH", logo: "/carousel/UEH.webp" },
  { id: 25, name: "UFM", logo: "/carousel/UFM.webp" },
  { id: 26, name: "VCCI", logo: "/carousel/VCCI.webp" },
  { id: 27, name: "VK", logo: "/carousel/VK.webp" },
  { id: 28, name: "VNPT", logo: "/carousel/VNPT.webp" },
  { id: 29, name: "VRA", logo: "/carousel/VRA.webp" },
  { id: 30, name: "VSM", logo: "/carousel/VSM.webp" },
  { id: 31, name: "VTF", logo: "/carousel/VTF.webp" },
  { id: 32, name: "WK", logo: "/carousel/WK.webp" },
  { id: 33, name: "YESCO", logo: "/carousel/YESCO.webp" }
];


  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-teal-800 to-blue-900 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-serif">Đơn vị đồng hành</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Những đối tác tin cậy đồng hành cùng MSC Center trong hành trình phát triển giáo dục
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* First Row - Left to Right */}
          <div className="flex space-x-8 mb-8">
            <motion.div
              className="flex space-x-8 flex-shrink-0"
              animate={{
                x: [0, -1600],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.slice(0, 20).map((partner, index) => (
                <div
                  key={`row1-${partner.id}-${index}`}
                  className="flex-shrink-0 w-32 h-20 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="flex space-x-8">
            <motion.div
              className="flex space-x-8 flex-shrink-0"
              animate={{
                x: [-1600, 0],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.slice(10, 30).map((partner, index) => (
                <div
  key={`row1-${partner.id}-${index}`}
  className="relative flex-shrink-0 w-32 h-20 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
>
  <div className="absolute inset-0 flex items-center justify-center p-1">
    <Image
      src={partner.logo || "/placeholder.svg"}
      alt={partner.name}
      fill
      className="object-contain opacity-80 hover:opacity-100 transition-opacity"
    />
  </div>
</div>

              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-900 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export default PartnersCarousel
