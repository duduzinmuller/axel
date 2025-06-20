import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, TicketPercent } from "lucide-react";
import { useAppDispatch } from "@/app/store";
import { useRouter } from "next/navigation";
import { validateCodePlan } from "@/app/store/slice/payment";
import { updateUserPlan } from "@/app/store/slice/auth";

interface PromoCodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromoCodeInput({ value, onChange }: PromoCodeInputProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async () => {
    setIsValid(null);
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await dispatch(validateCodePlan({ code: value }));
      if (validateCodePlan.fulfilled.match(result)) {
        setIsValid(true);
        dispatch(updateUserPlan(result.payload.plan));
        router.push("/success");
      } else {
        setIsValid(false);
        setError("Código inválido ou expirado.");
      }
    } catch {
      setIsValid(false);
      setError("Erro ao validar código.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TicketPercent className="h-4 w-4" />
          Código de acesso
        </CardTitle>
        <CardDescription>
          Digite seu código para obter o acesso ao plano
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setIsValid(null);
                setError(null);
              }}
              placeholder="Digite seu código"
              className={`pr-10 ${
                isValid === true
                  ? "border-green-500 focus-visible:ring-green-500"
                  : ""
              }`}
            />
            {isValid === true && (
              <div className="absolute inset-y-0 right-3 flex items-center text-green-500">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
          <Button
            type="button"
            onClick={handleValidate}
            disabled={isSubmitting || !value}
            className="flex-shrink-0"
          >
            {isSubmitting ? "Validando..." : "Validar"}
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {isValid === true && (
          <p className="mt-2 text-sm text-green-500">
            Código aplicado com sucesso!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
