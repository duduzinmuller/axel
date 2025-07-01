import { protectedApi } from "@/app/_lib/axios";

export interface MessageUsage {
  id: string;
  userId: string;
  day: number;
  month: number;
  year: number;
  count: number;
  createdAt: string;
  updatedAt: string;
}

export const MessageUsageService = {
  async getAll(): Promise<MessageUsage[]> {
    const response = await protectedApi.get<MessageUsage[]>("/message-usage");
    return response.data;
  },
};
