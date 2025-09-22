"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getCart, setCart, type StoredCartItem } from "@/lib/storage"
import { courses } from "@/data/courses"

export type CartContextValue = {
  items: StoredCartItem[]
  addByCourseId: (id: string) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<StoredCartItem[]>([])

  useEffect(() => {
    setItems(getCart())
  }, [])

  useEffect(() => {
    setCart(items)
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
    return {
      items,
      total,
      addByCourseId(id: string) {
        const course = courses.find((c) => c.id === id)
        if (!course) return
        setItems((prev) => {
          const existed = prev.find((p) => p.id === id)
          if (existed) {
            return prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
          }
          return [
            ...prev,
            { id: course.id, title: course.title, price: course.price, image: course.image, quantity: 1 },
          ]
        })
      },
      remove(id: string) {
        setItems((prev) => prev.filter((p) => p.id !== id))
      },
      updateQty(id: string, qty: number) {
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)))
      },
      clear() {
        setItems([])
      },
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
