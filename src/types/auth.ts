// 인증 응답 타입
export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

// 회원가입 요청 타입
export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  username: string;
  password: string;
}

// 인증 상태 타입
export interface AuthState {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
