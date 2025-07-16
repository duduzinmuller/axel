import { MessageUsageService } from "@/app/_api/services/messageUsage";
import { useEffect, useState } from "react";
import { useUsers } from "@/app/_lib/hooks/useUsers";

export function useMessageUsage() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { users } = useUsers();

  useEffect(() => {
    setLoading(true);
    setError(null);
    MessageUsageService.getAll()
      .then((usages) => {
        const mapped = usages.map((usage) => {
          const user = users.find((u) => u.id === usage.userId);
          return {
            ...usage,
            name: user ? user.name : usage.userId,
            plan: user ? user.plan : "N/A",
            date: new Date(usage.year, usage.month - 1, usage.day),
            messages: usage.count,
            limit: user ? user.messageLimit : 0,
            status:
              usage.count >= Number(user?.messageLimit || 0)
                ? "Limite"
                : "Normal",
          };
        });
        setData(mapped);
      })
      .catch((err) => {
        setError(err?.message || "Erro ao buscar uso de mensagens");
      })
      .finally(() => setLoading(false));
  }, [users]);

  return { data, loading, error };
}
