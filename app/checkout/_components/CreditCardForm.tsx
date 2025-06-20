import { useState } from "react";
import { FormField } from "./FormField";
import { CardBrands } from "./CardBrands";
import { Input } from "@/components/ui/input";
import {
  normalizeCardNumber,
  normalizeExpiryDate,
  normalizeCVV,
} from "@/app/_lib/utils/formatter";
import { Grid } from "./Grid";

interface CreditCardFormProps {
  price: number;
}

export function CreditCardForm({ price }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [installments, setInstallments] = useState("1");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeCardNumber(e.target.value);
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeExpiryDate(e.target.value);
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeCVV(e.target.value);
    setCvv(value);
  };

  const getCardBrand = (number: string) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      elo: /^(4011|4312|4389|4514|4573|4576)/,
      hipercard: /^(384100|384140|384160|606282|637095|637568)/,
    };

    for (const [brand, pattern] of Object.entries(patterns)) {
      if (pattern.test(number.replace(/\s+/g, ""))) {
        return brand;
      }
    }
    return null;
  };

  const cardBrand = getCardBrand(cardNumber);

  const maxInstallments = 6;
  const installmentsOptions = Array.from(
    { length: maxInstallments },
    (_, i) => {
      const n = i + 1;
      const value = price / n;
      return {
        label: `${n}x de R$${value.toFixed(2).replace(".", ",")} (sem juros)`,
        value: n.toString(),
      };
    },
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField label="Número do cartão">
          <div className="relative">
            <Input
              type="text"
              id="card-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="pr-12"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              {cardNumber && <CardBrands active={cardBrand} size="sm" />}
            </div>
          </div>
        </FormField>

        <Grid columns={2} className="gap-4">
          <FormField label="Validade">
            <Input
              type="text"
              id="expiry"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/AA"
              maxLength={5}
            />
          </FormField>
          <FormField label="CVV">
            <Input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
              maxLength={4}
            />
          </FormField>
        </Grid>

        <FormField label="Nome no cartão">
          <Input
            type="text"
            id="card-name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Como está impresso no cartão"
          />
        </FormField>

        <FormField label="Parcelas">
          <select
            id="installments"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {installmentsOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="flex items-center justify-center pt-4">
        <CardBrands active={cardBrand} size="lg" />
      </div>
    </div>
  );
}
