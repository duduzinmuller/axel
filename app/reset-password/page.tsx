"use client";

import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Lock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import { useRouter } from "next/navigation";
import { requestNewPassword } from "../store/slice/auth";
import Image from "next/image";
import { toast } from "sonner";
import { resetPasswordSchema } from "../_forms/schemas/user";
import { useResetPasswordForm } from "../_forms/hooks/user";

type PasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const form = useResetPasswordForm();

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");

      let result;

      if (token) {
        result = await dispatch(
          requestNewPassword({
            token,
            newPassword: data.newPassword,
          }),
        ).unwrap();
      } else if (isAuthenticated) {
        result = await dispatch(
          requestNewPassword({
            newPassword: data.newPassword,
            token: "",
          }),
        ).unwrap();
      } else {
        toast.message("Você precisa estar autenticado ou fornecer um token.");
        return;
      }

      if (result?.status === "success") {
        toast.success("Senha atualizada com sucesso!");
        setTimeout(() => {
          router.push(token ? "/login" : "/profile");
        }, 2000);
      } else {
        toast.error("Erro ao alterar a senha.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar senha.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <Card className="w-[380px] border border-zinc-800">
        <CardContent className="px-6 py-8">
          <div className="mb-4 text-center">
            <Image
              width={80}
              height={80}
              src="/axel.svg"
              alt="Logo Axel"
              className="mx-auto"
            />
          </div>

          <h2 className="mb-6 text-center text-2xl font-semibold">
            Redefinir Senha
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                          size={16}
                        />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Nova senha"
                          disabled={isLoading}
                          className="border-zinc-700 bg-zinc-800 pr-10 pl-10 text-white"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                          size={16}
                        />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirmar senha"
                          disabled={isLoading}
                          className="border-zinc-700 bg-zinc-800 pr-10 pl-10 text-white"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-2 -translate-y-1/2 text-zinc-400"
                        ></Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-gradient-axel w-full text-white hover:scale-105 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Redefinindo..." : "Redefinir Senha"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
