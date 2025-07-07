"use client";
import React from "react";

interface SettingsSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function SettingsSection({
  title,
  description,
  icon,
  children,
  className = "",
}: SettingsSectionProps) {
  return (
    <section
      className={`space-y-7 rounded-2xl border border-[#23262F] bg-[#0E0F11] p-8 shadow ${className}`}
    >
      <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-white">
        {icon}
        {title}
      </h2>
      <p className="mb-4 text-[12px] text-neutral-400">{description}</p>
      {children}
    </section>
  );
}
