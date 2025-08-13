import { useState, useEffect } from "react";
import type { AuthResponse, AuthState } from "../types/auth";
import { storage } from "../utils/storage";

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // 초기 인증 상태 확인
  useEffect(() => {
    const user = storage.getUser();
    
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // 상태 업데이트 함수들
  const setUser = (user: AuthResponse) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const clearUser = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const setLoading = (isLoading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading }));
  };

  return {
    ...authState,
    setUser,
    clearUser,
    setLoading,
  };
};
