"use client";

import type React from "react";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const InputChatAxel = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-gray-700 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="rounded-lg border-gray-600 bg-gray-800 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-gradient-axel cursor-pointer rounded-lg p-3 disabled:bg-gray-600 disabled:opacity-50"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>

        <p className="text-center text-sm">
          O AxelAI pode cometer erros. Considere verificar informações
          importantes.
        </p>
      </div>
    </div>
  );
};

export default InputChatAxel;
