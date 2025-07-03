import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  ChatState,
  Chat,
  CreateChatPayload,
  AddMessagePayload,
} from "../../types/chat-types";

const initialState: ChatState = {
  chats: [],
  currentChatId: null,
  isLoading: false,
  error: null,
  isTyping: false,
  stopTyping: false,
};

const generateChatTitle = (message: string): string => {
  const words = message.trim().split(" ").slice(0, 6);
  const title = words.join(" ");

  if (title.length > 50) {
    return title.substring(0, 47) + "...";
  }

  return title || "Nova Conversa";
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat: (state, action: PayloadAction<CreateChatPayload>) => {
      console.log("Reducer: createChat chamado", action.payload);
      const { title, initialMessage } = action.payload;
      const chatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const newChat: Chat = {
        id: chatId,
        title: initialMessage ? generateChatTitle(initialMessage) : title,
        messages: initialMessage
          ? [
              {
                id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                content: initialMessage,
                role: "user" as const,
                timestamp: new Date().toISOString(),
              },
            ]
          : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.chats.unshift(newChat);
      state.currentChatId = chatId;
      state.error = null;
      console.log("Reducer: nova conversa criada", newChat);
    },

    selectChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
      state.error = null;
    },

    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chatId, content, role } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);

      if (chat) {
        const newMessage = {
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          content,
          role,
          timestamp: new Date().toISOString(),
        };

        chat.messages.push(newMessage);
        chat.updatedAt = new Date().toISOString();

        if (role === "user" && chat.messages.length === 1) {
          chat.title = generateChatTitle(content);
        }
      }
    },

    updateChatTitle: (
      state,
      action: PayloadAction<{ chatId: string; title: string }>,
    ) => {
      const { chatId, title } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);

      if (chat) {
        chat.title = title;
        chat.updatedAt = new Date().toISOString();
      }
    },

    deleteChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.chats = state.chats.filter((c) => c.id !== chatId);

      if (state.currentChatId === chatId) {
        state.currentChatId = state.chats.length > 0 ? state.chats[0].id : null;
      }
    },

    clearChats: (state) => {
      state.chats = [];
      state.currentChatId = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    removeLastAssistantMessage: (
      state,
      action: PayloadAction<{ chatId: string }>,
    ) => {
      const { chatId } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        for (let i = chat.messages.length - 1; i >= 0; i--) {
          if (chat.messages[i].role === "assistant") {
            chat.messages.splice(i, 1);
            break;
          }
        }
      }
    },

    setTyping: (state) => {
      state.isTyping = true;
    },

    unsetTyping: (state) => {
      state.isTyping = false;
    },

    setStopTyping: (state) => {
      state.stopTyping = true;
    },

    unsetStopTyping: (state) => {
      state.stopTyping = false;
    },
  },
});

export const {
  createChat,
  selectChat,
  addMessage,
  updateChatTitle,
  deleteChat,
  clearChats,
  setLoading,
  setError,
  removeLastAssistantMessage,
  setTyping,
  unsetTyping,
  setStopTyping,
  unsetStopTyping,
} = chatSlice.actions;

export default chatSlice.reducer;
