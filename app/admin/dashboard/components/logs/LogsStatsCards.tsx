import React from "react";
import { Card } from "@/components/ui/card";

interface LogsStatsCardsProps {
  codes: any[];
  emails: any[];
  verifications: any[];
  messageUsage: any[];
}

export const LogsStatsCards: React.FC<LogsStatsCardsProps> = ({
  codes,
  emails,
  verifications,
  messageUsage,
}) => (
  <div className="mt-6 mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
    <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
      <span className="text-muted-foreground text-xs">Códigos de Acesso</span>
      <span className="text-2xl font-bold">{codes.length}</span>
      <span className="text-xs">
        {codes.filter((c) => !c.used).length} disponíveis
      </span>
    </Card>
    <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
      <span className="text-muted-foreground text-xs">Emails Enviados</span>
      <span className="text-2xl font-bold">{emails.length}</span>
      <span className="text-xs">
        {emails.filter((e) => e.status === "PENDING").length} pendente(s)
      </span>
    </Card>
    <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
      <span className="text-muted-foreground text-xs">Verificações</span>
      <span className="text-2xl font-bold">{verifications.length}</span>
      <span className="text-xs">
        {verifications.filter((v) => v.status === "pending").length} pendente(s)
      </span>
    </Card>
    <Card className="flex flex-col gap-2 rounded-xl border p-6 shadow-none">
      <span className="text-muted-foreground text-xs">Uso de Mensagens</span>
      <span className="text-2xl font-bold">
        {messageUsage
          ? messageUsage.reduce((acc, u) => acc + (u.messages || 0), 0)
          : 0}
      </span>
      <span className="text-xs">Total hoje</span>
    </Card>
  </div>
);
