"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { signOut, updateUserProfile } from "../store/slice/auth";
import { profileFormSchema } from "../_forms/schemas/profile";
import { toast } from "sonner";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";

import EditProfileModal from "./_components/EditProfileModal";
import ProfileHeader from "./_components/ProfileHeader";
import PreferencesSection from "./_components/PreferencesSection";
import AccountInfoSection from "./_components/AccountInfoSection";
import ProfileActions from "./_components/ProfileActions";
import ThemeToggle from "../_components/ThemeToggle";
import { Button } from "@/components/ui/button";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.image) {
      setProfileImage(user.image);
    }
  }, [user]);

  if (!user) return null;

  const initialValues: ProfileFormValues = {
    name: user.name || "",
    email: user.email || "",
  };

  const handleEditSubmit = async (data: ProfileFormValues) => {
    try {
      await dispatch(
        updateUserProfile({ ...data, image: profileImage ?? undefined }),
      ).unwrap();
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setProfileImage(user.image || null);
    toast("Edição cancelada.");
  };

  const handleLogout = () => {
    dispatch(signOut());
    router.push("/login");
    toast("Você saiu da sua conta.");
  };

  const handleImageSelected = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  const handleVerifyEmail = () => {
    console.log("Verificando e-mail...");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-5 py-6 sm:mx-0 dark:bg-[#121212]">
      <div className="absolute top-4 left-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex cursor-pointer items-center rounded p-2 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <EditProfileModal
        open={isEditing}
        onClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        isLoading={isLoading}
        initialValues={initialValues}
        profileImage={profileImage}
        onImageSelected={handleImageSelected}
      />
      <ProfileHeader
        image={profileImage || user.image || null}
        onEdit={() => setIsEditing(true)}
      />

      <div className="flex w-full max-w-xl flex-col items-center gap-7 rounded-b-2xl bg-white px-4 pb-7 shadow-md dark:bg-[#161616]">
        <div className="mt-14 flex flex-col items-center gap-1">
          <span className="text-2xl font-medium text-zinc-900 dark:text-white">
            {user.name}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {user.email}
          </span>
        </div>
        <PreferencesSection
          theme={theme || "light"}
          ThemeToggle={<ThemeToggle />}
        />
        <AccountInfoSection
          plan={user.plan || null}
          isVerified={user.isVerified ?? false}
          onVerifyEmail={handleVerifyEmail}
        />
        <ProfileActions
          onChangePassword={() => router.push("/forgot-password")}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
