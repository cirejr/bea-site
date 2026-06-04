import { config } from "dotenv"
config({ path: ".env.local" })
config({ path: ".env" })

async function main() {
  const { auth } = await import("@/lib/auth")
  const { db } = await import("@/db")
  const { users } = await import("@/db/schema")
  const { eq } = await import("drizzle-orm")

  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@bea.com"
  const password = process.env.SEED_ADMIN_PASSWORD ?? "admin123"
  const name = process.env.SEED_ADMIN_NAME ?? "Admin"

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  if (existing.length > 0) {
    console.log(`User ${email} already exists, skipping.`)
    return
  }

  const result = await auth.api.signUpEmail({ body: { name, email, password } })

  console.log(
    `✓ Admin user created: ${result.user.email} (id: ${result.user.id})`
  )
}

main().catch((e) => {
  console.error("User seed failed:", e)
  process.exit(1)
})
