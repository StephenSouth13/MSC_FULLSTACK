import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sơ đồ trang web - MSC Center",
  description: "Sơ đồ trang web MSC Center - Tổng quan về tất cả các trang và dịch vụ có sẵn trên website của chúng tôi.",
}

export default function SiteMapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
