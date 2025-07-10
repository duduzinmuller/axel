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
import { UserRound } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { UserCheck } from "lucide-react";
import { useDashboardStats } from "@/app/_lib/hooks/useDashboardStats";
import { PlanDistributionChart } from "./PlanDistributionChart";
import { Card } from "@/components/ui/card";

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
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground text-xs">
            <div className="flex items-center justify-between gap-2">
              Total de Usuários <UserRound size={16} />
            </div>
          </span>
          <span className="text-2xl font-bold">
            {dashboardStats?.totalUsers || 0}
          </span>
          <span className="text-xs text-green-500">
            +23 <span className="text-gray-500">hoje</span>
          </span>
        </Card>
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground flex justify-between text-xs">
            Receita Total
            <CircleDollarSign size={16} />
          </span>
          <span className="text-2xl font-bold">
            R${" "}
            {(dashboardStats?.totalRevenue || 0).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="text-xs text-green-500">
            R${" "}
            {(dashboardStats?.totalRevenue || 0).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}{" "}
            <span className="text-gray-500">total</span>
          </span>
        </Card>
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground flex justify-between text-xs">
            Usuários Verificados <UserCheck size={16} />
          </span>
          <span className="text-2xl font-bold">
            {dashboardStats?.verifiedUsers || 0}
          </span>
          <span className="text-xs text-gray-500">
            {dashboardStats?.verificationRate || "0"}% do total
          </span>
          <div className="mt-1 h-3 w-full rounded-lg">
            <div
              className="h-3 rounded-l-md bg-white"
              style={{
                width: `${dashboardStats?.verificationRate || 0}%`,
              }}
            />
          </div>
        </Card>
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground flex items-center justify-between gap-1 text-xs">
            Pendentes Pagamentos{" "}
            <AlertCircle size={14} className="text-[#F97316]" />
          </span>
          <span className="text-2xl font-bold text-[#F97316]">
            {dashboardStats?.pendingPayments || 0}
          </span>
          <span className="text-xs text-gray-500">Requerem atenção</span>
        </Card>
      </div>
      {/* Gráficos e Distribuição */}
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
      {/* Status de Pagamentos e Resumo Geral */}
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
