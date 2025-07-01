import { protectedApi } from "@/app/_lib/axios";

export interface EmailNotification {
  id: string;
  recipient: string;
  subject: string;
  content: string;
  status: string;
  sentAt: string | null;
  createdAt: string;
  updatedAt: string;
  plan: string;
}

export const EmailNotificationService = {
  async getAll(): Promise<EmailNotification[]> {
    const response = await protectedApi.get<EmailNotification[]>(
      "/email-notification",
    );
    return response.data;
  },
};
