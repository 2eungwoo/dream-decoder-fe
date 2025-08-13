import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import { storage } from "../utils/storage";
import { navigation } from "../utils/navigation";
import { authErrorHandler } from "../utils/authErrorHandler";

export const useAuthActions = () => {
  const navigate = useNavigate();

  // 로그인
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await authService.login({ username, password });

        if (response.data) {
          const { token, ...userData } = response.data;
          storage.setToken(token);
          storage.setUser(response.data);
          navigate("/dashboard");
          return { success: true };
        }
      } catch (error: any) {
        return {
          success: false,
          error: authErrorHandler.getAuthErrorMessage(error),
          errorStyle: authErrorHandler.getAuthErrorStyle(error),
          isLoginError: authErrorHandler.isLoginError(error),
        };
      }
    },
    [navigate]
  );

  // 회원가입
  const signUp = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => {
      try {
        const response = await authService.signUp({
          username,
          email,
          password,
          confirmPassword,
        });

        if (response.data) {
          return { success: true };
        }
      } catch (error: any) {
        return {
          success: false,
          error: authErrorHandler.getAuthErrorMessage(error),
          errorStyle: authErrorHandler.getAuthErrorStyle(error),
          isSignUpError: authErrorHandler.isSignUpError(error),
        };
      }
    },
    []
  );

  // 로그아웃
  const logout = useCallback(() => {
    storage.clearAuth();
    navigate("/login");
  }, [navigate]);

  return {
    login,
    signUp,
    logout,
  };
};
