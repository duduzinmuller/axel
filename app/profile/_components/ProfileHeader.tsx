"use client";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  image: string | null;
  onEdit: () => void;
}

export default function ProfileHeader({ image, onEdit }: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-axel relative flex h-36 w-full max-w-xl flex-col items-center justify-end rounded-t-2xl">
      <div className="absolute top-3 right-3">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer text-white hover:bg-zinc-200 dark:hover:bg-white/10"
          onClick={onEdit}
          aria-label="Editar perfil"
        >
          <Edit2 className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute -bottom-11 left-1/2 -translate-x-1/2">
        <button
          type="button"
          className="group border-background relative h-22 w-22 cursor-pointer overflow-hidden rounded-full border-4 shadow-lg focus:outline-none"
          onClick={onEdit}
          aria-label="Alterar foto de perfil"
        >
          <Image
            src={image || "/brender.png"}
            alt="Avatar"
            width={88}
            height={88}
            className="h-22 w-22 rounded-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <Edit2 className="h-4 w-4 text-white opacity-90" />
          </span>
        </button>
      </div>
    </div>
  );
}
