import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chính sách bảo mật - MSC Center",
  description: "Chính sách bảo mật và quyền riêng tư của MSC Center - Cam kết bảo vệ thông tin cá nhân của bạn một cách an toàn và minh bạch.",
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
