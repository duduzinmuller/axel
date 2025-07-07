"use client";
import React, { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import ActionButton from "./ActionButton";
import SecurityIcon from "./SecurityIcon";
import SettingsSection from "./SettingsSection";

export default function PrivacySecurity() {
  const [history, setHistory] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [thirdParty, setThirdParty] = useState(false);

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
            checked={analytics}
            onChange={setAnalytics}
            label="Análise de Dados para Melhorias"
            description="Permitir análise anônima para aprimorar o assistente"
          />
          <ToggleSwitch
            checked={thirdParty}
            onChange={setThirdParty}
            label="Compartilhamento com Terceiros"
            description="Permitir compartilhamento de dados com parceiros"
          />
          <div>
            <label className="mb-1 block text-[14px] font-medium text-white">
              Retenção de Dados
            </label>
            <select className="w-full rounded-lg border border-[#3B82F6] bg-transparent px-3 py-2 text-[14px] text-white focus:outline-none">
              <option>6 meses</option>
            </select>
          </div>
        </div>
      </SettingsSection>
      <hr className="my-7 border-t border-[#23262F] opacity-30" />
      <div>
        <div className="mb-4 text-[15px] font-semibold text-white">
          Gerenciamento de Dados
        </div>
        <div className="flex gap-3">
          <ActionButton
            icon={Download}
            variant="secondary"
            className="px-4 py-2 text-[13px]"
          >
            Exportar Dados
          </ActionButton>
          <ActionButton
            icon={Trash2}
            variant="danger"
            className="px-4 py-2 text-[13px]"
          >
            Limpar Histórico
          </ActionButton>
        </div>
      </div>
    </>
  );
}
