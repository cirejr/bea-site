import { and, asc, eq, ilike, inArray } from "drizzle-orm"
import { db } from "@/db"
import {
  certifications,
  courses,
  domains,
  faqs,
  featuredFormations,
  formationCertifications,
  formationModalities,
  formations,
  modalites,
  pdfResources,
  subCategories,
  testimonials,
} from "@/db/schema"

export type Domain = typeof domains.$inferSelect
export type SubCategory = typeof subCategories.$inferSelect
export type Modality = typeof modalites.$inferSelect
export type Formation = typeof formations.$inferSelect
export type Course = typeof courses.$inferSelect
export type Certification = typeof certifications.$inferSelect
export type Testimonial = typeof testimonials.$inferSelect
export type FeaturedFormation = typeof featuredFormations.$inferSelect
export type Faq = typeof faqs.$inferSelect
export type PdfResource = typeof pdfResources.$inferSelect

export interface FormationWithRelations extends Formation {
  domain: Domain
  subCategory: SubCategory | null
  modalities: Modality[]
  courses?: Course[]
  certifications?: Certification[]
  faqs?: Faq[]
  pdfResources?: PdfResource[]
}

export interface CourseWithRelations extends Course {
  formation: Formation
}

export interface FormationFilters {
  domainSlug?: string
  subCategorySlug?: string
  modalitySlug?: string
  badge?: string
  searchQuery?: string
  activeOnly?: boolean
}

// Domains
export async function getDomains(options?: { activeOnly?: boolean }) {
  const conditions = []
  if (options?.activeOnly) conditions.push(eq(domains.isActive, true))
  return db
    .select()
    .from(domains)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(domains.sortOrder), asc(domains.id))
}

export async function getDomainBySlug(slug: string) {
  const rows = await db.select().from(domains).where(eq(domains.slug, slug)).limit(1)
  return rows[0] ?? null
}

export async function getDomainsWithSubCategories(options?: { activeOnly?: boolean }) {
  const conditions = []
  if (options?.activeOnly) conditions.push(eq(domains.isActive, true))

  const rows = await db
    .select()
    .from(domains)
    .leftJoin(subCategories, eq(subCategories.domainId, domains.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(domains.sortOrder), asc(subCategories.sortOrder), asc(domains.id))

  const map = new Map<number, Domain & { subCategories: SubCategory[] }>()
  for (const row of rows) {
    const domain = row.domains
    if (!map.has(domain.id)) map.set(domain.id, { ...domain, subCategories: [] })
    if (row.sub_categories && (!options?.activeOnly || row.sub_categories.isActive)) {
      map.get(domain.id)!.subCategories.push(row.sub_categories)
    }
  }
  return Array.from(map.values())
}

export const getTrainingNavigation = () => getDomainsWithSubCategories({ activeOnly: true })

// Sub-categories
export async function getSubCategories(domainId?: number, options?: { activeOnly?: boolean }) {
  const conditions = []
  if (domainId) conditions.push(eq(subCategories.domainId, domainId))
  if (options?.activeOnly) conditions.push(eq(subCategories.isActive, true))
  return db
    .select()
    .from(subCategories)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(subCategories.sortOrder), asc(subCategories.id))
}

// Modalities
export async function getModalities() {
  return db.select().from(modalites).orderBy(asc(modalites.id))
}

