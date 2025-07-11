import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { boletoSchema } from "../schemas/boleto";
import { z } from "zod";

type BoletoFormData = z.infer<typeof boletoSchema>;

export const useBoletoForm = () => {
  return useForm<BoletoFormData>({
    resolver: zodResolver(boletoSchema),
    defaultValues: {
      cpf: "",
      zipCode: "",
      streetName: "",
      streetNumber: "",
      neighborhood: "",
      city: "",
      federalUnit: "",
    },
  });
};
