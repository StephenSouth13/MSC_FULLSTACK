import { courses as defaultCourses, type Course } from "@/data/courses"

const CMS_KEYS = {
  courses: "msc:cms:courses",
  projects: "msc:cms:projects",
  posts: "msc:cms:posts",
} as const

export function getCoursesCMS(): Course[] {
  if (typeof window === "undefined") return defaultCourses
  const raw = localStorage.getItem(CMS_KEYS.courses)
  return raw ? (JSON.parse(raw) as Course[]) : defaultCourses
}

export function setCoursesCMS(list: Course[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(CMS_KEYS.courses, JSON.stringify(list))
}

export type Project = {
  id: string
  title: string
  image: string
  category: string
  description: string
  mentors: { name: string; avatar: string }[]
}

export function getProjectsCMS(): Project[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(CMS_KEYS.projects)
  return raw ? (JSON.parse(raw) as Project[]) : []
}

export function setProjectsCMS(list: Project[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(CMS_KEYS.projects, JSON.stringify(list))
}

export type Post = {
  id: string
  title: string
  image: string
  author: string
  publishDate: string
  excerpt: string
}

export function getPostsCMS(): Post[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(CMS_KEYS.posts)
  return raw ? (JSON.parse(raw) as Post[]) : []
}

export function setPostsCMS(list: Post[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(CMS_KEYS.posts, JSON.stringify(list))
}
