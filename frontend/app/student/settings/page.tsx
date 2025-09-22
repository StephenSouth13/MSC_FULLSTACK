"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  if (!user) return null

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Tài khoản</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="preferences">Tùy chọn</TabsTrigger>
          <TabsTrigger value="billing">Thanh toán</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Hồ sơ</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Image src={user.avatar || "/placeholder.svg"} alt={user.name} width={64} height={64} className="rounded-full" />
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Tên hiển thị</label>
                  <Input defaultValue={user.name} />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <Input defaultValue={user.email} type="email" />
                </div>
              </div>
              <Button className="mt-2">Lưu thay đổi</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle>Bảo mật</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Mật khẩu hiện tại</label>
                <Input type="password" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Mật khẩu mới</label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Xác nhận mật khẩu</label>
                  <Input type="password" />
                </div>
              </div>
              <Button>Đổi mật khẩu</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader><CardTitle>Tùy chọn</CardTitle></CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">Tùy chỉnh sẽ cập nhật trong phiên này.</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader><CardTitle>Thanh toán</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">Quản lý phương thức thanh toán và hóa đơn.</div>
              <Button variant="outline" onClick={signOut}>Đăng xuất</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
