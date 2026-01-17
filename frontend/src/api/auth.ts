import { httpClient } from './httpClient';
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  SmsLoginRequest,
  AuthResponse,
} from './types';

// Token management
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Auth API
export const authApi = {
  // Send verification code
  sendCode: async (phone: string): Promise<ApiResponse<{ message: string }>> => {
    return httpClient.postWithParams<ApiResponse<{ message: string }>>('/auth/send-code', { phone });
  },

  // Login with password
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    if (response.code === 200 && response.data.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },

  // Login with SMS code
  smsLogin: async (credentials: SmsLoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>('/auth/sms-login', credentials);
    if (response.code === 200 && response.data.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },

  // Register new user
  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    if (response.code === 200 && response.data.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<AuthResponse['user']>> => {
    return httpClient.get<ApiResponse<AuthResponse['user']>>('/auth/me');
  },

  // Logout
  logout: () => {
    removeAuthToken();
  },
};
