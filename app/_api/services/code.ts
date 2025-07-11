import { protectedApi } from "@/app/_lib/axios";

export interface AccessCode {
  id: string;
  code: string;
  plan: string;
  used: boolean;
  expiresAt: string;
  createdAt: string;
}

export const CodeService = {
  async getAllCodes(): Promise<AccessCode[]> {
    const response = await protectedApi.get<AccessCode[]>("/code");
    return response.data;
  },
  async createAccessCode(plan: string, expiresAt: string) {
    const response = await protectedApi.post("/code/access-code", {
      plan,
      expiresAt,
    });
    return response.data;
  },
};
