"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlanBadge, ProviderBadge, StatusBadge } from "./PagamentosBadges";
import { CreditCard, User, Mail } from "lucide-react";
import { PaymentHistory } from "@/app/types/payment-history";

interface PagamentoDetailsDialogProps {
  payment: PaymentHistory;
  isOpen: boolean;
  onClose: () => void;
}

export const PagamentoDetailsDialog = ({
  payment,
  isOpen,
  onClose,
}: PagamentoDetailsDialogProps) => {
  if (!payment) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Detalhes do Pagamento
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-none max-h-[70vh] space-y-6 overflow-y-auto pr-2">
          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Informações Gerais
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">ID</label>
                <p className="font-mono text-xs break-all text-[#777]">
                  {payment.id}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Status
                </label>
                <StatusBadge status={payment.status} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">Valor</label>
                <p className="text-sm">
                  R${" "}
                  {Number(payment.amount).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">Moeda</label>
                <p className="text-sm">{payment.currency?.toUpperCase()}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Parcelas
                </label>
                <p className="text-sm">{payment.installments}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Método
                </label>
                <p className="text-sm">{payment.paymentMethod}</p>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Plano
                </label>
                <PlanBadge plan={payment.plan} />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Provider
                </label>
                <ProviderBadge provider={payment.paymentProvider} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Criado em
                </label>
                <p className="text-sm">{formatDate(payment.createdAt)}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Atualizado em
                </label>
                <p className="text-sm">{formatDate(payment.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Dados do Usuário
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  <User className="h-3 w-3" /> Nome
                </label>
                <p className="text-sm">{payment.user?.name}</p>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  <Mail className="h-3 w-3" /> Email
                </label>
                <p className="text-sm">{payment.user?.email}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  User ID
                </label>
                <p className="font-mono text-xs break-all text-[#777]">
                  {payment.userId}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Dados do Pagador
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">CPF</label>
                <p className="text-sm">{payment.cpf}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Destinatário
                </label>
                <p className="text-sm">{payment.recipient}</p>
              </div>
            </div>
          </div>

          {payment.paymentMethod === "bolbradesco" && (
            <div className="space-y-4">
              <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
                Endereço
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">CEP</label>
                  <p className="text-sm">{payment.zip_code}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">Rua</label>
                  <p className="text-sm">{payment.street_name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Número
                  </label>
                  <p className="text-sm">{payment.street_number}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Bairro
                  </label>
                  <p className="text-sm">{payment.neighborhood}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Cidade
                  </label>
                  <p className="text-sm">{payment.city}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">UF</label>
                  <p className="text-sm">{payment.federal_unit}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
              Outros Dados
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  External ID
                </label>
                <p className="text-sm">{payment.externalId}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Notificação Enviada
                </label>
                <p className="text-sm">
                  {payment.notificationSent ? "Sim" : "Não"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
