"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "../store";

import { useRouter } from "next/navigation";
import { requestSendEmail } from "../store/slice/auth";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.string().email("Email inválido"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.auth);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    try {
      await dispatch(requestSendEmail(data.email)).unwrap();
      toast.success("Código enviado para seu email!");
      router.push(
        `/notification-email?mode=reset-password&email=${encodeURIComponent(
          data.email,
        )}`,
      );
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar o código.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite seu email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-gradient-axel w-full cursor-pointer text-white hover:scale-110"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
