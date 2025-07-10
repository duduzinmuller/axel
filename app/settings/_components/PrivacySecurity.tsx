"use client";
import React, { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/app/store";
import { clearChats } from "@/app/store/slice/chat";
import { clearUsage } from "@/app/store/slice/usage";
import { resetAppearanceSettings } from "@/app/store/slice/appearance/appearanceSlice";
import { resetVoiceSettings } from "@/app/store/slice/voice/voiceSlice";
import { resetPersonality } from "@/app/store/slice/personality/personalitySlice";
import ToggleSwitch from "./ToggleSwitch";
import ActionButton from "./ActionButton";
import SecurityIcon from "./SecurityIcon";
import SettingsSection from "./SettingsSection";
import ConfirmDialog from "./ConfirmDialog";
import { toast } from "sonner";

export default function PrivacySecurity() {
  const [history, setHistory] = useState(true);
  const [thirdParty, setThirdParty] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { chats } = useAppSelector((state) => state.chat);
  const { usage } = useAppSelector((state) => state.usage);

  const exportData = () => {
    try {
      const exportData = {
        user: user,
        chats: chats,
        usage: usage,
        timestamp: new Date().toISOString(),
        version: "1.0",
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `axel-data-${new Date().toISOString().split("T")[0]}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Dados exportados com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast.error("Erro ao exportar dados");
    }
  };

  const clearHistory = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmClearHistory = () => {
    try {
      dispatch(clearChats());

      dispatch(clearUsage());

      dispatch(resetAppearanceSettings());
      dispatch(resetVoiceSettings());
      dispatch(resetPersonality());

      localStorage.removeItem("ai_usage");
      localStorage.removeItem("typedAssistantIds");

      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          (key.startsWith("typedAssistantIds:") || key.startsWith("chat-"))
        ) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      toast.success("Histórico limpo com sucesso!");
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
      toast.error("Erro ao limpar histórico");
    }
  };

  return (
    <>
      <SettingsSection
        title="Privacidade e Segurança"
        description="Controle como seus dados são coletados e utilizados"
        icon={<SecurityIcon />}
      >
        <div className="space-y-7">
          <ToggleSwitch
            checked={history}
            onChange={setHistory}
            label="Salvar Histórico de Conversas"
            description="Manter registro das interações para melhorar a experiência"
          />
          <ToggleSwitch
            checked={thirdParty}
            onChange={setThirdParty}
            label="Compartilhamento com Terceiros"
            description="Permitir compartilhamento de dados com parceiros"
          />
        </div>
      </SettingsSection>
      <hr className="my-7 border-t border-[#23262F] opacity-30" />
      <div>
        <div className="mb-4 text-[15px] font-semibold">
          Gerenciamento de Dados
        </div>
        <div className="flex gap-3">
          <ActionButton
            icon={Download}
            variant="secondary"
            className="cursor-pointer px-4 py-2 text-[13px]"
            onClick={exportData}
          >
            Exportar Dados
          </ActionButton>
          <ActionButton
            icon={Trash2}
            variant="danger"
            className="cursor-pointer px-4 py-2 text-[13px]"
            onClick={clearHistory}
          >
            Limpar Histórico
          </ActionButton>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmClearHistory}
        title="Limpar Histórico"
        message="Tem certeza que deseja limpar todo o histórico de conversas e configurações? Esta ação não pode ser desfeita."
        confirmText="Limpar Tudo"
        cancelText="Cancelar"
        variant="danger"
      />
    </>
  );
}
