import api from './api';
import type { User, UserRegistrationData, UserLoginCredentials } from '../types/models';
import type { ApiResponse } from '../types/api';

interface AuthService {
  register(userData: UserRegistrationData): Promise<ApiResponse<{user: User, token: string}>>;
  login(credentials: UserLoginCredentials): Promise<ApiResponse<{user: User, token: string}>>;
  logout(): Promise<ApiResponse<{message: string}>>;
  getCurrentUser(): Promise<ApiResponse<User>>;
}

const authService: AuthService = {
  /**
   * Register a new user
   * @param userData - User registration data
   * @returns API response
   */
  register(userData: UserRegistrationData): Promise<ApiResponse<{user: User, token: string}>> {
    return api.post('/register', userData);
  },
  
  /**
   * Log in a user
   * @param credentials - User login credentials
   * @returns API response
   */
  login(credentials: UserLoginCredentials): Promise<ApiResponse<{user: User, token: string}>> {
    return api.post('/login', credentials);
  },
  
  /**
   * Log out the current user
   * @returns API response
   */
  logout(): Promise<ApiResponse<{message: string}>> {
    return api.post('/logout');
  },
  
  /**
   * Get the current authenticated user
   * @returns API response
   */
  getCurrentUser(): Promise<ApiResponse<User>> {
    return api.get('/user');
  }
};

export default authService;
