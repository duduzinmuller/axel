import React from "react";
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
        <AccessCodesTable
          codes={codes}
          loadingCodes={loadingCodes}
          errorCodes={errorCodes}
        />

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
