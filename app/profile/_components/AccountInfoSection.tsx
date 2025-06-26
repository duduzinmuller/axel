"use client";
import { Check, X, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface AccountInfoSectionProps {
  plan: string | null;
  isVerified: boolean;
  onVerifyEmail: () => void;
}

export default function AccountInfoSection({
  plan,
  isVerified,
}: AccountInfoSectionProps) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="mb-1 text-base font-semibold text-zinc-900 dark:text-white">
        Informações da conta
      </span>
      <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
        <div className="flex items-center gap-3">
          <span className="text-zinc-900 dark:text-white">Plano</span>
        </div>
        {plan ? (
          <span
            className={`rounded px-2 py-0.5 text-xs font-semibold ${plan === "FREE" && "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"} ${plan === "MONTHLY" && "shadow-gold border border-yellow-400 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900"} ${plan === "ANNUAL" && "shadow-diamond border border-blue-200 bg-gradient-to-r from-cyan-200 via-white to-blue-400 text-blue-900"} `}
          >
            {plan}
          </span>
        ) : (
          <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            Gratuito
          </span>
        )}
      </div>

      {plan === "FREE" && (
        <div className="mb-1 flex justify-end">
          <a
            href="/payment"
            className="mt-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow transition hover:scale-105"
          >
            Atualizar Plano
          </a>
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
        <div className="flex items-center gap-3">
          <span className="text-zinc-900 dark:text-white">
            Email verificado
          </span>
        </div>
        {isVerified ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
            <Check className="h-4 w-4" /> Verificado
          </span>
        ) : (
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-500">
              <X className="h-4 w-4" /> Não verificado
            </span>
          </div>
        )}
      </div>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]"
        onClick={() => router.push("/settings")}
        tabIndex={0}
        role="button"
        aria-label="Ir para configurações"
      >
        <div className="flex items-center gap-3">
          <Settings className="h-4 w-4 text-zinc-900 dark:text-white" />
          <span className="text-zinc-900 dark:text-white">Configurações</span>
        </div>
      </div>
    </div>
  );
}
