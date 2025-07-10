import React from "react";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield } from "lucide-react";

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

export const RoleBadge = ({ role }: { role: string }) => {
  const roleStyles = {
    USER: "border border-[#1E293B] bg-[#0E0F11] text-white",
    ADMIN: "bg-[#7F1D1D] text-white",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[role as keyof typeof roleStyles] || roleStyles.USER}`}
    >
      {role === "USER" && <Crown className="mr-1 h-3 w-3" />}
      {role === "ADMIN" && <Shield className="mr-1 h-3 w-3" />}
      {role}
    </Badge>
  );
};

export const ProviderBadge = ({ provider }: { provider: string }) => {
  const providerStyles = {
    email: "bg-[#DBEAFE] text-[#1E40AF]",
    google: "bg-[#FEE2E2] text-[#991B1B]",
    github: "bg-[#E9E9E9] text-[#23262F]",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${providerStyles[provider as keyof typeof providerStyles] || providerStyles.email}`}
    >
      {provider}
    </Badge>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Verificado: "bg-[#DCFCE7] text-[#166534]",
    Pendente: "bg-[#FEF3C7] text-[#92400E]",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Pendente}`}
    >
      {status}
    </Badge>
  );
};
