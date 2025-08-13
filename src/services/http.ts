import axios from "axios";

// API 기본 설정 - Vite 프록시를 통해 CORS 문제 해결
const API_BASE_URL = "/api"; // 프록시 경로 사용

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
