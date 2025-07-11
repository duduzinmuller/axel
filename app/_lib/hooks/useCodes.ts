import { useState, useEffect } from "react";
import { CodeService, AccessCode } from "@/app/_api/services/code";

export const useCodes = () => {
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const fetchCodes = async () => {
    try {
      setLoading(true);
      const data = await CodeService.getAllCodes();
      setCodes(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar códigos de acesso");
    } finally {
      setLoading(false);
    }
  };

  const createCode = async (plan: string, expiresAt: string) => {
    setCreating(true);
    setCreateError(null);
    try {
      const newCode = await CodeService.createAccessCode(plan, expiresAt);
      setCodes((prev) => [newCode, ...prev]);
      return newCode;
    } catch (error: any) {
      setCreateError(error?.message || "Erro ao criar código");
      throw error;
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return {
    codes,
    loading,
    error,
    refresh: fetchCodes,
    createCode,
    creating,
    createError,
  };
};
