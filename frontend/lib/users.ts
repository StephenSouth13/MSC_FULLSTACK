import { type StoredUser } from "@/lib/storage"

const USERS_KEY = "msc:users"

type UserRecord = StoredUser & {
  sessions?: number
}

function readAll(): UserRecord[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? (JSON.parse(raw) as UserRecord[]) : []
}

function writeAll(users: UserRecord[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function upsertUserRecord(u: StoredUser) {
  const users = readAll()
  const i = users.findIndex((x) => x.id === u.id)
  if (i >= 0) {
    users[i] = { ...users[i], ...u, lastLoginAt: new Date().toISOString(), sessions: (users[i].sessions || 0) + 1 }
  } else {
    users.unshift({ ...u, createdAt: u.createdAt || new Date().toISOString(), lastLoginAt: new Date().toISOString(), sessions: 1 })
  }
  writeAll(users)
}

export function markUserLogout(u: StoredUser) {
  const users = readAll()
  const i = users.findIndex((x) => x.id === u.id)
  if (i >= 0) {
    users[i] = { ...users[i], lastLogoutAt: new Date().toISOString() }
    writeAll(users)
  }
}

export function getAllUsers(): UserRecord[] {
  return readAll()
}

export function getUserById(id: string): UserRecord | undefined {
  return readAll().find((u) => u.id === id)
}
