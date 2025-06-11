import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
} from "../schemas/user";
import z from "zod";

type LoginFormData = z.infer<typeof loginFormSchema>;
type RegisterFormSchema = z.infer<typeof registerFormSchema>;
type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;

export const useLoginForm = () => {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};

export const useRegisterForm = () => {
  return useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
};

export const useResetPasswordForm = () => {
  return useForm<ResetPasswordFormSchema>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
};
