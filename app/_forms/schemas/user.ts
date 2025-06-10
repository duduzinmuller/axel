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

export const signupFormSchema = z
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
