"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

import { Line } from "react-chartjs-2";
import React, { useMemo } from "react";
import { AlertCircle } from "lucide-react";
import { useDashboardStats } from "@/app/_lib/hooks/useDashboardStats";
import { PlanDistributionChart } from "./PlanDistributionChart";
import { Card } from "@/components/ui/card";
import { DashboardStatsCards } from "./visao-geral/DashboardStatsCards";

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: "#222" },
      ticks: { color: "#fff" },
    },
    x: {
      grid: { color: "#222" },
      ticks: { color: "#fff" },
    },
  },
};

export default function VisaoGeral() {
  const { planDistribution, dashboardStats, loading, error } =
    useDashboardStats();

  const lineData = useMemo(() => {
    const totalUsers = dashboardStats?.totalUsers || 0;

    const growthData = [
      Math.round(totalUsers * 0.3),
      Math.round(totalUsers * 0.5),
      Math.round(totalUsers * 0.7),
      Math.round(totalUsers * 0.85),
      Math.round(totalUsers * 0.95),
      totalUsers,
    ];

    return {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      datasets: [
        {
          label: "Usuários",
          data: growthData,
          borderColor: "#34d399",
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
        },
      ],
    };
  }, [dashboardStats]);

  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="mt-2 text-sm text-gray-400">
            Carregando estatísticas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
          <p className="mt-2 text-sm text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardStatsCards dashboardStats={dashboardStats} />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div>
            <h3 className="font-semibold">Crescimento de Usuários</h3>
            <span className="text-muted-foreground text-xs">
              Evolução mensal de usuários e receita
            </span>
          </div>
          <div className="mt-2 h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </Card>
        <Card className="p-5">
          <div>
            <h3 className="font-semibold">Distribuição de Planos</h3>
            <span className="text-muted-foreground mb-2 text-xs">
              Usuários por tipo de plano
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <PlanDistributionChart
              planDistribution={planDistribution}
              loading={loading}
            />
          </div>
        </Card>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div>
            <h3 className="font-semibold">Status de Pagamentos</h3>
            <span className="text-muted-foreground text-xs">
              Distribuição dos status de pagamento
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
              Completed{" "}
              <span className="ml-auto w-11 rounded-full p-1 text-center text-xs">
                {dashboardStats?.paymentStatus?.completed || 0}
              </span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" />
              Pending{" "}
              <span className="ml-auto w-11 rounded-full p-1 text-center text-xs">
                {dashboardStats?.paymentStatus?.pending || 0}
              </span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
              Failed{" "}
              <span className="ml-auto w-11 rounded-full p-1 text-center text-xs">
                {dashboardStats?.paymentStatus?.failed || 0}
              </span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <span className="inline-block h-3 w-3 rounded-full bg-gray-400" />
              Canceled{" "}
              <span className="ml-auto w-11 rounded-full p-1 text-center text-xs">
                {dashboardStats?.paymentStatus?.canceled || 0}
              </span>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div>
            <h3 className="font-semibold">Resumo Geral</h3>
            <span className="text-muted-foreground text-xs">
              Métricas importantes do sistema
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[#4B5563]">
              Usuários Gratuitos <span>{dashboardStats?.freeUsers || 0}</span>
            </div>
            <div className="flex items-center justify-between text-[#4B5563]">
              Usuários Pagos{" "}
              <span className="text-green-500">
                {dashboardStats?.paidUsers || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#4B5563]">
              Taxa de Conversão{" "}
              <span>{dashboardStats?.conversionRate || "0"}%</span>
            </div>
            <div className="flex items-center justify-between text-[#4B5563]">
              Taxa de Verificação{" "}
              <span>{dashboardStats?.verificationRate || "0"}%</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
