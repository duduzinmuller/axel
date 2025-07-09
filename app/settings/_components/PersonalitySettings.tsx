"use client";
import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import RangeSlider from "./RangeSlider";
import FormField from "./FormField";
import SettingsSection from "./SettingsSection";
import { useAppSelector, useAppDispatch } from "@/app/store";
import {
  setProactive,
  setFormalidade,
  setProatividade,
  setInstructions,
} from "@/app/store/slice/personality/personalitySlice";

export default function PersonalitySettings() {
  const dispatch = useAppDispatch();
  const { proactive, formalidade, proatividade, instructions } = useAppSelector(
    (state) => state.personality,
  );

  return (
    <SettingsSection
      title="Personalidade e Comportamento"
      description="Defina como seu assistente deve se comportar e interagir"
    >
      <div className="space-y-4">
        <FormField label="Estilo de Personalidade">
          <select className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm">
            <option>Amigável e Casual</option>
            <option>Profissional e Formal</option>
            <option>Engraçado e Descontraído</option>
            <option>Sério e Objetivo</option>
            <option>Empático e Atencioso</option>
            <option>Técnico e Preciso</option>
            <option>Motivador e Inspirador</option>
            <option>Neutro e Impessoal</option>
          </select>
        </FormField>
        <FormField label="Nível de Formalidade">
          <RangeSlider
            value={formalidade}
            onChange={(val) => dispatch(setFormalidade(val))}
            leftLabel="Casual"
            rightLabel="Formal"
          />
        </FormField>
        <FormField label="Proatividade">
          <RangeSlider
            value={proatividade}
            onChange={(val) => dispatch(setProatividade(val))}
            leftLabel="Reativo"
            rightLabel="Proativo"
          />
        </FormField>
        <FormField label="Instruções Personalizadas">
          <textarea
            className="min-h-[48px] w-full rounded-lg border bg-transparent px-3 py-2 text-sm placeholder:text-neutral-500"
            placeholder="Adicione instruções específicas sobre como o assistente deve se comportar..."
            value={instructions}
            onChange={(e) => dispatch(setInstructions(e.target.value))}
          />
          <p className="mt-1 text-xs text-neutral-500">
            Exemplo: &ldquo;Sempre cumprimente o usuário pelo nome&rdquo; ou
            &ldquo;Seja mais técnico em discussões sobre programação&rdquo;
          </p>
        </FormField>
        <ToggleSwitch
          checked={proactive}
          onChange={(val) => dispatch(setProactive(val))}
          label="Proatividade Visual"
          className="mt-2"
        />
      </div>
    </SettingsSection>
  );
}
