import { useState, useEffect, useMemo } from "react";
import { UserService, PlanStatistics } from "@/app/_api/services/user";

export const useDashboardStats = () => {
  const [planDistribution, setPlanDistribution] = useState<PlanStatistics[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanDistribution = async () => {
    try {
      setLoading(true);
      const data = await UserService.getPlanDistribution();
      setPlanDistribution(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar distribuição de planos:", err);
      setError("Erro ao carregar dados dos planos");
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = useMemo(
    () => async () => {
      await fetchPlanDistribution();
    },
    [],
  );

  const dashboardStats = useMemo(() => {
    const totalUsers = planDistribution.reduce(
      (sum, plan) => sum + plan.count,
      0,
    );
    const freeUsers =
      planDistribution.find((p) => p.plan === "FREE")?.count || 0;
    const paidUsers = planDistribution
      .filter((p) => p.plan !== "FREE")
      .reduce((sum, plan) => sum + plan.count, 0);

    const verifiedUsers = Math.round(totalUsers * 0.9);
    const totalRevenue = paidUsers * 25.9;
    const pendingPayments = Math.max(1, Math.round(totalUsers * 0.05));

    return {
      totalUsers,
      verifiedUsers,
      totalRevenue,
      pendingPayments,
      freeUsers,
      paidUsers,
      conversionRate:
        totalUsers > 0 ? ((paidUsers / totalUsers) * 100).toFixed(1) : "0",
      verificationRate:
        totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(1) : "0",
      paymentStatus: {
        completed: Math.round(totalUsers * 0.85),
        pending: pendingPayments,
        failed: Math.max(1, Math.round(totalUsers * 0.02)),
        canceled: Math.max(1, Math.round(totalUsers * 0.01)),
      },
    };
  }, [planDistribution]);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return {
    planDistribution,
    dashboardStats,
    loading,
    error,
    refreshStats,
  };
};
