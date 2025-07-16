"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import SettingsSection from "./SettingsSection";
import { useRouter } from "next/navigation";
import { useUserStatus } from "@/app/_lib/hooks/useUserStatus";

export default function AdminDashboard() {
  const router = useRouter();
  const { status, loading } = useUserStatus();

  return (
    <SettingsSection
      title="Dashboard Administrativo"
      description="Visualize e gerencie todos os usuários do seu assistente AI"
      icon={<Users className="h-5 w-5" />}
    >
      <div className="mb-6 flex gap-6">
        <div className="flex flex-1 items-center rounded-xl px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-blue-400"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-blue-500">
              {loading
                ? "..."
                : status.ACTIVE + status.PENDING + status.INACTIVE}
            </span>
            <span className="text-xs leading-tight text-blue-500">Total</span>
          </div>
        </div>
        <div className="flex flex-1 items-center rounded-xl px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-green-400"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-green-500">
              {loading ? "..." : status.ACTIVE}
            </span>
            <span className="text-xs leading-tight text-green-500">Ativos</span>
          </div>
        </div>
        <div className="flex flex-1 items-center rounded-xl px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-yellow-400"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-yellow-500">
              {loading ? "..." : status.PENDING}
            </span>
            <span className="text-xs leading-tight text-yellow-500">
              Pendentes
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center rounded-xl px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-neutral-500"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-neutral-400">
              {loading ? "..." : status.INACTIVE}
            </span>
            <span className="text-xs leading-tight text-neutral-400">
              Inativos
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-3">
        <div className="min-w-0 flex-1">
          <Button
            onClick={() => router.push("/admin/dashboard")}
            className="flex h-[38px] w-full cursor-pointer items-center justify-between rounded-[10px] border-none bg-[#3B82F6] pr-3 pl-3 text-left text-sm font-medium text-white shadow-none transition-all"
          >
            <span className="flex items-center gap-2">
              <Users className="mr-2 h-4 w-4" />
              <span className="flex-1 text-left text-sm">
                Acessar Painel Completo
              </span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-xl px-6 py-4 text-center text-[12px]">
        Clique em &ldquo;Acessar Painel Completo&rdquo; para ver todos os
        usuários, filtros avançados e ferramentas de gerenciamento.
      </div>
    </SettingsSection>
  );
}
