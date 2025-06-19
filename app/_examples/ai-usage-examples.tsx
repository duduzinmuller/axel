"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Lightbulb } from "lucide-react";
import { AIService } from "@/app/_api/services";
import { useAI } from "@/app/_lib/hooks";

export const DirectServiceUsage = () => {
  const [question, setQuestion] = useState("");
  const [generatedQuestion, setGeneratedQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await AIService.generationQuestionWithAI(question);
      if (typeof result === "string") {
        setGeneratedQuestion(result);
      } else if (result && typeof result.response === "string") {
        setGeneratedQuestion(result.response);
      } else {
        setGeneratedQuestion("Erro ao gerar pergunta");
      }
    } catch {
      setGeneratedQuestion("Erro ao gerar pergunta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Uso Direto do Serviço</h3>
      <div className="space-y-4">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Digite um prompt para gerar uma pergunta..."
          className="w-full"
        />
        <Button onClick={handleGenerate} disabled={isLoading}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? "Gerando..." : "Gerar Pergunta"}
        </Button>
        {generatedQuestion && (
          <div className="rounded bg-gray-100 p-3">
            <strong>Pergunta gerada:</strong> {generatedQuestion}
          </div>
        )}
      </div>
    </div>
  );
};

// Exemplo 2: Uso com hook personalizado
export const HookUsage = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const { generateQuestion, isLoading, error } = useAI();

  const handleGenerate = async () => {
    const generated = await generateQuestion(prompt);
    if (generated) {
      setResult(generated);
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Uso com Hook Personalizado</h3>
      <div className="space-y-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite um prompt..."
          className="w-full"
        />
        <Button onClick={handleGenerate} disabled={isLoading}>
          <Lightbulb className="mr-2 h-4 w-4" />
          {isLoading ? "Gerando..." : "Gerar com Hook"}
        </Button>
        {error && (
          <div className="rounded bg-red-100 p-2 text-sm text-red-700">
            Erro: {error}
          </div>
        )}
        {result && (
          <div className="rounded bg-green-100 p-3">
            <strong>Resultado:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
};

// Exemplo 3: Componente de sugestões para chat
export const ChatSuggestions = () => {
  const { generateQuestion, isLoading } = useAI();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = async () => {
    const prompts = [
      "Gere uma pergunta sobre tecnologia",
      "Gere uma pergunta sobre ciência",
      "Gere uma pergunta sobre história",
    ];

    const newSuggestions: string[] = [];

    for (const prompt of prompts) {
      const suggestion = await generateQuestion(prompt);
      if (suggestion) {
        newSuggestions.push(suggestion);
      }
    }

    setSuggestions(newSuggestions);
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Sugestões para Chat</h3>
      <Button
        onClick={generateSuggestions}
        disabled={isLoading}
        className="mb-4"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {isLoading ? "Gerando sugestões..." : "Gerar Sugestões"}
      </Button>

      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="rounded bg-gray-50 p-2 text-sm">
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

// Exemplo 4: Integração com input de chat
export const ChatInputWithAI = () => {
  const [message, setMessage] = useState("");
  const { generateQuestion, isLoading } = useAI();

  const handleGenerateSuggestion = async () => {
    const suggestion = await generateQuestion(
      "Gere uma pergunta curta e interessante para um assistente de IA",
    );

    if (suggestion) {
      setMessage(suggestion);
    }
  };

  const handleSend = () => {
    console.log("Enviando mensagem:", message);
    setMessage("");
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Input de Chat com IA</h3>
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1"
        />
        <Button
          onClick={handleGenerateSuggestion}
          disabled={isLoading}
          variant="outline"
          size="icon"
          title="Gerar sugestão"
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        <Button onClick={handleSend} disabled={!message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
