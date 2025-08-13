// 공통 에러 응답 타입 (백엔드 ErrorResponse와 동일한 구조)
export interface ErrorResponse {
  message: string;
  status: string;
  statusCode: number;
  code: string;
  errors?: FieldError[];
}

// 필드 에러 타입
export interface FieldError {
  field: string;
  value: string;
  reason: string;
}
