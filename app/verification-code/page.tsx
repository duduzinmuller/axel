"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, KeyboardEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  resendVerificationCode,
  setHasRegistered,
  verifyCode,
} from "../store/slice/auth";
import { toast } from "sonner";

const verificationSchema = z.object({
  code: z.array(z.string().length(1).regex(/[0-9]/)).length(6),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

export default function VerificationCodePage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: Array(6).fill(""),
    },
  });

  const inputRefs = Array(6)
    .fill(0)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    .map(() => useRef<HTMLInputElement>(null));

  const onSubmit = async (data: VerificationFormData) => {
    if (!user?.email) {
      toast.error("Email não encontrado");
      return;
    }
    const code = data.code.join("");
    setIsVerifying(true);
    try {
      await dispatch(verifyCode({ email: user.email, code })).unwrap();
      toast.success("Email verificado com sucesso!");
      dispatch(setHasRegistered(false));
      router.push("/chat-axel");
    } catch (err) {
      console.log("Erro no verifyCode:", err);
      toast.error("Erro ao verificar o email.");
      setIsVerifying(false);
    }
  };

  const handleResendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.email) {
      toast.error("Usuário não autenticado.");
      return;
    }
    try {
      await dispatch(resendVerificationCode(user.email)).unwrap();
      toast.success("Código reenviado com sucesso para seu email!");
      setTimeout(() => toast.success(null), 5000);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao reenviar o codigo.");
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (index > 0 && !e.currentTarget.value) {
        inputRefs[index - 1].current?.focus();
        setValue(`code.${index - 1}`, "");
      }
    }
  };

  const handleInput = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue) {
      setValue(`code.${index}`, numericValue[0]);
      if (index < 5) {
        inputRefs[index + 1].current?.focus();
      } else {
        inputRefs[index].current?.blur();
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Verificação de Email
          </CardTitle>
          <CardDescription className="text-center">
            Digite o código de 6 dígitos enviado para{" "}
            <span className="font-medium">{user?.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between gap-2">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    {...register(`code.${index}`)}
                    ref={(e) => {
                      register(`code.${index}`).ref(e);
                      inputRefs[index].current = e;
                    }}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onInput={(e) => handleInput(index, e.currentTarget.value)}
                    className={`h-14 w-12 text-center text-2xl font-semibold text-black dark:text-white ${
                      errors.code?.[index] ? "border-red-500 ring-red-500" : ""
                    }`}
                  />
                ))}
            </div>
            <Button
              type="submit"
              className="bg-gradient-axel w-full cursor-pointer"
              disabled={isVerifying || isLoading}
            >
              {isVerifying || isLoading ? "Verificando..." : "Verificar"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Não recebeu o código?{" "}
            <button
              type="button"
              className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-400"
              onClick={handleResendCode}
            >
              Reenviar
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
