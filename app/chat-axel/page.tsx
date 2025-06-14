"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store";
import LoadingScreen from "../_components/LoadingScreen";
import HeaderChatAxel from "./_components/HeaderChatAxel";
import ExampleQuestions from "./_components/ExampleQuestions";
import InputChatAxel from "./_components/InputChatAxel";

const ChatAxel = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

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
    <div className="min-w-screen">
      <HeaderChatAxel />
      <ExampleQuestions />
      <InputChatAxel />
    </div>
  );
};

export default ChatAxel;
