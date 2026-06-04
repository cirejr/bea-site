import localFont from "next/font/local"

export const inter = localFont({
  src: "./fonts/inter/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
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
