import { useState, useEffect, useMemo } from "react";
import { UserService, DashboardUser } from "@/app/_api/services/user";

export const useUsers = () => {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = useMemo(
    () => async () => {
      await fetchUsers();
    },
    [],
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refreshUsers,
  };
};
