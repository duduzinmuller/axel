"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  className?: string;
}

export default function ActionButton({
  icon: Icon,
  children,
  variant = "secondary",
  onClick,
  className = "",
}: ActionButtonProps) {
  const baseClasses =
    "flex items-center gap-2 font-medium px-5 py-2 text-sm rounded-lg transition";

  const variantClasses = {
    primary: "border border-[#3B82F6] hover:bg-[#2563eb]",
    secondary: "border border-[#23262F] hover:bg-[#23262F] ",
    danger: "border border-[#23262F] hover:bg-[#232B3A] text-red-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}
