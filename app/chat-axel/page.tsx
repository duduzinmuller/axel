"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store";
import LoadingScreen from "../_components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { signOut } from "../store/slice/auth";
import HeaderChatAxel from "./_components/HeaderChatAxel";

const ChatAxel = () => {
  const dispatch = useAppDispatch();
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  const handleLogout = () => {
    dispatch(signOut());
  };

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <HeaderChatAxel />
      <h1 className="text-4xl">Olá mundo</h1>
      <Button variant="destructive" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
};

export default ChatAxel;
