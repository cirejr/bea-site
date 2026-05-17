import { redirect } from "next/navigation"
import { getAuth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuth().api.getSession({ headers: await headers() })
  if (session) redirect("/dashboard")

  return <>{children}</>
}
