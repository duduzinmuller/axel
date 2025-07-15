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

interface PagamentoDetailsDialogProps {
  pagamento: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PagamentoDetailsDialog: React.FC<PagamentoDetailsDialogProps> = ({
  pagamento,
  isOpen,
  onClose,
}) => {
  if (!pagamento) return null;

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
                  {pagamento.id}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Status
                </label>
                <StatusBadge status={pagamento.status} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">Valor</label>
                <p className="text-sm">
                  R${" "}
                  {Number(pagamento.amount).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">Moeda</label>
                <p className="text-sm">{pagamento.currency?.toUpperCase()}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Parcelas
                </label>
                <p className="text-sm">{pagamento.installments}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Método
                </label>
                <p className="text-sm">{pagamento.paymentMethod}</p>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Plano
                </label>
                <PlanBadge plan={pagamento.plan} />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  Provider
                </label>
                <ProviderBadge provider={pagamento.paymentProvider} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Criado em
                </label>
                <p className="text-sm">{formatDate(pagamento.createdAt)}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Atualizado em
                </label>
                <p className="text-sm">{formatDate(pagamento.updatedAt)}</p>
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
                <p className="text-sm">{pagamento.user?.name}</p>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-[#777]">
                  <Mail className="h-3 w-3" /> Email
                </label>
                <p className="text-sm">{pagamento.user?.email}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  User ID
                </label>
                <p className="font-mono text-xs break-all text-[#777]">
                  {pagamento.userId}
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
                <p className="text-sm">{pagamento.cpf}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Destinatário
                </label>
                <p className="text-sm">{pagamento.recipient}</p>
              </div>
            </div>
          </div>

          {pagamento.paymentMethod === "bolbradesco" && (
            <div className="space-y-4">
              <h3 className="border-b border-[#23262F] pb-2 text-lg font-semibold text-[#B1B5C3]">
                Endereço
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">CEP</label>
                  <p className="text-sm">{pagamento.zip_code}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">Rua</label>
                  <p className="text-sm">{pagamento.street_name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Número
                  </label>
                  <p className="text-sm">{pagamento.street_number}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Bairro
                  </label>
                  <p className="text-sm">{pagamento.neighborhood}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">
                    Cidade
                  </label>
                  <p className="text-sm">{pagamento.city}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#777]">UF</label>
                  <p className="text-sm">{pagamento.federal_unit}</p>
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
                <p className="text-sm">{pagamento.externalId}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#777]">
                  Notificação Enviada
                </label>
                <p className="text-sm">
                  {pagamento.notificationSent ? "Sim" : "Não"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
