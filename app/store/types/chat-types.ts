export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
  isTyping?: boolean;
}

export interface CreateChatPayload {
  title: string;
  initialMessage?: string;
}

export interface AddMessagePayload {
  chatId: string;
  content: string;
  role: "user" | "assistant";
}
