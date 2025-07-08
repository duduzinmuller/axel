"use client";

import { Button } from "@/components/ui/button";
import { Shield, Home, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-4">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-white">Acesso Negado</h1>

        <p className="mb-8 max-w-md text-gray-300">
          Você não tem permissão para acessar esta área. Apenas administradores
          podem visualizar o painel administrativo.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Voltar ao Início
          </Button>

          <Button
            onClick={() => router.push("/login")}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <LogIn className="h-4 w-4" />
            Fazer Login
          </Button>
        </div>
      </div>
    </div>
  );
}
