import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

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

export const StatusBadge = ({
  status,
  type,
}: {
  status: string;
  type: string;
}) => {
  const statusStyles = {
    accessCode: {
      Disponível: "bg-[#DCFCE7] text-[#166534]",
      Usado: "bg-[#0E0F11] text-[#B1B5C3]",
    },
    email: {
      SENT: "bg-[#DCFCE7] text-[#166534]",
      PENDING: "bg-[#FEF3C7] text-[#92400E]",
      FAILED: "bg-[#FEE2E2] text-[#991B1B]",
    },
    verification: {
      verified: "bg-[#DCFCE7] text-[#166534]",
      pending: "bg-[#FEF3C7] text-[#92400E]",
      expired: "bg-[#FEE2E2] text-[#991B1B]",
    },
    usage: {
      Normal: "bg-[#DCFCE7] text-[#166534]",
      Alto: "bg-[#FEF3C7] text-[#92400E]",
      Limite: "bg-[#FEE2E2] text-[#991B1B]",
    },
  };

  const styles = statusStyles[type as keyof typeof statusStyles];
  const style =
    styles[status as keyof typeof styles] || "bg-[#DCFCE7] text-[#166534]";

  const getIcon = () => {
    if (type === "email") {
      switch (status) {
        case "SENT":
          return <CheckCircle className="h-4 w-4 text-green-600" />;
        case "PENDING":
          return (
            <AlertTriangle className="h-4 w-4" style={{ color: "#CA8A04" }} />
          );
        case "FAILED":
          return <XCircle className="h-4 w-4 text-red-600" />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {getIcon()}
      <Badge
        className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
      >
        {status}
      </Badge>
    </div>
  );
};
