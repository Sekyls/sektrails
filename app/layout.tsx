import type { Metadata } from "next";
import "@/styles/globals.css";
import "firebaseui/dist/firebaseui.css";
import TanstackQueryProvider from "@/providers/tanstack-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { FirebaseAuthProvider } from "@/providers/firebase-auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { appMetaData } from "@/lib/metadata";
import { bebasNeue, dancingScript, inter, leckerli } from "@/lib/fonts";

export const metadata: Metadata = appMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} ${bebasNeue.variable} ${leckerli.variable} ${dancingScript.variable}  antialiased overflow-x-hidden scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseAuthProvider>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </FirebaseAuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
