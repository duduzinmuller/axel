"use client";
import { Button } from "@/components/ui/button";
import { Lock, LogOut } from "lucide-react";
import AlertDialogDelete from "./AlertDialogDelete";

interface ProfileActionsProps {
  onChangePassword: () => void;
  onLogout: () => void;
}

export default function ProfileActions({
  onChangePassword,
  onLogout,
}: ProfileActionsProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="mb-1 text-base font-semibold text-zinc-900 dark:text-white">
        Ações
      </span>
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className="h-12 w-full cursor-pointer justify-start bg-zinc-50 text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:text-white dark:hover:bg-[#232323]"
          onClick={onChangePassword}
        >
          <span className="mr-3">
            <Lock className="h-4 w-4 text-zinc-700 dark:text-white" />
          </span>
          Alterar senha
        </Button>
        <Button
          variant="ghost"
          className="h-12 w-full cursor-pointer justify-start bg-zinc-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-[#0F0D0D] dark:text-red-500 dark:hover:bg-[#232323]"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-4 w-4" /> Sair
        </Button>
        <AlertDialogDelete />
      </div>
    </div>
  );
}
