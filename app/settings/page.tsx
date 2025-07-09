"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../store";
import {
  GeneralSettings,
  AdminDashboard,
  PrivacySecurity,
  AppearanceInterface,
} from "./_components";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="absolute top-4 left-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex cursor-pointer items-center rounded p-2 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="w-full max-w-3xl space-y-10">
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-semibold">
          <span>⚙️</span>
          Configurações do Assistente
        </h1>
        <p className="mb-6 text-sm text-neutral-400">
          Personalize seu assistente virtual de acordo com suas preferências
        </p>
        <GeneralSettings />
        {user?.role === "ADMIN" && <AdminDashboard />}
        <PrivacySecurity />
        <AppearanceInterface />
      </div>
    </div>
  );
}
