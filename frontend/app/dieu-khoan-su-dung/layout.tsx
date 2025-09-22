import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Điều khoản sử dụng - MSC Center",
  description: "Điều khoản và điều kiện sử dụng dịch vụ của MSC Center - Quy định và trách nhiệm khi tham gia các khóa học và dịch vụ đào tạo.",
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
