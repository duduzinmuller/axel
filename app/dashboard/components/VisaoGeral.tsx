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

import { Card } from "../../../components/ui/card";
import { Pie, Line } from "react-chartjs-2";
import React from "react";
import { AlertCircle } from "lucide-react";
import { UserRound } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { UserCheck } from "lucide-react";

const pieData = {
  labels: ["Free 72%", "Monthly 20%", "Annual 8%"],
  datasets: [
    {
      data: [72, 20, 8],
      backgroundColor: [
        "#7c3aed", // Free
        "#34d399", // Monthly
        "#fbbf24", // Annual
      ],
      borderWidth: 0,
    },
  ],
};

const lineData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Usuários",
      data: [2000, 2200, 10000, 3500, 4800, 4200],
      borderColor: "#34d399",
      backgroundColor: "rgba(52,211,153,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
      pointBackgroundColor: "#FFFFFF",
    },
    {
      label: "Usuarios 2",
      data: [500, 250, 100, 100, 500, 100],
      borderColor: "rgb(136, 132, 216)",
      backgroundColor: "rgb(136, 132, 216)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
      pointBackgroundColor: "#FFFFFF",
    },
  ],
};

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
  return (
    <>
      {/* Cards principais */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground text-xs">
            <div className="flex items-center justify-between gap-2">
              Total de Usuários <UserRound size={16} className="text-white" />
            </div>
          </span>
          <span className="text-2xl font-bold">1.247</span>
          <span className="text-xs text-green-500">
            +23 <span className="text-gray-500">hoje</span>
          </span>
        </Card>
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground flex justify-between text-xs">
            Receita Total
            <CircleDollarSign size={16} className="text-white" />
          </span>
          <span className="text-2xl font-bold">R$ 45.780,50</span>
          <span className="text-xs text-green-500">
            R$ 12.450,30 <span className="text-gray-500">este mês</span>
          </span>
        </Card>
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground flex justify-between text-xs">
            Usuários Verificados <UserCheck size={16} className="text-white" />
          </span>
          <span className="text-2xl font-bold">1.156</span>
          <span className="text-xs text-gray-500">92.7% do total</span>
          <div className="bg-muted mt-1 h-3 w-full rounded-lg">
            <div
              className="h-3 rounded-l-md bg-white"
              style={{ width: "92.7%" }}
            />
          </div>
        </Card>
        <Card className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground flex items-center justify-between gap-1 text-xs">
            Pendentes Pagamentos{" "}
            <AlertCircle size={14} className="text-[#F97316]" />
          </span>
          <span className="text-2xl font-bold text-[#F97316]">8</span>
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
            <div className="h-56 w-56">
              <Pie data={pieData} />
            </div>
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
              <span className="ml-auto w-11 rounded-full bg-[#1E293B] p-1 text-center text-xs">
                450
              </span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" />
              Pending{" "}
              <span className="ml-auto w-11 rounded-full bg-[#1E293B] p-1 text-center text-xs">
                25
              </span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
              Failed{" "}
              <span className="ml-auto w-11 rounded-full bg-[#1E293B] p-1 text-center text-xs">
                12
              </span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <span className="inline-block h-3 w-3 rounded-full bg-gray-400" />
              Canceled{" "}
              <span className="ml-auto w-11 rounded-full bg-[#1E293B] p-1 text-center text-xs">
                8
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
              Usuários Gratuitos <span className="text-white">892</span>
            </div>
            <div className="flex items-center justify-between text-[#4B5563]">
              Usuários Pagos <span className="text-green-500">355</span>
            </div>
            <div className="flex items-center justify-between text-[#4B5563]">
              Taxa de Conversão <span className="text-white">28.5%</span>
            </div>
            <div className="flex items-center justify-between text-[#4B5563]">
              Taxa de Verificação <span className="text-white">92.7%</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