async function attachFormationRelations(
  formationList: Formation[],
  options?: { includeCourses?: boolean; includeCertifications?: boolean; includeFaqs?: boolean; includePdfs?: boolean },
): Promise<FormationWithRelations[]> {
  if (formationList.length === 0) return []

  const ids = formationList.map((formation) => formation.id)
  const [modRows, domainRows, subRows] = await Promise.all([
    db
      .select()
      .from(formationModalities)
      .innerJoin(modalites, eq(formationModalities.modalityId, modalites.id))
      .where(inArray(formationModalities.formationId, ids)),
    db.select().from(domains),
    db.select().from(subCategories),
  ])

  const modalityMap = new Map<number, Modality[]>()
  for (const row of modRows) {
    if (!modalityMap.has(row.formation_modalities.formationId)) {
      modalityMap.set(row.formation_modalities.formationId, [])
    }
    modalityMap.get(row.formation_modalities.formationId)!.push(row.modalites)
  }

  const courseMap = new Map<number, Course[]>()
  if (options?.includeCourses) {
    const childCourses = await db
      .select()
      .from(courses)
      .where(and(inArray(courses.formationId, ids), eq(courses.isActive, true)))
      .orderBy(asc(courses.sortOrder), asc(courses.id))
    for (const course of childCourses) {
      if (!courseMap.has(course.formationId)) courseMap.set(course.formationId, [])
      courseMap.get(course.formationId)!.push(course)
    }
  }

  const certMap = new Map<number, Certification[]>()
  if (options?.includeCertifications) {
    const certRows = await db
      .select()
      .from(formationCertifications)
      .innerJoin(certifications, eq(formationCertifications.certificationId, certifications.id))
      .where(inArray(formationCertifications.formationId, ids))
      .orderBy(asc(certifications.sortOrder), asc(certifications.id))
    for (const row of certRows) {
      if (!row.certifications.isActive) continue
      if (!certMap.has(row.formation_certifications.formationId)) certMap.set(row.formation_certifications.formationId, [])
      certMap.get(row.formation_certifications.formationId)!.push(row.certifications)
    }
  }

  const faqMap = new Map<number, Faq[]>()
  if (options?.includeFaqs) {
    const faqRows = await db
      .select()
      .from(faqs)
      .where(and(inArray(faqs.formationId, ids), eq(faqs.isActive, true)))
      .orderBy(asc(faqs.sortOrder), asc(faqs.id))
    for (const faq of faqRows) {
      if (!faq.formationId) continue
      if (!faqMap.has(faq.formationId)) faqMap.set(faq.formationId, [])
      faqMap.get(faq.formationId)!.push(faq)
    }
  }

  const pdfMap = new Map<number, PdfResource[]>()
  if (options?.includePdfs) {
    const pdfRows = await db
      .select()
      .from(pdfResources)
      .where(and(inArray(pdfResources.formationId, ids), eq(pdfResources.isActive, true)))
      .orderBy(asc(pdfResources.sortOrder), asc(pdfResources.id))
    for (const pdf of pdfRows) {
      if (!pdf.formationId) continue
      if (!pdfMap.has(pdf.formationId)) pdfMap.set(pdf.formationId, [])
      pdfMap.get(pdf.formationId)!.push(pdf)
    }
  }

  const domainMap = new Map(domainRows.map((domain) => [domain.id, domain]))
  const subCategoryMap = new Map(subRows.map((subCategory) => [subCategory.id, subCategory]))

  return formationList.map((formation) => ({
    ...formation,
    domain: domainMap.get(formation.domainId)!,
    subCategory: formation.subCategoryId ? (subCategoryMap.get(formation.subCategoryId) ?? null) : null,
    modalities: modalityMap.get(formation.id) ?? [],
    courses: options?.includeCourses ? (courseMap.get(formation.id) ?? []) : undefined,
    certifications: options?.includeCertifications ? (certMap.get(formation.id) ?? []) : undefined,
    faqs: options?.includeFaqs ? (faqMap.get(formation.id) ?? []) : undefined,
    pdfResources: options?.includePdfs ? (pdfMap.get(formation.id) ?? []) : undefined,
  }))
}

// Formations
export async function getFormations(filters?: FormationFilters) {
  const conditions = []
  if (filters?.activeOnly !== false) conditions.push(eq(formations.isActive, true))
  if (filters?.domainSlug) {
    const domain = await getDomainBySlug(filters.domainSlug)
    if (!domain) return []
    conditions.push(eq(formations.domainId, domain.id))
  }
  if (filters?.subCategorySlug) {
    const sub = await db.select().from(subCategories).where(eq(subCategories.slug, filters.subCategorySlug)).limit(1)
    if (!sub[0]) return []
    conditions.push(eq(formations.subCategoryId, sub[0].id))
  }
  if (filters?.badge) conditions.push(eq(formations.badge, filters.badge as any))
  if (filters?.searchQuery) conditions.push(ilike(formations.title, `%${filters.searchQuery}%`))

  const rows = await db
    .select()
    .from(formations)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(formations.sortOrder), asc(formations.id))

  const result = await attachFormationRelations(rows)
  if (filters?.modalitySlug) {
    return result.filter((formation) => formation.modalities.some((modality) => modality.slug === filters.modalitySlug))
  }
  return result
}

export async function getFormation(id: number) {
  const rows = await db.select().from(formations).where(eq(formations.id, id)).limit(1)
  if (!rows[0]) return null
  const enhanced = await attachFormationRelations([rows[0]], {
    includeCourses: true,
    includeCertifications: true,
    includeFaqs: true,
    includePdfs: true,
  })
  return enhanced[0]
}

export async function getFormationBySlug(slug: string) {
  const rows = await db.select().from(formations).where(eq(formations.slug, slug)).limit(1)
  if (!rows[0]) return null
  const enhanced = await attachFormationRelations([rows[0]], {
    includeCourses: true,
    includeCertifications: true,
    includeFaqs: true,
    includePdfs: true,
  })
  return enhanced[0]
}

