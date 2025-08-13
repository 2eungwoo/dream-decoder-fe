// 인증 도메인 에러 코드 (백엔드 AuthErrorCode와 동일)
export const AuthErrorCode = {
  PASSWORD_MISMATCH: "AUTH_E001",
  USERNAME_ALREADY_EXISTS: "AUTH_E002",
  EMAIL_ALREADY_EXISTS: "AUTH_E003",
  USER_NOT_FOUND: "AUTH_E004",
  INVALID_PASSWORD: "AUTH_E005",
} as const;

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

// 인증 도메인 에러 메시지 매핑
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCode.PASSWORD_MISMATCH]:
    "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
  [AuthErrorCode.USERNAME_ALREADY_EXISTS]: "이미 존재하는 사용자명입니다.",
  [AuthErrorCode.EMAIL_ALREADY_EXISTS]: "이미 존재하는 이메일입니다.",
  [AuthErrorCode.USER_NOT_FOUND]: "존재하지 않는 사용자입니다.",
  [AuthErrorCode.INVALID_PASSWORD]: "아이디 또는 비밀번호가 올바르지 않습니다.",
};
