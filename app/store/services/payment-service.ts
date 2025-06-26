import axios from "axios";
import { StorageUtils } from "../utils/storage-utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PaymentService = {
  updatePayment: async (data: {
    externalId: string;
    amount?: number;
    cpf?: string;
  }) => {
    const accessToken = StorageUtils.getAccessToken();
    if (!accessToken) throw new Error("Token de acesso não encontrado.");
    const response = await axios.patch(
      `${API_URL}/payment/update-payment`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },

  getPaymentStatus: async (externalId: string) => {
    const accessToken = StorageUtils.getAccessToken();
    if (!accessToken) throw new Error("Token de acesso não encontrado.");
    const response = await axios.get(
      `${API_URL}/payment/status/${externalId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.status;
  },
};
