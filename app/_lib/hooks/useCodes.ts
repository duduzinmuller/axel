import { useState, useEffect } from "react";
import { CodeService, AccessCode } from "@/app/_api/services/code";

export const useCodes = () => {
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchCodes();
  }, []);

  return { codes, loading, error, refresh: fetchCodes };
};
