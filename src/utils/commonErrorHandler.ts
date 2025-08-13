import type { CommonError } from "../types/common/ErrorResponse";

// 공통 에러 처리 유틸리티
export const commonErrorHandler = {
  // 네트워크 에러 체크
  isNetworkError: (error: CommonError): boolean => {
    return !("response" in error) || !error.response;
  },

  // CORS 에러 체크
  isCorsError: (error: CommonError): boolean => {
    return (
      error.message === "Network Error" ||
      ("code" in error && error.code === "ERR_NETWORK") ||
      ("code" in error && error.code === "ERR_CORS")
    );
  },

  // HTTP 상태 코드별 기본 메시지
  getDefaultMessageByStatus: (status: number): string => {
    switch (status) {
      case 400:
        return "잘못된 요청입니다.";
      case 401:
        return "인증이 필요합니다.";
      case 403:
        return "접근이 거부되었습니다.";
      case 404:
        return "요청한 리소스를 찾을 수 없습니다.";
      case 409:
        return "충돌이 발생했습니다.";
      case 500:
        return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      default:
        return "요청 처리 중 오류가 발생했습니다.";
    }
  },

  // 에러 타입별 UI 스타일 결정
  getErrorStyleByStatus: (
    status: number
  ): { type: "error" | "warning" | "info"; icon: string } => {
    switch (status) {
      case 400:
        return { type: "warning", icon: "⚠️" };
      case 401:
        return { type: "error", icon: "🔒" };
      case 403:
        return { type: "error", icon: "🚫" };
      case 404:
        return { type: "error", icon: "❌" };
      case 409:
        return { type: "warning", icon: "⚠️" };
      case 500:
        return { type: "error", icon: "🚨" };
      default:
        return { type: "error", icon: "❌" };
    }
  },

  // 네트워크 에러 스타일
  getNetworkErrorStyle: (): { type: "warning"; icon: string } => {
    return { type: "warning", icon: "⚠️" };
  },

  // CORS 에러 스타일
  getCorsErrorStyle: (): { type: "error"; icon: string } => {
    return { type: "error", icon: "🌐" };
  },
};
