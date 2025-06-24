export type PaymentMethod = "credit-card" | "pix" | "bolbradesco";

export interface PaymentFormData {
  method: PaymentMethod;

  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  installments?: string;

  cpf?: string;

  promoCode?: string;
}
