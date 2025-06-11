import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "O email é inválido",
    })
    .trim()
    .min(1, {
      message: "O email é obrigatório",
    }),
  password: z.string().trim().min(6, {
    message: "A senha deve ter no minímo 6 caracteres",
  }),
});

export const registerFormSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "O nome é obrigatório",
    }),
    email: z
      .string()
      .email({
        message: "O email é inválido",
      })
      .trim()
      .min(1, {
        message: "O email é obrigatório",
      }),
    password: z.string().trim().min(6, {
      message: "A senha deve ter no minímo 6 caracteres",
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: "A confirmação da senha é obrigatória",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      message: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    },
  );

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Confirmação deve ter ao menos 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
