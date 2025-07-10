import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanBadge, StatusBadge } from "./LogsBadges";

interface AccessCodesTableProps {
  codes: any[];
  loadingCodes: boolean;
  errorCodes: string | null;
}

export const AccessCodesTable: React.FC<AccessCodesTableProps> = ({
  codes,
  loadingCodes,
  errorCodes,
}) => (
  <Card className="rounded-sm border p-0 shadow-none">
    <div className="mt-2 ml-4 p-2">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-5 w-5">🔑</span>
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
          {loadingCodes ? (
            <div className="py-8 text-center text-gray-400">
              Carregando códigos...
            </div>
          ) : errorCodes ? (
            <div className="py-8 text-center text-red-400">{errorCodes}</div>
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
);
