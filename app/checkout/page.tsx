"use client";

import { useSearchParams } from "next/navigation";
import { useAppSelector } from "../store";
import LoadingScreen from "../_components/LoadingScreen";
import { useAuthRedirect } from "./_hooks/useAuthRedirect";
import { useCheckoutSubmit } from "./_hooks/useCheckoutSubmit";
import { PaymentForm } from "./_components/PaymentForm";
import { OrderSummary } from "./_components/OrderSummary";
import { plans as plansData } from "@/app/_data/plans";
import { usePaymentPolling } from "@/app/_lib/hooks/usePaymentPolling";
import { useState } from "react";

export default function CheckoutPage() {
  const { user, isLoading } = useAuthRedirect();
  const searchParams = useSearchParams();
  const plan =
    (searchParams.get("plan") as "mensal" | "anual" | "free") || "mensal";

  const planApiMap = {
    mensal: "MONTHLY",
    anual: "ANNUAL",
    free: "FREE",
  } as const;

  const planMap = {
    mensal: plansData.find((p) => p.frequency === "/mês" && p.price !== "R$0"),
    anual: plansData.find((p) => p.frequency === "/ano"),
    free: plansData.find((p) => p.price === "R$0"),
  };
  const selectedPlan = planMap[plan];
  const price = selectedPlan
    ? Number(selectedPlan.price.replace(/[^\d,]/g, "").replace(",", "."))
    : 0;

  const [paymentMethod, setPaymentMethod] = useState<
    "credit-card" | "pix" | "bolbradesco"
  >("credit-card");
  const [promoCode, setPromoCode] = useState("");

  const {
    handleSubmit,
    isSubmitting,
    setBoletoData,
    setCreditCardData,
    pixTransactionData,
    externalId,
    pixCpf,
    setPixCpf,
  } = useCheckoutSubmit({
    paymentMethod,
    plan,
    price,
    planApiMap,
  });

  const {
    boletoUrl,
    loading: paymentLoading,
    error: paymentError,
  } = useAppSelector((state) => state.payment);

  const [isPaid, setIsPaid] = useState(false);
  usePaymentPolling((externalId ?? "") + "", () => setIsPaid(true));

  if (isLoading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container max-w-6xl px-4 py-10 md:px-6 lg:py-16">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Finalize seu pedido
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PaymentForm
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              setCreditCardData={setCreditCardData}
              setBoletoData={setBoletoData}
              pixTransactionData={pixTransactionData}
              pixCpf={pixCpf}
              setPixCpf={setPixCpf}
              price={price}
              plan={plan}
              planApiMap={planApiMap}
              boletoUrl={boletoUrl ?? undefined}
              paymentLoading={paymentLoading}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              isSubmitting={isSubmitting}
              isPaid={isPaid}
              paymentError={paymentError ?? undefined}
              onSubmit={handleSubmit}
              user={user}
            />
          </div>
          <div className="lg:col-span-5">
            <OrderSummary promoCode={promoCode} plan={plan} />
          </div>
        </div>
      </div>
    </div>
  );
}
