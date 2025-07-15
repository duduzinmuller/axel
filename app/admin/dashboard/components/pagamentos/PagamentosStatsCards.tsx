import React from "react";
import { Card } from "@/components/ui/card";

interface PagamentosStatsCardsProps {
  history: any[];
}

export const PagamentosStatsCards = ({
  history,
}: PagamentosStatsCardsProps) => {
  return (
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
          {history.filter((p) => p.status === "PENDING").length} transação(ões)
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
  );
};
