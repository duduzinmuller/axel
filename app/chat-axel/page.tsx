"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store";
import { selectCurrentChat } from "../store/slice/chat";
import LoadingScreen from "../_components/LoadingScreen";
import HeaderChatAxel from "./_components/HeaderChatAxel";

import InputChatAxel from "./_components/InputChatAxel";
import ChatMessages from "./_components/ChatMessages";
import TypeWriter from "../_components/TypeWriter";

const ChatAxel = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const currentChat = useAppSelector(selectCurrentChat);
  const shouldShowMessages = currentChat && currentChat.messages.length > 0;

  useEffect(() => {
    setHasMounted(true);
    if (!isLoading && (!user || !isAuthenticated)) {
      router.push("/login");
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (!hasMounted || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-background min-h-screen">
      <HeaderChatAxel />

      {shouldShowMessages ? (
        <div
          className="flex flex-col"
          style={{ paddingTop: "80px", paddingBottom: "120px" }}
        >
          <ChatMessages />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center text-center">
          <TypeWriter
            className="text-3xl font-semibold"
            text={`Olá, ${user?.name}! como posso te ajudar?`}
          />
        </div>
      )}

      <InputChatAxel />
    </div>
  );
};

export default ChatAxel;
