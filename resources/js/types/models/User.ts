export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  roles?: string[]; // Keep for backward compatibility
  created_at?: string;
  updated_at?: string;
}

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}
