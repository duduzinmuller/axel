import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updatePayment } from "./payment-thunks";

export const createCardToken = createAsyncThunk(
  "payment/createCardToken",
  async (cardData, { rejectWithValue }) => {
    try {
      const accessToken = process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN;
      const response = await axios.post(
        `https://api.mercadopago.com/v1/card_tokens?access_token=${accessToken}`,
        cardData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Erro ao criar token do cartão",
      );
    }
  },
);

export const createCreditCardPayment = createAsyncThunk(
  "payment/createCreditCardPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-refresh-token": refreshToken || "",
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Erro ao criar pagamento com cartão",
      );
    }
  },
);

export const payWithCreditCard = createAsyncThunk(
  "payment/payWithCreditCard",
  async (
    { cardData, paymentData }: { cardData: any; paymentData: any },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const tokenResult = await dispatch(createCardToken(cardData)).unwrap();
      if (!tokenResult?.id) throw new Error("Token do cartão não criado");

      const paymentPayload = { ...paymentData, token: tokenResult.id };
      const paymentResult = await dispatch(
        createCreditCardPayment(paymentPayload),
      ).unwrap();

      const paymentId =
        paymentResult?.payment?.externalId || paymentResult?.payment?.id;

      if (!paymentId) throw new Error("Pagamento não criado");

      const updateResult = await dispatch<any>(
        updatePayment({ paymentId, data: {} }),
      ).unwrap();

      return {
        tokenResult,
        paymentResult,
        updateResult,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro no pagamento com cartão");
    }
  },
);
