import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardBrandsProps {
  active: string | null;
  size?: "sm" | "lg";
}

export function CardBrands({ active, size = "sm" }: CardBrandsProps) {
  const brands = [
    {
      id: "visa",
      url: "https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/visa.svg",
    },
    {
      id: "mastercard",
      url: "https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/mastercard.svg",
    },
    {
      id: "amex",
      url: "https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/amex.svg",
    },
    {
      id: "elo",
      url: "https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/elo.svg",
    },
    {
      id: "hipercard",
      url: "https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/hipercard.svg",
    },
  ];

  if (size === "sm" && active) {
    const brand = brands.find((b) => b.id === active);
    if (!brand) return null;

    return (
      <Image
        src={brand.url}
        alt={`${brand.id} logo`}
        width={32}
        height={20}
        className="h-5 w-8 object-contain"
        unoptimized
      />
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {brands.map((brand) => (
        <Image
          key={brand.id}
          src={brand.url}
          alt={`${brand.id} logo`}
          width={size === "lg" ? 48 : 32}
          height={size === "lg" ? 32 : 20}
          className={cn(
            "object-contain transition-opacity",
            size === "lg" ? "h-8 w-12" : "h-5 w-8",
            active && active !== brand.id ? "opacity-30" : "opacity-100",
          )}
          unoptimized
        />
      ))}
    </div>
  );
}
