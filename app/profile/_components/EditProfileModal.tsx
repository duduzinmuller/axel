"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from "@/app/_forms/schemas/profile";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Edit2, X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import ImageSelector from "./ImageSelector";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormValues) => void;
  isLoading: boolean;
  initialValues: ProfileFormValues;
  profileImage: string | null;
  onImageSelected: (imageUrl: string) => void;
}

export default function EditProfileModal({
  open,
  onClose,
  onSubmit,
  isLoading,
  initialValues,
  profileImage,
  onImageSelected,
}: EditProfileModalProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialValues,
  });
  const [showImageSelector, setShowImageSelector] = useState(false);

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="relative w-full max-w-sm rounded-xl py-4 shadow-lg dark:bg-[#161616]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Editar Perfil</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
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
                src={profileImage || "/brender.png"}
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
                    onClick={onClose}
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
      {showImageSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md">
            <ImageSelector
              onClose={() => setShowImageSelector(false)}
              onImageSelected={onImageSelected}
            />
          </div>
        </div>
      )}
    </div>
  );
}
