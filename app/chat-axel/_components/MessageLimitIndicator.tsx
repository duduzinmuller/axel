"use client";

import { useMessageLimit } from "@/app/_lib/hooks";
import { useAI } from "@/app/_lib/hooks/useAI";

const MessageLimitIndicator = () => {
  const { currentCount, limit, isLimitReached } = useMessageLimit();
  const { usage } = useAI();

  const backendCount = usage?.currentCount || 0;
  const backendLimit = usage?.planLimit || limit;
  const backendRemaining = usage?.remainingMessages || 0;
  const backendIsLimitReached = backendCount >= backendLimit;

  if (backendCount === 0 && currentCount === 0) return null;

  const progress =
    ((backendCount || currentCount) / (backendLimit || limit)) * 100;

  return (
    <div className="border-border space-y-2 border-t p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Mensagens hoje</span>
        <span
          className={
            backendIsLimitReached || isLimitReached
              ? "text-red-500"
              : "text-foreground"
          }
        >
          {backendCount || currentCount}/{backendLimit || limit}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className={`h-full transition-all duration-300 ${
            backendIsLimitReached || isLimitReached
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {backendRemaining > 0 && (
        <p className="text-center text-xs text-green-400">
          Restam {backendRemaining} mensagem{backendRemaining > 1 ? "s" : ""}{" "}
          gratuita{backendRemaining > 1 ? "s" : ""}
        </p>
      )}

      {(backendIsLimitReached || isLimitReached) && (
        <p className="text-center text-xs text-red-500">
          Limite atingido. Atualize seu plano para continuar.
        </p>
      )}
    </div>
  );
};

export default MessageLimitIndicator;
