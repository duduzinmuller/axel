import React from "react";
import { Key } from "lucide-react";
import { useCodes } from "@/app/_lib/hooks/useCodes";
import { useEmailNotifications } from "@/app/_lib/hooks/useEmailNotifications";
import { useEmailVerifications } from "@/app/_lib/hooks/useEmailVerifications";
import { useUsers } from "@/app/_lib/hooks/useUsers";
import { useMessageUsage } from "@/app/_lib/hooks";
import { LogsStatsCards } from "./logs/LogsStatsCards";
import { AccessCodesTable } from "./logs/AccessCodesTable";
import { EmailNotificationsTable } from "./logs/EmailNotificationsTable";
import { EmailVerificationsTable } from "./logs/EmailVerificationsTable";
import { MessageUsageTable } from "./logs/MessageUsageTable";
import { Card } from "@/components/ui/card";

export default function LogsESistema() {
  const { codes, loading: loadingCodes, error: errorCodes } = useCodes();
  const {
    emails,
    loading: loadingEmails,
    error: errorEmails,
  } = useEmailNotifications();
  const {
    verifications,
    loading: loadingVerifications,
    error: errorVerifications,
  } = useEmailVerifications();

  const { users } = useUsers();
  const {
    data: messageUsage,
    loading: loadingUsage,
    error: errorUsage,
  } = useMessageUsage();

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : userId;
  };

  return (
    <>
      <LogsStatsCards
        codes={codes}
        emails={emails}
        verifications={verifications}
        messageUsage={messageUsage || []}
      />
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
          <AccessCodesTable
            codes={codes}
            loadingCodes={loadingCodes}
            errorCodes={errorCodes}
          />
        </Card>

        <EmailNotificationsTable
          emails={emails}
          loadingEmails={loadingEmails}
          errorEmails={errorEmails}
        />

        <EmailVerificationsTable
          verifications={verifications}
          loadingVerifications={loadingVerifications}
          errorVerifications={errorVerifications}
          getUserName={getUserName}
        />

        <MessageUsageTable
          messageUsage={messageUsage || []}
          loadingUsage={loadingUsage}
          errorUsage={errorUsage}
        />
      </div>
    </>
  );
}
