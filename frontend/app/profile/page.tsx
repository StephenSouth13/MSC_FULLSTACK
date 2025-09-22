import type { Metadata } from "next"
import ProfileDashboard from "@/components/profile/ProfileDashboard"

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân - MSC Center",
  description: "Quản lý hồ sơ cá nhân, theo dõi tiến độ học tập và cài đặt tài khoản",
}

export default function ProfilePage() {
  return <ProfileDashboard />
}
