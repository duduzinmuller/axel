import { createSlice } from "@reduxjs/toolkit";
import { createCardToken, createCreditCardPayment } from "./creditcard-thunks";

const initialState = {
  cardToken: null,
  paymentResult: null,
  loading: false,
  error: null as string | null,
};

const creditCardSlice = createSlice({
  name: "creditCardPayment",
  initialState,
  reducers: {
    clearCardPaymentState(state) {
      state.cardToken = null;
      state.paymentResult = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCardToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCardToken.fulfilled, (state, action) => {
        state.loading = false;
        state.cardToken = action.payload;
      })
      .addCase(createCardToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(createCreditCardPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCreditCardPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentResult = action.payload;
      })
      .addCase(createCreditCardPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const { clearCardPaymentState } = creditCardSlice.actions;
export default creditCardSlice.reducer;
