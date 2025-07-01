import { useState, useEffect } from "react";
import {
  PaymentService,
  PaymentStatusPercentage,
  PaymentHistory,
} from "@/app/_api/services/payment";

export const usePayments = () => {
  const [statusPercentages, setStatusPercentages] = useState<
    PaymentStatusPercentage[]
  >([]);
  const [history, setHistory] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const [status, hist] = await Promise.all([
        PaymentService.getStatusPercentage(),
        PaymentService.getHistory(),
      ]);
      setStatusPercentages(status);
      setHistory(hist);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar pagamentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return { statusPercentages, history, loading, error, refresh: fetchPayments };
};
