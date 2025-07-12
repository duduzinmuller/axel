"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PlanBadge,
  RoleBadge,
  ProviderBadge,
  StatusBadge,
} from "./UsuariosBadges";
import {
  Calendar,
  Mail,
  User,
  Shield,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { Users } from "@/app/types/user";

interface UsuarioDetailsDialogProps {
  user: Users | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UsuarioDetailsDialog: React.FC<UsuarioDetailsDialogProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "INACTIVE":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalhes do Usuário
          </DialogTitle>
        </DialogHeader>

        <div className="scrollbar-none max-h-[70vh] space-y-6 overflow-y-auto pr-2">
          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Informações Básicas
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Nome
                </label>
                <p className="text-sm">{user.name}</p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  <Mail className="h-3 w-3" />
                  Email
                </label>
                <p className="text-sm">{user.email}</p>
              </div>

              {user.image && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Imagem
                  </label>
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                    <span className="text-xs text-[#777]">
                      Imagem do perfil
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Status e Permissões
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  <Shield className="h-3 w-3" />
                  Status
                </label>
                <div className="flex items-center gap-2">
                  {getStatusIcon(user.status)}
                  <span className="text-sm capitalize">
                    {user.status.toLowerCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Role
                </label>
                <div className="flex items-center gap-2">
                  <RoleBadge role={user.role} />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Verificação
                </label>
                <StatusBadge
                  status={user.isVerified ? "Verificado" : "Pendente"}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Provider
                </label>
                <div className="flex items-center gap-2">
                  <ProviderBadge provider={user.provider} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Plano e Assinatura
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  <CreditCard className="h-3 w-3" />
                  Plano Atual
                </label>
                <PlanBadge plan={user.plan} />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Expira em
                </label>
                <p className="text-sm">
                  {user.planExpiresAt
                    ? formatDate(user.planExpiresAt)
                    : "Sem data de expiração"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Mensagens
                </label>
                <p className="text-sm">{user.messages || 0} mensagens</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Datas
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  <Calendar className="h-3 w-3" />
                  Criado em
                </label>
                <p className="text-sm">{formatDate(user.createdAt)}</p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Atualizado em
                </label>
                <p className="text-sm">{formatDate(user.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Informações Técnicas
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  ID do Usuário
                </label>
                <p className="font-mono text-xs break-all text-[#777]">
                  {user.id}
                </p>
              </div>

              {user.providerId && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Provider ID
                  </label>
                  <p className="font-mono text-xs break-all text-[#777]">
                    {user.providerId}
                  </p>
                </div>
              )}

              {user.resetPasswordToken && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Token de Reset
                  </label>
                  <p className="font-mono text-xs break-all text-[#777]">
                    {user.resetPasswordToken}
                  </p>
                </div>
              )}

              {user.resetPasswordTokenExpires && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Token Expira em
                  </label>
                  <p className="text-sm">
                    {formatDate(user.resetPasswordTokenExpires)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
