"use client";
import { auth } from "@/config/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
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
  const uiConfig = {
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
      ): boolean => {
        console.log("User signed in:", userCredential.user);
        if (redirectUrl) {
          router.replace(redirectUrl);
        } else {
          router.replace("/");
        }
        return false;
      },
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
}
