import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Inter, Stack_Sans_Text } from "next/font/google"
import { cn } from "@/lib/utils"
import "../globals.css"

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

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session) redirect("/dashboard")

  return (
    <div className={cn(inter.variable, notoSerif.variable, "font-sans")}>
      {children}
    </div>
  )
}
