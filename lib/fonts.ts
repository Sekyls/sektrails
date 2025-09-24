import {
  Bebas_Neue,
  Inter,
  Leckerli_One,
  Dancing_Script,
} from "next/font/google";

export const leckerli = Leckerli_One({
  variable: "--font-leckerli",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
export const dancingScript = Dancing_Script({
  variable: "--font-dancingScript",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const bebasNeue = Bebas_Neue({
  variable: "--font-Bebas-Neue",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
