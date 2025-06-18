import chatReducer, {
  createChat,
  selectChat,
  addMessage,
  updateChatTitle,
  deleteChat,
  clearChats,
  setLoading,
  setError,
} from "./chat-reducer";

export default chatReducer;

export {
  createChat,
  selectChat,
  addMessage,
  updateChatTitle,
  deleteChat,
  clearChats,
  setLoading,
  setError,
};

export const selectChats = (state: { chat: { chats: any[] } }) =>
  state.chat.chats;
export const selectCurrentChatId = (state: {
  chat: { currentChatId: string | null };
}) => state.chat.currentChatId;
export const selectCurrentChat = (state: {
  chat: { chats: any[]; currentChatId: string | null };
}) => {
  const { chats, currentChatId } = state.chat;
  console.log("Selector: chats", chats);
  console.log("Selector: currentChatId", currentChatId);
  const result = currentChatId
    ? chats.find((chat) => chat.id === currentChatId)
    : null;
  console.log("Selector: result", result);
  return result;
};
export const selectIsLoading = (state: { chat: { isLoading: boolean } }) =>
  state.chat.isLoading;
export const selectError = (state: { chat: { error: string | null } }) =>
  state.chat.error;
