import { httpClient } from "./http";
import { storage } from "../utils/storage";
import { commonErrorHandler } from "../utils/commonErrorHandler";

// 요청 인터셉터 - 토큰 자동 추가
export const setupRequestInterceptor = () => {
  httpClient.interceptors.request.use(
    (config) => {
      const token = storage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// 응답 인터셉터 - 토큰 만료 처리
export const setupResponseInterceptor = () => {
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // 401 에러 시 자동 로그아웃
      if (error.response?.status === 401) {
        storage.clearAuth();
        window.location.href = "/login";
      }

      // 에러 로깅 (개발 환경에서만)
      if (import.meta.env.DEV) {
        const errorInfo = {
          status: error.response?.status,
          code: error.response?.data?.code,
          message: commonErrorHandler.isCorsError(error)
            ? "CORS Error - 백엔드 서버 연결 실패"
            : commonErrorHandler.isNetworkError(error)
            ? "Network Error"
            : commonErrorHandler.getDefaultMessageByStatus(
                error.response?.status || 0
              ),
          url: error.config?.url,
          method: error.config?.method,
          errorType: commonErrorHandler.isCorsError(error)
            ? "CORS"
            : commonErrorHandler.isNetworkError(error)
            ? "NETWORK"
            : "HTTP",
        };

        console.error("API Error:", errorInfo);

        // CORS 에러인 경우 추가 안내
        if (commonErrorHandler.isCorsError(error)) {
          console.warn("💡 CORS 에러 해결 방법:");
          console.warn("1. 백엔드 서버가 실행 중인지 확인");
          console.warn("2. 백엔드에서 CORS 설정 확인");
          console.warn("3. 프론트엔드 프록시 설정 확인");
        }
      }

      return Promise.reject(error);
    }
  );
};
