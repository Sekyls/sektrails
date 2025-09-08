import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAppLink = (appUrl: string, webUrl: string) => {
  if (
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  ) {
    window.location.href = appUrl;
    setTimeout(() => {
      window.location.href = webUrl;
    }, 500);
  }
};
