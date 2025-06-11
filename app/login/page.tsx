"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Mail, Lock, ChevronLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

import { useRouter } from "next/navigation";
import { loginFormSchema } from "../_forms/schemas/user";
import { useAppSelector, useAppDispatch } from "../store";
import { z } from "zod";
import { login as loginUser } from "../store/slice/auth";
import { useEffect } from "react";
import LoadingScreen from "../_components/LoadingScreen";
import { toast } from "sonner";
import { useLoginForm } from "../_forms/hooks/user";

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useLoginForm();

  async function onSubmit(data: LoginFormData) {
    try {
      const resultAction = await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        }),
      );

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login realizado com sucesso!");
        console.log("Login bem-sucedido", resultAction.payload);
      } else if (loginUser.rejected.match(resultAction)) {
        toast.error("Email ou senha estão incorretos.");
        console.error("Erro no login:", resultAction.payload);
      }
    } catch (err) {
      console.error("Erro ao processar o login:", err);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/chat-axel");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <Card className="w-[380px] border border-zinc-800 bg-transparent text-center">
        <div className="absolute pl-4">
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={() => router.push("/")}
          >
            <ChevronLeft />
          </a>
        </div>
        <CardContent className="px-6 py-8">
          <div className="mb-4">
            <Image
              width={80}
              height={80}
              src="/axel.svg"
              className="mx-auto"
              alt="Logo Axel"
            />
          </div>
          <h2 className="mb-2 text-2xl font-medium">Bem-vindo de volta</h2>
          <p className="mb-5 text-sm text-zinc-400">
            Ainda não possuí uma conta?{" "}
            <a
              href="#"
              className="text-blue-500 hover:underline"
              onClick={() => router.push("/register")}
            >
              Criar conta
            </a>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                          size={16}
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="border-zinc-700 bg-zinc-800 pl-10 text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                          size={16}
                        />
                        <Input
                          type="password"
                          placeholder="Senha"
                          className="border-zinc-700 bg-zinc-800 pl-10 text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <a
                href="/forgot-password"
                className="block w-full text-right text-sm text-blue-500 hover:underline"
              >
                Esqueceu sua senha?
              </a>
              <Button
                type="submit"
                className="bg-gradient-axel w-full cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : "Entrar"}
              </Button>
            </form>
          </Form>

          <div className="my-5 flex items-center">
            <div className="flex-1 border-t border-zinc-700" />
            <span className="mx-3 text-sm text-zinc-500">OU</span>
            <div className="flex-1 border-t border-zinc-700" />
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" className="h-12 w-20 border-zinc-700">
              <FcGoogle size={24} />
            </Button>
            <Button variant="outline" className="h-12 w-20 border-zinc-700">
              <FaGithub size={24} />
            </Button>
            <Button variant="outline" className="h-12 w-20 border-zinc-700">
              <FaTwitter size={24} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
