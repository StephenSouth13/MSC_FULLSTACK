export type StoredUser = {
  id: string
  name: string
  email: string
  avatar?: string
  role?: "admin" | "student"
  createdAt?: string
  lastLoginAt?: string
  lastLogoutAt?: string
}

export type StoredCartItem = {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

export type StoredOrder = {
  id: string
  userId: string
  items: StoredCartItem[]
  total: number
  status: "pending" | "paid" | "failed"
  createdAt: string
}

const LS_KEYS = {
  user: "msc:user",
  cart: "msc:cart",
  orders: "msc:orders",
  myCourses: "msc:myCourses",
} as const

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(LS_KEYS.user)
  return raw ? (JSON.parse(raw) as StoredUser) : null
}

export function setUser(user: StoredUser | null) {
  if (typeof window === "undefined") return
  if (!user) localStorage.removeItem(LS_KEYS.user)
  else localStorage.setItem(LS_KEYS.user, JSON.stringify(user))
}

export function getCart(): StoredCartItem[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(LS_KEYS.cart)
  return raw ? (JSON.parse(raw) as StoredCartItem[]) : []
}

export function setCart(items: StoredCartItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(LS_KEYS.cart, JSON.stringify(items))
}

export function clearCart() {
  if (typeof window === "undefined") return
  localStorage.removeItem(LS_KEYS.cart)
}

export function getOrders(): StoredOrder[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(LS_KEYS.orders)
  return raw ? (JSON.parse(raw) as StoredOrder[]) : []
}

export function addOrder(order: StoredOrder) {
  const orders = getOrders()
  orders.unshift(order)
  if (typeof window !== "undefined") {
    localStorage.setItem(LS_KEYS.orders, JSON.stringify(orders))
  }
}

export function addMyCourses(userId: string, courseIds: string[]) {
  if (typeof window === "undefined") return
  const key = `${LS_KEYS.myCourses}:${userId}`
  const raw = localStorage.getItem(key)
  const existing = raw ? (JSON.parse(raw) as string[]) : []
  const merged = Array.from(new Set([...existing, ...courseIds]))
  localStorage.setItem(key, JSON.stringify(merged))
}

export function getMyCourses(userId: string): string[] {
  if (typeof window === "undefined") return []
  const key = `${LS_KEYS.myCourses}:${userId}`
  const raw = localStorage.getItem(key)
  return raw ? (JSON.parse(raw) as string[]) : []
}
