import { protectedApi, publicApi } from "@/app/_lib/axios";

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified?: boolean;
  image?: string;
  cpf?: string;
  plan?: string;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

// Interfaces para estatísticas
export interface PlanStatistics {
  plan: string;
  count: number;
  percentage: number;
}

export const UserService = {
  async signup(data: SignupInput): Promise<UserResponse> {
    const response = await publicApi.post<UserResponse>(
      "/users/register",
      data,
    );
    return response.data;
  },

  async login(data: LoginInput): Promise<UserResponse> {
    const response = await publicApi.post<UserResponse>("/users/login", data);
    return response.data;
  },

  async me(): Promise<UserResponse> {
    const response = await protectedApi.get<UserResponse>("/users/me");
    return response.data;
  },

  async updateProfile(data: Partial<UserResponse>): Promise<UserResponse> {
    const response = await protectedApi.put<UserResponse>(
      "/users/profile",
      data,
    );
    return response.data;
  },

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await protectedApi.post("/users/change-password", data);
  },

  async requestPasswordReset(email: string): Promise<void> {
    await publicApi.post("/users/forgot-password", { email });
  },

  async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<void> {
    await publicApi.post("/users/reset-password", data);
  },

  async getPlanDistribution(): Promise<PlanStatistics[]> {
    const response = await protectedApi.get<PlanStatistics[]>("/users/plans");
    return response.data;
  },
};
