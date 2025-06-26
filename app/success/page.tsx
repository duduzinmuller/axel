"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { clearPaymentState } from "@/app/store/slice/payment";
import { useAppDispatch, useAppSelector } from "../store";

export default function SuccessPage() {
  const { paymentStatus } = useAppSelector((state) => state.payment);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (paymentStatus !== "COMPLETED" || user?.plan === "FREE") {
      router.replace("/checkout");
    }
    return () => {
      dispatch(clearPaymentState());
    };
  }, [paymentStatus, router, dispatch, user]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <CheckCircle className="mb-2 h-16 w-16 text-green-500" />
          <CardTitle className="text-center text-2xl">Sucesso!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-center">
            Seu pagamento foi confirmado ou o código foi validado com sucesso.
            <br />
            Você já tem acesso ao seu plano{" "}
            <b>
              {user?.plan === "MONTHLY"
                ? "Mensal"
                : user?.plan === "ANNUAL"
                  ? "Anual"
                  : ""}
            </b>
            !
          </p>
          <Button asChild className="mt-2 w-full">
            <Link href="/chat-axel">Ir para o painel</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
