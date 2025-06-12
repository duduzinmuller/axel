"use client";

import { MessageSquare, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExampleQuestions = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <h1 className="mb-8 text-center text-3xl">AxelAI</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h2 className="text-sm font-medium">Exemplos</h2>
            </div>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
              onClick={() => console.log("Exemplo 1 clicado")}
            >
              Explique computação quântica em termos simples
            </Button>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
              onClick={() => console.log("Exemplo 2 clicado")}
            >
              Me dê ideias criativas para o aniversário de uma criança
            </Button>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
              onClick={() => console.log("Exemplo 3 clicado")}
            >
              Como faço uma requisição HTTP em JavaScript?
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              <h2 className="text-sm font-medium">Capacidades</h2>
            </div>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
            >
              Lembra o que o usuário disse anteriormente na conversa
            </Button>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
            >
              Permite correções de perguntas anteriores
            </Button>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
            >
              Treinado para recusar solicitações inadequadas
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="text-sm font-medium">Limitações</h2>
            </div>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
            >
              Pode gerar informações incorretas ocasionalmente
            </Button>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
            >
              Pode produzir instruções prejudiciais
            </Button>

            <Button
              variant="secondary"
              className="bg-gray-800 text-left text-sm text-white hover:bg-gray-700"
            >
              Conhecimento limitado sobre eventos após 2021
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleQuestions;
