"use client";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import RangeSlider from "./RangeSlider";
import FormField from "./FormField";
import SettingsSection from "./SettingsSection";
import { useAppSelector, useAppDispatch } from "@/app/store";
import {
  setVoiceEnabled,
  setSelectedVoice,
  setVoiceRate,
} from "@/app/store/slice/voiceSlice";

export default function GeneralSettings() {
  const dispatch = useAppDispatch();
  const voiceEnabled = useAppSelector((state) => state.voice.voiceEnabled);
  const selectedVoice = useAppSelector((state) => state.voice.selectedVoice);
  const voiceRate = useAppSelector((state) => state.voice.voiceRate);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    function loadVoices() {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

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
          <select
            className="w-full rounded-lg border border-[#3B82F6] bg-transparent px-3 py-2 text-sm"
            value={selectedVoice || ""}
            onChange={(e) => dispatch(setSelectedVoice(e.target.value))}
          >
            <option value="">Padrão do Navegador</option>
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} - {voice.lang}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Velocidade da Fala">
          <RangeSlider
            value={voiceRate}
            onChange={(val) => dispatch(setVoiceRate(val))}
            min={0.5}
            max={2}
            step={0.1}
            leftLabel="Lenta"
            rightLabel="Rápida"
          />
        </FormField>
        <ToggleSwitch
          checked={voiceEnabled}
          onChange={(val) => dispatch(setVoiceEnabled(val))}
          label="Ativação por Voz"
          className="mt-2"
        />
      </div>
    </SettingsSection>
  );
}
