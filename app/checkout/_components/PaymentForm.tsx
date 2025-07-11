import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CreditCardForm } from "./CreditCardForm";
import { PixPayment } from "./PixPayment";
import { BoletoPayment } from "./BoletoPayment";
import { Button } from "@/components/ui/button";
import { PromoCodeInput } from "./CodeInput";
import { motion } from "framer-motion";
import { PaymentMethod } from "@/app/types/checkout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function PaymentForm({
  paymentMethod,
  onPaymentMethodChange,
  setCreditCardData,
  setBoletoData,
  pixTransactionData,
  pixCpf,
  setPixCpf,
  price,
  plan,
  planApiMap,
  boletoUrl,
  paymentLoading,
  promoCode,
  setPromoCode,
  isSubmitting,
  isPaid,
  paymentError,
  onSubmit,
  user,
}: {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  setCreditCardData: (data: any) => void;
  setBoletoData: (data: any) => void;
  pixTransactionData?: any;
  pixCpf: string;
  setPixCpf: (cpf: string) => void;
  price: number;
  plan: string;
  planApiMap: Record<string, any>;
  boletoUrl?: string;
  paymentLoading: boolean;
  promoCode: string;
  setPromoCode: (code: string) => void;
  isSubmitting: boolean;
  isPaid: boolean;
  paymentError?: string;
  onSubmit: (e: React.FormEvent) => void;
  user?: { cpf?: string } | null;
}) {
  return (
    <form onSubmit={onSubmit}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Método de pagamento</CardTitle>
            <CardDescription>Escolha como você prefere pagar</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentMethodSelector
              selected={paymentMethod}
              onSelect={onPaymentMethodChange}
            />
            <div className="mt-6">
              {paymentMethod === "credit-card" && (
                <CreditCardForm
                  price={price}
                  plan={planApiMap[plan]}
                  currency="brl"
                  cpf={user?.cpf || ""}
                  onDataChange={setCreditCardData}
                />
              )}
              {paymentMethod === "pix" && (
                <PixPayment
                  price={price}
                  transactionData={pixTransactionData}
                  cpf={pixCpf}
                  setCpf={setPixCpf}
                />
              )}
              {paymentMethod === "bolbradesco" && (
                <BoletoPayment
                  price={price}
                  plan={planApiMap[plan]}
                  onDataChange={setBoletoData}
                  boletoUrl={boletoUrl}
                  loading={paymentLoading}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <PromoCodeInput value={promoCode} onChange={setPromoCode} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <Button
          type="submit"
          className="bg-gradient-axel w-full cursor-pointer py-6 text-lg text-white hover:scale-90"
          disabled={isSubmitting || paymentLoading}
        >
          {isSubmitting || paymentLoading
            ? "Processando..."
            : "Finalizar Pagamento"}
        </Button>
        {isPaid && (
          <div className="mt-4 text-center text-green-600">
            Pagamento confirmado! Obrigado.
          </div>
        )}
        {paymentError && (
          <div className="mt-2 text-center text-sm text-red-500">
            {paymentError}
          </div>
        )}
      </motion.div>
    </form>
  );
}
