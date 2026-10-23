import { formatarMoeda as fmt } from "./config";

export function formatarMoeda(valor: number): string {
  return fmt(valor);
}
