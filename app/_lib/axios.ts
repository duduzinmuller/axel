import axios from "axios";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "../_constants/local-storage";

export const protectedApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export const publicApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    return request;
  }
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const refrseshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    if (!refrseshToken) {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes("/users/refresh-token")
    ) {
      request._retry = true;
      try {
        const response = await protectedApi.post("/users/refresh-token", {
          refrseshToken,
        });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken);
        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return protectedApi(request);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        console.error(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
