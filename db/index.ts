import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local or .env before using database-backed features."
  )
}

const sql = neon(databaseUrl)
export const db = drizzle({ client: sql })
export const getDb = () => db

export * from "./schema"
