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
} from "lucide-react";

// Tipos para os dados dos usuários
interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  role: string;
  provider: string;
  status: string;
  messages: number;
  createdAt: string;
}

// Dados mockados dos usuários
const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    plan: "MONTHLY",
    role: "USER",
    provider: "email",
    status: "Verificado",
    messages: 45,
    createdAt: "14/01/2024",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    plan: "ANNUAL",
    role: "ADMIN",
    provider: "google",
    status: "Verificado",
    messages: 120,
    createdAt: "09/01/2024",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    plan: "FREE",
    role: "USER",
    provider: "email",
    status: "Pendente",
    messages: 12,
    createdAt: "17/01/2024",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    plan: "MONTHLY",
    role: "USER",
    provider: "github",
    status: "Verificado",
    messages: 78,
    createdAt: "11/01/2024",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos@email.com",
    plan: "FREE",
    role: "USER",
    provider: "email",
    status: "Pendente",
    messages: 5,
    createdAt: "18/01/2024",
  },
  {
    id: "6",
    name: "Lucia Mendes",
    email: "lucia@email.com",
    plan: "ANNUAL",
    role: "USER",
    provider: "google",
    status: "Verificado",
    messages: 95,
    createdAt: "05/01/2024",
  },
  {
    id: "7",
    name: "Roberto Alves",
    email: "roberto@email.com",
    plan: "FREE",
    role: "USER",
    provider: "email",
    status: "Pendente",
    messages: 8,
    createdAt: "20/01/2024",
  },
];

// Componentes reutilizáveis para badges
const PlanBadge = ({ plan }: { plan: string }) => {
  const planStyles = {
    MONTHLY: "bg-[#F8FAFC] text-[#2563EB]",
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
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("Todos os planos");
  const [roleFilter, setRoleFilter] = useState("Todas as roles");
  const [statusFilter, setStatusFilter] = useState("Todos");

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm("");
    setPlanFilter("Todos os planos");
    setRoleFilter("Todas as roles");
    setStatusFilter("Todos");
  };

  // Função para filtrar usuários
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      // Filtro por busca (nome ou email)
      const matchesSearch =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por plano
      const matchesPlan =
        planFilter === "Todos os planos" ||
        (planFilter === "Gratuito" && user.plan === "FREE") ||
        (planFilter === "Mensal" && user.plan === "MONTHLY") ||
        (planFilter === "Anual" && user.plan === "ANNUAL");

      // Filtro por role
      const matchesRole =
        roleFilter === "Todas as roles" ||
        (roleFilter === "User" && user.role === "USER") ||
        (roleFilter === "Admin" && user.role === "ADMIN");

      // Filtro por status
      const matchesStatus =
        statusFilter === "Todos" || user.status === statusFilter;

      return matchesSearch && matchesPlan && matchesRole && matchesStatus;
    });
  }, [searchTerm, planFilter, roleFilter, statusFilter]);

  // Calcular estatísticas baseadas nos usuários filtrados
  const stats = useMemo(() => {
    const verified = filteredUsers.filter(
      (user) => user.status === "Verificado",
    ).length;
    const pending = filteredUsers.filter(
      (user) => user.status === "Pendente",
    ).length;

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
      (sum, user) => sum + user.messages,
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

  return (
    <>
      {/* Filtros e Busca */}
      <Card className="mt-5 mb-6 rounded-sm border border-[#23262F] bg-[#0E0F11] p-0 shadow-none">
        <div className="px-6 pt-6 text-base">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Funnel />
              <p className="text-xl font-semibold text-white">
                Filtros e Busca
              </p>
            </div>
            {(searchTerm ||
              planFilter !== "Todos os planos" ||
              roleFilter !== "Todas as roles" ||
              statusFilter !== "Todos") && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                className="text-[#777] hover:text-white"
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
              className="focus:ring-primary/30 w-full rounded-md border border-[#353945] bg-[#0E0F11] py-2 pr-3 pl-10 text-sm text-white outline-none placeholder:text-[#777] focus:ring-2"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-3/4 rounded-md border border-[#353945] bg-[#0E0F11] px-3 py-2 text-sm text-white md:w-1/5"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option>Todos os planos</option>
            <option>Gratuito</option>
            <option>Mensal</option>
            <option>Anual</option>
          </select>
          <select
            className="w-3/4 rounded-md border border-[#353945] bg-[#0E0F11] px-3 py-2 text-sm text-white md:w-1/5"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>Todas as roles</option>
            <option>User</option>
            <option>Admin</option>
          </select>
          <select
            className="w-3/4 rounded-md border border-[#353945] bg-[#0E0F11] px-3 py-2 text-sm text-white md:w-1/5"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Todos</option>
            <option>Verificado</option>
            <option>Pendente</option>
          </select>
          <Button className="mt-2 w-2/4 border border-[#353945] bg-[#0E0F11] text-white hover:bg-[#23262F]/80 md:mt-0 md:w-1/5">
            Exportar
          </Button>
        </div>
      </Card>

      {/* Lista de Usuários */}
      <Card className="mb-5 overflow-x-auto rounded-sm border border-[#1E293B] bg-[#0E0F11] p-0 shadow-none">
        <div className="mt-2 ml-4 p-2">
          <p className="mb-2 text-base font-semibold text-white md:text-lg">
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
            {/* Cabeçalho */}
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

            {/* Linhas de dados */}
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
                      <div className="text-[10px] font-semibold text-white md:text-xs">
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
                      <StatusBadge status={user.status} />
                    </div>
                    <div className="text-center text-[10px] text-white md:text-xs">
                      {user.messages}
                    </div>
                    <div className="text-center text-[10px] text-white md:text-xs">
                      {user.createdAt}
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
        <Card className="rounded-xl border border-[#23262F] bg-[#0E0F11] p-4 shadow-none">
          <div className="mb-2 font-semibold text-white">
            Estatísticas de Verificação
          </div>
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
        <Card className="rounded-xl border border-[#23262F] bg-[#0E0F11] p-4 shadow-none">
          <div className="mb-2 font-semibold text-white">
            Distribuição por Plano
          </div>
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
        <Card className="rounded-xl border border-[#23262F] bg-[#0E0F11] p-4 shadow-none">
          <div className="mb-2 font-semibold text-white">Uso de Mensagens</div>
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
