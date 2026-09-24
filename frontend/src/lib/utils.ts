import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui class helper — used by the admin console and landing components only. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
