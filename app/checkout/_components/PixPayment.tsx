import { QrCode } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { normalizeCPF } from "@/app/_lib/utils/formatter";
import React from "react";
import { toast } from "sonner";

interface PixTransactionData {
  qr_code: string;
  qr_code_base64: string;
}

interface PixPaymentProps {
  price: number;
  transactionData?: PixTransactionData;
  cpf: string;
  setCpf: (cpf: string) => void;
}

export function PixPayment({
  price,
  transactionData,
  cpf,
  setCpf,
}: PixPaymentProps) {
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(normalizeCPF(e.target.value));
  };

  const handleCopyPixCode = () => {
    if (transactionData?.qr_code) {
      navigator.clipboard.writeText(transactionData.qr_code);
      toast.success("Código PIX copiado com sucesso!");
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTitle className="font-medium">
          Pagamento rápido e seguro
        </AlertTitle>
        <AlertDescription className="text-muted-foreground text-sm">
          O PIX é confirmado em poucos segundos. Assim que você finalizar o
          pedido, mostraremos o QR Code para pagamento.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
        <Input
          type="text"
          id="cpf-pix"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="CPF do pagador (opcional)"
          maxLength={14}
          className="mb-4 w-64"
        />
        {transactionData?.qr_code_base64 ? (
          <Image
            src={`data:image/png;base64,${transactionData.qr_code_base64}`}
            alt="QR Code PIX"
            width={192}
            height={192}
            className="mb-4 h-48 w-48 rounded-lg"
            unoptimized
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="bg-muted mb-4 flex h-48 w-48 items-center justify-center rounded-lg"
          >
            <QrCode className="text-muted-foreground h-24 w-24" />
          </motion.div>
        )}
        <p className="text-muted-foreground mb-4 text-center text-sm">
          QR Code será gerado após a confirmação do pedido
        </p>
        <div className="mb-4 flex flex-col items-center gap-2">
          <span className="text-muted-foreground text-xs">Valor</span>
          <span className="text-lg font-bold">
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer text-xs"
            onClick={handleCopyPixCode}
            disabled={!transactionData?.qr_code}
          >
            Copiar código PIX
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Abrir app do banco
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground text-center text-sm">
        O pagamento via PIX é processado pelo nosso parceiro de pagamentos e
        está sujeito à confirmação bancária.
      </p>
    </div>
  );
}
