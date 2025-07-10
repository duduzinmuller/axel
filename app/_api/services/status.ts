import { protectedApi } from "@/app/_lib/axios";

export interface UserStatus {
  ACTIVE: number;
  PENDING: number;
  INACTIVE: number;
}

export const StatusService = {
  async getUserStatus(): Promise<UserStatus> {
    const response = await protectedApi.get<UserStatus>("/users/status");
    return response.data;
  },
};
