import React from "react";
import { Card } from "@/components/ui/card";

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
        <span className="h-5 w-5">ℹ️</span>
        <p className="text-xl font-semibold">
          Uso de Mensagens ({messageUsage ? messageUsage.length : 0})
        </p>
      </div>
      <div>
        <p className="text-xs text-[#777]">
          Estatísticas de uso de mensagens por usuário
        </p>
      </div>
    </div>
    <div className="mr-5 mb-10 ml-5 flex overflow-x-auto rounded-sm border border-[#23262F] p-3 md:p-5">
      <div className="mx-auto w-full max-w-full min-w-[900px]">
        <div className="mb-2 grid grid-cols-3 gap-2 border-b border-[#23262F] pb-2 md:gap-4">
          <div className="text-left text-xs font-semibold text-[#B1B5C3] md:text-sm">
            Usuário
          </div>
          <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
            Mensagens
          </div>
          <div className="text-center text-xs font-semibold text-[#B1B5C3] md:text-sm">
            Último uso
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
              Nenhum dado de uso encontrado.
            </div>
          ) : (
            messageUsage.map((usage) => (
              <div
                key={usage.userId}
                className="grid grid-cols-3 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4"
              >
                <div className="text-left">
                  <div className="text-xs font-semibold md:text-sm">
                    {usage.userName || usage.userId}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs md:text-sm">
                    {usage.messages || 0}
                  </div>
                </div>
                <div className="text-center text-xs md:text-sm">
                  {usage.lastUsedAt
                    ? new Date(usage.lastUsedAt).toLocaleDateString("pt-BR")
                    : "-"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </Card>
);
