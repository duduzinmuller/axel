import React from "react";
import { Card } from "@/components/ui/card";

interface UsuariosStatsCardsProps {
  stats: any;
}

export const UsuariosStatsCards: React.FC<UsuariosStatsCardsProps> = ({
  stats,
}) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <Card className="rounded-xl border p-4 shadow-none">
      <div className="mb-2 font-semibold">Estatísticas de Verificação</div>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between">
          <span>Verificados</span>{" "}
          <span className="font-bold text-green-500">{stats.verified}</span>
        </div>
        <div className="flex justify-between">
          <span>Pendentes</span>{" "}
          <span className="font-bold text-yellow-500">{stats.pending}</span>
        </div>
      </div>
    </Card>
    <Card className="rounded-xl border p-4 shadow-none">
      <div className="mb-2 font-semibold">Distribuição por Plano</div>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between">
          <span>Gratuito</span>{" "}
          <span className="font-bold">{stats.freePlan}</span>
        </div>
        <div className="flex justify-between">
          <span>Mensal</span>{" "}
          <span className="font-bold">{stats.monthlyPlan}</span>
        </div>
        <div className="flex justify-between">
          <span>Anual</span>{" "}
          <span className="font-bold">{stats.annualPlan}</span>
        </div>
      </div>
    </Card>
    <Card className="rounded-xl border p-4 shadow-none">
      <div className="mb-2 font-semibold">Uso de Mensagens</div>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between">
          <span>Total</span>{" "}
          <span className="font-bold">{stats.totalMessages}</span>
        </div>
        <div className="flex justify-between">
          <span>Média por usuário</span>{" "}
          <span className="font-bold">{stats.avgMessages}</span>
        </div>
      </div>
    </Card>
  </div>
);
