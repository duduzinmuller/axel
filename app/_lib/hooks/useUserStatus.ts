import { useState, useEffect, useMemo } from "react";
import { StatusService, UserStatus } from "@/app/_api/services/status";

export const useUserStatus = () => {
  const [status, setStatus] = useState<UserStatus>({
    ACTIVE: 0,
    PENDING: 0,
    INACTIVE: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await StatusService.getUserStatus();
      setStatus(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar status dos usuários:", err);
      setError("Erro ao carregar status dos usuários");
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = useMemo(
    () => async () => {
      await fetchStatus();
    },
    [],
  );

  useEffect(() => {
    fetchStatus();
  }, []);

  return {
    status,
    loading,
    error,
    refreshStatus,
  };
};
