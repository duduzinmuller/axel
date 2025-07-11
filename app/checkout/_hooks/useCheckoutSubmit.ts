import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store";
import { toast } from "sonner";
import { PixTransactionData } from "@/app/types/transaction-data";
import { payWithCreditCard } from "@/app/store/slice/payment/creditcard-thunks";
import {
  createBoletoPayment,
  createPixPayment,
} from "@/app/store/slice/payment/payment-thunks";

export function useCheckoutSubmit({
  paymentMethod,
  plan,
  price,
  planApiMap,
}: {
  paymentMethod: string;
  plan: string;
  price: number;
  planApiMap: Record<string, any>;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boletoData, setBoletoData] = useState<any>(null);
  const [creditCardData, setCreditCardData] = useState<any>(null);
  const [pixTransactionData, setPixTransactionData] = useState<
    PixTransactionData | undefined
  >(undefined);
  const [externalId, setExternalId] = useState<string | null>(null);
  const [pixCpf, setPixCpf] = useState<string>("");

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
      const paymentData = {
        amount: creditCardData.amount,
        plan: creditCardData.plan,
        currency: creditCardData.currency,
        cpf: creditCardData.cpf,
        name: creditCardData.name,
        paymentMethod: creditCardData.paymentMethod,
        installments: creditCardData.installments,
      };
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

  return {
    handleSubmit,
    isSubmitting,
    boletoData,
    setBoletoData,
    creditCardData,
    setCreditCardData,
    pixTransactionData,
    setPixTransactionData,
    externalId,
    pixCpf,
    setPixCpf,
  };
}
