"use client"

import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import { useCart } from "@/components/cart/CartProvider"
import { useAuth } from "@/components/auth/AuthProvider"
import { addOrder, addMyCourses, clearCart as clearCartStorage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

const QRCode = dynamic(() => import("qrcode.react"), { ssr: false })

type Method = "online" | "offline"

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [markedPaid, setMarkedPaid] = useState(false)
  const [method, setMethod] = useState<Method>("online")

  useEffect(() => {
    if (!user) router.replace("/login?next=/checkout")
  }, [user, router])

  const paymentPayload = useMemo(() => {
    const orderId = `ORD-${Date.now()}`
    return JSON.stringify({ orderId, amount: total, currency: "VND", items: items.map(i => ({ id: i.id, q: i.quantity })) })
  }, [items, total])

  if (!user) return null

  const onMarkPaid = () => {
    const id = `ORD-${Date.now()}`
    addOrder({ id, userId: user.id, items, total, status: "paid", createdAt: new Date().toISOString() })
    addMyCourses(user.id, items.map((i) => i.id))
    clear()
    clearCartStorage()
    setMarkedPaid(true)
    setTimeout(() => router.push("/student/my-courses"), 600)
  }

  const onReserveOffline = () => {
    const id = `ORD-${Date.now()}`
    addOrder({ id, userId: user.id, items, total, status: "pending", createdAt: new Date().toISOString() })
    clear()
    clearCartStorage()
    router.push("/student/orders")
  }

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">Thanh toán</h1>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phương thức thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={method} onValueChange={(v) => setMethod(v as Method)} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="online">Online (Chuyển khoản)</TabsTrigger>
                <TabsTrigger value="offline">Trực tiếp tại văn phòng</TabsTrigger>
              </TabsList>

              <TabsContent value="online" className="space-y-4">
                <div className="text-sm text-gray-600 text-center">
                  Quét mã bằng ứng dụng ngân hàng của bạn. Nếu bạn muốn dùng VietQR chính xác theo tài khoản doanh nghiệp, vui lòng cung cấp thông tin tài khoản để mình cấu hình.
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <QRCode value={paymentPayload} size={240} includeMargin />
                  </div>
                  <div className="text-xs text-gray-500">Số tiền: {total.toLocaleString('vi-VN')} VNĐ</div>
                  <Button onClick={onMarkPaid} disabled={items.length === 0} className="mt-2">
                    Tôi đã thanh toán
                  </Button>
                  {markedPaid && <div className="text-green-600 text-sm">Thanh toán thành công! Đang chuyển đến Khóa học của tôi...</div>}
                </div>
              </TabsContent>

              <TabsContent value="offline" className="space-y-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <div>Thanh toán trực tiếp tại văn phòng MSC:</div>
                  <div>Địa chỉ: 11 WeWork Sonatus, Quận 1, TP.HCM</div>
                  <div>Giờ làm việc: 9:00 - 18:00 (T2 - T6)</div>
                  <div>Liên hệ: (+84) 329 381 489</div>
                </div>
                <Button onClick={onReserveOffline} disabled={items.length === 0} variant="outline">
                  Xác nhận thanh toán trực tiếp
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm">
                  <div>{i.title} x{i.quantity}</div>
                  <div>{(i.price * i.quantity).toLocaleString('vi-VN')} VNĐ</div>
                </div>
              ))}
              <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                <div>Tổng</div>
                <div>{total.toLocaleString('vi-VN')} VNĐ</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
