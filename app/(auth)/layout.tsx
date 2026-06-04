import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { cn } from "@/lib/utils"
import { inter, stackSans } from "@/app/fonts"
import "../globals.css"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session) redirect("/dashboard")

  return (
    <div className={cn(inter.variable, stackSans.variable, "font-sans")}>
      {children}
    </div>
  )
}
