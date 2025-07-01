import { protectedApi } from "@/app/_lib/axios";

export interface EmailVerification {
  status: string;
  id: string;
  code: string;
  expiresAt: string;
  createdAt: string;
  userId: string;
}

export const EmailVerificationService = {
  async getAll(): Promise<EmailVerification[]> {
    const response = await protectedApi.get<EmailVerification[]>(
      "/email-verification",
    );
    return response.data;
  },
};
