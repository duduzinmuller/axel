"use client";

import { useAppSelector } from "@/app/store";
import { selectCurrentChat } from "@/app/store/slice/chat";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatISOTime } from "@/app/_lib/utils/date";
import { Bot, User } from "lucide-react";
import { useRef, useEffect } from "react";

const ChatMessages = () => {
  const currentChat = useAppSelector(selectCurrentChat);

  const { user } = useAppSelector((state) => state.auth);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages.length]);

  if (!currentChat) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            Bem-vindo ao AxelAI
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Comece uma nova conversa para interagir com o assistente
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {currentChat.messages.map((message: any) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src="/axel.svg" alt="AxelAI" />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              </Avatar>
            )}

            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-3",
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="mt-1 text-xs opacity-70">
                {formatISOTime(message.timestamp)}
              </p>
            </div>

            {message.role === "user" && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={user?.image} alt="Usuário" />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
