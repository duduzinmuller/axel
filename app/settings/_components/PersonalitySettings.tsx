"use client";
import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import RangeSlider from "./RangeSlider";
import FormField from "./FormField";
import SettingsSection from "./SettingsSection";

export default function PersonalitySettings() {
  const [proactive, setProactive] = useState(true);
  const [formalidade, setFormalidade] = useState(40);
  const [proatividade, setProatividade] = useState(60);

  return (
    <SettingsSection
      title="Personalidade e Comportamento"
      description="Defina como seu assistente deve se comportar e interagir"
    >
      <div className="space-y-4">
        <FormField label="Estilo de Personalidade">
          <select className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm">
            <option>Amigável e Casual</option>
          </select>
        </FormField>
        <FormField label="Nível de Formalidade">
          <RangeSlider
            value={formalidade}
            onChange={setFormalidade}
            leftLabel="Casual"
            rightLabel="Formal"
          />
        </FormField>
        <FormField label="Proatividade">
          <RangeSlider
            value={proatividade}
            onChange={setProatividade}
            leftLabel="Reativo"
            rightLabel="Proativo"
          />
        </FormField>
        <FormField label="Instruções Personalizadas">
          <textarea
            className="min-h-[48px] w-full rounded-lg border bg-transparent px-3 py-2 text-sm placeholder:text-neutral-500"
            placeholder="Adicione instruções específicas sobre como o assistente deve se comportar..."
          />
          <p className="mt-1 text-xs text-neutral-500">
            Exemplo: &ldquo;Sempre cumprimente o usuário pelo nome&rdquo; ou
            &ldquo;Seja mais técnico em discussões sobre programação&rdquo;
          </p>
        </FormField>
        <ToggleSwitch
          checked={proactive}
          onChange={setProactive}
          label="Proatividade Visual"
          className="mt-2"
        />
      </div>
    </SettingsSection>
  );
}
