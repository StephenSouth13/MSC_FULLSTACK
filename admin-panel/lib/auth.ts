import { User, Role } from '@/types'
import { apiClient } from './api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

class AuthManager {
  private state: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  }

  private listeners: ((state: AuthState) => void)[] = []

  constructor() {
    this.initAuth()
  }

  private async initAuth() {
    const token = localStorage.getItem('admin_token')
    if (token) {
      try {
        const response = await apiClient.getProfile()
        this.setState({
          user: response.data,
          token,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        this.logout()
      }
    } else {
      this.setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  private setState(newState: Partial<AuthState>) {
    this.state = { ...this.state, ...newState }
    this.listeners.forEach(listener => listener(this.state))
  }

  public subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  public getState() {
    return this.state
  }

  public async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.setState({ isLoading: true })
      
      const response = await apiClient.login(email, password)
      const { token, user } = response.data

      localStorage.setItem('admin_token', token)
      
      this.setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      })

      return { success: true }
    } catch (error: any) {
      this.setState({ isLoading: false })
      return { 
        success: false, 
        error: error.response?.data?.message || 'Đăng nhập thất bại' 
      }
    }
  }

  public logout() {
    localStorage.removeItem('admin_token')
    this.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  public hasRole(roleName: string): boolean {
    if (!this.state.user || !this.state.user.roles) return false
    return this.state.user.roles.some(role => role.name === roleName)
  }

  public hasAnyRole(roleNames: string[]): boolean {
    if (!this.state.user || !this.state.user.roles) return false
    return this.state.user.roles.some(role => roleNames.includes(role.name))
  }

  public canManageContent(): boolean {
    return this.hasAnyRole(['admin', 'editor'])
  }

  public canManageUsers(): boolean {
    return this.hasRole('admin')
  }

  public canApproveContent(): boolean {
    return this.hasAnyRole(['admin', 'editor'])
  }

  public isPartner(): boolean {
    return this.hasRole('partner')
  }

  public canEditContent(authorId: string): boolean {
    if (this.hasAnyRole(['admin', 'editor'])) {
      return true
    }
    
    if (this.hasRole('partner') && this.state.user?.id === authorId) {
      return true
    }
    
    return false
  }
}

export const authManager = new AuthManager()

// React hook for using auth state
export function useAuth() {
  const [state, setState] = React.useState(authManager.getState())

  React.useEffect(() => {
    return authManager.subscribe(setState)
  }, [])

  return {
    ...state,
    login: authManager.login.bind(authManager),
    logout: authManager.logout.bind(authManager),
    hasRole: authManager.hasRole.bind(authManager),
    hasAnyRole: authManager.hasAnyRole.bind(authManager),
    canManageContent: authManager.canManageContent.bind(authManager),
    canManageUsers: authManager.canManageUsers.bind(authManager),
    canApproveContent: authManager.canApproveContent.bind(authManager),
    isPartner: authManager.isPartner.bind(authManager),
    canEditContent: authManager.canEditContent.bind(authManager),
  }
}

// Note: React import will be added by Next.js automatically, but we need to import it explicitly for this file
import React from 'react'
