"use client";

import { PricingCard, type PricingFeature } from "./PricingCard";

export function PricingPlans() {
  const commonFeatures: PricingFeature[] = [
    { name: "Acesso à plataforma", included: true },
    { name: "Suporte por email", included: true },
  ];

  const plans = [
    {
      title: "Plano Free — Axel Lite",
      price: "R$0",
      description: "",
      buttonText: "Iniciar Assinatura",
      popular: false,
      planType: "free" as const,
      features: [
        ...commonFeatures,
        { name: "Acesso básico ao assistente", included: true },
        { name: "Respostas inteligentes limitadas", included: true },
        { name: "Suporte via FAQ", included: true },
      ],
    },
    {
      title: "Plano Mensal — Axel Plus",
      price: "R$52,90",
      description: "",
      buttonText: "Iniciar Assinatura",
      popular: true,
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
      price: "R$615,90",
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
    <div className="from-muted/20 to-muted/40 bg-gradient-to-br py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">Planos e Preços</h2>
          <p>Escolha o plano perfeito para suas necessidades</p>
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
