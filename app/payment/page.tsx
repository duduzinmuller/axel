"use client";

import { Button } from "@/components/ui/button";
import PricingPlans from "../_components/PricingPlans";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen items-center justify-center not-visited:flex">
        <div className="absolute top-4 left-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex cursor-pointer items-center rounded p-2 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          <main className="w-full py-10">
            <PricingPlans />
          </main>
        </div>
      </div>
    </>
  );
};

export default Payment;
