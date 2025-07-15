export interface PaymentHistoryUser {
  name: string;
  email: string;
  plan: string;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  externalId: string;
  status: string;
  amount: string;
  currency: string;
  installments: number;
  paymentMethod: string;
  paymentMethodId: string | null;
  plan: string;
  paymentProvider: string;
  paymentUrl: string | null;
  transactionDetails: any;
  notificationSent: boolean;
  createdAt: string;
  updatedAt: string;
  recipient: string;
  cpf: string;
  payer: any;
  zip_code: string | null;
  street_name: string | null;
  street_number: string | null;
  neighborhood: string | null;
  city: string | null;
  federal_unit: string | null;
  user: PaymentHistoryUser;
}
