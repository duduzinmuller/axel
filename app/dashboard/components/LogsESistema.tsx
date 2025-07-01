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
import { useCodes } from "@/app/_lib/hooks/useCodes";

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
  const { codes, loading, error } = useCodes();

  return (
    <>
      <div className="mt-6 mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
          <span className="text-muted-foreground text-xs">
            Códigos de Acesso
          </span>
          <span className="text-2xl font-bold">{codes.length}</span>
          <span className="text-xs">
            {codes.filter((c) => !c.used).length} disponíveis
          </span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
          <span className="text-muted-foreground text-xs">Emails Enviados</span>
          <span className="text-2xl font-bold">4</span>
          <span className="text-xs">1 pendente</span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
          <span className="text-muted-foreground text-xs">Verificações</span>
          <span className="text-2xl font-bold">3</span>
          <span className="text-xs">1 pendente</span>
        </Card>
        <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
          <span className="text-muted-foreground text-xs">
            Uso de Mensagens
          </span>
          <span className="text-2xl font-bold">177</span>
          <span className="text-xs">Total hoje</span>
        </Card>
      </div>
      <div className="space-y-8">
        <Card className="rounded-sm border p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <Key className="h-5 w-5" />
              <p className="text-xl font-semibold">
                Códigos de Acesso ({codes.length})
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
              <div className="space-y-0">
                {loading ? (
                  <div className="py-8 text-center text-gray-400">
                    Carregando códigos...
                  </div>
                ) : error ? (
                  <div className="py-8 text-center text-red-400">{error}</div>
                ) : codes.length === 0 ? (
                  <div className="py-8 text-center text-gray-400">
                    Nenhum código encontrado.
                  </div>
                ) : (
                  codes.map((code) => (
                    <div
                      key={code.id}
                      className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4"
                    >
                      <div className="text-left">
                        <div className="text-xs font-semibold md:text-sm">
                          {code.code}
                        </div>
                      </div>
                      <div className="text-center">
                        <PlanBadge plan={code.plan} />
                      </div>
                      <div className="text-center">
                        <StatusBadge
                          status={code.used ? "Usado" : "Disponível"}
                          type="accessCode"
                        />
                      </div>
                      <div className="text-center text-xs md:text-sm">
                        {new Date(code.expiresAt).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="text-center text-xs md:text-sm">
                        {new Date(code.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex justify-center gap-1 md:gap-2">
                        {!code.used ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-[#23262F]"
                          >
                            Revogar
                          </Button>
                        ) : (
                          <span className="text-xs text-[#777]">Usado</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Notificações por Email */}
        <Card className="rounded-sm border p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <p className="text-xl font-semibold">
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
                    <div className="text-xs font-semibold md:text-sm">
                      joao@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm">
                      Bem-vindo ao sistema!
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="SENT" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-[#23262F]"
                    >
                      Ver Conteúdo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      maria@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm">
                      Confirmação de pagamento
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="SENT" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="ANNUAL" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    19/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-[#23262F]"
                    >
                      Ver Conteúdo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      pedro@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm">
                      Verificação de email pendente
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="PENDING" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="FREE" />
                  </div>
                  <div className="text-center text-xs md:text-sm">-</div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-[#23262F]"
                    >
                      Ver Conteúdo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      ana@email.com
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm">
                      Falha no processamento
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="FAILED" type="email" />
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center text-xs md:text-sm">-</div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-[#23262F]"
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
        <Card className="rounded-sm border p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-xl font-semibold">Verificações de Email (3)</p>
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
                    <div className="text-xs font-semibold md:text-sm">
                      João Silva
                    </div>
                    <div className="text-[10px] text-[#777] md:text-xs">
                      joao@email.com
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs md:text-sm">123456</div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="verified" type="verification" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-[#23262F]"
                    >
                      Reenviar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      Pedro Oliveira
                    </div>
                    <div className="text-[10px] text-[#777] md:text-xs">
                      pedro@email.com
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs md:text-sm">789012</div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="pending" type="verification" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-[#23262F]"
                    >
                      Reenviar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      Carlos Ferreira
                    </div>
                    <div className="text-[10px] text-[#777] md:text-xs">
                      carlos@email.com
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs md:text-sm">364789</div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="expired" type="verification" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    19/01/2024
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    19/01/2024
                  </div>
                  <div className="flex justify-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-[#23262F]"
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
        <Card className="rounded-sm border p-0 shadow-none">
          <div className="mt-2 ml-4 p-2">
            <div className="mb-2 flex items-center gap-2">
              <Info className="h-5 w-5" />
              <p className="text-xl font-semibold">Uso de Mensagens (3)</p>
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
                    <div className="text-xs font-semibold md:text-sm">
                      João Silva
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="MONTHLY" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs md:text-sm">45</div>
                  <div className="text-center text-xs md:text-sm">500</div>
                  <div className="text-center">
                    <StatusBadge status="Normal" type="usage" />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      Maria Santos
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="ANNUAL" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs md:text-sm">120</div>
                  <div className="text-center text-xs md:text-sm">1000</div>
                  <div className="text-center">
                    <StatusBadge status="Normal" type="usage" />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      Pedro Oliveira
                    </div>
                  </div>
                  <div className="text-center">
                    <PlanBadge plan="FREE" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    20/01/2024
                  </div>
                  <div className="text-center text-xs md:text-sm">12</div>
                  <div className="text-center text-xs md:text-sm">50</div>
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
