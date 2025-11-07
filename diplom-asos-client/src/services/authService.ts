import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface GoogleLoginResponse {
  token: string;
}

export interface ApiError {
  status: number;
  isValid: boolean;
  errors?: {
    Email?: string;
    [key: string]: string | undefined;
  };
}

export const authService = {
  async loginWithGoogle(googleToken: string): Promise<string> {
    try {
      const response = await axios.post<GoogleLoginResponse>(
        `${API_BASE_URL}/Account/GoogleLogin`,
        { Token: googleToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.token;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ApiError = error.response.data;
        throw new Error(errorData.errors?.Email || 'Помилка входу через Google');
      }
      throw new Error('Помилка входу через Google');
    }
  },

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  removeToken(): void {
    localStorage.removeItem('authToken');
  },
};

