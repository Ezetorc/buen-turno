import { z } from "zod";

export const BusinessStepSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(40),
  email: z.email({ error: "Email inválido" }).min(1, "El email es obligatorio").max(100),
  phone: z.string().min(1, "El teléfono es obligatorio").max(40),
  description: z.string().min(1, "La descripción es obligatoria").max(255),
  country: z.string().min(1, "El país es obligatorio").max(40),
  address: z.string().min(1, "La dirección es obligatoria").max(255),
});

export type BusinessStepInput = z.infer<typeof BusinessStepSchema>;
