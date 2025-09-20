"use client"

import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import { useCart } from "@/components/cart/CartProvider"
import { useAuth } from "@/components/auth/AuthProvider"
import { addOrder, addMyCourses, clearCart as clearCartStorage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const QRCode = dynamic(() => import("qrcode.react"), { ssr: false })

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [markedPaid, setMarkedPaid] = useState(false)

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

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">Thanh toán</h1>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <Card>
          <CardHeader><CardTitle>Quét QR để thanh toán</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-sm text-gray-600 text-center">
              Quét mã bằng ứng dụng ngân hàng của bạn. Nếu bạn muốn dùng VietQR chính xác theo tài khoản doanh nghiệp, vui lòng cung cấp thông tin tài khoản để mình cấu hình.
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <QRCode value={paymentPayload} size={240} includeMargin />
            </div>
            <div className="text-xs text-gray-500">Số tiền: {total.toLocaleString('vi-VN')} VNĐ</div>
            <Button onClick={onMarkPaid} disabled={items.length === 0} className="mt-2">
              Tôi đã thanh toán
            </Button>
            {markedPaid && <div className="text-green-600 text-sm">Thanh toán thành công! Đang chuyển đến Khóa học của tôi...</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tóm tắt đơn hàng</CardTitle></CardHeader>
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
