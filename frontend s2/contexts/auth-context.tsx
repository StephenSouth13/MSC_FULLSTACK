"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserData, authAPI } from '@/lib/api';

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is already logged in on app start
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Verify token is still valid
          const profileResult = await authAPI.getProfile();
          if (!profileResult.success) {
            // Token expired, clear storage
            authAPI.logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        authAPI.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Attempting login...');
      const response = await authAPI.login({ email, password });
      
      console.log('AuthContext: Login response:', response);
      
      if (response.success && response.data) {
        console.log('AuthContext: Login successful, setting user:', response.data.user);
        // Đảm bảo fullName có giá trị mặc định
        const userData = {
          ...response.data.user,
          fullName: response.data.user.fullName || response.data.user.email || 'Người dùng'
        };
        setUser(userData);
        return { success: true, message: response.message };
      } else {
        console.log('AuthContext: Login failed:', response.message);
        return { success: false, message: response.message || 'Đăng nhập thất bại' };
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { success: false, message: 'Lỗi kết nối đến server' };
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const profileResult = await authAPI.getProfile();
      if (profileResult.success && profileResult.data) {
        // Đảm bảo fullName có giá trị mặc định
        const userData = {
          ...profileResult.data,
          fullName: profileResult.data.fullName || profileResult.data.email || 'Người dùng'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
