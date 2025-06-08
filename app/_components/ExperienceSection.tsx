"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, User } from "lucide-react";

const ExperienceSection = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Olá! 👋 Sou o Axel AI. Como posso te ajudar hoje?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickQuestions = [
    "Como você pode me ajudar?",
    "Quais são suas principais funcionalidades?",
    "Pode me ajudar com programação?",
    "Como funciona sua inteligência artificial?",
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: message }]);
    setInputValue("");

    setTimeout(() => {
      let response = "";

      if (message.toLowerCase().includes("ajudar")) {
        response =
          "Posso te ajudar com uma grande variedade de tarefas! Desde responder perguntas, ajudar com trabalhos, programação, análise de dados, criação de conteúdo e muito mais. O que você gostaria de fazer?";
      } else if (message.toLowerCase().includes("funcionalidades")) {
        response =
          "Minhas principais funcionalidades incluem: conversação natural, análise de texto, programação, traduções, criação de conteúdo, resolução de problemas matemáticos e muito mais. Estou sempre aprendendo!";
      } else if (message.toLowerCase().includes("programação")) {
        response =
          "Claro! Posso te ajudar com programação em várias linguagens como Python, JavaScript, Java, C++, e muitas outras. Posso explicar conceitos, revisar código, encontrar bugs e sugerir melhorias. Qual linguagem você está usando?";
      } else if (message.toLowerCase().includes("inteligência artificial")) {
        response =
          "Sou baseado em um modelo de linguagem avançado que me permite entender e gerar texto de forma natural. Fui treinado em uma vasta quantidade de dados para poder ajudar com diversas tarefas. É como ter um assistente que nunca dorme! 🤖";
      } else {
        response =
          "Interessante! Conte-me mais sobre isso. Estou aqui para ajudar com qualquer dúvida ou tarefa que você tenha.";
      }

      setMessages((prev) => [...prev, { type: "ai", content: response }]);
    }, 1000);
  };

  return (
    <section className="from-muted/20 to-muted/40 bg-gradient-to-br py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
            Experimente o{" "}
            <span className="bg-gradient-axel bg-clip-text text-transparent">
              Axel AI
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Teste minhas capacidades agora mesmo! Faça uma pergunta ou use uma
            das sugestões abaixo.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="bg-card/90 border-border backdrop-blur-md">
            <CardContent className="p-0">
              <div className="h-96 space-y-4 overflow-y-auto p-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-xs items-start space-x-3 md:max-w-md lg:max-w-lg ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <div
                        className={`rounded-full p-2 ${message.type === "user" ? "bg-gradient-axel" : "bg-muted"}`}
                      >
                        {message.type === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <MessageSquare className="text-foreground h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-4 ${message.type === "user" ? "bg-gradient-axel text-white" : "bg-muted text-foreground"}`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-border border-t p-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage(inputValue)
                    }
                    placeholder="Digite sua mensagem..."
                    className="bg-background text-foreground border-border focus:ring-primary flex-1 rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    className="bg-gradient-axel cursor-pointer px-6 hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Questions */}
                <div className="mt-4">
                  <p className="text-muted-foreground mb-3 text-sm">
                    Perguntas rápidas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full px-3 py-2 text-xs transition-colors duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
