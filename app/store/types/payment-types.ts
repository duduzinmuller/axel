export interface PaymentState {
  loading: boolean;
  boletoUrl: string | null;
  validateCode: string | null;
  error: string | null;
  plan: string | null;
  cardToken: any;
  paymentResult: any;
  paymentStatus: "FAILED" | "PENDING" | "COMPLETED" | "CANCELED";
}

export interface BoletoData {
  amount: string;
  currency: string;
  paymentMethod: string;
  plan: string;
  cpf: string;
  zip_code: string;
  street_name: string;
  street_number: string;
  neighborhood: string;
  city: string;
  federal_unit: string;
}

export interface PixData {
  amount: number;
  currency: string;
  paymentMethod: string;
  plan: string;
  cpf?: string;
}
