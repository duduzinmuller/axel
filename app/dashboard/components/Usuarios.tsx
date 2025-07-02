import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import React, { useState, useMemo } from "react";
import {
  Funnel,
  Crown,
  Shield,
  Eye,
  Edit,
  Mail,
  Trash2,
  Search,
  X,
  AlertCircle,
} from "lucide-react";
import { useUsers } from "@/app/_lib/hooks/useUsers";

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

const RoleBadge = ({ role }: { role: string }) => {
  const roleStyles = {
    USER: "border border-[#1E293B] bg-[#0E0F11] text-white",
    ADMIN: "bg-[#7F1D1D] text-white",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[role as keyof typeof roleStyles] || roleStyles.USER}`}
    >
      {role === "USER" && <Crown className="mr-1 h-3 w-3" />}
      {role === "ADMIN" && <Shield className="mr-1 h-3 w-3" />}
      {role}
    </Badge>
  );
};

const ProviderBadge = ({ provider }: { provider: string }) => {
  const providerStyles = {
    email: "bg-[#DBEAFE] text-[#1E40AF]",
    google: "bg-[#FEE2E2] text-[#991B1B]",
    github: "bg-[#E9E9E9] text-[#23262F]",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${providerStyles[provider as keyof typeof providerStyles] || providerStyles.email}`}
    >
      {provider}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Verificado: "bg-[#DCFCE7] text-[#166534]",
    Pendente: "bg-[#FEF3C7] text-[#92400E]",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Pendente}`}
    >
      {status}
    </Badge>
  );
};

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
          <Button className="mt-2 w-2/4 border border-[#353945] text-white hover:bg-[#23262F]/80 md:mt-0 md:w-1/5">
            Exportar
          </Button>
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

        <div className="mr-5 mb-10 ml-5 flex overflow-x-auto rounded-sm border border-[#23262F] p-3 md:p-5">
          <div className="mx-auto w-full max-w-full min-w-[900px]">
            <div className="mb-2 grid grid-cols-8 gap-2 border-b border-[#23262F] pb-2 md:gap-4">
              <div className="col-span-2 text-left text-[10px] font-semibold text-[#B1B5C3] md:col-span-1 md:text-xs">
                Usuário
              </div>
              <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
                Plano
              </div>
              <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
                Role
              </div>
              <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
                Provider
              </div>
              <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
                Verificado
              </div>
              <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
                Mensagens
              </div>
              <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
                Criado em
              </div>
              <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
                Ações
              </div>
            </div>
            <div className="space-y-0">
              {filteredUsers.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-[#777]">
                    Nenhum usuário encontrado com os filtros aplicados.
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-8 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4"
                  >
                    <div className="col-span-2 text-left md:col-span-1">
                      <div className="text-[10px] font-semibold md:text-xs">
                        {user.name}
                      </div>
                      <div className="text-[9px] text-[#777] md:text-[10px]">
                        {user.email}
                      </div>
                    </div>
                    <div className="text-center">
                      <PlanBadge plan={user.plan} />
                    </div>
                    <div className="text-center">
                      <RoleBadge role={user.role} />
                    </div>
                    <div className="text-center">
                      <ProviderBadge provider={user.provider} />
                    </div>
                    <div className="text-center">
                      <StatusBadge
                        status={user.isVerified ? "Verificado" : "Pendente"}
                      />
                    </div>
                    <div className="text-center text-[10px] md:text-xs">
                      {user.messages || 0}
                    </div>
                    <div className="text-center text-[10px] md:text-xs">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="-ml-7 -ml-12 ml-4 flex justify-center gap-1 md:ml-0 md:gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-[#B1B5C3] hover:bg-[#23262F]"
                      >
                        <span className="sr-only">Ver</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-[#B1B5C3] hover:bg-[#23262F]"
                      >
                        <span className="sr-only">Editar</span>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-[#B1B5C3] hover:bg-[#23262F]"
                      >
                        <span className="sr-only">Email</span>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:bg-[#23262F]"
                      >
                        <span className="sr-only">Excluir</span>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Estatísticas */}
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
    </>
  );
}
