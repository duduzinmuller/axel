"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  createChat,
  addMessage,
  selectCurrentChatId,
} from "@/app/store/slice/chat";
import { useAI, useMessageLimit } from "@/app/_lib/hooks";
import { useUsage } from "@/app/_lib/hooks/useUsage";
import { MessageLimitUtils } from "@/app/_lib/utils/messageLimit";
import LimitReachedModal from "./LimitReachedModal";
import LimitWarning from "./LimitWarning";

const InputChatAxel = () => {
  const [message, setMessage] = useState("");
  const [pendingResponse, setPendingResponse] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector(selectCurrentChatId);
  const currentChatIdRef = useRef(currentChatId);
  const { sendMessage, isLoading, error, loadingUsage } = useAI();
  const { usage } = useUsage();
  const { currentCount, limit, resetTime, incrementMessageCount } =
    useMessageLimit();

  const backendCount = usage?.currentCount || 0;
  const backendLimit = usage?.planLimit || limit;
  const backendRemaining = usage?.remainingMessages || 0;
  const backendIsLimitReached = backendCount >= backendLimit;

  useEffect(() => {
    const savedLimitReached = MessageLimitUtils.isAILimitReached();
    if (savedLimitReached) {
      setShowLimitModal(true);
    }
  }, []);

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
  }, [currentChatId]);

  useEffect(() => {
    if (error === "LIMIT_REACHED") {
      setShowLimitModal(true);
    }
  }, [error]);

  const handleSend = async () => {
    if (!message.trim()) return;

    if (error === "LIMIT_REACHED" || backendIsLimitReached) {
      setShowLimitModal(true);
      return;
    }

    try {
      setPendingResponse(true);
      if (!currentChatId) {
        dispatch(
          createChat({
            title: "Nova Conversa",
            initialMessage: message,
          }),
        );
      } else {
        dispatch(
          addMessage({
            chatId: currentChatId,
            content: message,
            role: "user",
          }),
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      const aiResponse = await sendMessage(message);
      const chatId = currentChatIdRef.current;

      console.log("InputChatAxel - usage após sendMessage:", usage);

      if (aiResponse && chatId) {
        dispatch(
          addMessage({
            chatId,
            content: aiResponse,
            role: "assistant",
          }),
        );
      } else if (chatId) {
        dispatch(
          addMessage({
            chatId,
            content:
              "Desculpe, não consegui processar sua mensagem no momento. Tente novamente.",
            role: "assistant",
          }),
        );
      }
      incrementMessageCount();
      setMessage("");
    } finally {
      setPendingResponse(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (error === "LIMIT_REACHED" || backendIsLimitReached) {
        setShowLimitModal(true);
        return;
      }

      handleSend();
    }
  };

  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-700 p-4">
        <div className="mx-auto max-w-4xl">
          <LimitWarning />

          <div className="mb-3 flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  error === "LIMIT_REACHED" || backendIsLimitReached
                    ? "Limite de mensagens atingido. Atualize seu plano."
                    : "Digite sua mensagem..."
                }
                className="rounded-lg border-gray-600 bg-gray-800 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                disabled={
                  loadingUsage ||
                  pendingResponse ||
                  isLoading ||
                  error === "LIMIT_REACHED" ||
                  backendIsLimitReached
                }
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={
                loadingUsage ||
                !message.trim() ||
                pendingResponse ||
                isLoading ||
                error === "LIMIT_REACHED" ||
                backendIsLimitReached
              }
              className="bg-gradient-axel cursor-pointer rounded-lg p-3 disabled:bg-gray-600 disabled:opacity-50"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>

          {(backendCount > 0 || currentCount > 0) && (
            <div className="mb-2 text-center text-sm text-gray-400">
              {backendCount || currentCount} de {backendLimit || limit}{" "}
              mensagens usadas hoje
              {backendRemaining > 0 && (
                <span className="ml-2 text-green-400">
                  • Restam {backendRemaining} gratuita
                  {backendRemaining > 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}

          {error && error !== "LIMIT_REACHED" && (
            <p className="mb-2 text-center text-sm text-red-500">
              Erro: {error}
            </p>
          )}

          <p className="text-center text-sm">
            O AxelAI pode cometer erros. Considere verificar informações
            importantes.
          </p>
        </div>
      </div>

      <LimitReachedModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        messageCount={backendCount || currentCount}
        limit={backendLimit || limit}
        resetTime={resetTime}
      />
    </>
  );
};

export default InputChatAxel;
