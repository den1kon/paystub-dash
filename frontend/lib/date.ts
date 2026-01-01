import { format } from "date-fns";

export function formatDateForUI(date: Date) {
  return format(date, "dd/MM/yyyy");
}