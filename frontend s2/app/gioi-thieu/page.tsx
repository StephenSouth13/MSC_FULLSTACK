import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  
  title: "Giới thiệu - MSC Center",
  description: "Tìm hiểu về MSC Center - Trung tâm đào tạo và phát triển kỹ năng chuyên nghiệp hàng đầu Việt Nam",
}

export default function AboutPage() {
  return <AboutPageClient />
}
