"use client";
import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  label,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs">{label}</label>
      {children}
    </div>
  );
}
