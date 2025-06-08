"use client";

import { PricingCard, type PricingFeature } from "./PricingCard";

export function PricingPlans() {
  const commonFeatures: PricingFeature[] = [
    { name: "Acesso à plataforma", included: true },
    { name: "Suporte por email", included: true },
  ];

  const plans = [
    {
      title: "Plano Mensal — Axel Plus",
      price: "R$25,90",
      description: "",
      buttonText: "Iniciar Assinatura",
      popular: false,
      planType: "mensal" as const,
      features: [
        ...commonFeatures,
        { name: "Respostas inteligentes ilimitadas", included: true },
        { name: "Até 5 automações conectadas", included: true },
        { name: "Acesso a comandos personalizados", included: true },
        { name: "Integração com dispositivos", included: true },
        { name: "Suporte por chat", included: true },
      ],
    },
    {
      title: "Plano Anual — Axel Pro",
      price: "R$249,90",
      description: "",
      buttonText: "Iniciar Assinatura",
      popular: false,
      time: "ano",
      planType: "anual" as const,
      features: [
        ...commonFeatures,
        { name: "Tudo do Axel Plus", included: true },
        { name: "Acesso antecipado a novos recursos", included: true },
        { name: "Automação ilimitada", included: true },
        { name: "Perfis múltiplos para casa ou empresa", included: true },
        { name: "Suporte premium", included: true },
      ],
    },
  ];

  return (
    <section className="from-muted/20 to-muted/40 bg-gradient-to-br py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
            Planos e{" "}
            <span className="bg-gradient-axel bg-clip-text text-transparent">
              Preços
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Escolha o plano perfeito para suas necessidades
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
