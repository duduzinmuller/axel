"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store";
import { selectCurrentChat } from "../store/slice/chat";
import LoadingScreen from "../_components/LoadingScreen";
import HeaderChatAxel from "./_components/HeaderChatAxel";
import ExampleQuestions from "./_components/ExampleQuestions";
import InputChatAxel from "./_components/InputChatAxel";
import ChatMessages from "./_components/ChatMessages";

const ChatAxel = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const currentChat = useAppSelector(selectCurrentChat);
  const shouldShowMessages = currentChat && currentChat.messages.length > 0;

  console.log("Page: currentChat", currentChat);
  console.log("Page: shouldShowMessages", shouldShowMessages);

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
        <ExampleQuestions />
      )}

      <InputChatAxel />
    </div>
  );
};

export default ChatAxel;
