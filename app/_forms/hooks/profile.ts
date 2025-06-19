import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { profileFormSchema } from "../schemas/profile";
import { z } from "zod";

type ProfileFormData = z.infer<typeof profileFormSchema>;

export const useLoginForm = () => {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
};
