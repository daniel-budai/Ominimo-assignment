import type { User, UserRegistrationData, UserLoginCredentials } from '../models';
import type { ApiResponse } from '../api';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthGetters {
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

export interface AuthActions {
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  register: (userData: UserRegistrationData) => Promise<ApiResponse<{user: User, token: string}>>;
  login: (credentials: UserLoginCredentials) => Promise<ApiResponse<{user: User, token: string}>>;
  setToken: (token: string) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<User | null>;
  setUser: (user: User) => void;
  clearAuth: () => void;
  init: () => Promise<void>;
}
