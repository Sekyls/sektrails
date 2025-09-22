"use client";
import Animation from "@/components/animation";
import dynamic from "next/dynamic";
import React from "react";

const FirebaseAuthUI = dynamic(
  () => import("@/components/firebase/firebase-auth-ui"),
  { ssr: false }
);

export default function AuthenticationPage() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 h-screen overflow-hidden">
      <div className="bg-white flex justify-center items-center">
        <Animation />
      </div>
      <div className="flex items-center justify-center bg-primary/90">
        <FirebaseAuthUI />
      </div>
    </section>
  );
}
