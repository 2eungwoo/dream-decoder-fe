import { AUTH_ERROR_MESSAGES, AuthErrorCode } from "../types/authErrors";
import { commonErrorHandler } from "./commonErrorHandler";
import type { CommonError } from "../types/common/ErrorResponse";

// 인증 도메인 전용 에러 처리 유틸리티
export const authErrorHandler = {
  // 인증 에러 메시지 추출
  getAuthErrorMessage: (error: CommonError): string => {
    // CORS 에러 체크
    if (commonErrorHandler.isCorsError(error)) {
      return "백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.";
    }

    // 네트워크 에러 체크
    if (commonErrorHandler.isNetworkError(error)) {
      return "네트워크 연결을 확인해주세요.";
    }

    // AxiosErrorResponse 타입인지 확인
    if (!("response" in error) || !error.response) {
      return "알 수 없는 에러가 발생했습니다.";
    }

    const { status, data } = error.response;

    // 백엔드에서 전달된 인증 에러 코드가 있는 경우
    if (data?.code && AUTH_ERROR_MESSAGES[data.code]) {
      return AUTH_ERROR_MESSAGES[data.code];
    }

    // HTTP 상태 코드별 인증 관련 메시지
    switch (status) {
      case 400:
        return "입력 정보를 확인해주세요.";
      case 401:
        return AUTH_ERROR_MESSAGES[AuthErrorCode.INVALID_PASSWORD];
      case 403:
        return "CORS 정책으로 인해 요청이 차단되었습니다. 백엔드 서버의 CORS 설정을 확인해주세요.";
      case 404:
        return AUTH_ERROR_MESSAGES[AuthErrorCode.USER_NOT_FOUND];
      case 409:
        // 충돌 에러의 경우 더 구체적인 메시지 확인
        if (data?.message) {
          return data.message;
        }
        return "이미 존재하는 정보입니다.";
      default:
        return commonErrorHandler.getDefaultMessageByStatus(status);
    }
  },

  // 인증 에러 스타일 결정
  getAuthErrorStyle: (
    error: CommonError
  ): { type: "error" | "warning" | "info"; icon: string } => {
    // CORS 에러 체크
    if (commonErrorHandler.isCorsError(error)) {
      return commonErrorHandler.getCorsErrorStyle();
    }

    if (commonErrorHandler.isNetworkError(error)) {
      return commonErrorHandler.getNetworkErrorStyle();
    }

    // AxiosErrorResponse 타입인지 확인
    if (!("response" in error) || !error.response) {
      return { type: "error", icon: "❌" };
    }

    const { status } = error.response;
    return commonErrorHandler.getErrorStyleByStatus(status);
  },

  // 로그인 에러인지 확인
  isLoginError: (error: CommonError): boolean => {
    if (
      commonErrorHandler.isCorsError(error) ||
      commonErrorHandler.isNetworkError(error)
    ) {
      return false;
    }

    // AxiosErrorResponse 타입인지 확인
    if (!("response" in error) || !error.response) {
      return false;
    }

    const { status, data } = error.response;
    return (
      status === 401 ||
      data?.code === AuthErrorCode.USER_NOT_FOUND ||
      data?.code === AuthErrorCode.INVALID_PASSWORD
    );
  },

  // 회원가입 에러인지 확인
  isSignUpError: (error: CommonError): boolean => {
    if (
      commonErrorHandler.isCorsError(error) ||
      commonErrorHandler.isNetworkError(error)
    ) {
      return false;
    }

    // AxiosErrorResponse 타입인지 확인
    if (!("response" in error) || !error.response) {
      return false;
    }

    const { status, data } = error.response;
    return (
      status === 409 ||
      data?.code === AuthErrorCode.USERNAME_ALREADY_EXISTS ||
      data?.code === AuthErrorCode.EMAIL_ALREADY_EXISTS ||
      data?.code === AuthErrorCode.PASSWORD_MISMATCH
    );
  },
};
