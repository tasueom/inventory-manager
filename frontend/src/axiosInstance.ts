import axios from "axios";
import { ApiErrorResponse } from "./types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8090/api/inventory",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Axios 에러 객체에서 우리가 백엔드에서 보낸 data를 추출
    const customError = error.response?.data as ApiErrorResponse;
    
    // 만약 백엔드에서 보낸 에러 객체가 있다면 그 메시지를 사용, 없으면 기본 메시지
    const errorMessage = customError?.message || "서버 통신 중 오류가 발생했습니다.";
    
    // 여기서 바로 reject를 때리면 View에서는 error.message만 읽으면 됩니다.
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;