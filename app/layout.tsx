import type { Metadata } from "next";
import {
  Bebas_Neue,
  Inter,
  Leckerli_One,
  Dancing_Script,
} from "next/font/google";
import "@/styles/globals.css";
import "firebaseui/dist/firebaseui.css";
import TanstackQueryProvider from "@/providers/tanstack-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { FirebaseAuthProvider } from "@/providers/firebase-auth-provider";
import { Toaster } from "@/components/ui/sonner";

const leckerli = Leckerli_One({
  variable: "--font-leckerli",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
const dancingScript = Dancing_Script({
  variable: "--font-dancingScript",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
const bebasNeue = Bebas_Neue({
  variable: "--font-Bebas-Neue",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sektrails",
  description: "Movie Preview App",
  applicationName: "Sektrails",
  authors: [
    {
      name: "Dennis Sekyi Opoku",
      url: "/",
    },
  ],
  alternates: {
    canonical: "/",
  },
  category: "Movies Preview",
  creator: "Dennis Sekyi Opoku",
  publisher: "Dennis Sekyi Opoku",
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicons/apple-touch-icon",
    shortcut: "/favicons/favicon.ico",
  },
  keywords: [
    "Movies",
    "TV Shows",
    "Series",
    "Action",
    "adventure",
    "trailer",
    "preview",
    "cast",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Sektrails",
    description: "Movie Preview App",
    siteName: "Sektrails",
    locale: "en_GB",
    emails: ["denipsyp@gmail.com"],
    phoneNumbers: ["+233203558362"],
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "Sektrails",
    creator: "Dennis Sekyi Opoku",
    title: "Sektrails",
    description: "Movie Preview App",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
