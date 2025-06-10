import { z } from "zod";

export const resetSchema = z.object({
  numeroSerie: z
    .number({
      required_error: "Número de série é obrigatório",
      invalid_type_error: "Deve ser um número",
    })
    .int()
    .gte(100000, "O número de série deve ter 6 dígitos")
    .lte(999999, "O número de série deve ter 6 dígitos"),
});

export type RegisterVaseValues = z.infer<typeof resetSchema>;
