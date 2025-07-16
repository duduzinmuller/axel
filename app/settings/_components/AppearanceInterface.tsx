"use client";
import React from "react";
import { Palette, RefreshCcw, Save } from "lucide-react";
import { useTheme } from "next-themes";
import { useAppSelector, useAppDispatch } from "@/app/store";
import {
  setAnimations,
  setAvatar,
  resetAppearanceSettings,
} from "@/app/store/slice/appearance/appearanceSlice";
import { resetVoiceSettings } from "@/app/store/slice/voice/voiceSlice";
import ToggleSwitch from "./ToggleSwitch";
import FormField from "./FormField";
import ActionButton from "./ActionButton";
import SettingsSection from "./SettingsSection";
import { toast } from "sonner";

export default function AppearanceInterface() {
  const dispatch = useAppDispatch();
  const { animations, avatar } = useAppSelector((state) => state.appearance);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    if (selectedTheme === "Claro") {
      setTheme("light");
    } else if (selectedTheme === "Escuro") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getCurrentThemeValue = () => {
    if (theme === "light") return "Claro";
    if (theme === "dark") return "Escuro";
    return "Sistema";
  };

  const handleAnimationsChange = (enabled: boolean) => {
    dispatch(setAnimations(enabled));
  };

  const handleAvatarChange = (enabled: boolean) => {
    dispatch(setAvatar(enabled));
  };

  const handleResetSettings = () => {
    dispatch(resetAppearanceSettings());
    dispatch(resetVoiceSettings());
    toast.success("Configurações restauradas para o padrão!");
  };

  const handleSaveSettings = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <>
      <SettingsSection
        title="Aparência e Interface"
        description="Personalize a aparência do seu assistente"
        icon={<Palette />}
      >
        <div className="space-y-4">
          <FormField label="Tema">
            <select
              className="w-full rounded-lg border bg-transparent py-2 text-sm"
              value={getCurrentThemeValue()}
              onChange={handleThemeChange}
            >
              <option value="Sistema">Sistema</option>
              <option value="Claro">Claro</option>
              <option value="Escuro">Escuro</option>
            </select>
          </FormField>
          <div className="space-y-5 pt-2">
            <ToggleSwitch
              checked={animations}
              onChange={handleAnimationsChange}
              label="Animações"
              description="Ativar animações na interface"
            />
            <ToggleSwitch
              checked={avatar}
              onChange={handleAvatarChange}
              label="Mostrar Avatar do Assistente"
              description="Exibir avatar nas conversas"
            />
          </div>
        </div>
      </SettingsSection>
      <div className="mt-2 flex justify-end gap-3">
        <ActionButton
          icon={RefreshCcw}
          variant="secondary"
          onClick={handleResetSettings}
          className="cursor-pointer"
        >
          Restaurar Padrões
        </ActionButton>
        <ActionButton
          icon={Save}
          variant="secondary"
          onClick={handleSaveSettings}
          className="cursor-pointer"
        >
          Salvar Configurações
        </ActionButton>
      </div>
    </>
  );
}
