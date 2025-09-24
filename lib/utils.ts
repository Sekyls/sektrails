import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ToastOptions } from "@/lib/types";
import { toast } from "sonner";

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

export function useToast<T>(
  promise: Promise<T>,
  { loading, success, error }: ToastOptions<T>
) {
  return toast.promise(promise, {
    loading: loading ?? "Loading...",
    success: (result) => ({
      message:
        typeof success === "function" ? success(result) : success ?? "Success",
      action: {
        label: "Success!",
        onClick: () => {},
      },
      classNames: { actionButton: "bg-green-700! text-white!" },
    }),
    error: (err: Error) => ({
      message: err.message,

      description:
        typeof error === "function"
          ? error(err)
          : error ?? "Something went wrong",
      action: {
        label: "Failed!",
        onClick: () => {},
      },
      classNames: { actionButton: "bg-red-700! text-white!" },
    }),
  });
}
