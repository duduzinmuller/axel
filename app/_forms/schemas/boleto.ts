import z from "zod";

export const boletoSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF obrigatório")
    .refine((val) => {
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val);
    }, "CPF inválido"),
  zipCode: z.string().min(9, "CEP obrigatório"),
  streetName: z.string().min(1, "Rua obrigatória"),
  streetNumber: z.string().min(1, "Número obrigatório"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  federalUnit: z.string().min(2, "UF obrigatória"),
});
