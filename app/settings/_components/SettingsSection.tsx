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
      className={`space-y-7 rounded-2xl border border-[#23262F] p-8 shadow ${className}`}
    >
      <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </h2>
      <p className="mb-4 text-[12px]">{description}</p>
      {children}
    </section>
  );
}
