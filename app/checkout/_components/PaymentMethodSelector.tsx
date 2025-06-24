import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, QrCode, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PaymentMethod } from "@/app/types/checkout";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  const methods = [
    {
      id: "credit-card",
      name: "Cartão de Crédito",
      icon: CreditCard,
      description: "Pague com Visa, Mastercard, Amex e mais",
    },
    {
      id: "pix",
      name: "PIX",
      icon: QrCode,
      description: "Pagamento instantâneo",
    },
    {
      id: "bolbradesco",
      name: "Boleto",
      icon: Receipt,
      description: "Vencimento em 3 dias úteis",
    },
  ];

  return (
    <RadioGroup
      value={selected}
      onValueChange={(value) => onSelect(value as PaymentMethod)}
      className="grid gap-4"
    >
      {methods.map((method) => (
        <Label
          key={method.id}
          htmlFor={method.id}
          className={cn(
            "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all",
            selected === method.id
              ? "border-primary bg-primary/5 ring-primary/20 ring-2"
              : "hover:bg-muted/50",
          )}
        >
          <RadioGroupItem
            value={method.id}
            id={method.id}
            className="sr-only"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              selected === method.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted",
            )}
          >
            <method.icon className="h-6 w-6" />
          </motion.div>
          <div className="space-y-1">
            <p className="leading-none font-medium">{method.name}</p>
            <p className="text-muted-foreground text-sm">
              {method.description}
            </p>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}
