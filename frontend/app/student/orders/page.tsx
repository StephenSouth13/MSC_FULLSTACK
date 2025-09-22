"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { getOrders, type StoredOrder } from "@/lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export default function OrdersPage() {
  const { user } = useAuth()
  if (!user) return null
  const orders = getOrders().filter((o) => o.userId === user.id)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Đơn hàng</h1>
      {orders.length === 0 ? (
        <div className="text-gray-600 text-sm">Chưa có đơn hàng.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((o: StoredOrder) => (
            <Card key={o.id}>
              <CardHeader>
                <CardTitle className="text-base">Mã đơn: {o.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-2">Ngày tạo: {format(new Date(o.createdAt), 'dd MMM yyyy HH:mm', { locale: vi })}</div>
                <div className="text-sm">Trạng thái: <span className={o.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>{o.status}</span></div>
                <div className="text-sm">Tổng tiền: {o.total.toLocaleString('vi-VN')} VNĐ</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
