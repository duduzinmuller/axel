import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { plans as plansData } from "@/app/_data/plans";

interface OrderSummaryProps {
  promoCode?: string;
  plan: "mensal" | "anual" | "free";
}

const parsePrice = (priceStr: string) => {
  if (!priceStr) return 0;
  return Number(priceStr.replace(/[^\d,]/g, "").replace(",", "."));
};

const mapPlan = (planData: any) => ({
  title: planData.name,
  price: parsePrice(planData.price),
  label:
    planData.frequency === "/ano"
      ? "Anual"
      : planData.frequency === "/mês"
        ? "Mensal"
        : "Gratuito",
  buttonText:
    planData.price === "R$0" ? "Começar grátis" : "Iniciar Assinatura",
  popular: planData.isPopular,
  features: planData.features.map((name: string) => ({
    name,
    included: true,
  })),
});

export function OrderSummary({ promoCode, plan }: OrderSummaryProps) {
  const plans = {
    mensal: mapPlan(
      plansData.find((p) => p.frequency === "/mês" && p.price !== "R$0"),
    ),
    anual: mapPlan(plansData.find((p) => p.frequency === "/ano")),
    free: mapPlan(plansData.find((p) => p.price === "R$0")),
  };

  const getDiscount = () => {
    if (!promoCode) return 0;
    const code = promoCode.toUpperCase();
    if (code === "PROMO10") return 9.99;
    if (code === "PROMO20") return 19.98;
    return 0;
  };

  const selectedPlan = plans[plan];
  const discount = getDiscount();
  const total = selectedPlan.price - discount;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Resumo do pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex justify-between">
              <h3 className="font-medium">{selectedPlan.title}</h3>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {selectedPlan.label}
              </Badge>
            </div>

            <ul className="space-y-2 text-sm">
              {selectedPlan.features.map(
                (
                  feature: { name: string; included: boolean },
                  index: number,
                ) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                        feature.included ? "text-primary" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={
                        feature.included ? "" : "text-gray-400 line-through"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R$ {selectedPlan.price.toFixed(2).replace(".", ",")}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Desconto</span>
                <span className="text-green-600">
                  -R$ {discount.toFixed(2).replace(".", ",")}
                </span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-lg">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <p className="text-muted-foreground text-xs">
              Pagamento processado de forma segura. Assinatura recorrente com
              renovação automática. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
