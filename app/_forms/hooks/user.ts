import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
} from "../schemas/user";
import z from "zod";

type LoginFormData = z.infer<typeof loginFormSchema>;
type RegisterFormData = z.infer<typeof registerFormSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

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
  return useForm<RegisterFormData>({
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
  return useForm<ResetPasswordFormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
};
