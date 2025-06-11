"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store";
import LoadingScreen from "../_components/LoadingScreen";

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

  if (!hasMounted || !isLoading || !user) {
    return <LoadingScreen />;
  }

  return <div></div>;
};

export default ChatAxel;
