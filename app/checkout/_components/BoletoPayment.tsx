import { AlertCircle, Receipt } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UF_LIST } from "@/app/_data/state";
import { FormField } from "./FormField";

const boletoSchema = z.object({
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

type BoletoForm = z.infer<typeof boletoSchema>;

interface BoletoPaymentProps {
  price: number;
  plan: string;
  onDataChange: (data: any) => void;
  boletoUrl?: string | null;
  loading?: boolean;
}

export function BoletoPayment({
  price,
  plan,
  onDataChange,
  boletoUrl,
  loading,
}: BoletoPaymentProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BoletoForm>({
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

  const zipCode = watch("zipCode");
  useEffect(() => {
    const fetchCep = async () => {
      if (zipCode && zipCode.length === 9) {
        try {
          const res = await fetch(
            `https://viacep.com.br/ws/${zipCode.replace("-", "")}/json/`,
          );
          const data = await res.json();
          if (!data.erro) {
            setValue("city", data.localidade || "");
            setValue("federalUnit", data.uf || "");
            setValue("neighborhood", data.bairro || "");
            setValue("streetName", data.logradouro || "");
          }
        } catch {}
      }
    };
    fetchCep();
  }, [zipCode, setValue]);

  useEffect(() => {
    const subscription = watch((values) => {
      onDataChange({
        amount: price,
        currency: "brl",
        paymentMethod: "bolbradesco",
        plan: plan,
        cpf: (values.cpf ?? "").replace(/\D/g, ""),
        zip_code: values.zipCode,
        street_name: values.streetName,
        street_number: values.streetNumber,
        neighborhood: values.neighborhood,
        city: values.city,
        federal_unit: values.federalUnit,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, price, plan, onDataChange]);

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="ml-2 font-medium">Importante</AlertTitle>
        <AlertDescription className="text-muted-foreground text-sm">
          O boleto vence em 3 dias úteis. O pedido será confirmado somente após
          o pagamento.
        </AlertDescription>
      </Alert>

      <FormField label="CPF/CNPJ (obrigatório para emissão)">
        <Input
          type="text"
          id="tax-id"
          placeholder="000.000.000-00"
          maxLength={14}
          {...register("cpf", {
            onChange: (e) => {
              let v = e.target.value.replace(/\D/g, "");
              v = v.replace(/(\d{3})(\d)/, "$1.$2");
              v = v.replace(/(\d{3})(\d)/, "$1.$2");
              v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
              e.target.value = v.slice(0, 14);
            },
          })}
        />
        {errors.cpf && (
          <span className="text-xs text-red-500">{errors.cpf.message}</span>
        )}
      </FormField>
      <FormField label="CEP">
        <Input
          type="text"
          placeholder="00000-000"
          maxLength={9}
          {...register("zipCode", {
            onChange: (e) => {
              let v = e.target.value.replace(/\D/g, "");
              if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8);
              e.target.value = v.slice(0, 9);
            },
          })}
        />
        {errors.zipCode && (
          <span className="text-xs text-red-500">{errors.zipCode.message}</span>
        )}
      </FormField>
      <FormField label="Rua">
        <Input
          type="text"
          placeholder="Ex: Praça da Sé"
          {...register("streetName")}
        />
        {errors.streetName && (
          <span className="text-xs text-red-500">
            {errors.streetName.message}
          </span>
        )}
      </FormField>
      <FormField label="Número">
        <Input
          type="text"
          placeholder="Ex: 100"
          {...register("streetNumber")}
        />
        {errors.streetNumber && (
          <span className="text-xs text-red-500">
            {errors.streetNumber.message}
          </span>
        )}
      </FormField>
      <FormField label="Bairro">
        <Input type="text" placeholder="Ex: Sé" {...register("neighborhood")} />
        {errors.neighborhood && (
          <span className="text-xs text-red-500">
            {errors.neighborhood.message}
          </span>
        )}
      </FormField>
      <FormField label="Cidade">
        <Input type="text" placeholder="Ex: São Paulo" {...register("city")} />
        {errors.city && (
          <span className="text-xs text-red-500">{errors.city.message}</span>
        )}
      </FormField>
      <FormField label="UF">
        <select
          className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
          {...register("federalUnit")}
        >
          <option value="">Selecione o estado</option>
          {UF_LIST.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
        {errors.federalUnit && (
          <span className="text-xs text-red-500">
            {errors.federalUnit.message}
          </span>
        )}
      </FormField>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6"
      >
        <Receipt className="text-muted-foreground mb-3 h-16 w-16" />
        <p className="mb-2 text-center font-medium">Boleto Bancário</p>
        <p className="text-muted-foreground mb-4 text-center text-sm">
          O boleto será gerado após a finalização do pedido
        </p>
        <div className="grid w-full max-w-xs grid-cols-2 gap-3 text-center">
          <div className="rounded border p-2">
            <p className="text-muted-foreground text-xs">Vencimento</p>
            <p className="text-sm font-medium">3 dias úteis</p>
          </div>
          <div className="rounded border p-2">
            <p className="text-muted-foreground text-xs">Valor</p>
            <p className="text-sm font-medium">
              R$ {price.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>
        {boletoUrl && (
          <div className="mt-4 text-center">
            <Button asChild className="w-full py-4 text-base" variant="outline">
              <a
                href={boletoUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Visualizar Boleto
              </a>
            </Button>
          </div>
        )}
        {loading && (
          <p className="mt-2 text-sm text-gray-500">Gerando boleto...</p>
        )}
      </motion.div>
    </div>
  );
}
