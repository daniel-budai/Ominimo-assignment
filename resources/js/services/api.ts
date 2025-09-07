import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import router from '../router';
import type { ApiError } from '../types/api';

const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: ApiError) => {
    const { status } = error.response || {};
    
    // Handle authentication errors
    if (status === 401) {
      router.push('/login');
    }
    
    // Handle forbidden errors
    if (status === 403) {
      console.error('Permission denied');
    }
    
    // Handle validation errors
    if (status === 422) {
      // Return validation errors for form handling
      return Promise.reject(error);
    }
    
    // Handle server errors
    if (status && status >= 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default api;
