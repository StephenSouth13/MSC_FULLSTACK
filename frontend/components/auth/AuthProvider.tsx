"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getUser, setUser, type StoredUser } from "@/lib/storage"
import { markUserLogout, upsertUserRecord } from "@/lib/users"

export type AuthContextValue = {
  user: StoredUser | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const DEMO_USERS: Array<StoredUser & { password: string }> = [
  {
    id: "quachthanhlong2k3@gamil.com",
    name: "Quach Thanh Long",
    email: "quachthanhlong2k3@gamil.com",
    avatar: "/MSCers/QTL.webp",
    password: "123456",
  },
  {
    id: "quachthanhlong2k3@gmail.com",
    name: "Quach Thanh Long",
    email: "quachthanhlong2k3@gmail.com",
    avatar: "/MSCers/QTL.webp",
    password: "123456",
  },
]

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<StoredUser | null>(null)

  useEffect(() => {
    setUserState(getUser())
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      async signIn(email: string, password: string) {
        const emailLc = email.toLowerCase().trim()
        const isAdmin = emailLc === "quachthanhlong2k3@gmail.com"
        const demo = DEMO_USERS.find((u) => u.email === emailLc)
        if (demo) {
          if (password !== demo.password) throw new Error("Sai mật khẩu tài khoản demo")
          const demoUser: StoredUser = {
            id: demo.id,
            name: demo.name,
            email: demo.email,
            avatar: demo.avatar,
            role: isAdmin ? "admin" : "student",
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
          }
          setUser(demoUser)
          setUserState(demoUser)
          upsertUserRecord(demoUser)
          return
        }
        if (!password || password.length < 6) throw new Error("Mật khẩu tối thiểu 6 ký tự")
        const mockUser: StoredUser = {
          id: emailLc,
          name: emailLc.split("@")[0],
          email: emailLc,
          avatar: "/MSCers/QTL.webp",
          role: isAdmin ? "admin" : "student",
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        }
        setUser(mockUser)
        setUserState(mockUser)
        upsertUserRecord(mockUser)
      },
      signOut() {
        if (user) markUserLogout(user)
        setUser(null)
        setUserState(null)
      },
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
