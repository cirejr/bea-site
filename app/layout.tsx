import { Inter, Stack_Sans_Text } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const notoSerif = Stack_Sans_Text({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth antialiased">
      <body className={cn(inter.variable, notoSerif.variable, "font-sans")}>
        {children}
      </body>
    </html>
  )
}
