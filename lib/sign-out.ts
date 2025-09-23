"use client";

import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "./utils";

export async function logOut() {
  toast.promise(signOut(auth), {
    loading: "Signing out...",
    success: () => ({
      message: "You have been signed out",
      action: {
        label: "Success!",
        onClick: () => {},
      },
      classNames: { actionButton: "bg-green-700! text-white!" },
    }),
    error: (error: FirebaseError) => {
      const errorMessage = getFriendlyErrorMessage(error.code);
      return {
        message: errorMessage,
        description: "Sign-out unsuccessful",
        action: {
          label: "Failed!",
          onClick: () => {},
        },
        classNames: { actionButton: "bg-red-700! text-white!" },
      };
    },
  });
}
