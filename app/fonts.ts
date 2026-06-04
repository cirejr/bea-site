import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const stackSans = localFont({
  src: [
    {
      path: "./fonts/stack-sans/StackSansText-LatinExt.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "./fonts/stack-sans/StackSansText-Latin.woff2",
      weight: "200 700",
      style: "normal",
    },
  ],
  variable: "--font-stack-sans",
  display: "swap",
})
