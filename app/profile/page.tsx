"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ThemeToggle from "../_components/ThemeToggle";
import { Edit2, Check, X, LogOut, Lock } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store";
import { useTheme } from "next-themes";

import ImageSelector from "./_components/image-selector";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AlertDialogDelete from "./_components/alert-dialog-delete";
import { signOut, updateUserProfile } from "../store/slice/auth";
import { profileFormSchema } from "../_forms/schemas/profile";
import { toast } from "sonner";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user?.image) {
      setProfileImage(user.image);
    }
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [form, user]);

  if (!user) return null;

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await dispatch(
        updateUserProfile({ ...data, image: profileImage ?? undefined }),
      ).unwrap();
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
      toast.success("");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const handleCancel = () => {
    form.reset({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
    toast("Edição cancelada.");
  };

  const handleLogout = () => {
    dispatch(signOut());
    router.push("/login");
    toast("Você saiu da sua conta.");
  };

  const handleImageSelected = (imageUrl: string) => {
    setProfileImage(imageUrl);
    setShowImageSelector(false);
  };

  const handleVerifyEmail = () => {
    console.log("Verificando e-mail...");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-5 py-6 sm:mx-0 dark:bg-[#121212]">
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Card className="relative w-full max-w-sm rounded-xl py-4 shadow-lg dark:bg-[#161616]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Editar Perfil</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="h-8 w-8 cursor-pointer rounded-full"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-24 w-24">
                  <Image
                    src={profileImage || user.image || "/brender.png"}
                    alt="Avatar"
                    fill
                    className="border-primary rounded-full border-2 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-primary hover:bg-primary/80 absolute right-0 bottom-0 text-white"
                    onClick={() => setShowImageSelector(true)}
                  >
                    <Edit2 size={16} />
                  </Button>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex cursor-pointer items-center"
                      >
                        <X size={16} className="mr-2" />
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex cursor-pointer items-center"
                      >
                        {isLoading ? (
                          "Salvando..."
                        ) : (
                          <>
                            <Check size={16} className="mr-2" />
                            Salvar
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {showImageSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md">
            <ImageSelector
              onClose={() => setShowImageSelector(false)}
              onImageSelected={handleImageSelected}
            />
          </div>
        </div>
      )}
      <div className="bg-gradient-axel relative flex h-36 w-full max-w-xl flex-col items-center justify-end rounded-t-2xl">
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-white hover:bg-zinc-200 dark:hover:bg-white/10"
            onClick={() => setIsEditing(true)}
            aria-label="Editar perfil"
          >
            <Edit2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute -bottom-11 left-1/2 -translate-x-1/2">
          <button
            type="button"
            className="group border-background relative h-22 w-22 cursor-pointer overflow-hidden rounded-full border-4 shadow-lg focus:outline-none"
            onClick={() => setIsEditing(true)}
            aria-label="Alterar foto de perfil"
          >
            <Image
              src={profileImage || user.image || "/brender.png"}
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
      <div className="mx-2 flex w-full max-w-xl flex-col items-center gap-7 rounded-b-2xl bg-white px-4 pt-14 pb-7 shadow-md dark:bg-[#161616]">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-medium text-zinc-900 dark:text-white">
            {user.name}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {user.email}
          </span>
        </div>
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
            <ThemeToggle />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="mb-1 text-base font-semibold text-zinc-900 dark:text-white">
            Informações da conta
          </span>
          <div className="mb-2 flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
            <div className="flex items-center gap-3">
              <span className="text-zinc-900 dark:text-white">Plano</span>
            </div>
            {user?.plan ? (
              <span
                className={`rounded px-2 py-0.5 text-xs font-semibold ${user.plan === "FREE" && "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"} ${user.plan === "MONTHLY" && "shadow-gold border border-yellow-400 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900"} ${user.plan === "ANNUAL" && "shadow-diamond border border-blue-200 bg-gradient-to-r from-cyan-200 via-white to-blue-400 text-blue-900"} `}
              >
                {user.plan}
              </span>
            ) : (
              <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                Gratuito
              </span>
            )}
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:hover:bg-[#232323]">
            <div className="flex items-center gap-3">
              <span className="text-zinc-900 dark:text-white">
                Email verificado
              </span>
            </div>
            {user.isVerified ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                <Check className="h-4 w-4" /> Verificado
              </span>
            ) : (
              <div className="flex flex-col items-end">
                <span className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-500">
                  <X className="h-4 w-4" /> Não verificado
                </span>
                <Button size="sm" className="mt-1" onClick={handleVerifyEmail}>
                  Verificar e-mail
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="mb-1 text-base font-semibold text-zinc-900 dark:text-white">
            Ações
          </span>
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="h-12 w-full cursor-pointer justify-start bg-zinc-50 text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-[#0F0D0D] dark:text-white dark:hover:bg-[#232323]"
              onClick={() => router.push("/forgot-password")}
            >
              <span className="mr-3">
                <Lock className="h-4 w-4 text-zinc-700 dark:text-white" />
              </span>
              Alterar senha
            </Button>
            <Button
              variant="ghost"
              className="h-12 w-full cursor-pointer justify-start bg-zinc-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-[#0F0D0D] dark:text-red-500 dark:hover:bg-[#232323]"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" /> Sair
            </Button>
            <AlertDialogDelete />
          </div>
        </div>
      </div>
    </div>
  );
}
