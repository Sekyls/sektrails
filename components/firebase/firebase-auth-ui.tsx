"use client";
import { useEffect } from "react";
import { auth } from "@/config/firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  PhoneAuthProvider,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function FirebaseAuthUI() {
  const router = useRouter();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInFlow: "popup",
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
        TwitterAuthProvider.PROVIDER_ID,
        PhoneAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (
          userCredential: UserCredential,
          redirectUrl?: string
        ) => {
          console.log("User signed in:", userCredential.user);

          if (redirectUrl) {
            router.replace(redirectUrl);
          } else {
            router.replace("/");
          }
          return false;
        },
      },
    });

    return () => {
      ui.reset();
    };
  }, [router]);

  return <div id="firebaseui-auth-container" />;
}
