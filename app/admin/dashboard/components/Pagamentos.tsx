import { Pie, Line, Bar } from "react-chartjs-2";
import React, { useState } from "react";
import { usePayments } from "@/app/_lib/hooks/usePayments";
import { Card } from "@/components/ui/card";
import { PagamentosTable } from "./pagamentos/PagamentosTable";
import { PagamentosStatsCards } from "./pagamentos/PagamentosStatsCards";

export default function Pagamentos() {
  const [statusFiltro, setStatusFiltro] = useState("Todos os status");
  const [periodoFiltro, setPeriodoFiltro] = useState("Últimos 30 dias");
  const { statusPercentages, history, loading, error } = usePayments();

  const pagamentosFiltrados = history.filter((p) => {
    const statusOk =
      statusFiltro === "Todos os status" ||
      p.status.toLowerCase() === statusFiltro.toLowerCase();
    return statusOk;
  });

  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="mt-2 text-sm text-gray-400">Carregando pagamentos...</p>
        </div>
      </div>
    );
  }
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <PagamentosStatsCards history={history} />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="rounded-xl border p-6 shadow-none">
          <div className="mb-2 text-sm font-semibold md:text-base">
            Receita Mensal
          </div>
          <span className="text-[10px] text-[#B1B5C3] md:text-xs">
            Evolução de receita e transações
          </span>
          <div className="mt-2 h-56">
            <Line
              data={{
                labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
                datasets: [
                  {
                    label: "Receita",
                    data: [5000, 12000, 18000, 22000, 27000, 32000],
                    borderColor: "#a78bfa",
                    backgroundColor: "rgba(167,139,250,0.1)",
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: "#a78bfa",
                  },
                  {
                    label: "Teste",
                    data: [100, 100, 100, 100, 100, 100],
                    borderColor: "#82CA9D",
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: "#FFFFFF",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: "#1E293B" },
                    ticks: { color: "#B1B5C3" },
                  },
                  x: {
                    grid: { color: "#1E293B" },
                    ticks: { color: "#B1B5C3" },
                  },
                },
              }}
            />
          </div>
        </Card>
        <Card className="rounded-xl border p-6 shadow-none">
          <div className="mb-2 font-semibold">Status dos Pagamentos</div>
          <span className="text-xs text-[#B1B5C3]">
            Distribuição por status
          </span>
          <div className="flex h-56 items-center justify-center">
            <Pie
              data={{
                labels: statusPercentages.map(
                  (s) => `${s.status} ${s.percentage}%`,
                ),
                datasets: [
                  {
                    data: statusPercentages.map((s) => s.percentage),
                    backgroundColor: [
                      "#34d399", // COMPLETED
                      "#fbbf24", // PENDING
                      "#f87171", // FAILED
                      "#818cf8", // CANCELED
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                plugins: { legend: { labels: { color: "#B1B5C3" } } },
              }}
            />
          </div>
        </Card>
      </div>
      <Card className="mt-6 flex min-h-0 flex-col rounded-xl border p-6 shadow-none">
        <div className="mb-2 font-semibold">Receita por Plano</div>
        <span className="text-xs text-[#B1B5C3]">
          Comparativo de receita entre planos
        </span>
        <div className="mt-2 flex h-72 w-full items-center justify-center p-2 md:p-4">
          <Bar
            data={{
              labels: ["Monthly", "Annual"],
              datasets: [
                {
                  label: "Receita",
                  data: [
                    history
                      .filter((p) => p.plan === "MONTHLY")
                      .reduce((sum, p) => sum + Number(p.amount), 0),
                    history
                      .filter((p) => p.plan === "ANNUAL")
                      .reduce((sum, p) => sum + Number(p.amount), 0),
                  ],
                  backgroundColor: ["#a78bfa", "#a78bfa"],
                  borderRadius: 8,
                  barPercentage: 0.5,
                  categoryPercentage: 0.6,
                },
                {
                  label: "Linha base",
                  data: [200, 200],
                  backgroundColor: ["#82CA9D", "#82CA9D"],
                  borderRadius: 8,
                  barPercentage: 0.5,
                  categoryPercentage: 0.6,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: "#353945" },
                  ticks: { color: "#B1B5C3", font: { size: 14 } },
                },
                x: {
                  grid: { color: "#353945" },
                  ticks: { color: "#B1B5C3", font: { size: 16 } },
                },
              },
            }}
          />
        </div>
      </Card>
      <Card className="mt-6 rounded-xl border p-0 shadow-none">
        <div className="px-6 pt-6 pb-2 text-base font-semibold">
          Filtros de Pagamento
        </div>
        <div className="flex flex-col items-center gap-4 px-6 pb-6 md:flex-row">
          <select
            className="rounded-md border px-3 py-2 text-sm"
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option>Todos os status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Canceled</option>
          </select>
          <select
            className="rounded-md border px-3 py-2 text-sm"
            value={periodoFiltro}
            onChange={(e) => setPeriodoFiltro(e.target.value)}
          >
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Este mês</option>
            <option>Este ano</option>
          </select>
        </div>
      </Card>
      <PagamentosTable pagamentosFiltrados={pagamentosFiltrados} />
    </>
  );
}
