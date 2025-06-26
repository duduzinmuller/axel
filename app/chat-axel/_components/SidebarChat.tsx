"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SquarePen, Settings, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  selectChats,
  selectCurrentChatId,
  selectChat,
  deleteChat,
  createChat,
} from "@/app/store/slice/chat";
import MessageLimitIndicator from "./MessageLimitIndicator";
import Link from "next/link";
import { useUsage } from "@/app/_lib/hooks/useUsage";
import LimitWarning from "./LimitWarning";

interface SidebarProps {
  onNewChat?: () => void;
  onSelectChat: (id: string) => void;
}

const SidebarChat = ({ onSelectChat }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const chats = useAppSelector(selectChats);
  const currentChatId = useAppSelector(selectCurrentChatId);
  const { usage } = useUsage();

  console.log("Sidebar usage:", usage);

  const handleNewChat = () => {
    console.log("Sidebar: Criando nova conversa...");
    try {
      dispatch(
        createChat({
          title: "Nova Conversa",
        }),
      );
      console.log("Sidebar: Nova conversa criada com sucesso!");
    } catch (error) {
      console.error("Sidebar: Erro ao criar nova conversa", error);
    }
  };

  const handleSelectChat = (chatId: string) => {
    dispatch(selectChat(chatId));
    onSelectChat(chatId);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteChat(chatId));
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="border-border bg-background fixed top-0 left-0 flex h-full w-[260px] flex-col border-r"
    >
      <div style={{ display: "none" }}>{usage?.currentCount}</div>
      <div className="border-border flex items-center justify-between border-b p-4">
        <h1 className="pr-3 text-lg font-bold">AxelAI</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer transition"
                onClick={handleNewChat}
              >
                <SquarePen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Nova conversa</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 px-2 py-2">
          {chats.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Nenhuma conversa ainda
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group hover:bg-muted relative flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  currentChatId === chat.id && "bg-muted",
                )}
              >
                <button
                  onClick={() => handleSelectChat(chat.id)}
                  className="flex-1 truncate text-left"
                >
                  {chat.title}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="border-border space-y-2 border-t p-4">
        <LimitWarning />
        <MessageLimitIndicator />
        <div className="flex items-center space-x-3">
          <Link href="/profile" className="flex items-center space-x-3">
            <Avatar className="border-border h-10 w-10 border">
              <AvatarImage src={user?.image} alt={user?.name} />
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <p className="text-sm font-medium">{user?.name}</p>
                {user?.plan && (
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-semibold",
                      user.plan === "FREE" && "bg-muted text-muted-foreground",
                      user.plan === "MONTHLY" &&
                        "shadow-gold border border-yellow-400 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900",
                      user.plan === "ANNUAL" &&
                        "shadow-diamond border border-blue-200 bg-gradient-to-r from-cyan-200 via-white to-blue-400 text-blue-900",
                    )}
                  >
                    {user.plan}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
          </Link>
          <Settings />
        </div>
      </div>
    </motion.div>
  );
};

export default SidebarChat;
