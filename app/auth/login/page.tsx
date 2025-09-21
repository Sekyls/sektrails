"use client";
import dynamic from "next/dynamic";
import React from "react";

const FirebaseAuthUI = dynamic(
  () => import("@/components/firebase/firebase-auth-ui"),
  { ssr: false }
);

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
