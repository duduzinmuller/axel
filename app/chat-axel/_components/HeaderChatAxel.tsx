import ThemeToggle from "@/app/_components/ThemeToggle";
import { PanelLeft } from "lucide-react";

const HeaderChatAxel = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full px-4 py-2 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PanelLeft className="h-6 w-6" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Nova conversa</h1>
            <p className="text-sm font-light text-gray-600">
              Assistente AI inteligente
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default HeaderChatAxel;
