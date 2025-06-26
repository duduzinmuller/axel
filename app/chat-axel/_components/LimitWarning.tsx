"use client";

import { useMessageLimit } from "@/app/_lib/hooks";
import { useUsage } from "@/app/_lib/hooks/useUsage";
import { AlertTriangle } from "lucide-react";

const LimitWarning = () => {
  const { currentCount, limit, isLimitReached } = useMessageLimit();
  const { usage } = useUsage();

  const backendCount = usage?.currentCount || 0;
  const backendLimit = usage?.planLimit || limit;
  const backendRemaining = usage?.remainingMessages || 0;
  const backendIsLimitReached = backendCount >= backendLimit;

  const remainingMessages =
    backendRemaining > 0
      ? backendRemaining
      : (backendLimit || limit) - (backendCount || currentCount);
  const shouldShowWarning = remainingMessages <= 3 && remainingMessages > 0;

  if (!shouldShowWarning && !backendIsLimitReached && !isLimitReached)
    return null;

  return (
    <div
      className={`mb-3 rounded-lg p-3 text-sm ${
        backendIsLimitReached || isLimitReached
          ? "border border-red-500/30 bg-red-500/20 text-red-400"
          : "border border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
      }`}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>
          {backendIsLimitReached || isLimitReached
            ? "Limite de mensagens atingido!"
            : `Atenção: Restam apenas ${remainingMessages} mensagem${remainingMessages > 1 ? "s" : ""} gratuita${remainingMessages > 1 ? "s" : ""} hoje.`}
        </span>
      </div>
      {!backendIsLimitReached && !isLimitReached && (
        <p className="mt-1 text-xs opacity-80">
          Considere atualizar seu plano para mensagens ilimitadas.
        </p>
      )}
    </div>
  );
};

export default LimitWarning;
