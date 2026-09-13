import { request } from './client';

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  email: string;
  full_name: string;
}

export interface UserMeResponse {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async logout(): Promise<{ status: string; message: string }> {
    return request<{ status: string; message: string }>('/auth/logout', {
      method: 'POST'
    });
  },

  async getMe(): Promise<UserMeResponse> {
    return request<UserMeResponse>('/auth/me', {
      method: 'GET'
    });
  }
};
