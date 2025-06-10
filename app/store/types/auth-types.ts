import type { UserResponse } from "@/app/_api/hooks/user";

export interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  hasRegistered: boolean;
}

export interface RequestNewPasswordArgs {
  token: string;
  newPassword: string;
}

export interface RequestNewPasswordResponse {
  status: string;
  message: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
