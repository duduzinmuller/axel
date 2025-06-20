import paymentReducer, { clearPaymentState, setPlan } from "./payment-reducer";
export default paymentReducer;

export { clearPaymentState, setPlan };

export * from "./payment-thunks";

export const selectPaymentLoading = (state: {
  payment: { loading: boolean };
}) => state.payment.loading;
export const selectBoletoUrl = (state: {
  payment: { boletoUrl: string | null };
}) => state.payment.boletoUrl;
export const selectPaymentError = (state: {
  payment: { error: string | null };
}) => state.payment.error;
export const selectValidateCode = (state: {
  payment: { validateCode: string | null };
}) => state.payment.validateCode;
export const selectPlan = (state: { payment: { plan: string | null } }) =>
  state.payment.plan;
