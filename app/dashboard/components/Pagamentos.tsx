import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Pie, Line, Bar } from "react-chartjs-2";
import React, { useState } from "react";
import { CircleCheckBig, Clock, X, XCircle } from "lucide-react";

// Componentes reutilizáveis para badges
const PlanBadge = ({ plan }: { plan: string }) => {
  const planStyles = {
    MONTHLY: "bg-[#0E0F11] text-[#FFFFFF] border border-[#353945]",
    ANNUAL: "bg-[#F8FAFC] text-[#16A34A]",
    FREE: "bg-[#1E293B] text-[#4B5563]",
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
  const providerStyles = {
    MERCADOPAGO: "bg-transparent text-white",
    PIX: "bg-[#FEE2E2] text-[#991B1B]",
    CREDIT_CARD: "bg-[#E9E9E9] text-[#23262F]",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${providerStyles[provider as keyof typeof providerStyles] || providerStyles.MERCADOPAGO}`}
    >
      {provider}
    </Badge>
  );
};

// Mock de pagamentos
const pagamentosMock = [
  {
    usuario: { nome: "João Silva", email: "joao@email.com" },
    valor: "R$ 29,90",
    plano: "MONTHLY",
    status: "COMPLETED",
    provider: "MERCADOPAGO",
    data: "20/01/2024",
    hora: "19:00",
  },
  {
    usuario: { nome: "Maria Santos", email: "maria@email.com" },
    valor: "R$ 299,90",
    plano: "ANNUAL",
    status: "COMPLETED",
    provider: "MERCADOPAGO",
    data: "19/01/2024",
    hora: "18:00",
  },
  {
    usuario: { nome: "Pedro Oliveira", email: "pedro@email.com" },
    valor: "R$ 29,90",
    plano: "MONTHLY",
    status: "PENDING",
    provider: "MERCADOPAGO",
    data: "20/01/2024",
    hora: "17:00",
  },
  {
    usuario: { nome: "Ana Costa", email: "ana@email.com" },
    valor: "R$ 29,90",
    plano: "MONTHLY",
    status: "FAILED",
    provider: "MERCADOPAGO",
    data: "18/01/2024",
    hora: "16:00",
  },
  {
    usuario: { nome: "Carlos Ferreira", email: "carlos@email.com" },
    valor: "R$ 299,90",
    plano: "ANNUAL",
    status: "CANCELED",
    provider: "MERCADOPAGO",
    data: "17/01/2024",
    hora: "12:00",
  },
];

export default function Pagamentos() {
  const [statusFiltro, setStatusFiltro] = useState("Todos os status");
  const [periodoFiltro, setPeriodoFiltro] = useState("Últimos 30 dias");

  // Função para filtrar pagamentos
  const pagamentosFiltrados = pagamentosMock.filter((p) => {
    const statusOk =
      statusFiltro === "Todos os status" ||
      p.status.toLowerCase() === statusFiltro.toLowerCase();
    return statusOk;
  });

  return (
    <>
      {/* Cards de resumo */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="flex flex-col gap-2 rounded-xl border border-[#1E293B] bg-[#0E0F11] p-6 shadow-none">
          <span className="text-[10px] text-[#B1B5C3] md:text-xs">
            Receita Total
          </span>
          <span className="text-lg font-bold text-white md:text-xl">
            R$ 329,80
          </span>
          <span className="text-[10px] text-green-500 md:text-xs">
            +12,8% vs mês anterior
          </span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border border-[#1E293B] bg-[#0E0F11] p-6 shadow-none">
          <span className="text-[10px] text-[#B1B5C3] md:text-xs">
            Transações
          </span>
          <span className="text-lg font-bold text-white md:text-xl">5</span>
          <span className="text-[10px] text-green-500 md:text-xs">
            +1 esta semana
          </span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border border-[#1E293B] bg-[#0E0F11] p-6 shadow-none">
          <span className="flex items-center gap-1 text-[10px] text-[#B1B5C3] md:text-xs">
            <span className="text-orange-400">Pagamentos Pendentes</span>
          </span>
          <span className="text-lg font-bold text-orange-400 md:text-xl">
            R$ 29,90
          </span>
          <span className="text-[10px] text-orange-400 md:text-xs">
            1 transação
          </span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border border-[#1E293B] bg-[#0E0F11] p-6 shadow-none">
          <span className="text-[10px] text-[#B1B5C3] md:text-xs">
            Taxa de Sucesso
          </span>
          <span className="text-lg font-bold text-green-400 md:text-xl">
            40.0%
          </span>
          <span className="text-[10px] text-green-400 md:text-xs">
            2 de 5 transações
          </span>
        </Card>
      </div>
      {/* Gráficos */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="rounded-xl border border-[#1E293B] bg-[#0E0F11] p-6 shadow-none">
          <div className="mb-2 text-sm font-semibold text-white md:text-base">
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
        <Card className="rounded-xl border border-[#1E293B] bg-[#0E0F11] p-6 shadow-none">
          <div className="mb-2 font-semibold text-white">
            Status dos Pagamentos
          </div>
          <span className="text-xs text-[#B1B5C3]">
            Distribuição por status
          </span>
          <div className="flex h-56 items-center justify-center">
            <Pie
              data={{
                labels: [
                  "Completed 91%",
                  "Pending 5%",
                  "Failed 2%",
                  "Canceled 2%",
                ],
                datasets: [
                  {
                    data: [91, 5, 2, 2],
                    backgroundColor: [
                      "#34d399",
                      "#fbbf24",
                      "#f87171",
                      "#818cf8",
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
      {/* Receita por Plano */}
      <Card className="mt-6 flex min-h-0 flex-col rounded-xl border border-[#1E293B] bg-[#0E0F11] p-6 shadow-none">
        <div className="mb-2 font-semibold text-white">Receita por Plano</div>
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
                  data: [15000, 45000],
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
      {/* Filtros de Pagamento */}
      <Card className="mt-6 rounded-xl border border-[#1E293B] bg-[#0E0F11] p-0 shadow-none">
        <div className="px-6 pt-6 pb-2 text-base font-semibold text-white">
          Filtros de Pagamento
        </div>
        <div className="flex flex-col items-center gap-4 px-6 pb-6 md:flex-row">
          <select
            className="rounded-md border border-[#353945] bg-[#0E0F11] px-3 py-2 text-sm text-white"
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
            className="rounded-md border border-[#353945] bg-[#0E0F11] px-3 py-2 text-sm text-white"
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
      {/* Histórico de Pagamentos */}
      <Card className="mt-6 overflow-x-auto rounded-xl border border-[#1E293B] bg-[#0E0F11] p-0 shadow-none">
        <div className="p-6 pb-2 text-base font-semibold text-white">
          Histórico de Pagamentos (5)
        </div>
        <div className="px-6 pb-4 text-xs text-[#777]">
          Lista completa de todas as transações
        </div>
        <div className="mx-5 mb-6 overflow-x-auto rounded-md border border-[#1E293B]">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0E0F11] text-[#B1B5C3]">
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
              {pagamentosFiltrados.map((p, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white">
                      {p.usuario.nome}
                    </div>
                    <div className="text-xs text-[#777]">{p.usuario.email}</div>
                  </td>
                  <td className="px-4 py-3 text-white">{p.valor}</td>
                  <td className="px-4 py-3">
                    <PlanBadge plan={p.plano} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">
                    <ProviderBadge provider={p.provider} />
                  </td>
                  <td className="px-4 py-3 text-white">
                    {p.data}
                    <br />
                    <span className="text-xs text-[#777]">{p.hora}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
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
