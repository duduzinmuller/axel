"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  User,
  LogOut,
  Trash2,
  CheckCircle,
  Moon,
  Pen,
  X,
  Upload,
} from "lucide-react";
import ClientOnly from "../_components/ClientOnly";
import ThemeToggle from "../_components/ThemeToggle";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  // Mock de dados do usuário
  const user = {
    name: "Maria Fernanda",
    email: "mariafernanda@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    plan: "FREE",
    emailVerified: true,
  };

  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [activeTab, setActiveTab] = useState<"avatars" | "upload">("upload");
  const [avatarGallery, setAvatarGallery] = useState([
    user.avatar,
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/women/46.jpg",
  ]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setAvatarUrl(ev.target.result as string);
          setAvatarGallery((prev) => [ev.target?.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-5 py-6 sm:mx-0 dark:bg-[#121212]">
      {/* Modal de edição de perfil e foto (unificado) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-sm rounded-xl bg-white p-8 shadow-lg dark:bg-[#161616]">
            <button
              className="absolute top-3 right-3 text-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="mb-6 text-center text-lg font-semibold text-zinc-900 dark:text-white">
              Editar Perfil
            </h2>
            <div className="flex flex-col items-center gap-4">
              {/* Foto de perfil */}
              <Avatar className="mx-auto mb-2 h-24 w-24">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="mb-2 flex w-full justify-center gap-2">
                <button
                  className={`rounded-md border border-transparent px-4 py-2 font-medium transition-all focus:outline-none ${activeTab === "avatars" ? "bg-gradient-to-r from-[#7266e8] to-[#764ba2] text-white shadow-sm" : "bg-transparent text-zinc-500 dark:text-zinc-300"}`}
                  onClick={() => setActiveTab("avatars")}
                >
                  Avatares
                </button>
                <button
                  className={`rounded-md border border-transparent px-4 py-2 font-medium transition-all focus:outline-none ${activeTab === "upload" ? "bg-gradient-to-r from-[#7266e8] to-[#764ba2] text-white shadow-sm" : "bg-transparent text-zinc-500 dark:text-zinc-300"}`}
                  onClick={() => setActiveTab("upload")}
                >
                  Enviar foto
                </button>
              </div>
              {activeTab === "avatars" ? (
                <div className="mb-2 flex w-full flex-wrap justify-center gap-3">
                  {avatarGallery.map((img, idx) => (
                    <button
                      key={img + idx}
                      className={`rounded-full border-2 ${avatarUrl === img ? "border-[#7266e8]" : "border-transparent"} p-0.5 transition-all focus:outline-none`}
                      onClick={() => setAvatarUrl(img)}
                    >
                      <Image
                        src={img}
                        alt="avatar"
                        className="rounded-full object-cover"
                        width={56}
                        height={56}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <label className="mb-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-400/40 bg-zinc-100/60 py-8 transition-colors hover:border-[#7266e8] dark:bg-[#232323]">
                  <Upload className="mb-2 h-10 w-10 text-zinc-400" />
                  <span className="mb-1 text-base text-zinc-500 dark:text-zinc-300">
                    Clique para enviar ou arraste e solte
                  </span>
                  <span className="text-xs text-zinc-400">
                    PNG, JPG (MÁX. 2MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
              {/* Campos de nome e email */}
              <label className="w-full text-left text-sm text-zinc-700 dark:text-zinc-200">
                Nome
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 text-zinc-900 focus:ring-2 focus:ring-[#7266e8] focus:outline-none dark:border-zinc-700 dark:bg-[#232323] dark:text-white"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <label className="w-full text-left text-sm text-zinc-700 dark:text-zinc-200">
                E-mail
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 text-zinc-900 focus:ring-2 focus:ring-[#7266e8] focus:outline-none dark:border-zinc-700 dark:bg-[#232323] dark:text-white"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <button
                className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#7266e8] to-[#764ba2] px-4 py-2 font-medium text-white shadow-md transition-all hover:opacity-90"
                onClick={() => setShowModal(false)}
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header com gradiente e avatar */}
      <div className="bg-gradient-axel relative flex h-36 w-full max-w-xl flex-col items-center justify-end rounded-t-2xl">
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-zinc-200 dark:hover:bg-white/10"
            onClick={() => setShowModal(true)}
            aria-label="Editar perfil"
          >
            <Pen className="h-5 w-5" />
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div className="absolute -bottom-11 left-1/2 -translate-x-1/2">
          <button
            type="button"
            className="group border-background relative h-22 w-22 overflow-hidden rounded-full border-4 shadow-lg focus:outline-none"
            onClick={() => setShowModal(true)}
            aria-label="Alterar foto de perfil"
          >
            <Avatar className="h-full w-full rounded-full">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            {/* Overlay e ícone de lápis */}
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <Pen className="h-4 w-4 text-white opacity-90" />
            </span>
          </button>
        </div>
      </div>

      {/* Card principal */}
      <div className="mx-2 flex w-full max-w-xl flex-col items-center gap-7 rounded-b-2xl bg-white px-4 pt-14 pb-7 shadow-md dark:bg-[#161616]">
        {/* Nome e email */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-medium text-zinc-900 dark:text-white">
            {user.name}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {user.email}
          </span>
        </div>

        {/* Preferências */}
        <div className="flex w-full flex-col gap-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-base font-semibold text-zinc-900 dark:text-white">
              Preferências
            </span>
          </div>
          <div className="flex h-12 cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
            <div className="flex items-center gap-3">
              <Moon className="h-4 w-4 text-zinc-700 dark:text-white" />
              <span className="text-zinc-900 dark:text-white">Tema escuro</span>
            </div>
            <ClientOnly>
              <ThemeToggle />
            </ClientOnly>
          </div>
        </div>

        {/* Informações da conta */}
        <div className="flex w-full flex-col gap-2">
          <span className="mb-1 text-base font-semibold text-zinc-900 dark:text-white">
            Informações da conta
          </span>
          <div className="mb-2 flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-zinc-700 dark:text-white" />
              <span className="text-zinc-900 dark:text-white">Plano</span>
            </div>
            <span className="bg-gradient-axel rounded-full px-3 py-1 text-xs font-bold text-white opacity-80">
              {user.plan}
            </span>
          </div>
          <div className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-zinc-700 dark:text-white" />
              <span className="text-zinc-900 dark:text-white">
                Email verificado
              </span>
            </div>
            {user.emailVerified ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-500">
                <CheckCircle className="h-4 w-4" /> Verificado
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-500">
                <X className="h-4 w-4" /> Não verificado
              </span>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex w-full flex-col gap-2">
          <span className="mb-1 text-base font-semibold text-zinc-900 dark:text-white">
            Ações
          </span>
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="h-12 w-full justify-start bg-zinc-50 text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:text-white dark:hover:bg-[#232323]"
            >
              <Lock className="mr-3 h-4 w-4 text-zinc-700 dark:text-white" />{" "}
              Alterar senha
            </Button>
            <Button
              variant="ghost"
              className="h-12 w-full justify-start bg-zinc-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-[#0F0D0D] dark:text-red-500 dark:hover:bg-[#232323]"
            >
              <LogOut className="mr-3 h-4 w-4" /> Sair
            </Button>
            <Button
              variant="ghost"
              className="h-12 w-full justify-start bg-zinc-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-[#0F0D0D] dark:text-red-500 dark:hover:bg-[#232323]"
            >
              <Trash2 className="mr-3 h-4 w-4" /> Deletar conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
