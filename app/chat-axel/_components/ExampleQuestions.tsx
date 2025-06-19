"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { setSelectedExample } from "@/app/store/slice/sidebar/sidebar-reducer";
import { createChat, addMessage } from "@/app/store/slice/chat";
import { MessageSquare, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAI } from "@/app/_lib/hooks";
import { useRef, useEffect, RefObject } from "react";

const ExampleQuestions = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isSidebarOpen);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const currentChatIdRef = useRef(currentChatId);
  const { sendMessage, isLoading, error } = useAI();

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
  }, [currentChatId]);

  const waitForChatId = async (
    ref: RefObject<string | null>,
    maxTries = 20,
    interval = 50,
  ) => {
    let tries = 0;
    while (!ref.current && tries < maxTries) {
      await new Promise((resolve) => setTimeout(resolve, interval));
      tries++;
    }
    return ref.current;
  };

  const handleClick = async (question: string) => {
    dispatch(setSelectedExample(question));

    let chatId = currentChatIdRef.current;

    if (!chatId) {
      dispatch(
        createChat({
          title: question,
          initialMessage: question,
        }),
      );
      chatId = await waitForChatId(currentChatIdRef, 20, 50);
    } else {
      dispatch(
        addMessage({
          chatId,
          content: question,
          role: "user",
        }),
      );
      dispatch({
        type: "chat/updateChatTitle",
        payload: { chatId, title: question },
      });
    }

    if (chatId) {
      dispatch(
        addMessage({
          chatId,
          content: "Gerando resposta...",
          role: "assistant",
        }),
      );

      const aiResponse = await sendMessage(question);

      dispatch({
        type: "chat/removeLastAssistantMessage",
        payload: { chatId },
      });

      if (aiResponse) {
        dispatch(
          addMessage({
            chatId,
            content: aiResponse,
            role: "assistant",
          }),
        );
      } else {
        dispatch(
          addMessage({
            chatId,
            content: "Erro ao gerar resposta da IA.",
            role: "assistant",
          }),
        );
      }
    } else {
      console.error("ChatId não encontrado após criar conversa (timeout)");
    }

    console.log("Exemplo selecionado:", question);
  };

  return (
    <div
      className="transition-margin flex h-screen items-center justify-center p-4 duration-300"
      style={{
        marginLeft: isSidebarOpen ? "250px" : "0px",
      }}
    >
      <div className="w-full max-w-6xl">
        <h1 className="mb-10 text-center text-3xl">AxelAI</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h2 className="text-sm font-medium">Exemplos</h2>
            </div>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
              onClick={() =>
                handleClick("Explique computação quântica em termos simples")
              }
              disabled={isLoading}
            >
              {isLoading
                ? "Processando..."
                : "Explique computação quântica em termos simples"}
            </Button>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
              onClick={() =>
                handleClick(
                  "Me dê ideias criativas para o aniversário de uma criança",
                )
              }
              disabled={isLoading}
            >
              {isLoading
                ? "Processando..."
                : "Me dê ideias criativas para o aniversário de uma criança"}
            </Button>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
              onClick={() =>
                handleClick("Como faço uma requisição HTTP em JavaScript?")
              }
              disabled={isLoading}
            >
              {isLoading
                ? "Processando..."
                : "Como faço uma requisição HTTP em JavaScript?"}
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              <h2 className="text-sm font-medium">Capacidades</h2>
            </div>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
            >
              Lembra o que o usuário disse anteriormente na conversa
            </Button>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
            >
              Permite correções de perguntas anteriores
            </Button>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
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
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
            >
              Pode gerar informações incorretas ocasionalmente
            </Button>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
            >
              Pode produzir instruções prejudiciais
            </Button>

            <Button
              variant="secondary"
              className="bg-[#3E3F4A] text-left text-sm text-white hover:bg-gray-700"
            >
              Conhecimento limitado sobre eventos após 2021
            </Button>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ExampleQuestions;
