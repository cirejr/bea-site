import { sql } from "drizzle-orm"
import { pgTable, text, integer, pgEnum, timestamp, boolean, primaryKey, uniqueIndex } from "drizzle-orm/pg-core"

export const resourceTypeEnum = pgEnum("resource_type", ["brochure", "program", "guide", "certificate", "other"])

export const domains = pgTable("domains", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  label: text().notNull(),
  description: text(),
  isActive: boolean().default(true).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const subCategories = pgTable("sub_categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  domainId: integer().notNull().references(() => domains.id, { onDelete: "cascade" }),
  slug: text().notNull().unique(),
  label: text().notNull(),
  description: text(),
  isActive: boolean().default(true).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const modalites = pgTable("modalites", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  label: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const formations = pgTable("formations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  domainId: integer().notNull().references(() => domains.id, { onDelete: "restrict" }),
  subCategoryId: integer().references(() => subCategories.id),
  title: text().notNull(),
  slug: text().notNull().unique(),
  summary: text(),
  description: text(),
  objectifs: text().array().default(sql`'{}'::text[]`).notNull(),
  programmes: text(),
  pourQui: text(),
  financement: text(),
  price: text(),
  salePrice: text(),
  currency: text().default("EUR"),
  taxLabel: text().default("HT"),
  priceVisible: boolean().default(true).notNull(),
  rating: text(),
  reviewsCount: integer().default(0),
  duration: text(),
  href: text(),
  isActive: boolean().default(true).notNull(),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const formationModalities = pgTable("formation_modalities", {
  formationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
  modalityId: integer().notNull().references(() => modalites.id),
}, (t) => [
  primaryKey({ columns: [t.formationId, t.modalityId] }),
])

export const badges = pgTable("badges", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  slug: text().notNull().unique(),
  color: text().notNull().default("#3b82f6"),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const formationBadges = pgTable("formation_badges", {
  formationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
  badgeId: integer().notNull().references(() => badges.id, { onDelete: "cascade" }),
}, (t) => [
  primaryKey({ columns: [t.formationId, t.badgeId] }),
])

export const formationsComplementaires = pgTable("formations_complementaires", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  formationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
  complementaryFormationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
}, (t) => ({
  uniquePair: uniqueIndex().on(t.formationId, t.complementaryFormationId),
}))

export const formationsRelated = pgTable("formations_related", {
  formationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
  relatedFormationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
  sortOrder: integer().default(0).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.formationId, t.relatedFormationId] }),
}))

export const avis = pgTable("avis", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  formationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
  name: text().notNull(),
  rating: integer().notNull(),
  comment: text(),
  isActive: boolean().default(true).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const certifications = pgTable("certifications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pageSlug: text().notNull().default(""),
  title: text().notNull(),
  description: text(),
  badge: text(),
  audience: text(),
  href: text().default("#"),
  groupKey: text(),
  isActive: boolean().default(true).notNull(),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const formationCertifications = pgTable("formation_certifications", {
  formationId: integer().notNull().references(() => formations.id, { onDelete: "cascade" }),
  certificationId: integer().notNull().references(() => certifications.id, { onDelete: "cascade" }),
}, (t) => [
  primaryKey({ columns: [t.formationId, t.certificationId] }),
])

export const faqs = pgTable("faqs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  question: text().notNull(),
  answer: text().notNull(),
  domainId: integer().references(() => domains.id, { onDelete: "cascade" }),
  subCategoryId: integer().references(() => subCategories.id, { onDelete: "cascade" }),
  formationId: integer().references(() => formations.id, { onDelete: "cascade" }),
  certificationId: integer().references(() => certifications.id, { onDelete: "cascade" }),
  isActive: boolean().default(true).notNull(),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
  updatedAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})

export const pdfResources = pgTable("pdf_resources", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text(),
  url: text().notNull(),
  resourceType: resourceTypeEnum().default("other").notNull(),
  domainId: integer().references(() => domains.id, { onDelete: "cascade" }),
  subCategoryId: integer().references(() => subCategories.id, { onDelete: "cascade" }),
  formationId: integer().references(() => formations.id, { onDelete: "cascade" }),
  certificationId: integer().references(() => certifications.id, { onDelete: "cascade" }),
  isActive: boolean().default(true).notNull(),
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

export const featuredFormations = pgTable("featured_formations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  formationId: integer().notNull().unique().references(() => formations.id, { onDelete: "cascade" }),
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

export const catalogueRequests = pgTable("catalogue_requests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull(),
  phone: text(),
  company: text().notNull(),
  role: text().notNull(),
  roleOther: text(),
  catalogueSlugs: text().array().default(sql`'{}'::text[]`).notNull(),
  locale: text().default("fr").notNull(),
  createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
})
