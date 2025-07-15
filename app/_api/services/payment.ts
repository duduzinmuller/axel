import { protectedApi } from "@/app/_lib/axios";
import { PaymentHistory } from "@/app/types/payment-history";

export interface PaymentStatusPercentage {
  status: string;
  count: number;
  percentage: number;
}

export const PaymentService = {
  async getStatusPercentage(): Promise<PaymentStatusPercentage[]> {
    const response = await protectedApi.get<PaymentStatusPercentage[]>(
      "/payment/status-percentage",
    );
    return response.data;
  },

  async getHistory(): Promise<PaymentHistory[]> {
    const response =
      await protectedApi.get<PaymentHistory[]>("/payment/history");
    return response.data;
  },
};
