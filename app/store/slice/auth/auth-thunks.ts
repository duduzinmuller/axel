import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { AuthService } from "../../services/auth-service";
import type {
  RequestNewPasswordResponse,
  RequestNewPasswordArgs,
} from "../../types/auth-types";
import { StorageUtils } from "../../utils/storage-utils";
import {
  LoginInput,
  SignupInput,
  UserResponse,
} from "@/app/_api/services/user";
import { signOut } from "./auth-reducer";

export const initAuth = createAsyncThunk(
  "auth/init",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let accessToken = StorageUtils.getAccessToken() || null;
      const refreshToken = StorageUtils.getRefreshToken() || null;

      if (!accessToken && !refreshToken) return null;

      if (!accessToken && refreshToken) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refrseshToken: refreshToken }),
            },
          );
          if (!response.ok) throw new Error("Refresh token inválido");
          const data = await response.json();
          if (!data.accessToken || !data.refreshToken)
            throw new Error("Tokens não retornados pelo servidor");
          accessToken = data.accessToken;
          StorageUtils.setTokens({
            accessToken: String(accessToken),
            refreshToken: String(data.refreshToken),
          });
        } catch {
          StorageUtils.removeTokens();
          dispatch(signOut());
          return rejectWithValue("Sessão expirada");
        }
      }
      if (!accessToken)
        throw new Error("Token de acesso não encontrado após renovação");
      const response = await AuthService.me();
      if (!response) throw new Error("Falha ao obter dados do usuário");
      return response;
    } catch (error: any) {
      StorageUtils.removeTokens();
      dispatch(signOut());
      if (error && error.response && error.response.data) {
        return rejectWithValue(
          error.response?.data?.message || "Falha ao inicializar autenticação",
        );
      }
      return rejectWithValue("Erro inesperado ao inicializar autenticação");
    }
  },
);

export const login = createAsyncThunk<UserResponse, LoginInput>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      return await AuthService.login(data);
    } catch (error: unknown) {
      console.error("Login error:", error);

      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Email ou senha estão incorretos",
        );
      }

      return rejectWithValue("Erro inesperado ao fazer login");
    }
  },
);

export const signup = createAsyncThunk<UserResponse, SignupInput>(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      return await AuthService.signup(data);
    } catch (error: unknown) {
      console.error("Signup error:", error);

      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "";
        if (error.response?.status === 400 || error.response?.status === 409) {
          if (
            message.toLowerCase().includes("email") ||
            message.toLowerCase().includes("já existe")
          ) {
            return rejectWithValue(
              "Este email já está cadastrado. Por favor, use outro email.",
            );
          }
        }
        return rejectWithValue(message || "Falha ao criar conta");
      }

      return rejectWithValue("Erro inesperado ao criar conta");
    }
  },
);

export const updateUserProfile = createAsyncThunk<
  UserResponse,
  Partial<UserResponse>
>("auth/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    return await AuthService.updateProfile(userData);
  } catch (error: unknown) {
    console.error("Error updating profile:", error);

    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Falha ao atualizar perfil",
      );
    }

    return rejectWithValue("Erro inesperado ao atualizar perfil");
  }
});

export const deleteUserProfile = createAsyncThunk<void>(
  "auth/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.deleteProfile();
    } catch (error: unknown) {
      console.error("Erro ao deletar conta:", error);

      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Falha ao deletar conta",
        );
      }

      return rejectWithValue("Erro inesperado ao deletar conta");
    }
  },
);

export const signInFromCallback = createAsyncThunk<
  UserResponse,
  { accessToken: string; refreshToken: string }
>("auth/signInFromCallback", async (tokens, { rejectWithValue }) => {
  try {
    return await AuthService.signInFromCallback(tokens);
  } catch (error: unknown) {
    console.error("Error signing in from callback:", error);

    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Falha ao autenticar via callback",
      );
    }

    return rejectWithValue("Erro inesperado na autenticação por callback");
  }
});

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (
    { email, code }: { email: string; code: string },
    { rejectWithValue },
  ) => {
    try {
      return await AuthService.verifyCode(email, code);
    } catch (error: unknown) {
      console.error("Erro ao verificar código:", error);

      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Erro ao verificar o código. Tente novamente.",
        );
      }

      return rejectWithValue("Erro inesperado ao verificar o código.");
    }
  },
);

export const resendVerificationCode = createAsyncThunk(
  "auth/resendVerificationCode",
  async (email: string, { rejectWithValue }) => {
    try {
      return await AuthService.resendVerificationCode(email);
    } catch (error: unknown) {
      console.error("Erro ao reenviar código:", error);

      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Erro ao reenviar o código.",
        );
      }

      return rejectWithValue("Erro inesperado ao reenviar o código.");
    }
  },
);

export const requestSendEmail = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email: string, { rejectWithValue }) => {
    try {
      return await AuthService.requestPasswordReset(email);
    } catch (error: unknown) {
      console.error("Erro ao enviar email:", error);

      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Erro ao solicitar redefinição de senha.",
        );
      }

      return rejectWithValue(
        "Erro inesperado ao solicitar redefinição de senha.",
      );
    }
  },
);

export const requestNewPassword = createAsyncThunk<
  RequestNewPasswordResponse,
  RequestNewPasswordArgs,
  { rejectValue: string }
>("auth/requestNewPassword", async (args, { rejectWithValue }) => {
  try {
    return await AuthService.resetPassword(args);
  } catch (error: unknown) {
    console.error("Erro ao alterar senha:", error);

    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Erro ao alterar senha.",
      );
    }

    return rejectWithValue("Erro inesperado ao alterar a senha.");
  }
});
