import React from "react";
import { Card } from "@/components/ui/card";
import { PlanBadge, StatusBadge } from "./LogsBadges";
import { Info } from "lucide-react";

interface MessageUsageTableProps {
  messageUsage: any[];
  loadingUsage: boolean;
  errorUsage: string | null;
}

export const MessageUsageTable: React.FC<MessageUsageTableProps> = ({
  messageUsage,
  loadingUsage,
  errorUsage,
}) => (
  <Card className="rounded-sm border p-0 shadow-none">
    <div className="mt-2 ml-4 p-2">
      <div className="mb-2 flex items-center gap-2">
        <Info className="h-5 w-5" />
        <p className="text-xl font-semibold">
          Uso de Mensagens ({messageUsage ? messageUsage.length : 0})
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
        <div className="space-y-0">
          {loadingUsage ? (
            <div className="py-8 text-center text-gray-400">
              Carregando uso de mensagens...
            </div>
          ) : errorUsage ? (
            <div className="py-8 text-center text-red-400">{errorUsage}</div>
          ) : !messageUsage || messageUsage.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              Nenhum uso de mensagem encontrado.
            </div>
          ) : (
            messageUsage.map((usage) => (
              <div
                key={usage.id}
                className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4"
              >
                <div className="text-left">
                  <div className="text-xs font-semibold md:text-sm">
                    {usage.name}
                  </div>
                </div>
                <div className="text-center">
                  <PlanBadge plan={usage.plan} />
                </div>
                <div className="text-center text-xs md:text-sm">
                  {new Date(usage.date).toLocaleDateString("pt-BR")}
                </div>
                <div className="text-center text-xs md:text-sm">
                  {usage.messages}
                </div>
                <div className="text-center text-xs md:text-sm">
                  {usage.plan === "MONTHLY" || usage.plan === "ANNUAL" ? (
                    <span title="Ilimitado">&#8734;</span>
                  ) : (
                    <p>Limitado</p>
                  )}
                </div>
                <div className="text-center">
                  <StatusBadge status={usage.status} type="usage" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </Card>
);
