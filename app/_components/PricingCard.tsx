"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
  className?: string;
  planType?: "mensal" | "anual" | "free";
  time?: string;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
  className,
  time = "mês",
  planType = "mensal",
}: PricingCardProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "group border-border bg-background relative transform overflow-hidden rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:border-white/20 dark:bg-transparent",
        popular && "border-primary scale-105 border-2",
        className,
      )}
    >
      {popular && (
        <div className="bg-gradient-axel absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-white shadow-md">
          Mais Popular
        </div>
      )}

      <div className="mb-4 text-center">
        <h3 className="text-foreground mb-1 text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="mb-6 text-center">
        <span className="text-foreground text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">/{time}</span>
      </div>

      <ul className="mb-6 flex flex-col gap-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            {feature.included ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            )}
            <span
              className={cn(
                feature.included ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => router.push(`/checkout?plan=${planType}`)}
        className="bg-gradient-axel w-full cursor-pointer rounded-md text-white transition-transform duration-200 hover:scale-105"
      >
        {buttonText}
      </Button>
    </div>
  );
}
