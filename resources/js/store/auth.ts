import { defineStore } from 'pinia';
import { authService } from '../services';
import type { User, UserRegistrationData, UserLoginCredentials } from '../types/models';
import type { AuthState } from '../types/store/auth';
import type { ApiResponse } from '../types/api';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('auth_token') || null,
    isLoggedIn: !!localStorage.getItem('auth_token'),
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state: AuthState): boolean => state.isLoggedIn && !!state.user,
    
    // Check if user is admin
    isAdmin: (state: AuthState): boolean => {
      return state.user?.role === 'admin';
    },
    
    // Check if user has a specific role
    hasRole: (state: AuthState) => (role: string): boolean => {
      if (!state.user) return false;
      // Check new role field first, fallback to legacy roles array
      if (state.user.role) {
        return state.user.role === role;
      }
      if (state.user.roles) {
        return (state.user.roles as string[]).includes(role);
      }
      return false;
    }
  },
  
  actions: {
    // Set loading state
    setLoading(status: boolean): void {
      this.loading = status;
    },
    
    // Set error state
    setError(error: string | null): void {
      this.error = error;
    },
    
    // Clear error state
    clearError(): void {
      this.error = null;
    },
    
    // Register a new user
    async register(userData: UserRegistrationData): Promise<ApiResponse<{user: User, token: string}>> {
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await authService.register(userData);
        this.setUser(response.data.user);
        this.setToken(response.data.token);
        this.isLoggedIn = true;
        return response;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Registration failed');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Login user
    async login(credentials: UserLoginCredentials): Promise<ApiResponse<{user: User, token: string}>> {
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await authService.login(credentials);
        this.setUser(response.data.user);
        this.setToken(response.data.token);
        this.isLoggedIn = true;
        return response;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Login failed');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Set authentication token
    setToken(token: string): void {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },
    
    // Logout user
    async logout(): Promise<void> {
      this.setLoading(true);
      
      try {
        await authService.logout();
        this.clearAuth();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.setLoading(false);
      }
    },
    
    // Fetch current user
    async fetchUser(): Promise<User | null> {
      if (this.loading) return null;
      
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await authService.getCurrentUser();
        if (response.data) {
          this.setUser(response.data);
          this.isLoggedIn = true;
          return response.data;
        }
        return null;
      } catch (error: any) {
        if (error.response?.status === 401) {
          // User is not authenticated, clear auth state
          this.clearAuth();
        } else {
          console.error('Error fetching user:', error);
        }
        return null;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Set user data
    setUser(user: User): void {
      this.user = user;
    },
    
    // Clear authentication state
    clearAuth(): void {
      this.user = null;
      this.token = null;
      this.isLoggedIn = false;
      localStorage.removeItem('auth_token');
    },
    
    // Initialize auth state
    async init(): Promise<void> {
      try {
        if (this.token) {
          await this.fetchUser();
        }
      } catch (error) {
        // Silent fail - user is not authenticated
        this.clearAuth();
      }
    }
  }
});
