"use client";
import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  className = "",
}: ToggleSwitchProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex-1">
        <span className="text-xs text-neutral-200">{label}</span>
        {description && (
          <div className="ml-0.5 text-[12px] text-neutral-400">
            {description}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border border-[#3B82F6] transition-colors focus:outline-none ${checked ? "bg-[#3B82F6]" : "bg-[#0E0F11]"}`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full shadow transition-transform ${checked ? "translate-x-6 bg-black" : "translate-x-1 bg-white"}`}
        />
      </button>
    </div>
  );
}
