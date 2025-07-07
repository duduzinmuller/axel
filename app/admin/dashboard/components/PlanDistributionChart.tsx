"use client";
import { Pie } from "react-chartjs-2";
import { useMemo } from "react";
import { PlanStatistics } from "@/app/_api/services/user";

interface PlanDistributionChartProps {
  planDistribution: PlanStatistics[];
  loading?: boolean;
}

export const PlanDistributionChart = ({
  planDistribution,
  loading = false,
}: PlanDistributionChartProps) => {
  const pieData = useMemo(() => {
    if (loading || !planDistribution.length) {
      return {
        labels: ["Carregando..."],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#666"],
            borderWidth: 0,
          },
        ],
      };
    }

    // Mapeamento de cores para cada plano
    const colors = {
      FREE: "#7c3aed", // Roxo
      MONTHLY: "#34d399", // Verde
      ANNUAL: "#fbbf24", // Amarelo
    };

    // Mapeamento de nomes para exibição
    const planNames = {
      FREE: "Gratuito",
      MONTHLY: "Mensal",
      ANNUAL: "Anual",
    };

    return {
      labels: planDistribution.map(
        (p) =>
          `${planNames[p.plan as keyof typeof planNames] || p.plan} ${p.percentage}%`,
      ),
      datasets: [
        {
          data: planDistribution.map((p) => p.percentage),
          backgroundColor: planDistribution.map(
            (p) => colors[p.plan as keyof typeof colors] || "#666",
          ),
          borderWidth: 0,
        },
      ],
    };
  }, [planDistribution, loading]);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#fff",
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const plan = planDistribution[context.dataIndex];
            return `${plan?.plan || "Plano"}: ${plan?.count || 0} usuários (${plan?.percentage || 0}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="h-56 w-56">
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
};
