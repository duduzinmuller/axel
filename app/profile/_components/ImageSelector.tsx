"use client";

import type React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle2, X, Upload } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/app/store/slice/auth";
import { DEFAULT_AVATARS } from "@/app/_data/avatars";

interface ImageSelectorProps {
  predefinedImages?: string[];
  onClose?: () => void;
  onImageSelected?: (imageUrl: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  predefinedImages = DEFAULT_AVATARS,
  onClose,
  onImageSelected,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("predefined");

  useEffect(() => {
    if (user?.image) {
      setPreview(user.image);
    }
  }, [user]);

  const handlePredefinedSelect = (url: string) => {
    setSelectedImage(url);
    setPreview(url);
    setCustomImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setSelectedImage(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);
      let finalImageUrl = "";

      if (!user) {
        console.error("Usuário não encontrado.");
        return;
      }

      if (customImage) {
        const formData = new FormData();
        formData.append("image", customImage);
        formData.append("userId", user.id);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        finalImageUrl = res.data.imageUrl;
      } else if (selectedImage) {
        finalImageUrl = selectedImage;
      }

      if (finalImageUrl) {
        await dispatch(updateUserProfile({ image: finalImageUrl })).unwrap();

        if (onImageSelected) {
          onImageSelected(finalImageUrl);
        }
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Erro ao salvar imagem:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Foto de perfil</CardTitle>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 cursor-pointer rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {preview && (
          <div className="flex justify-center pb-4">
            <div className="relative h-32 w-32">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Preview"
                fill
                className="border-primary rounded-full border-2 object-cover"
              />
            </div>
          </div>
        )}

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined">Avatares</TabsTrigger>
            <TabsTrigger value="upload">Enviar foto</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="mt-4">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {predefinedImages.map((img) => (
                <button
                  key={img}
                  onClick={() => handlePredefinedSelect(img)}
                  className={`relative overflow-hidden rounded-full ${
                    selectedImage === img
                      ? "ring-primary ring-2 ring-offset-2"
                      : ""
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    width={64}
                    height={64}
                    alt="Opção de avatar"
                    className="h-16 w-16 cursor-pointer rounded-full object-cover transition-transform hover:scale-110"
                  />
                  {selectedImage === img && (
                    <div className="bg-primary/30 absolute inset-0 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <div className="flex flex-col items-center space-y-4">
              <Label
                htmlFor="image-upload"
                className="border-muted-foreground/25 bg-muted/50 hover:bg-muted flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
              >
                <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                  <Upload className="text-muted-foreground h-8 w-8" />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm font-medium">
                      <span className="font-semibold">Clique para enviar</span>{" "}
                      ou arraste e solte
                    </p>
                    <p className="text-muted-foreground text-xs">
                      PNG, JPG (MAX. 2MB)
                    </p>
                  </div>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 px-6 pb-6">
        {onClose && (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </Button>
        )}
        <Button
          onClick={handleSave}
          disabled={isUploading || (!selectedImage && !customImage)}
          className="inline-flex cursor-pointer items-center"
        >
          {isUploading ? (
            "Salvando..."
          ) : (
            <>
              <CheckCircle2 size={18} className="mr-2" />
              Salvar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageSelector;
