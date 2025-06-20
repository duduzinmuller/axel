export interface PaymentState {
  loading: boolean;
  boletoUrl: string | null;
  validateCode: string | null;
  error: string | null;
  plan: string | null;
}

export interface BoletoData {
  amount: number;
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
