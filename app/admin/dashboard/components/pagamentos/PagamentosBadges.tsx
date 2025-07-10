import React from "react";
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig, Clock, X, XCircle } from "lucide-react";

export const PlanBadge = ({ plan }: { plan: string }) => {
  const planStyles = {
    MONTHLY:
      "shadow-gold border border-yellow-400 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900",
    ANNUAL:
      "shadow-diamond border border-blue-200 bg-gradient-to-r from-cyan-200 via-white to-blue-400 text-blue-900",
    FREE: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${planStyles[plan as keyof typeof planStyles] || planStyles.FREE}`}
    >
      {plan}
    </Badge>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    COMPLETED: "bg-[#DCFCE7] text-[#166534]",
    PENDING: "bg-[#FEF3C7] text-[#92400E]",
    FAILED: "bg-[#FEE2E2] text-[#991B1B]",
    CANCELED: "bg-[#F3F4F6] text-[#1F2937]",
  };

  return (
    <div className="flex items-center gap-2">
      {status === "COMPLETED" && (
        <CircleCheckBig className="h-4 w-4 text-[#166534]" />
      )}
      {status === "PENDING" && <Clock className="h-4 w-4 text-[#92400E]" />}
      {status === "FAILED" && <X className="h-4 w-4 text-[#991B1B]" />}
      {status === "CANCELED" && <XCircle className="h-4 w-4 text-[#4B5563]" />}
      <Badge
        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status as keyof typeof statusStyles] || statusStyles.PENDING}`}
      >
        {status}
      </Badge>
    </div>
  );
};

export const ProviderBadge = ({ provider }: { provider: string }) => {
  return (
    <Badge className="rounded-full px-3 py-1 text-xs font-semibold">
      {provider}
    </Badge>
  );
};
