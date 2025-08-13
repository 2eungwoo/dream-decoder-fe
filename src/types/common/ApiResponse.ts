// 공통 API 응답 타입 (백엔드 ApiResponse와 동일한 구조)
export interface ApiResponse<T> {
  status: string;
  code: string;
  message: string;
  data?: T;
}
