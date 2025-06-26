"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store";
import LoadingScreen from "../_components/LoadingScreen";
import { useRouter } from "next/navigation";
import {
  createBoletoPayment,
  createPixPayment,
  pollPaymentStatus,
} from "../store/slice/payment";
import { PaymentMethod } from "../types/checkout";
import { PromoCodeInput } from "./_components/CodeInput";
import { CreditCardForm } from "./_components/CreditCardForm";
import { OrderSummary } from "./_components/OrderSummary";
import { PaymentMethodSelector } from "./_components/PaymentMethodSelector";
import { PixPayment } from "./_components/PixPayment";
import { plans as plansData } from "@/app/_data/plans";
import { BoletoPayment } from "./_components/BoletoPayment";
import { usePaymentPolling } from "@/app/_lib/hooks/usePaymentPolling";
import { PixTransactionData } from "../types/transaction-data";
import { toast } from "sonner";
import { payWithCreditCard } from "../store/slice/payment/creditcard-thunks";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit-card");
  const [promoCode, setPromoCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [boletoData, setBoletoData] = useState<any>(null);
  const [creditCardData, setCreditCardData] = useState<any>(null);
  const [pixTransactionData, setPixTransactionData] = useState<
    PixTransactionData | undefined
  >(undefined);
  const [externalId, setExternalId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [pixCpf, setPixCpf] = useState<string>("");

  const {
    boletoUrl,
    loading: paymentLoading,
    error: paymentError,
    paymentStatus,
  } = useAppSelector((state) => state.payment);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (paymentMethod === "credit-card" && creditCardData) {
      const cardData = {
        card_number: creditCardData.cardNumber,
        expiration_month: creditCardData.expirationMonth,
        expiration_year: creditCardData.expirationYear,
        security_code: creditCardData.securityCode,
        cardholder: {
          name: creditCardData.name,
          identification: {
            type: "CPF",
            number: creditCardData.cpf,
          },
        },
      };
      console.log("cardData", cardData);
      const paymentData: any = {
        amount: creditCardData.amount,
        plan: creditCardData.plan,
        currency: creditCardData.currency,
        cpf: creditCardData.cpf,
        name: creditCardData.name,
        paymentMethod: creditCardData.paymentMethod,
        installments: creditCardData.installments,
      };
      console.log("paymentData", paymentData);
      try {
        const result = await dispatch(
          payWithCreditCard({ cardData, paymentData }),
        ).unwrap();

        const paymentId =
          result.paymentResult?.externalId || result.paymentResult?.id;
        if (paymentId) setExternalId(paymentId);

        const status = result.updateResult?.status;
        if (status === "COMPLETED") {
          toast.success("Seu pagamento foi confirmado com sucesso.");
          router.push("/success");
        } else if (status === "FAILED") {
          toast.error(
            "Pagamento recusado. Tente novamente ou use outro cartão.",
          );
        } else if (status === "PENDING") {
          toast("Estamos processando seu pagamento. Aguarde a confirmação.");
        } else {
          toast("Status desconhecido. Aguarde ou tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        toast.error("Não foi possível processar o pagamento. Tente novamente.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (paymentMethod === "bolbradesco" && boletoData) {
      dispatch(createBoletoPayment(boletoData))
        .unwrap()
        .finally(() => {
          setIsSubmitting(false);
        });
      return;
    }

    if (paymentMethod === "pix") {
      const payload = {
        amount: price.toString(),
        currency: "brl",
        paymentMethod: "pix",
        plan: planApiMap[plan],
        cpf: pixCpf.replace(/\D/g, ""),
      };
      dispatch(createPixPayment({ ...payload, amount: Number(payload.amount) }))
        .unwrap()
        .then((pixData) => {
          setPixTransactionData({
            qr_code: pixData.qr_code ?? "",
            qr_code_base64: pixData.qr_code_base64 ?? "",
          });
        })
        .finally(() => setIsSubmitting(false));
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const planApiMap = {
    mensal: "MONTHLY",
    anual: "ANNUAL",
    free: "FREE",
  } as const;

  const searchParams = useSearchParams();
  const plan =
    (searchParams.get("plan") as "mensal" | "anual" | "free") || "mensal";

  const planMap = {
    mensal: plansData.find((p) => p.frequency === "/mês" && p.price !== "R$0"),
    anual: plansData.find((p) => p.frequency === "/ano"),
    free: plansData.find((p) => p.price === "R$0"),
  };
  const selectedPlan = planMap[plan];
  const price = selectedPlan
    ? Number(selectedPlan.price.replace(/[^\d,]/g, "").replace(",", "."))
    : 0;

  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    setHasMounted(true);
    if (!isLoading && (!user || !isAuthenticated)) {
      router.push("/login");
    }
  }, [isAuthenticated, user, isLoading, router]);

  useEffect(() => {
    if (!externalId) return;
    const interval = setInterval(() => {
      dispatch(pollPaymentStatus(externalId));
    }, 4000);

    return () => clearInterval(interval);
  }, [externalId, dispatch]);

  useEffect(() => {
    if (paymentStatus === "COMPLETED") {
      router.push("/success");
    }
  }, [paymentStatus, router]);

  usePaymentPolling(externalId ?? "", () => setIsPaid(true));

  if (!hasMounted || isLoading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container max-w-6xl px-4 py-10 md:px-6 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-8 text-center text-3xl font-bold">
            Finalize seu pedido
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Método de pagamento</CardTitle>
                    <CardDescription>
                      Escolha como você prefere pagar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PaymentMethodSelector
                      selected={paymentMethod}
                      onSelect={setPaymentMethod}
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
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OrderSummary promoCode={promoCode} plan={plan} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
