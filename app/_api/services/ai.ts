import { protectedApi } from "@/app/_lib/axios";

interface AIResponse {
  question: string;
  usage: {
    currentCount: number;
    planLimit: number;
    plan: string;
    remainingMessages: number;
  };
}

export const AIService = {
  async generationQuestionWithAI(
    question: string,
  ): Promise<{ response: string; usage?: any } | null> {
    try {
      const response = await protectedApi.post<AIResponse>("/google/generate", {
        question,
      });
      return {
        response: response.data?.question?.replace(/\*/g, "") || "",
        usage: response.data?.usage,
      };
    } catch (err: any) {
      console.error("Erro ao comunicar com o backend:", err);

      const backendMsg =
        err.response?.data?.message || err.response?.data?.error || "";
      if (
        err.response?.status === 400 &&
        backendMsg.toLowerCase().includes("limite")
      ) {
        throw new Error("LIMIT_REACHED");
      }

      return null;
    }
  },

  async sendMessageToAI(
    message: string,
  ): Promise<{ response: string; usage?: any } | null> {
    try {
      const response = await protectedApi.post<AIResponse>("/google/generate", {
        question: message,
      });
      return {
        response: response.data?.question?.replace(/\*/g, "") || "",
        usage: response.data?.usage,
      };
    } catch (err: any) {
      console.error("Erro ao enviar mensagem para IA:", err);

      const backendMsg =
        err.response?.data?.message || err.response?.data?.error || "";
      if (
        err.response?.status === 400 &&
        backendMsg.toLowerCase().includes("limite")
      ) {
        throw new Error("LIMIT_REACHED");
      }

      return null;
    }
  },
};
