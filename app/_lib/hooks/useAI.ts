import { useState, useEffect } from "react";
import { AIService } from "@/app/_api/services";

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<any>(null);
  const [loadingUsage, setLoadingUsage] = useState(true);

  useEffect(() => {
    const savedUsage = localStorage.getItem("ai_usage");
    if (savedUsage) {
      try {
        const parsedUsage = JSON.parse(savedUsage);
        setUsage(parsedUsage);
      } catch (error) {
        console.error("Erro ao carregar uso do localStorage:", error);
      }
    }
    setLoadingUsage(false);
  }, []);

  useEffect(() => {
    if (usage) {
      localStorage.setItem("ai_usage", JSON.stringify(usage));
    }
  }, [usage]);

  const generateQuestion = async (prompt: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AIService.generationQuestionWithAI(prompt);
      if (result?.usage) {
        setUsage(result.usage);
      }
      return result?.response || null;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";

      if (errorMessage === "LIMIT_REACHED") {
        setError("LIMIT_REACHED");
      } else {
        setError(errorMessage);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AIService.sendMessageToAI(message);
      if (result?.usage) {
        setUsage(result.usage);
      }
      return result?.response || null;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";

      if (errorMessage === "LIMIT_REACHED") {
        setError("LIMIT_REACHED");
      } else {
        setError(errorMessage);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar o uso (útil para logout)
  const clearUsage = () => {
    setUsage(null);
    localStorage.removeItem("ai_usage");
  };

  return {
    generateQuestion,
    sendMessage,
    isLoading,
    error,
    usage,
    clearUsage,
    loadingUsage,
  };
};
