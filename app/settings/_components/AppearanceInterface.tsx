"use client";
import React, { useState } from "react";
import { RefreshCcw, Save } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import RangeSlider from "./RangeSlider";
import FormField from "./FormField";
import ActionButton from "./ActionButton";
import SecurityIcon from "./SecurityIcon";
import SettingsSection from "./SettingsSection";

export default function AppearanceInterface() {
  const [animations, setAnimations] = useState(true);
  const [compact, setCompact] = useState(false);
  const [avatar, setAvatar] = useState(true);
  const [tamanhoFonte, setTamanhoFonte] = useState(60);

  return (
    <>
      <SettingsSection
        title="Aparência e Interface"
        description="Personalize a aparência do seu assistente"
        icon={<SecurityIcon />}
      >
        <div className="space-y-4">
          <FormField label="Tema">
            <select
              className="w-full rounded-lg border bg-transparent py-2 text-sm"
              defaultValue="Sistema"
            >
              <option>Sistema</option>
            </select>
          </FormField>
          <FormField label="Cor Principal">
            <select
              className="w-full rounded-lg border bg-transparent py-2 text-sm"
              defaultValue="Azul"
            >
              <option>Azul</option>
            </select>
          </FormField>
          <FormField label="Tamanho da Fonte">
            <RangeSlider
              value={tamanhoFonte}
              onChange={setTamanhoFonte}
              leftLabel="Pequena"
              rightLabel="Grande"
              centerLabel="Normal"
            />
          </FormField>
          <div className="space-y-5 pt-2">
            <ToggleSwitch
              checked={animations}
              onChange={setAnimations}
              label="Animações"
              description="Ativar animações na interface"
            />
            <ToggleSwitch
              checked={compact}
              onChange={setCompact}
              label="Modo Compacto"
              description="Reduzir espaçamento para mais conteúdo"
            />
            <ToggleSwitch
              checked={avatar}
              onChange={setAvatar}
              label="Mostrar Avatar do Assistente"
              description="Exibir avatar nas conversas"
            />
          </div>
        </div>
      </SettingsSection>
      <hr className="my-7 border-t border-[#23262F] opacity-30" />
      <div className="mt-2 flex justify-end gap-3">
        <ActionButton icon={RefreshCcw} variant="secondary">
          Restaurar Padrões
        </ActionButton>
        <ActionButton icon={Save} variant="primary">
          Salvar Configurações
        </ActionButton>
      </div>
    </>
  );
}
