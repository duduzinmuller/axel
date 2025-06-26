import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/store";
import { MessageLimitUtils } from "@/app/_lib/utils/messageLimit";

interface MessageLimitInfo {
  currentCount: number;
  limit: number;
  isLimitReached: boolean;
  resetTime: string;
  canSendMessage: boolean;
  incrementMessageCount: () => void;
  loading: boolean;
  forceUpdate: () => void;
}

export const useMessageLimit = (): MessageLimitInfo => {
  const user = useAppSelector((state) => state.auth.user);
  const [currentCount, setCurrentCount] = useState(0);
  const [resetTime, setResetTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.plan === "FREE") {
      setLoading(true);
      const count = MessageLimitUtils.getMessageCount();
      setCurrentCount(count);
      setResetTime(MessageLimitUtils.getResetTime());
      setLoading(false);
    } else {
      setCurrentCount(0);
      setResetTime("");
      setLoading(false);
    }
  }, [user?.plan]);

  const incrementMessageCount = () => {
    if (user?.plan === "FREE") {
      const newCount = MessageLimitUtils.incrementMessageCount();
      setCurrentCount(newCount);
    }
  };

  const isLimitReached =
    user?.plan === "FREE" && currentCount >= MessageLimitUtils.getLimit();
  const canSendMessage =
    !loading &&
    (user?.plan !== "FREE" || currentCount < MessageLimitUtils.getLimit());

  return {
    currentCount,
    limit: MessageLimitUtils.getLimit(),
    isLimitReached,
    resetTime,
    canSendMessage,
    incrementMessageCount,
    loading,
    forceUpdate: () => {
      if (user?.plan === "FREE") {
        setLoading(true);
        const count = MessageLimitUtils.getMessageCount();
        setCurrentCount(count);
        setResetTime(MessageLimitUtils.getResetTime());
        setLoading(false);
      }
    },
  };
};
