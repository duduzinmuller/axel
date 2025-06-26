import { useState, useEffect, useCallback } from "react";
import { AIService } from "@/app/_api/services";
import { useUsage } from "./useUsage";

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingUsage, setLoadingUsage] = useState(true);
  const { usage, updateUsage, setIsLoading: setContextLoading } = useUsage();

  useEffect(() => {
    setLoadingUsage(false);
  }, []);

  const generateQuestion = async (prompt: string): Promise<string | null> => {
    setIsLoading(true);
    setContextLoading(true);
    setError(null);

    try {
      const result = await AIService.generationQuestionWithAI(prompt);
      if (result?.usage) {
        updateUsage(result.usage);
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
      setContextLoading(false);
    }
  };

  const sendMessage = async (message: string): Promise<string | null> => {
    setIsLoading(true);
    setContextLoading(true);
    setError(null);

    try {
      const result = await AIService.sendMessageToAI(message);
      if (result?.usage) {
        console.log("useAI - sendMessage - usage recebido:", result.usage);
        updateUsage(result.usage);
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
      setContextLoading(false);
    }
  };

  // Função para limpar o uso (útil para logout)
  const clearUsage = () => {
    // O clearUsage agora é gerenciado pelo Redux
  };

  // Função para sincronizar com dados do backend
  const syncUsage = useCallback(
    (backendUsage: any) => {
      if (backendUsage) {
        updateUsage(backendUsage);
      }
    },
    [updateUsage],
  );

  return {
    generateQuestion,
    sendMessage,
    isLoading,
    error,
    usage,
    clearUsage,
    loadingUsage,
    syncUsage,
  };
};
