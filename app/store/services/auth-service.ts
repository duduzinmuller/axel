import axios from "axios";
import { UserService } from "@/app/_api/services/user";
import type {
  LoginInput,
  SignupInput,
  UserResponse,
} from "@/app/hooks/service/user";
import {
  AuthTokens,
  RequestNewPasswordArgs,
  RequestNewPasswordResponse,
} from "../types/auth-types";
import { StorageUtils } from "../utils/storage-utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthService = {
  me: async (): Promise<UserResponse | null> => {
    try {
      return await UserService.me();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  },

  login: async (data: LoginInput): Promise<UserResponse> => {
    const loggedUser = await UserService.login(data);

    if (!loggedUser.tokens) {
      throw new Error("Tokens não retornados pelo servidor");
    }

    StorageUtils.setTokens(loggedUser.tokens);
    StorageUtils.setUser(loggedUser);

    return loggedUser;
  },

  signup: async (data: SignupInput): Promise<UserResponse> => {
    const createdUser = await UserService.signup(data);

    if (!createdUser.tokens) {
      throw new Error("Tokens não retornados pelo servidor");
    }

    StorageUtils.setTokens(createdUser.tokens);
    StorageUtils.setUser(createdUser);

    return createdUser;
  },

  updateProfile: async (
    userData: Partial<UserResponse>,
  ): Promise<UserResponse> => {
    const accessToken = StorageUtils.getAccessToken();

    if (!accessToken) {
      throw new Error("Token de acesso não encontrado.");
    }

    const response = await axios.patch(`${API_URL}/users/me`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const updatedUser = { ...response.data, ...userData };
    StorageUtils.setUser(updatedUser);

    return updatedUser;
  },

  deleteProfile: async (): Promise<void> => {
    const accessToken = StorageUtils.getAccessToken();

    if (!accessToken) {
      throw new Error("Token de acesso não encontrado.");
    }

    await axios.delete(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    StorageUtils.removeTokens();
  },

  signInFromCallback: async (tokens: AuthTokens): Promise<UserResponse> => {
    StorageUtils.setTokens(tokens);
    const me = await UserService.me();

    if (!me) {
      throw new Error("Falha ao obter dados do usuário");
    }

    StorageUtils.setUser(me);
    return me;
  },

  verifyCode: async (email: string, code: string): Promise<void> => {
    const response = await axios.post(`${API_URL}/validate-code`, {
      email,
      code,
    });

    return response.data;
  },

  resendVerificationCode: async (email: string): Promise<void> => {
    const response = await axios.post(`${API_URL}/verification-code`, {
      email,
    });

    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    const response = await axios.post(
      `${API_URL}/users/request-reset-password`,
      { email },
    );

    return response.data;
  },

  resetPassword: async ({
    token,
    newPassword,
  }: RequestNewPasswordArgs): Promise<RequestNewPasswordResponse> => {
    const response = await axios.post<RequestNewPasswordResponse>(
      `${API_URL}/users/reset-password`,
      { token, newPassword },
      {
        validateStatus: () => true,
      },
    );

    if (response.status === 200 && response.data) {
      return { status: "success", message: "Senha alterada com sucesso!" };
    } else {
      throw new Error(response.data?.message || "Erro ao alterar a senha.");
    }
  },
};
