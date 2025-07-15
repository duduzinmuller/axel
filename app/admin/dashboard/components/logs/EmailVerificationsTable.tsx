import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./LogsBadges";
import { CheckCircle2 } from "lucide-react";
import { EmailVerification } from "@/app/_api/services/emailVerification";

interface EmailVerificationsTableProps {
  verifications: EmailVerification[];
  loadingVerifications: boolean;
  errorVerifications: string | null;
  getUserName: (userId: string) => string;
}

export const EmailVerificationsTable = ({
  verifications,
  loadingVerifications,
  errorVerifications,
  getUserName,
}: EmailVerificationsTableProps) => {
  return (
    <Card className="rounded-sm border p-0 shadow-none">
      <div className="mt-2 ml-4 p-2">
        <div className="mb-2 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-xl font-semibold">
            Verificações de Email ({verifications.length})
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
          <div className="space-y-0">
            {loadingVerifications ? (
              <div className="py-8 text-center text-gray-400">
                Carregando verificações...
              </div>
            ) : errorVerifications ? (
              <div className="py-8 text-center text-red-400">
                {errorVerifications}
              </div>
            ) : verifications.length === 0 ? (
              <div className="py-8 text-center text-gray-400">
                Nenhuma verificação encontrada.
              </div>
            ) : (
              verifications.map((verification) => (
                <div
                  key={verification.id}
                  className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4"
                >
                  <div className="text-left">
                    <div className="text-xs font-semibold md:text-sm">
                      {getUserName(verification.userId)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs md:text-sm">
                      {verification.code}
                    </div>
                  </div>
                  <div className="text-center">
                    <StatusBadge status="pending" type="verification" />
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    {new Date(verification.expiresAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  </div>
                  <div className="text-center text-xs md:text-sm">
                    {new Date(verification.createdAt).toLocaleDateString(
                      "pt-BR",
                    )}
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
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
