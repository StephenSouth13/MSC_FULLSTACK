"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart/CartProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CartPage() {
  const { items, updateQty, remove, total } = useCart()

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">Giỏ hàng</h1>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <div className="text-gray-600">Giỏ hàng trống. <Link className="text-blue-600" href="/dao-tao">Tiếp tục mua sắm</Link></div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <Card>
            <CardHeader><CardTitle>Khóa học</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex gap-4 items-center border-b pb-4">
                  <Image src={it.image} alt={it.title} width={120} height={80} className="rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-gray-600">{it.price.toLocaleString('vi-VN')} VNĐ</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) => updateQty(it.id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1"
                    />
                    <Button variant="outline" onClick={() => remove(it.id)}>Xóa</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Tóm tắt</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div>Tổng</div>
                <div className="font-semibold">{total.toLocaleString('vi-VN')} VNĐ</div>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Thanh toán</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
