import "server-only"

import { cookies, headers } from "next/headers"
import { cache } from "react"
import { redirect } from "next/navigation"
import { auth } from "./auth"
import { db, users } from "@/db"
import { eq } from "drizzle-orm"

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user.id) {
    redirect("/login")
  }

  return { isAuth: true, userId: session.user.id }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  try {
    const data = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
    }).from(users).where(eq(users.id, session.userId))

    const user = data[0]
    return user
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})
