"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, UserPlus } from "lucide-react";
import SettingsSection from "./SettingsSection";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <SettingsSection
      title="Dashboard Administrativo"
      description="Visualize e gerencie todos os usuários do seu assistente AI"
      icon={<Users className="h-5 w-5" />}
    >
      <div className="mb-6 flex gap-6">
        <div className="flex flex-1 items-center rounded-xl bg-[#181F2A] px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-blue-400"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-blue-100">
              --
            </span>
            <span className="text-xs leading-tight text-blue-300">Total</span>
          </div>
        </div>
        <div className="flex flex-1 items-center rounded-xl bg-[#181F2A] px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-green-400"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-green-200">
              --
            </span>
            <span className="text-xs leading-tight text-green-400">Ativos</span>
          </div>
        </div>
        <div className="flex flex-1 items-center rounded-xl bg-[#181F2A] px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-yellow-400"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-yellow-200">
              --
            </span>
            <span className="text-xs leading-tight text-yellow-400">
              Pendentes
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center rounded-xl bg-[#181F2A] px-5 py-3">
          <div className="mr-3 h-6 w-6 rounded-full bg-neutral-500"></div>
          <div className="flex flex-col items-start">
            <span className="text-2xl leading-tight font-bold text-neutral-400">
              --
            </span>
            <span className="text-xs leading-tight text-neutral-400">
              Inativos
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-sm font-semibold text-white">
          Atividade Recente
        </h3>
        <div className="rounded-lg bg-[#131923] px-3 py-4 text-center">
          <span className="text-xs text-neutral-400">
            Nenhuma atividade recente
          </span>
        </div>
      </div>

      <hr className="my-4 mb-7 border-t border-[#23262F] opacity-30" />

      <div className="flex w-full items-center gap-3">
        <div className="min-w-0 flex-1">
          <Button
            onClick={() => router.push("/dashboard")}
            className="flex h-[38px] w-full cursor-pointer items-center justify-between rounded-[10px] border-none bg-[#3B82F6] pr-3 pl-3 text-left text-sm font-medium text-[#0E0F11] shadow-none transition-all"
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
        <div className="min-w-[120px]">
          <Button
            variant="outline"
            className="flex h-[38px] min-w-0 items-center justify-start gap-2 rounded-[10px] border border-[#3B82F6] bg-transparent px-3 text-sm font-medium text-white shadow-none transition-all"
          >
            <UserPlus className="mr-2 h-4 w-4 text-[#3B82F6]" />
            <span className="text-sm text-white">Adicionar Usuário</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#181F2A] px-6 py-4 text-center text-[12px] text-neutral-300">
        Clique em &ldquo;Acessar Painel Completo&rdquo; para ver todos os
        usuários, filtros avançados e ferramentas de gerenciamento.
      </div>
    </SettingsSection>
  );
}
