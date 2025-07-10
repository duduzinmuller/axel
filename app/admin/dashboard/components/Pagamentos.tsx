import { Pie, Line, Bar } from "react-chartjs-2";
import React, { useState } from "react";
import { CircleCheckBig, Clock, X, XCircle } from "lucide-react";
import { usePayments } from "@/app/_lib/hooks/usePayments";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PlanBadge = ({ plan }: { plan: string }) => {
  const planStyles = {
    MONTHLY:
      "shadow-gold border border-yellow-400 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900",
    ANNUAL:
      "shadow-diamond border border-blue-200 bg-gradient-to-r from-cyan-200 via-white to-blue-400 text-blue-900",
    FREE: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${planStyles[plan as keyof typeof planStyles] || planStyles.FREE}`}
    >
      {plan}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    COMPLETED: "bg-[#DCFCE7] text-[#166534]",
    PENDING: "bg-[#FEF3C7] text-[#92400E]",
    FAILED: "bg-[#FEE2E2] text-[#991B1B]",
    CANCELED: "bg-[#F3F4F6] text-[#1F2937]",
  };

  return (
    <div className="flex items-center gap-2">
      {status === "COMPLETED" && (
        <CircleCheckBig className="h-4 w-4 text-[#166534]" />
      )}
      {status === "PENDING" && <Clock className="h-4 w-4 text-[#92400E]" />}
      {status === "FAILED" && <X className="h-4 w-4 text-[#991B1B]" />}
      {status === "CANCELED" && <XCircle className="h-4 w-4 text-[#4B5563]" />}
      <Badge
        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status as keyof typeof statusStyles] || statusStyles.PENDING}`}
      >
        {status}
      </Badge>
    </div>
  );
};

const ProviderBadge = ({ provider }: { provider: string }) => {
  return (
    <Badge className="rounded-full px-3 py-1 text-xs font-semibold">
      {provider}
    </Badge>
  );
};

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
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
          <span className="text-[10px] text-[#B1B5C3] md:text-xs">
            Receita Total
          </span>
          <span className="text-lg font-bold md:text-xl">
            R${" "}
            {history
              .reduce((sum, p) => sum + Number(p.amount), 0)
              .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-green-500 md:text-xs"></span>
        </Card>
        <Card className="border] flex flex-col gap-2 rounded-xl p-6 shadow-none">
          <span className="text-[10px] text-[#B1B5C3] md:text-xs">
            Transações
          </span>
          <span className="text-lg font-bold md:text-xl">{history.length}</span>
          <span className="text-[10px] text-green-500 md:text-xs"></span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
          <span className="flex items-center gap-1 text-[10px] text-[#B1B5C3] md:text-xs">
            <span className="text-orange-400">Pagamentos Pendentes</span>
          </span>
          <span className="text-lg font-bold text-orange-400 md:text-xl">
            R${" "}
            {history
              .filter((p) => p.status === "PENDING")
              .reduce((sum, p) => sum + Number(p.amount), 0)
              .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-orange-400 md:text-xs">
            {history.filter((p) => p.status === "PENDING").length}{" "}
            transação(ões)
          </span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
          <span className="text-[10px] text-[#B1B5C3] md:text-xs">
            Taxa de Sucesso
          </span>
          <span className="text-lg font-bold text-green-400 md:text-xl">
            {(() => {
              const completed = history.filter(
                (p) => p.status === "COMPLETED",
              ).length;
              return history.length > 0
                ? ((completed / history.length) * 100).toFixed(1)
                : "0.0";
            })()}
            %
          </span>
          <span className="text-[10px] text-green-400 md:text-xs">
            {history.filter((p) => p.status === "COMPLETED").length} de{" "}
            {history.length} transações
          </span>
        </Card>
      </div>
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
      <Card className="mt-6 overflow-x-auto rounded-xl border p-0 shadow-none">
        <div className="p-6 pb-2 text-base font-semibold">
          Histórico de Pagamentos ({pagamentosFiltrados.length})
        </div>
        <div className="px-6 pb-4 text-xs text-[#777]">
          Lista completa de todas as transações
        </div>
        <div className="mx-5 mb-6 overflow-x-auto rounded-md border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-[#B1B5C3]">
                <th className="px-4 py-3 text-left font-semibold">Usuário</th>
                <th className="px-4 py-3 text-left font-semibold">Valor</th>
                <th className="px-4 py-3 text-left font-semibold">Plano</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Provider</th>
                <th className="px-4 py-3 text-left font-semibold">Data</th>
                <th className="px-4 py-3 text-left font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {pagamentosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{p.user?.name}</div>
                    <div className="text-xs text-[#777]">{p.user?.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    R${" "}
                    {Number(p.amount).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <PlanBadge plan={p.plan} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">
                    <ProviderBadge provider={p.paymentProvider} />
                  </td>
                  <td className="px-4 py-3">
                    {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      className="px-2 py-1 text-[#F8FAFC] hover:bg-[#23262F]"
                    >
                      Ver detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
