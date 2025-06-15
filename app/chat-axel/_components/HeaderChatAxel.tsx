"use client";

import ThemeToggle from "@/app/_components/ThemeToggle";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import SidebarChat from "./SidebarChat";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleSidebar } from "@/app/store/slice/sidebar/sidebar-reducer";

const SIDEBAR_WIDTH = 260;

const HeaderChatAxel = () => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state) => state.sidebar);

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_WIDTH }}
            transition={{ duration: 0.3 }}
            className="border-border fixed top-0 left-0 z-40 h-full w-[260px] border-r"
          >
            <SidebarChat
              onNewChat={() => console.log("Nova conversa")}
              onSelectChat={(id: string) => console.log("Selecionou:", id)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="transition-all duration-300"
        style={{ paddingLeft: isSidebarOpen ? SIDEBAR_WIDTH : 0 }}
      >
        <div
          className="fixed top-0 left-0 z-50 w-full px-4 py-2 shadow-md transition-all duration-300"
          style={{ paddingLeft: isSidebarOpen ? SIDEBAR_WIDTH : 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(toggleSidebar())}
                className="cursor-pointer rounded-full hover:bg-transparent"
              >
                {isSidebarOpen ? (
                  <PanelRightClose className="cursor-pointer" />
                ) : (
                  <PanelRightOpen className="cursor-pointer" />
                )}
              </Button>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Nova Conversa</h1>
                <p className="text-sm font-light text-gray-600 dark:text-gray-300">
                  Assistente AI inteligente
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderChatAxel;
