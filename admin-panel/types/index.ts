// User & Authentication Types
export interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
  bio?: string
  roles: Role[]
  created_at: string
  updated_at: string
}

export interface Role {
  id: number
  name: 'admin' | 'editor' | 'partner' | 'user'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

// Course Types
export interface Course {
  id: string
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  category?: string
  status: 'draft' | 'pending_review' | 'published' | 'archived'
  author_id: string
  author?: User
  lessons?: Lesson[]
  enrollments_count?: number
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  course_id: string
  title: string
  content?: any // JSONB content from Tiptap
  video_url?: string
  order: number
  created_at: string
  updated_at: string
}

export interface CreateCourseRequest {
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  category?: string
  status?: 'draft' | 'pending_review'
}

// Post Types
export interface Post {
  id: string
  title: string
  slug: string
  content?: any // JSONB content from Tiptap
  excerpt?: string
  thumbnail_url?: string
  category?: string
  status: 'draft' | 'pending_review' | 'published' | 'archived'
  author_id: string
  author?: User
  created_at: string
  updated_at: string
}

export interface CreatePostRequest {
  title: string
  slug: string
  content?: any
  excerpt?: string
  thumbnail_url?: string
  category?: string
  status?: 'draft' | 'pending_review'
}

// Mentor Types
export interface Mentor {
  id: string
  name: string
  title?: string
  bio?: string
  avatar_url?: string
  email?: string
  phone?: string
  linkedin_url?: string
  specialties?: string[]
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface CreateMentorRequest {
  name: string
  title?: string
  bio?: string
  avatar_url?: string
  email?: string
  phone?: string
  linkedin_url?: string
  specialties?: string[]
  status?: 'active'
}

// Enrollment Types
export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  enrolled_at: string
  progress: number
  user?: User
  course?: Course
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'file' | 'editor'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

// Dashboard Types
export interface DashboardStats {
  total_courses: number
  total_posts: number
  total_users: number
  total_enrollments: number
  pending_reviews: number
  revenue: number
}

// Filter & Search Types
export interface FilterOptions {
  status?: string
  category?: string
  author_id?: string
  date_from?: string
  date_to?: string
  search?: string
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}
