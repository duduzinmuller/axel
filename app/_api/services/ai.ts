import { protectedApi } from "@/app/_lib/axios";

export interface AIResponse {
  question?: string;
  usage?: any;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
): Promise<T> => {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Se não é erro 429 ou já tentamos o máximo de vezes, não tenta novamente
      if (error.response?.status !== 429 || attempt === maxRetries) {
        throw error;
      }
      const waitTime = baseDelay * Math.pow(2, attempt);
      console.log(
        `Rate limit atingido. Tentativa ${attempt + 1}/${maxRetries + 1}. Aguardando ${waitTime}ms...`,
      );
      await delay(waitTime);
    }
  }

  throw lastError;
};

export const AIService = {
  async generationQuestionWithAI(
    question: string,
  ): Promise<{ response: string; usage?: any } | null> {
    try {
      const response = await retryWithBackoff(() =>
        protectedApi.post<AIResponse>("/google/generate", {
          question,
        }),
      );

      return {
        response: response.data?.question?.replace(/\*/g, "") || "",
        usage: response.data?.usage,
      };
    } catch (err: any) {
      console.error("Erro ao comunicar com o backend:", err);

      const backendMsg =
        err.response?.data?.message || err.response?.data?.error || "";

      if (err.response?.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }

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
      const response = await retryWithBackoff(() =>
        protectedApi.post<AIResponse>("/google/generate", {
          question: message,
        }),
      );

      return {
        response: response.data?.question?.replace(/\*/g, "") || "",
        usage: response.data?.usage,
      };
    } catch (err: any) {
      console.error("Erro ao enviar mensagem para IA:", err);

      const backendMsg =
        err.response?.data?.message || err.response?.data?.error || "";

      if (err.response?.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }

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
