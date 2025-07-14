import React, { useState, useMemo } from "react";
import { useUsers } from "@/app/_lib/hooks/useUsers";
import { Funnel, X, Search, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsuariosTable } from "./usuarios/UsuariosTable";
import { UsuariosStatsCards } from "./usuarios/UsuariosStatsCards";

export default function Usuarios() {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("Todos os planos");
  const [roleFilter, setRoleFilter] = useState("Todas as roles");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const clearFilters = () => {
    setSearchTerm("");
    setPlanFilter("Todos os planos");
    setRoleFilter("Todas as roles");
    setStatusFilter("Todos");
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPlan =
        planFilter === "Todos os planos" ||
        (planFilter === "Gratuito" && user.plan === "FREE") ||
        (planFilter === "Mensal" && user.plan === "MONTHLY") ||
        (planFilter === "Anual" && user.plan === "ANNUAL");

      const matchesRole =
        roleFilter === "Todas as roles" ||
        (roleFilter === "User" && user.role === "USER") ||
        (roleFilter === "Admin" && user.role === "ADMIN");

      const matchesStatus =
        statusFilter === "Todos" ||
        (statusFilter === "Verificado" && user.isVerified) ||
        (statusFilter === "Pendente" && !user.isVerified);

      return matchesSearch && matchesPlan && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, planFilter, roleFilter, statusFilter]);

  const stats = useMemo(() => {
    const verified = filteredUsers.filter((user) => user.isVerified).length;
    const pending = filteredUsers.filter((user) => !user.isVerified).length;

    const freePlan = filteredUsers.filter(
      (user) => user.plan === "FREE",
    ).length;
    const monthlyPlan = filteredUsers.filter(
      (user) => user.plan === "MONTHLY",
    ).length;
    const annualPlan = filteredUsers.filter(
      (user) => user.plan === "ANNUAL",
    ).length;

    const totalMessages = filteredUsers.reduce(
      (sum, user) => sum + (user.messages || 0),
      0,
    );
    const avgMessages =
      filteredUsers.length > 0
        ? Math.round(totalMessages / filteredUsers.length)
        : 0;

    return {
      verified,
      pending,
      freePlan,
      monthlyPlan,
      annualPlan,
      totalMessages,
      avgMessages,
    };
  }, [filteredUsers]);

  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="mt-2 text-sm text-gray-400">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
          <p className="mt-2 text-sm text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Card className="mt-5 mb-6 rounded-sm border p-0 shadow-none">
        <div className="px-6 pt-6 text-base">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Funnel />
              <p className="text-xl font-semibold">Filtros e Busca</p>
            </div>
            {(searchTerm ||
              planFilter !== "Todos os planos" ||
              roleFilter !== "Todas as roles" ||
              statusFilter !== "Todos") && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                className="hover:text-white"
              >
                <X className="mr-1 h-4 w-4" />
                Limpar filtros
              </Button>
            )}
          </div>
          <div>
            <p className="p-2 text-sm text-[#777]">
              Filtre e pesquise usuários por diferentes critérios
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 px-6 pb-6 md:flex-row">
          <div className="relative w-3/4 md:w-1/5">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#777]" />
            <input
              className="focus:ring-primary/30 w-full rounded-md border py-2 pr-3 pl-10 text-sm outline-none placeholder:text-[#777] focus:ring-2"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-3/4 rounded-md border px-3 py-2 text-sm md:w-1/5"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option>Todos os planos</option>
            <option>Gratuito</option>
            <option>Mensal</option>
            <option>Anual</option>
          </select>
          <select
            className="w-3/4 rounded-md border px-3 py-2 text-sm md:w-1/5"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>Todas as roles</option>
            <option>User</option>
            <option>Admin</option>
          </select>
          <select
            className="text-smmd:w-1/5 w-3/4 rounded-md border px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Todos</option>
            <option>Verificado</option>
            <option>Pendente</option>
          </select>
        </div>
      </Card>
      <Card className="mb-5 overflow-x-auto rounded-sm border border-[#1E293B] p-0 shadow-none">
        <div className="mt-2 ml-4 p-2">
          <p className="mb-2 text-base font-semibold md:text-lg">
            Lista de Usuários ({filteredUsers.length})
          </p>
          <div>
            <p className="text-[10px] text-[#777] md:text-xs">
              Gerencie todos os usuários cadastrados no sistema
            </p>
          </div>
        </div>
        <UsuariosTable filteredUsers={filteredUsers} />
      </Card>

      <UsuariosStatsCards stats={stats} />
    </>
  );
}
