import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanBadge, StatusBadge } from "./LogsBadges";

interface EmailNotificationsTableProps {
  emails: any[];
  loadingEmails: boolean;
  errorEmails: string | null;
}

export const EmailNotificationsTable: React.FC<
  EmailNotificationsTableProps
> = ({ emails, loadingEmails, errorEmails }) => (
  <Card className="rounded-sm border p-0 shadow-none">
    <div className="mt-2 ml-4 p-2">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-5 w-5">📧</span>
        <p className="text-xl font-semibold">
          Notificações por Email ({emails.length})
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
        <div className="space-y-0">
          {loadingEmails ? (
            <div className="py-8 text-center text-gray-400">
              Carregando emails...
            </div>
          ) : errorEmails ? (
            <div className="py-8 text-center text-red-400">{errorEmails}</div>
          ) : emails.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              Nenhum email encontrado.
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                className="grid grid-cols-6 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4"
              >
                <div className="text-left">
                  <div className="text-[10px] font-semibold">
                    {email.recipient}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs md:text-sm">{email.subject}</div>
                </div>
                <div className="text-center">
                  <StatusBadge status={email.status} type="email" />
                </div>
                <div className="text-center">
                  <PlanBadge plan={email.plan} />
                </div>
                <div className="text-center text-xs md:text-sm">
                  {email.sentAt
                    ? new Date(email.sentAt).toLocaleDateString("pt-BR")
                    : new Date(email.createdAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="flex justify-center gap-1 md:gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-[#23262F]"
                    onClick={() => alert(email.content)}
                  >
                    Ver Conteúdo
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
