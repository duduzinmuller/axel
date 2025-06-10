"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <Card className="w-[380px] border border-zinc-800 bg-transparent text-center">
        <CardContent className="px-6 py-8">
          <div className="mb-4">
            <Image
              width={80}
              src="/axel.svg"
              className="mx-auto"
              height={80}
              alt={""}
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

          <form className="space-y-4">
            <div className="relative">
              <Mail
                className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <Input
                type="email"
                placeholder="Email"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white"
                required
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <Input
                type="password"
                placeholder="Senha"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white"
                required
              />
            </div>
            <Button className="bg-gradient-axel w-full cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-90">
              Entrar
            </Button>
          </form>
          <a
            href="#"
            className="mt-2 block w-full text-right text-sm text-blue-500 hover:underline"
          >
            Esqueceu sua senha?
          </a>

          <div className="my-5 flex items-center">
            <div className="flex-1 border-t border-zinc-700" />
            <span className="mx-3 text-sm text-zinc-500">OU</span>
            <div className="flex-1 border-t border-zinc-700" />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="h-12 w-20 cursor-pointer border-zinc-700"
            >
              <FcGoogle size={24} />
            </Button>
            <Button
              variant="outline"
              className="h-12 w-20 cursor-pointer border-zinc-700"
            >
              <FaGithub size={24} />
            </Button>
            <Button
              variant="outline"
              className="h-12 w-20 cursor-pointer border-zinc-700"
            >
              <FaTwitter size={24} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
