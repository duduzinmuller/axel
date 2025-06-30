import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Key,
  Mail,
  CheckCircle2,
  Info,
} from "lucide-react";

// Componentes de Badge reutilizáveis (estilo do Usuarios.tsx)
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

const StatusBadge = ({ status, type }: { status: string; type: string }) => {
  const statusStyles = {
    accessCode: {
      Disponível: "bg-[#DCFCE7] text-[#166534]",
      Usado: "bg-[#0E0F11] text-[#B1B5C3]",
    },
    email: {
      SENT: "bg-[#DCFCE7] text-[#166534]",
      PENDING: "bg-[#FEF3C7] text-[#92400E]",
      FAILED: "bg-[#FEE2E2] text-[#991B1B]",
    },
    verification: {
      verified: "bg-[#DCFCE7] text-[#166534]",
      pending: "bg-[#FEF3C7] text-[#92400E]",
      expired: "bg-[#FEE2E2] text-[#991B1B]",
    },
    usage: {
      Normal: "bg-[#DCFCE7] text-[#166534]",
      Alto: "bg-[#FEF3C7] text-[#92400E]",
      Limite: "bg-[#FEE2E2] text-[#991B1B]",
    },
  };

  const styles = statusStyles[type as keyof typeof statusStyles];
  const style =
    styles[status as keyof typeof styles] || "bg-[#DCFCE7] text-[#166534]";

  const getIcon = () => {
    if (type === "email") {
      switch (status) {
        case "SENT":
          return <CheckCircle className="h-4 w-4 text-green-600" />;
        case "PENDING":
          return (
            <AlertTriangle className="h-4 w-4" style={{ color: "#CA8A04" }} />
          );
        case "FAILED":
          return <XCircle className="h-4 w-4 text-red-600" />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {getIcon()}
      <Badge
        className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
      >
        {status}
      </Badge>
    </div>
  );
};

export default function LogsESistema() {
  return (
    <>
      {/* Cards Resumo Logs & Sistema */}
      <div className="mt-6 mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="flex flex-col gap-2 rounded-xl border border-[#23262F] bg-[#0E0F11] p-6 shadow-none">
          <span className="text-muted-foreground text-xs">
            Códigos de Acesso
          </span>
          <span className="text-2xl font-bold text-white">3</span>
          <span className="text-xs text-white/30">2 disponíveis</span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border border-[#23262F] bg-[#0E0F11] p-6 shadow-none">
          <span className="text-muted-foreground text-xs">Emails Enviados</span>
          <span className="text-2xl font-bold text-white">4</span>
          <span className="text-xs text-white/30">1 pendente</span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border border-[#23262F] bg-[#0E0F11] p-6 shadow-none">
          <span className="text-muted-foreground text-xs">Verificações</span>
          <span className="text-2xl font-bold text-white">3</span>
          <span className="text-xs text-white/30">1 pendente</span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border border-[#23262F] bg-[#0E0F11] p-6 shadow-none">
          <span className="text-muted-foreground text-xs">
            Uso de Mensagens
          </span>
          <span className="text-2xl font-bold text-white">177</span>
          <span className="text-xs text-white/30">Total hoje</span>
        </Card>
      </div>
      <div className="space-y-8">
        {/* Códigos de Acesso */}
        <Card className="rounded-sm border border-[#1E293B] bg-[#0E0F11] p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <Key className="h-5 w-5 text-white" />
              <p className="text-xl font-semibold text-white">
                Códigos de Acesso (3)
              </p>
            </div>
            <div>
              <p className="text-xs text-[#777]">
                Gerencie códigos de acesso para novos usuários
              </p>
            </div>
          </div>
          <div className="mr-5 mb-10 ml-5 flex overflow-x-auto rounded-sm border border-[#23262F] p-3 md:p-5">
            <div className="mx-auto w-full max-w-full min-w-[800px]">
              {/* Cabeçalho */}
              <div className="mb-2 grid grid-cols-6 gap-2 border-b border-[#23262F] pb-2 md:gap-4">
                <div className="text-left text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Código
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Plano
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Status
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Expira em
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Criado em
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Ações
                </div>
              </div>

              {/* Linhas de dados */}
              <div className="space-y-0">
                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      WELCOME2024
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center">
                    <StatusBadge status="Disponível" type="accessCode" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    28/03/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    15/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Revogar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      PREMIUM50
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="ANNUAL" />
                  </div>
                  <div className="text-center">
                    <StatusBadge status="Usado" type="accessCode" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    31/12/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    10/01/2024
                  </div>
                  <div className="flex justify-center">
                    <span className="text-xs text-[#777]">Usado</span>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      FREEDAYS
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center">
                    <StatusBadge status="Disponível" type="accessCode" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    15/03/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Revogar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notificações por Email */}
        <Card className="rounded-sm border border-[#1E293B] bg-[#0E0F11] p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-white" />
              <p className="text-xl font-semibold text-white">
                Notificações por Email (4)
              </p>
            </div>
            <div>
              <p className="text-xs text-[#777]">
                Histórico de emails enviados pelo sistema
              </p>
            </div>
          </div>
          <div className="mr-5 mb-10 ml-5 flex overflow-x-auto rounded-sm border border-[#23262F] p-3 md:p-5">
            <div className="mx-auto w-full max-w-full min-w-[900px]">
              {/* Cabeçalho */}
              <div className="mb-2 grid grid-cols-6 gap-2 border-b border-[#23262F] pb-2 md:gap-4">
                <div className="text-left text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Destinatário
                </div>
                <div className="text-left text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Assunto
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Status
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Plano
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Enviado em
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Ações
                </div>
              </div>

              {/* Linhas de dados */}
              <div className="space-y-0">
                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      joao@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white md:text-sm">
                      Bem-vindo ao sistema!
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="SENT" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Ver Conteúdo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      maria@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white md:text-sm">
                      Confirmação de pagamento
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="SENT" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="ANNUAL" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    19/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Ver Conteúdo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      pedro@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white md:text-sm">
                      Verificação de email pendente
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="PENDING" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="FREE" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    -
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Ver Conteúdo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      ana@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white md:text-sm">
                      Falha no processamento
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="FAILED" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    -
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Ver Conteúdo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Verificações de Email */}
        <Card className="rounded-sm border border-[#1E293B] bg-[#0E0F11] p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-white" />
              <p className="text-xl font-semibold text-white">
                Verificações de Email (3)
              </p>
            </div>
            <div>
              <p className="text-xs text-[#777]">
                Status das verificações de email dos usuários
              </p>
            </div>
          </div>
          <div className="mr-5 mb-10 ml-5 flex overflow-x-auto rounded-sm border border-[#23262F] p-3 md:p-5">
            <div className="mx-auto w-full max-w-full min-w-[900px]">
              {/* Cabeçalho */}
              <div className="mb-2 grid grid-cols-6 gap-2 border-b border-[#23262F] pb-2 md:gap-4">
                <div className="text-left text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Usuário
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Código
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Status
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Expira em
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Criado em
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Ações
                </div>
              </div>

              {/* Linhas de dados */}
              <div className="space-y-0">
                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      João Silva
                    </div>
                    <div className="text-[10px] text-[#777] md:text-xs">
                      joao@email.com
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-white md:text-sm">123456</div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="verified" type="verification" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Reenviar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      Pedro Oliveira
                    </div>
                    <div className="text-[10px] text-[#777] md:text-xs">
                      pedro@email.com
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-white md:text-sm">789012</div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="pending" type="verification" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Reenviar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      Carlos Ferreira
                    </div>
                    <div className="text-[10px] text-[#777] md:text-xs">
                      carlos@email.com
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-white md:text-sm">364789</div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="expired" type="verification" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    19/01/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    19/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-[#23262F]"
                    >
                      Reenviar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Uso de Mensagens */}
        <Card className="rounded-sm border border-[#1E293B] bg-[#0E0F11] p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-white" />
              <p className="text-xl font-semibold text-white">
                Uso de Mensagens (3)
              </p>
            </div>
            <div>
              <p className="text-xs text-[#777]">
                Controle diário de uso de mensagens por usuário
              </p>
            </div>
          </div>
          <div className="mr-5 mb-10 ml-5 flex overflow-x-auto rounded-sm border border-[#23262F] p-3 md:p-5">
            <div className="mx-auto w-full max-w-full min-w-[800px]">
              {/* Cabeçalho */}
              <div className="mb-2 grid grid-cols-6 gap-2 border-b border-[#23262F] pb-2 md:gap-4">
                <div className="text-left text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Usuário
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Plano
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Data
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Mensagens
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Limite
                </div>
                <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
                  Status
                </div>
              </div>

              {/* Linhas de dados */}
              <div className="space-y-0">
                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      João Silva
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    45
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    500
                  </div>
                  <div className="text-center">
                    <StatusBadge status="Normal" type="usage" />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      Maria Santos
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="ANNUAL" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    120
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    1000
                  </div>
                  <div className="text-center">
                    <StatusBadge status="Normal" type="usage" />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white md:text-sm">
                      Pedro Oliveira
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="FREE" />
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    12
                  </div>
                  <div className="text-center text-xs text-white md:text-sm">
                    50
                  </div>
                  <div className="text-center">
                    <StatusBadge status="Normal" type="usage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
