import React from "react";
import { PlanBadge, StatusBadge, ProviderBadge } from "./PagamentosBadges";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PagamentosTableProps {
  pagamentosFiltrados: any[];
}

export const PagamentosTable: React.FC<PagamentosTableProps> = ({
  pagamentosFiltrados,
}) => (
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
);
