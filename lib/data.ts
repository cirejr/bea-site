import { eq, asc, ilike, and } from "drizzle-orm"
import { db } from "@/db"
import {
  domains,
  subCategories,
  modalites,
  courses,
  courseModalities,
  certifications,
  testimonials,
  featuredCourses,
} from "@/db/schema"

export type Domain = typeof domains.$inferSelect
export type SubCategory = typeof subCategories.$inferSelect
export type Modality = typeof modalites.$inferSelect
export type Course = typeof courses.$inferSelect
export type Certification = typeof certifications.$inferSelect
export type Testimonial = typeof testimonials.$inferSelect
export type FeaturedCourse = typeof featuredCourses.$inferSelect

export interface CourseWithRelations extends Course {
  domain: Domain
  subCategory: SubCategory | null
  modalities: Modality[]
}

// ── Domains ──

export async function getDomains() {
  return db.select().from(domains).orderBy(asc(domains.sortOrder))
}

export async function getDomainBySlug(slug: string) {
  const rows = await db
    .select()
    .from(domains)
    .where(eq(domains.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function getDomainsWithSubCategories() {
  const rows = await db
    .select()
    .from(domains)
    .leftJoin(subCategories, eq(subCategories.domainId, domains.id))
    .orderBy(asc(domains.sortOrder), asc(subCategories.sortOrder))

  const map = new Map<number, Domain & { subCategories: SubCategory[] }>()
  for (const row of rows) {
    const d = row.domains
    if (!map.has(d.id)) {
      map.set(d.id, { ...d, subCategories: [] })
    }
    if (row.sub_categories) {
      map.get(d.id)!.subCategories.push(row.sub_categories)
    }
  }
  return Array.from(map.values())
}

// ── Sub-categories ──

export async function getSubCategories(domainId: number) {
  return db
    .select()
    .from(subCategories)
    .where(eq(subCategories.domainId, domainId))
    .orderBy(asc(subCategories.sortOrder))
}

// ── Modalities ──

export async function getModalities() {
  return db.select().from(modalites).orderBy(asc(modalites.id))
}

// ── Courses ──

export interface CourseFilters {
  domainSlug?: string
  subCategorySlug?: string
  modalitySlug?: string
  badge?: string
  searchQuery?: string
}

async function attachModalities(
  courseList: Course[]
): Promise<CourseWithRelations[]> {
  if (courseList.length === 0) return []

  const ids = courseList.map((c) => c.id)
  const modRows = await db
    .select()
    .from(courseModalities)
    .innerJoin(modalites, eq(courseModalities.modalityId, modalites.id))
    .where(ids.length === 1 ? eq(courseModalities.courseId, ids[0]) : undefined)

  const modMap = new Map<number, Modality[]>()
  for (const row of modRows) {
    if (!modMap.has(row.course_modalities.courseId)) {
      modMap.set(row.course_modalities.courseId, [])
    }
    modMap.get(row.course_modalities.courseId)!.push(row.modalites)
  }

  const domainRows = await db.select().from(domains)
  const domainMap = new Map(domainRows.map((d) => [d.id, d]))

  const subRows = await db.select().from(subCategories)
  const subMap = new Map(subRows.map((s) => [s.id, s]))

  return courseList.map((c) => ({
    ...c,
    domain: domainMap.get(c.domainId)!,
    subCategory: c.subCategoryId ? (subMap.get(c.subCategoryId) ?? null) : null,
    modalities: modMap.get(c.id) ?? [],
  }))
}

export async function getCourses(filters?: CourseFilters) {
  const conditions = []
  if (filters?.domainSlug) {
    const domain = await getDomainBySlug(filters.domainSlug)
    if (domain) conditions.push(eq(courses.domainId, domain.id))
  }
  if (filters?.subCategorySlug) {
    const sub = await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.slug, filters.subCategorySlug))
      .limit(1)
    if (sub[0]) conditions.push(eq(courses.subCategoryId, sub[0].id))
  }
  if (filters?.badge) {
    conditions.push(eq(courses.badge, filters.badge))
  }
  if (filters?.searchQuery) {
    conditions.push(ilike(courses.title, `%${filters.searchQuery}%`))
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined
  const rows = await db
    .select()
    .from(courses)
    .where(whereClause)
    .orderBy(asc(courses.id))

  const result = await attachModalities(rows)

  if (filters?.modalitySlug) {
    return result.filter((c) =>
      c.modalities.some((m) => m.slug === filters.modalitySlug)
    )
  }

  return result
}

export async function getCourseBySlug(slug: string) {
  const rows = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1)
  if (!rows[0]) return null
  const enhanced = await attachModalities([rows[0]])
  return enhanced[0]
}

// ── Certifications ──

export async function getCertifications(pageSlug?: string) {
  const conditions = []
  if (pageSlug) conditions.push(eq(certifications.pageSlug, pageSlug))
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined
  return db
    .select()
    .from(certifications)
    .where(whereClause)
    .orderBy(asc(certifications.sortOrder))
}

export async function getCertification(id: number) {
  const rows = await db
    .select()
    .from(certifications)
    .where(eq(certifications.id, id))
    .limit(1)
  return rows[0] ?? null
}

// ── Testimonials ──

export async function getTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(asc(testimonials.sortOrder))
}

// ── Featured courses ──

export async function getFeaturecourses() {
  const rows = await db
    .select()
    .from(featuredCourses)
    .innerJoin(courses, eq(featuredCourses.courseId, courses.id))
    .orderBy(asc(featuredCourses.sortOrder))

  const courseList = rows.map((r) => r.courses)
  const enhanced = await attachModalities(courseList)

  const result: (FeaturedCourse & { course: CourseWithRelations })[] = []
  for (let i = 0; i < rows.length; i++) {
    result.push({ ...rows[i].featured_courses, course: enhanced[i] })
  }
  return result
}

// ── Stats for dashboard ──

export async function getDashboardStats() {
  const [courseCount, domainCount, testimonialCount, certCount] =
    await Promise.all([
      db.$count(courses, eq(courses.isActive, true)),
      db.$count(domains),
      db.$count(testimonials, eq(testimonials.isActive, true)),
      db.$count(certifications),
    ])
  return { courseCount, domainCount, testimonialCount, certCount }
}
