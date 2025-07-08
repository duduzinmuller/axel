import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slice/auth/auth-reducer";
import sidebarReducer from "./slice/sidebar/sidebar-reducer";
import chatReducer from "./slice/chat/chat-reducer";
import paymentReducer from "./slice/payment";
import { usageReducer } from "./slice/usage";
import voiceReducer from "./slice/voiceSlice";
import personalityReducer from "./slice/personalitySlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const chatPersistConfig = {
  key: "chat",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    sidebar: sidebarReducer,
    chat: persistedChatReducer,
    payment: paymentReducer,
    usage: usageReducer,
    voice: voiceReducer,
    personality: personalityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/login/fulfilled",
          "auth/register/fulfilled",
          "auth/refreshToken",
          "persist/PERSIST",
          "persist/REHYDRATE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
