import z from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "O nome não pode ter mais de 50 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
});
