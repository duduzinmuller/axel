import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY,
} from "@/app/_constants/local-storage";

import type { UserResponse } from "@/app/hooks/service/user";
import { AuthState, AuthTokens } from "../types/auth-types";

export const StorageUtils = {
  setTokens: (tokens: AuthTokens): void => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
  },

  removeTokens: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  },

  getAccessToken: (): string | null => {
    return typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
      : null;
  },

  getRefreshToken: (): string | null => {
    return typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
      : null;
  },

  setUser: (user: UserResponse): void => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  },

  getUser: (): UserResponse | null => {
    if (typeof window === "undefined") return null;

    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  loadState: (): Partial<AuthState> => {
    if (typeof window === "undefined") {
      return {};
    }

    try {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(
        LOCAL_STORAGE_REFRESH_TOKEN_KEY,
      );
      const user = StorageUtils.getUser();

      return {
        accessToken,
        refreshToken,
        user,
        isAuthenticated: !!accessToken && !!user,
      };
    } catch (error) {
      console.error("Error loading auth state from localStorage:", error);
      return {};
    }
  },
};
