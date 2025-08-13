import type { AuthResponse } from "../types/auth";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const storage = {
  // 토큰 관리
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // 사용자 정보 관리
  getUser: (): AuthResponse | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as AuthResponse;
    } catch {
      return null;
    }
  },

  setUser: (user: AuthResponse): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // 인증 정보 전체 삭제
  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // 인증 상태 확인
  isAuthenticated: (): boolean => {
    return !!(storage.getToken() && storage.getUser());
  },
};
