import { Check } from "lucide-react";
import { plans } from "../_data/plans";

const PricingPlans = () => {
  return (
    <div
      id="planos"
      className="from-muted/20 to-muted/40 bg-gradient-to-br py-20"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
            Planos e{" "}
            <span className="bg-gradient-axel bg-clip-text text-transparent">
              Preços
            </span>
          </h2>
          <p className="mt-3 text-lg">
            Escolha o plano perfeito para suas necessidades
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl p-6 shadow-lg ${
                plan.isPopular
                  ? "border-2 border-[#764BA2]"
                  : "border border-gray-700"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-[#764BA2] px-3 py-1 text-xs font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{plan.handle}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-400">
                    {plan.frequency}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-teal-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href="#"
                  className={`block w-full rounded-lg px-5 py-2.5 text-center font-semibold transition-colors duration-200 ${
                    plan.isPopular
                      ? "bg-[#764BA2] hover:bg-gray-700"
                      : "border-2 border-gray-600 bg-transparent hover:bg-gray-700"
                  }`}
                >
                  Iniciar Assinatura
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
