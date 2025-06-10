import { format } from "date-fns";

export function getDataFormatada(): string {
  const agora = new Date();
  return format(agora, "dd/MM/yyyy");
}
