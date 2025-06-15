"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { registerFormSchema } from "../_forms/schemas/user";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { signup as registerUser, setHasRegistered } from "../store/slice/auth";
import { useRegisterForm } from "../_forms/hooks/user";
import { toast } from "sonner";
import LoadingScreen from "../_components/LoadingScreen";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated, hasRegistered } = useAppSelector(
    (state) => state.auth,
  );

  const form = useRegisterForm();

  async function onSubmit(data: RegisterFormData) {
    try {
      const resultAction = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      );
      if (registerUser.fulfilled.match(resultAction)) {
        dispatch(setHasRegistered(true));
        toast.success("Conta criada com sucesso!");
        console.log("Registro bem-sucedido:", resultAction.payload);
        setRegistered(true);
      } else if (registerUser.rejected.match(resultAction)) {
        toast.error(error);
        console.error("Erro no registro:", resultAction.payload);
      }
    } catch (err) {
      toast.error("Erro ao criar a conta");
      console.error("Erro ao processar o registro:", err);
    }
  }

  useEffect(() => {
    if (registered) {
      router.push("/verification-code");
    }
  }, [registered, router]);

  useEffect(() => {
    if (isAuthenticated && !hasRegistered) {
      router.push("/chat-axel");
    }
  }, [isAuthenticated, hasRegistered, router]);

  if (isAuthenticated && !hasRegistered) {
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
              src="/axel.svg"
              className="mx-auto"
              height={80}
              alt="Logo"
            />
          </div>
          <h2 className="mb-2 text-2xl font-medium">Crie sua conta</h2>
          <p className="mb-5 text-sm text-zinc-400">
            Já possui uma conta?{" "}
            <a
              href="#"
              className="text-blue-500 hover:underline"
              onClick={() => router.push("/login")}
            >
              Entrar
            </a>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User
                          className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                          size={16}
                        />
                        <Input
                          placeholder="Nome"
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

              <FormField
                control={form.control}
                name="passwordConfirmation"
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
                          placeholder="Confirmar senha"
                          className="border-zinc-700 bg-zinc-800 pl-10 text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-gradient-axel w-full cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : "Cadastrar"}
              </Button>
            </form>
          </Form>

          <div className="my-5 flex items-center">
            <div className="flex-1 border-t border-zinc-700" />
            <span className="mx-3 text-sm text-zinc-500">OU</span>
            <div className="flex-1 border-t border-zinc-700" />
          </div>

          <div className="flex justify-center gap-4">
            <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/login/google`}>
              <Button
                variant="outline"
                className="h-12 w-20 cursor-pointer border-zinc-700"
              >
                <FcGoogle size={24} />
              </Button>
            </a>
            <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/login/github`}>
              <Button
                variant="outline"
                className="h-12 w-20 cursor-pointer border-zinc-700"
              >
                <FaGithub size={24} />
              </Button>
            </a>
            <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/login/discord`}>
              <Button
                variant="outline"
                className="h-12 w-20 cursor-pointer border-zinc-700"
              >
                <FaDiscord size={24} />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
