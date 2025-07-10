"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "text-red-500",
          button: "bg-red-500 hover:bg-red-600 text-white",
        };
      case "warning":
        return {
          icon: "text-yellow-500",
          button: "bg-yellow-500 hover:bg-yellow-600 text-white",
        };
      case "info":
        return {
          icon: "text-blue-500",
          button: "bg-blue-500 hover:bg-blue-600 text-white",
        };
      default:
        return {
          icon: "text-red-500",
          button: "bg-red-500 hover:bg-red-600 text-white",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background border-border mx-4 w-full max-w-md rounded-lg border p-6">
        <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
          <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        </div>

        <p className="text-muted-foreground mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="px-4 py-2">
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`px-4 py-2 ${styles.button}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