export async function getRelatedFormations(formation: Formation, limit = 3) {
  const rows = await getFormations({ domainSlug: undefined })
  return rows
    .filter((item) => item.id !== formation.id && item.domainId === formation.domainId)
    .slice(0, limit)
}

// Child courses
export async function getCourses(formationId?: number, options?: { activeOnly?: boolean }) {
  const conditions = []
  if (formationId) conditions.push(eq(courses.formationId, formationId))
  if (options?.activeOnly) conditions.push(eq(courses.isActive, true))
  return db
    .select()
    .from(courses)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(courses.sortOrder), asc(courses.id))
}

export async function getCourse(id: number) {
  const rows = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
  return rows[0] ?? null
}

// Certifications
export async function getCertifications(pageSlug?: string, options?: { activeOnly?: boolean }) {
  const conditions = []
  if (pageSlug) conditions.push(eq(certifications.pageSlug, pageSlug))
  if (options?.activeOnly) conditions.push(eq(certifications.isActive, true))
  return db
    .select()
    .from(certifications)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(certifications.groupKey), asc(certifications.sortOrder), asc(certifications.id))
}

export async function getCertification(id: number) {
  const rows = await db.select().from(certifications).where(eq(certifications.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getFormationCertificationIds(formationId: number) {
  const rows = await db
    .select()
    .from(formationCertifications)
    .where(eq(formationCertifications.formationId, formationId))
  return rows.map((row) => row.certificationId)
}

// FAQs and PDFs
export async function getFaqs(filters?: { formationId?: number; domainId?: number; subCategoryId?: number; courseId?: number; certificationId?: number; activeOnly?: boolean }) {
  const conditions = []
  if (filters?.formationId) conditions.push(eq(faqs.formationId, filters.formationId))
  if (filters?.domainId) conditions.push(eq(faqs.domainId, filters.domainId))
  if (filters?.subCategoryId) conditions.push(eq(faqs.subCategoryId, filters.subCategoryId))
  if (filters?.courseId) conditions.push(eq(faqs.courseId, filters.courseId))
  if (filters?.certificationId) conditions.push(eq(faqs.certificationId, filters.certificationId))
  if (filters?.activeOnly) conditions.push(eq(faqs.isActive, true))
  return db.select().from(faqs).where(conditions.length ? and(...conditions) : undefined).orderBy(asc(faqs.sortOrder), asc(faqs.id))
}

export async function getPdfResources(filters?: { formationId?: number; domainId?: number; subCategoryId?: number; courseId?: number; certificationId?: number; activeOnly?: boolean }) {
  const conditions = []
  if (filters?.formationId) conditions.push(eq(pdfResources.formationId, filters.formationId))
  if (filters?.domainId) conditions.push(eq(pdfResources.domainId, filters.domainId))
  if (filters?.subCategoryId) conditions.push(eq(pdfResources.subCategoryId, filters.subCategoryId))
  if (filters?.courseId) conditions.push(eq(pdfResources.courseId, filters.courseId))
  if (filters?.certificationId) conditions.push(eq(pdfResources.certificationId, filters.certificationId))
  if (filters?.activeOnly) conditions.push(eq(pdfResources.isActive, true))
  return db.select().from(pdfResources).where(conditions.length ? and(...conditions) : undefined).orderBy(asc(pdfResources.sortOrder), asc(pdfResources.id))
}

// Testimonials
export async function getTestimonials() {
  return db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(asc(testimonials.sortOrder))
}

// Featured formations
export async function getFeaturedFormations() {
  const rows = await db
    .select()
    .from(featuredFormations)
    .innerJoin(formations, eq(featuredFormations.formationId, formations.id))
    .orderBy(asc(featuredFormations.sortOrder))

  const formationList = rows.map((row) => row.formations).filter((formation) => formation.isActive)
  const enhanced = await attachFormationRelations(formationList)

  return rows
    .map((row, index) => ({ ...row.featured_formations, formation: enhanced[index] }))
    .filter((item) => Boolean(item.formation))
}

// Dashboard stats
export async function getDashboardStats() {
  const [formationCount, courseCount, domainCount, testimonialCount, certCount] = await Promise.all([
    db.$count(formations, eq(formations.isActive, true)),
    db.$count(courses, eq(courses.isActive, true)),
    db.$count(domains),
    db.$count(testimonials, eq(testimonials.isActive, true)),
    db.$count(certifications),
  ])
  return { formationCount, courseCount, domainCount, testimonialCount, certCount }
}
