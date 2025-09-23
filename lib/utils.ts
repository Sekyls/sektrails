import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFriendlyErrorMessage(code: string) {
  switch (code) {
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";
    case "auth/internal-error":
      return "Unexpected error. Try again later.";
    default:
      return "Sign-out failed. Please try again.";
  }
}
