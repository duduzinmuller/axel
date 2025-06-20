"use client";

import { useState } from "react";
import { X, Crown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LimitReachedModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageCount: number;
  limit: number;
  resetTime: string;
}

const LimitReachedModal = ({
  isOpen,
  onClose,
  messageCount,
  limit,
  resetTime,
}: LimitReachedModalProps) => {
  const router = useRouter();
  const [isUpgrading, setIsUpgrading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setIsUpgrading(true);
    router.push("/payment");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-500/20 p-3">
              <Crown className="h-8 w-8 text-red-400" />
            </div>
          </div>

          <h3 className="mb-2 text-xl font-bold text-white">
            Limite de Mensagens Atingido
          </h3>

          <p className="mb-4 text-sm text-gray-300">
            Você usou {messageCount} de {limit} mensagens disponíveis no seu
            plano gratuito.
          </p>

          <div className="mb-6 rounded-lg bg-gray-700/50 p-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <Calendar className="h-4 w-4" />
              <span>Limite será resetado em: {resetTime}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="bg-gradient-axel w-full cursor-pointer text-white hover:scale-105 disabled:opacity-50"
            >
              {isUpgrading ? "Redirecionando..." : "Atualizar Plano"}
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Fechar
            </Button>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Atualize para um plano pago e tenha mensagens ilimitadas!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LimitReachedModal;
