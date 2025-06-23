import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "../../../_constants/local-storage";
import { BoletoData, PixData } from "../../types/payment-types";
import { PaymentService } from "../../services/payment-service";
import { PixTransactionData } from "@/app/types/transaction-data";

export const createBoletoPayment = createAsyncThunk<
  string,
  BoletoData,
  { state: RootState }
>("payment/createBoletoPayment", async (boletoData, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
      boletoData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken || "",
        },
      },
    );
    return (
      response.data.boletoUrl ||
      response.data.external_resource_url ||
      response.data.transaction_details?.external_resource_url
    );
  } catch (error: any) {
    console.error("Erro ao gerar boleto:", error, error.response?.data);
    return rejectWithValue(
      error.response?.data?.message || "Erro ao gerar boleto",
    );
  }
});
export const createPixPayment = createAsyncThunk<
  PixTransactionData,
  PixData,
  { state: RootState }
>("payment/createPixPayment", async (pixData, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
      pixData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken || "",
        },
      },
    );
    return {
      qr_code:
        response.data.mercadoPago.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        response.data.mercadoPago.point_of_interaction.transaction_data
          .qr_code_base64,
    };
  } catch (error: any) {
    console.error("Erro ao gerar pagamento Pix:", error, error.response?.data);
    return rejectWithValue(
      error.response?.data?.message || "Erro ao gerar pagamento Pix",
    );
  }
});

export interface ValidateCode {
  code: string;
}

export const validateCodePlan = createAsyncThunk<
  { validateCode: string; plan: string },
  ValidateCode,
  { state: RootState }
>("payment/validateCodePlan", async (validateCode, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/code/validate-access-code`,
      validateCode,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken || "",
        },
      },
    );
    return {
      validateCode: response.data.validateCode,
      plan: response.data.plan,
    };
  } catch (error: any) {
    console.error("Erro ao validar código:", error, error.response?.data);
    return rejectWithValue(
      error.response?.data?.message || "Erro ao validar código",
    );
  }
});

export const updatePayment = createAsyncThunk<
  any,
  { paymentId: string; data: Partial<BoletoData> },
  { state: RootState }
>("payment/updatePayment", async ({ paymentId, data }, { rejectWithValue }) => {
  try {
    const formattedData = {
      ...data,
      amount:
        data.amount !== undefined
          ? typeof data.amount === "string"
            ? Number(data.amount)
            : data.amount
          : undefined,
    };

    const response = await PaymentService.updatePayment({
      externalId: paymentId,
      ...formattedData,
    });
    return response;
  } catch (error: any) {
    console.error("Erro ao atualizar pagamento:", error, error.response?.data);
    return rejectWithValue(
      error.response?.data?.message || "Erro ao atualizar pagamento",
    );
  }
});
