import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { 
  ApiResponse, 
  PaginatedResponse, 
  Course, 
  Post, 
  Mentor, 
  User, 
  Enrollment,
  DashboardStats,
  FilterOptions,
  CreateCourseRequest,
  CreatePostRequest,
  CreateMentorRequest
} from '@/types'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('admin_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('admin_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.client.post('/auth/login', { email, password })
    return response.data
  }

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await this.client.get('/auth/profile')
    return response.data
  }

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await this.client.get('/dashboard/stats')
    return response.data
  }

  // Courses
  async getCourses(filters?: FilterOptions): Promise<PaginatedResponse<Course>> {
    const response = await this.client.get('/courses', { params: filters })
    return response.data
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    const response = await this.client.get(`/courses/${id}`)
    return response.data
  }

  async createCourse(data: CreateCourseRequest): Promise<ApiResponse<Course>> {
    const response = await this.client.post('/courses', data)
    return response.data
  }

  async updateCourse(id: string, data: Partial<CreateCourseRequest>): Promise<ApiResponse<Course>> {
    const response = await this.client.put(`/courses/${id}`, data)
    return response.data
  }

  async deleteCourse(id: string): Promise<ApiResponse<null>> {
    const response = await this.client.delete(`/courses/${id}`)
    return response.data
  }

  async approveCourse(id: string): Promise<ApiResponse<Course>> {
    const response = await this.client.patch(`/courses/${id}/approve`)
    return response.data
  }

  async rejectCourse(id: string, reason?: string): Promise<ApiResponse<Course>> {
    const response = await this.client.patch(`/courses/${id}/reject`, { reason })
    return response.data
  }

  // Posts
  async getPosts(filters?: FilterOptions): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get('/posts', { params: filters })
    return response.data
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    const response = await this.client.get(`/posts/${id}`)
    return response.data
  }

  async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
    const response = await this.client.post('/posts', data)
    return response.data
  }

  async updatePost(id: string, data: Partial<CreatePostRequest>): Promise<ApiResponse<Post>> {
    const response = await this.client.put(`/posts/${id}`, data)
    return response.data
  }

  async deletePost(id: string): Promise<ApiResponse<null>> {
    const response = await this.client.delete(`/posts/${id}`)
    return response.data
  }

  async approvePost(id: string): Promise<ApiResponse<Post>> {
    const response = await this.client.patch(`/posts/${id}/approve`)
    return response.data
  }

  async rejectPost(id: string, reason?: string): Promise<ApiResponse<Post>> {
    const response = await this.client.patch(`/posts/${id}/reject`, { reason })
    return response.data
  }

  // Mentors
  async getMentors(filters?: FilterOptions): Promise<PaginatedResponse<Mentor>> {
    const response = await this.client.get('/mentors', { params: filters })
    return response.data
  }

  async getMentor(id: string): Promise<ApiResponse<Mentor>> {
    const response = await this.client.get(`/mentors/${id}`)
    return response.data
  }

  async createMentor(data: CreateMentorRequest): Promise<ApiResponse<Mentor>> {
    const response = await this.client.post('/mentors', data)
    return response.data
  }

  async updateMentor(id: string, data: Partial<CreateMentorRequest>): Promise<ApiResponse<Mentor>> {
    const response = await this.client.put(`/mentors/${id}`, data)
    return response.data
  }

  async deleteMentor(id: string): Promise<ApiResponse<null>> {
    const response = await this.client.delete(`/mentors/${id}`)
    return response.data
  }

  // Users
  async getUsers(filters?: FilterOptions): Promise<PaginatedResponse<User>> {
    const response = await this.client.get('/users', { params: filters })
    return response.data
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    const response = await this.client.get(`/users/${id}`)
    return response.data
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await this.client.put(`/users/${id}`, data)
    return response.data
  }

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    const response = await this.client.delete(`/users/${id}`)
    return response.data
  }

  // Enrollments
  async getEnrollments(filters?: FilterOptions): Promise<PaginatedResponse<Enrollment>> {
    const response = await this.client.get('/enrollments', { params: filters })
    return response.data
  }

  // File Upload
  async uploadFile(file: File, type: 'image' | 'video' | 'document' = 'image'): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    
    const response = await this.client.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export const apiClient = new ApiClient()
