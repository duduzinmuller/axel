"use client";
import { ReactNode } from "react";

interface PreferencesSectionProps {
  theme: string;
  ThemeToggle: ReactNode;
}

export default function PreferencesSection({
  theme,
  ThemeToggle,
}: PreferencesSectionProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-base font-semibold text-zinc-900 dark:text-white">
          Preferências
        </span>
      </div>
      <div className="flex h-12 items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
        <div className="flex items-center gap-3">
          <span className="text-zinc-900 dark:text-white">
            {theme === "dark" ? "Tema escuro" : "Tema claro"}
          </span>
        </div>
        {ThemeToggle}
      </div>
    </div>
  );
}
