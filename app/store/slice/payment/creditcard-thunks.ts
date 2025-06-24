import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
