"use client";
import React, { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import ActionButton from "./ActionButton";
import SecurityIcon from "./SecurityIcon";
import SettingsSection from "./SettingsSection";

export default function PrivacySecurity() {
  const [history, setHistory] = useState(true);
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
