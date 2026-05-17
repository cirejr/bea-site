import { sql } from "drizzle-orm"
import { pgTable, text, integer, decimal, pgEnum, timestamp, jsonb, boolean, unique, primaryKey } from "drizzle-orm/pg-core"

export const badgeEnum = pgEnum("badge", ["Nouveauté", "Incontournable"])

export const domains = pgTable("domains", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  label: text().notNull(),
  iconName: text(),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const subCategories = pgTable("sub_categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  domainId: integer().notNull().references(() => domains.id, { onDelete: "cascade" }),
  slug: text().notNull().unique(),
  label: text().notNull(),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const modalites = pgTable("modalites", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  label: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const courses = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  domainId: integer().notNull().references(() => domains.id),
  subCategoryId: integer().references(() => subCategories.id),
  title: text().notNull(),
  slug: text().notNull().unique(),
  price: text(),
  rating: text(),
  reviewsCount: integer().default(0),
  duration: text(),
  badge: badgeEnum(),
  href: text(),
  isActive: boolean().default(true).notNull(),
  description: text(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const courseModalities = pgTable("course_modalities", {
  courseId: integer().notNull().references(() => courses.id, { onDelete: "cascade" }),
  modalityId: integer().notNull().references(() => modalites.id),
}, (t) => [
  primaryKey({ columns: [t.courseId, t.modalityId] }),
])

export const certifications = pgTable("certifications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pageSlug: text().notNull().default(""),
  title: text().notNull(),
  description: text(),
  badge: text(),
  audience: text(),
  href: text().default("#"),
  groupKey: text(),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const testimonials = pgTable("testimonials", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  quote: text().notNull(),
  name: text().notNull(),
  role: text(),
  rating: integer().default(5),
  isActive: boolean().default(true).notNull(),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const featuredCourses = pgTable("featured_courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull().unique().references(() => courses.id, { onDelete: "cascade" }),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
})

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
})

export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
})

export const verifications = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})
