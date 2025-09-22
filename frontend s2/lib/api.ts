const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  fullName: string; // Thay đổi từ name thành fullName để nhất quán
}

// Updated to match backend response format
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: UserData;
    token: string;
  };
  error?: string;
}

// Frontend form data interface
export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Backend request format
export interface RegisterRequest {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    fullName: string;
  };
  error?: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  duration: string;
  students: string;
  level: string;
  price: string;
  image: string;
  description: string;
  detailed_content: string;
  updated_at: string;
  highlights: string[];
  category: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status: string;
  mentors: Array<{
    name: string;
    avatar: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface ProjectsResponse {
  success: boolean;
  data?: {
    data: Project[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  error?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  author_avatar: string;
  publish_date: string;
  category: string;
  details_blog: string;
  read_time: string;
  views: number;
  likes: number;
}

export interface BlogPostsResponse {
  success: boolean;
  data?: {
    data: BlogPost[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  error?: string;
}

export const api = {
  async getBlogPosts(page: number = 1, limit: number = 10, category?: string): Promise<BlogPostsResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (category) {
        params.append('category', category);
      }
      
      const url = `${API_URL}/allblogposts?${params.toString()}`;
      
      console.log('Fetching blog posts from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Blog posts API response:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async getBlogPostBySlug(slug: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    try {
      const url = `${API_URL}/allblogposts/slug/${slug}`;
      
      console.log('Fetching blog post by slug from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Blog post by slug API response:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async getPrograms(): Promise<{ success: boolean; data?: Program[]; error?: string }> {
    try {
      const url = `${API_URL}/programs`;
      
      console.log('Fetching programs from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Programs API response:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching programs:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async getProjects(): Promise<ProjectsResponse> {
    try {
      const url = `${API_URL}/projects`;
      
      console.log('Fetching projects from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Projects API response:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async getProjectBySlug(slug: string): Promise<{ success: boolean; data?: Project; error?: string }> {
    try {
      const url = `${API_URL}/projects/slug/${slug}`;
      
      console.log('Fetching project by slug from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Project by slug API response:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching project by slug:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

export const apiClient = {
  async register(userData: RegisterData): Promise<RegisterResponse> {
    try {
      // Chuyển đổi format từ frontend sang backend
      const backendData: RegisterRequest = {
        full_name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
      };

      console.log('Đang gửi yêu cầu đăng ký với dữ liệu:', {
        ...backendData,
        password: '***ẩn***'
      });
      console.log('URL API:', `${API_URL}/auth/register`);
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });

      console.log('Trạng thái phản hồi đăng ký:', response.status);
      console.log('Headers phản hồi:', response.headers);
      
      if (!response.ok) {
        console.error('Phản hồi không thành công:', response.statusText);
        const errorText = await response.text();
        console.error('Nội dung lỗi:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          return {
            success: false,
            message: errorData.message || 'Có lỗi xảy ra khi đăng ký',
            error: errorData.error
          };
        } catch (e) {
          return {
            success: false,
            message: `Lỗi HTTP ${response.status}: ${response.statusText}`,
            error: errorText
          };
        }
      }
      
      const data = await response.json();
      console.log('Dữ liệu phản hồi đăng ký:', data);
      
      return data;
    } catch (error) {
      console.error('Lỗi mạng khi đăng ký:', error);
      return {
        success: false,
        message: 'Lỗi kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
        error: error instanceof Error ? error.message : 'Lỗi không xác định'
      };
    }
  }
};

export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('Attempting login with:', credentials);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (response.ok && data.success) {
        // Store token in localStorage
        if (data.data?.token) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Lỗi kết nối đến server',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      console.log('Attempting registration with:', userData);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Register response status:', response.status);
      const data = await response.json();
      console.log('Register response data:', data);
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Lỗi kết nối đến server',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async getProfile(): Promise<{ success: boolean; data?: UserData; error?: string }> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, error: 'No token found' };
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async logout(): Promise<{ success: boolean; message?: string }> {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        // Gọi API logout để thông báo server
        const response = await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Logout response:', data);
        }
      }

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return { success: true, message: 'Đăng xuất thành công' };
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn clear local storage ngay cả khi API call thất bại
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true, message: 'Đăng xuất thành công' };
    }
  }
};
