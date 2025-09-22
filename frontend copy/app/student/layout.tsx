"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { User, BookOpen, ShoppingCart, Receipt, Settings } from "lucide-react"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user) router.replace("/login")
  }, [user, router])

  if (!user) return null

  const nav = [
    { href: "/student/dashboard", label: "Tổng quan", icon: User },
    { href: "/student/my-courses", label: "Khóa học của tôi", icon: BookOpen },
    { href: "/cart", label: "Giỏ hàng", icon: ShoppingCart },
    { href: "/student/orders", label: "Đơn hàng", icon: Receipt },
    { href: "/student/settings", label: "Cài đặt", icon: Settings },
  ]

  return (
    <div className="min-h-[80vh] grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 container py-8">
      <aside className="md:sticky md:top-24 h-max rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-4 text-sm text-gray-500">Xin chào,</div>
        <div className="font-semibold text-gray-900 mb-6">{user.name}</div>
        <nav className="space-y-1">
          {nav.map((n) => {
            const active = pathname.startsWith(n.href)
            const Icon = n.icon
            return (
              <Link key={n.href} href={n.href} className="block">
                <Button variant={active ? "default" : "ghost"} className="w-full justify-start">
                  <Icon className="w-4 h-4 mr-2" /> {n.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  )
}
