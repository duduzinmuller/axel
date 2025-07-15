import React from "react";
import { Card } from "@/components/ui/card";
import {
  UserRound,
  CircleDollarSign,
  UserCheck,
  AlertCircle,
} from "lucide-react";

interface DashboardStatsCardsProps {
  dashboardStats: any;
}

export const DashboardStatsCards = ({
  dashboardStats,
}: DashboardStatsCardsProps) => {
  return (
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
          +{dashboardStats?.usersCreatedToday || 0}{" "}
          <span className="text-gray-500">hoje</span>
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
  );
};
