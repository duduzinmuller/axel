import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCodes } from "@/app/_lib/hooks/useCodes";

const plans = [
  { label: "Mensal", value: "MONTHLY" },
  { label: "Anual", value: "ANNUAL" },
];

export default function CreateAccessCode({
  onCreated,
  createCode: createCodeProp,
}: {
  onCreated?: () => void;
  createCode?: (plan: string, expiresAt: string) => Promise<any>;
}) {
  const [plan, setPlan] = useState("MONTHLY");
  const [expiresAt, setExpiresAt] = useState("");
  const hook = useCodes();
  const createCode = createCodeProp || hook.createCode;
  const creating = hook.creating;
  const createError = hook.createError;
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    try {
      const expiresAtIso = expiresAt ? new Date(expiresAt).toISOString() : "";
      await createCode(plan, expiresAtIso);
      setSuccess(true);
      if (onCreated) onCreated();
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Criar Código de Acesso</h2>
      <div>
        <label className="mb-1 block text-sm">Plano</label>
        <select
          className="w-full rounded border bg-zinc-900 p-2"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          required
        >
          {plans.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm">Expira em</label>
        <input
          type="date"
          className="w-full rounded border bg-zinc-900 p-2"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={creating}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        {creating ? "Criando..." : "Criar Código"}
      </Button>
      {createError && <p className="text-sm text-red-500">{createError}</p>}
      {success && (
        <p className="text-sm text-green-500">Código criado com sucesso!</p>
      )}
    </form>
  );
}
