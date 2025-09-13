import FirebaseAuthUI from "@/components/firebase/firebase-auth-ui";
import React from "react";

export default function AuthenticationPage() {
  return (
    <section className="grid grid-cols-2 h-screen overflow-hidden justify-center">
      <div className="flex items-center justify-center bg-primary">
        <span className="font-leckerli text-[13rem] -rotate-12">Sektrails</span>
      </div>
      <div className="flex items-center justify-center scale-150">
        <FirebaseAuthUI />
      </div>
    </section>
  );
}
