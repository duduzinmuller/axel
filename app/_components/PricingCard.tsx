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
        "relative mt-10 flex transform flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all dark:border-white/70 dark:bg-transparent",
        popular && "mt-4 scale-105 shadow-md",
        className,
      )}
    >
      {popular && (
        <div className="absolute -top-4 right-0 left-0 mx-auto w-fit rounded-full bg-black px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">
          Mais Popular
        </div>
      )}
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-xl font-bold text-black dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold text-black dark:text-white">
          {price}
        </span>
        <span className="text-gray-600 dark:text-gray-300">/{time}</span>
      </div>
      <ul className="mb-6 flex flex-col gap-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            {feature.included ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            )}
            <span
              className={cn(
                feature.included
                  ? "text-black dark:text-white"
                  : "text-gray-400 dark:text-gray-500",
              )}
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => router.push(`/checkout?plan=${planType}`)}
        className="mt-auto cursor-pointer border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        {buttonText}
      </Button>
    </div>
  );
}
