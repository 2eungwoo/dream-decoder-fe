import type {
  AuthResponse,
  SignUpRequest,
  LoginRequest,
} from "../types/auth";
import type { ApiResponse } from "../types/common/ApiResponse";
import { httpClient } from "./http";

export const authService = {
  // 회원가입
  signUp: async (data: SignUpRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>(
      "/auth/signup",
      data
    );
    return response.data;
  },

  // 로그인
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      data
    );
    return response.data;
  },
};
