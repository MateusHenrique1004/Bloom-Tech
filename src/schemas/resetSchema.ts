import { z } from "zod";

export const resetSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

export type ResetFormValues = z.infer<typeof resetSchema>;

