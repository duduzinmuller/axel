"use client";
import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import RangeSlider from "./RangeSlider";
import FormField from "./FormField";
import SettingsSection from "./SettingsSection";

export default function GeneralSettings() {
  const [voiceActive, setVoiceActive] = useState(true);
  const [velocidade, setVelocidade] = useState(60);

  return (
    <SettingsSection
      title="Configurações Gerais"
      description="Configure as informações básicas do seu assistente"
    >
      <div className="space-y-4">
        <FormField label="Nome do Assistente">
          <input
            type="text"
            className="w-full rounded-lg border border-[#3B82F6] bg-transparent px-3 py-2 text-sm placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="AXEL"
          />
        </FormField>
        <FormField label="Idioma Principal">
          <select className="w-full rounded-lg border border-[#3B82F6] bg-transparent px-3 py-2 text-sm">
            <option>Português (Brasil)</option>
          </select>
        </FormField>
        <FormField label="Tipo de Voz">
          <select className="w-full rounded-lg border border-[#3B82F6] bg-transparent px-3 py-2 text-sm">
            <option>Feminina - Natural</option>
          </select>
        </FormField>
        <FormField label="Velocidade da Fala">
          <RangeSlider
            value={velocidade}
            onChange={setVelocidade}
            leftLabel="Lenta"
            rightLabel="Rápida"
          />
        </FormField>
        <ToggleSwitch
          checked={voiceActive}
          onChange={setVoiceActive}
          label="Ativação por Voz"
          className="mt-2"
        />
      </div>
    </SettingsSection>
  );
}
