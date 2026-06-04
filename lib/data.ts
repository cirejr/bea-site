import { and, asc, desc, eq, ilike, inArray, or } from "drizzle-orm"
import { db } from "@/db"
import {
  avis,
  badges,
  catalogueRequests,
  certifications,
  domains,
  faqs,
  featuredFormations,
  formationBadges,
  formationCertifications,
  formationModalities,
  formations,
  formationsComplementaires,
  formationsRelated,
  modalites,
  pdfResources,
  subCategories,
  testimonials,
} from "@/db/schema"

export type Domain = typeof domains.$inferSelect
export type SubCategory = typeof subCategories.$inferSelect
export type Modality = typeof modalites.$inferSelect
export type Formation = typeof formations.$inferSelect
export type Certification = typeof certifications.$inferSelect
export type Testimonial = typeof testimonials.$inferSelect
export type FeaturedFormation = typeof featuredFormations.$inferSelect
export type Faq = typeof faqs.$inferSelect
export type PdfResource = typeof pdfResources.$inferSelect
export type Badge = typeof badges.$inferSelect
export type Avi = typeof avis.$inferSelect
export type CatalogueRequest = typeof catalogueRequests.$inferSelect

export interface FormationWithRelations extends Formation {
  domain: Domain
  subCategory: SubCategory | null
  modalities: Modality[]
  certifications?: Certification[]
  faqs?: Faq[]
  pdfResources?: PdfResource[]
  badges?: Badge[]
}

export interface FormationFilters {
  domainSlug?: string
  subCategorySlug?: string
  modalitySlug?: string
  badgeSlug?: string
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
    .orderBy(asc(domains.id))
}

export async function getDomainBySlug(slug: string) {
  const rows = await db
    .select()
    .from(domains)
    .where(eq(domains.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function getDomainsWithSubCategories(options?: {
  activeOnly?: boolean
}) {
  const conditions = []
  if (options?.activeOnly) conditions.push(eq(domains.isActive, true))

  const rows = await db
    .select()
    .from(domains)
    .leftJoin(subCategories, eq(subCategories.domainId, domains.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(domains.id), asc(subCategories.id))

  const map = new Map<number, Domain & { subCategories: SubCategory[] }>()
  for (const row of rows) {
    const domain = row.domains
    if (!map.has(domain.id))
      map.set(domain.id, { ...domain, subCategories: [] })
    if (
      row.sub_categories &&
      (!options?.activeOnly || row.sub_categories.isActive)
    ) {
      map.get(domain.id)!.subCategories.push(row.sub_categories)
    }
  }
  return Array.from(map.values())
}

export const getTrainingNavigation = () =>
  getDomainsWithSubCategories({ activeOnly: true })

// Sub-categories
export async function getSubCategories(
  domainId?: number,
  options?: { activeOnly?: boolean }
) {
  const conditions = []
  if (domainId) conditions.push(eq(subCategories.domainId, domainId))
  if (options?.activeOnly) conditions.push(eq(subCategories.isActive, true))
  return db
    .select()
    .from(subCategories)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(subCategories.id))
}

export async function getSubCategoryBySlug(slug: string) {
  const rows = await db
    .select()
    .from(subCategories)
    .where(eq(subCategories.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

// Modalities
export async function getModalities() {
  return db.select().from(modalites).orderBy(asc(modalites.id))
}

async function attachFormationRelations(
  formationList: Formation[],
  options?: {
    includeCertifications?: boolean
    includeFaqs?: boolean
    includePdfs?: boolean
  }
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

  const certMap = new Map<number, Certification[]>()
  if (options?.includeCertifications) {
    const certRows = await db
      .select()
      .from(formationCertifications)
      .innerJoin(
        certifications,
        eq(formationCertifications.certificationId, certifications.id)
      )
      .where(inArray(formationCertifications.formationId, ids))
      .orderBy(asc(certifications.sortOrder), asc(certifications.id))
    for (const row of certRows) {
      if (!row.certifications.isActive) continue
      if (!certMap.has(row.formation_certifications.formationId))
        certMap.set(row.formation_certifications.formationId, [])
      certMap
        .get(row.formation_certifications.formationId)!
        .push(row.certifications)
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
      .where(
        and(
          inArray(pdfResources.formationId, ids),
          eq(pdfResources.isActive, true)
        )
      )
      .orderBy(asc(pdfResources.sortOrder), asc(pdfResources.id))
    for (const pdf of pdfRows) {
      if (!pdf.formationId) continue
      if (!pdfMap.has(pdf.formationId)) pdfMap.set(pdf.formationId, [])
      pdfMap.get(pdf.formationId)!.push(pdf)
    }
  }

  const badgeRows = await db
    .select()
    .from(formationBadges)
    .innerJoin(badges, eq(formationBadges.badgeId, badges.id))
    .where(inArray(formationBadges.formationId, ids))

  const badgeMap = new Map<number, Badge[]>()
  for (const row of badgeRows) {
    if (!badgeMap.has(row.formation_badges.formationId)) {
      badgeMap.set(row.formation_badges.formationId, [])
    }
    badgeMap.get(row.formation_badges.formationId)!.push(row.badges)
  }

  const domainMap = new Map(domainRows.map((domain) => [domain.id, domain]))
  const subCategoryMap = new Map(
    subRows.map((subCategory) => [subCategory.id, subCategory])
  )

  return formationList.map((formation) => ({
    ...formation,
    domain: domainMap.get(formation.domainId)!,
    subCategory: formation.subCategoryId
      ? (subCategoryMap.get(formation.subCategoryId) ?? null)
      : null,
    modalities: modalityMap.get(formation.id) ?? [],
    badges: badgeMap.get(formation.id) ?? [],
    certifications: options?.includeCertifications
      ? (certMap.get(formation.id) ?? [])
      : undefined,
    faqs: options?.includeFaqs ? (faqMap.get(formation.id) ?? []) : undefined,
    pdfResources: options?.includePdfs
      ? (pdfMap.get(formation.id) ?? [])
      : undefined,
  }))
}

// Formations
export async function getFormations(filters?: FormationFilters) {
  const conditions = []
  if (filters?.activeOnly !== false)
    conditions.push(eq(formations.isActive, true))
  if (filters?.domainSlug) {
    const domain = await getDomainBySlug(filters.domainSlug)
    if (!domain) return []
    conditions.push(eq(formations.domainId, domain.id))
  }
  if (filters?.subCategorySlug) {
    const sub = await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.slug, filters.subCategorySlug))
      .limit(1)
    if (!sub[0]) return []
    conditions.push(eq(formations.subCategoryId, sub[0].id))
  }
  if (filters?.searchQuery)
    conditions.push(ilike(formations.title, `%${filters.searchQuery}%`))

  const rows = await db
    .select()
    .from(formations)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(formations.sortOrder), asc(formations.id))

  const result = await attachFormationRelations(rows)
  if (filters?.modalitySlug) {
    return result.filter((formation) =>
      formation.modalities.some(
        (modality) => modality.slug === filters.modalitySlug
      )
    )
  }
  if (filters?.badgeSlug) {
    const badge = await db
      .select()
      .from(badges)
      .where(eq(badges.slug, filters.badgeSlug))
      .limit(1)
    if (!badge[0]) return []
    const badgeIds = new Set(
      (
        await db
          .select()
          .from(formationBadges)
          .where(eq(formationBadges.badgeId, badge[0].id))
      ).map((r) => r.formationId)
    )
    return result.filter((f) => badgeIds.has(f.id))
  }
  return result
}

export async function getFormationsByCertificationPageSlug(pageSlug: string) {
  const certs = await db
    .select()
    .from(certifications)
    .where(eq(certifications.pageSlug, pageSlug))
  if (certs.length === 0) return []
  const certIds = certs.map((c) => c.id)
  const links = await db
    .select()
    .from(formationCertifications)
    .where(inArray(formationCertifications.certificationId, certIds))
  if (links.length === 0) return []
  const formationIds = [...new Set(links.map((l) => l.formationId))]
  const rows = await db
    .select()
    .from(formations)
    .where(
      and(eq(formations.isActive, true), inArray(formations.id, formationIds))
    )
    .orderBy(asc(formations.sortOrder), asc(formations.id))
  if (rows.length === 0) return []
  return attachFormationRelations(rows)
}

export async function getFormation(id: number) {
  const rows = await db
    .select()
    .from(formations)
    .where(eq(formations.id, id))
    .limit(1)
  if (!rows[0]) return null
  const enhanced = await attachFormationRelations([rows[0]], {
    includeCertifications: true,
    includeFaqs: true,
    includePdfs: true,
  })
  return enhanced[0]
}

export async function getFormationBySlug(slug: string) {
  const rows = await db
    .select()
    .from(formations)
    .where(eq(formations.slug, slug))
    .limit(1)
  if (!rows[0]) return null
  const enhanced = await attachFormationRelations([rows[0]], {
    includeCertifications: true,
    includeFaqs: true,
    includePdfs: true,
  })
  return enhanced[0]
}

export async function getRelatedFormationIds(formationId: number) {
  const rows = await db
    .select()
    .from(formationsRelated)
    .where(eq(formationsRelated.formationId, formationId))
    .orderBy(asc(formationsRelated.sortOrder))
  return rows.map((r) => r.relatedFormationId)
}

export async function getRelatedFormations(formation: Formation, limit = 3) {
  const manualIds = await getRelatedFormationIds(formation.id)
  if (manualIds.length > 0) {
    const formations = await Promise.all(
      manualIds.map((id) => getFormation(id))
    )
    return formations
      .filter((f): f is FormationWithRelations => f !== null)
      .slice(0, limit)
  }
  const rows = await getFormations({ domainSlug: undefined })
  return rows
    .filter(
      (item) => item.id !== formation.id && item.domainId === formation.domainId
    )
    .slice(0, limit)
}

// Certifications
export async function getCertifications(
  pageSlug?: string,
  options?: { activeOnly?: boolean }
) {
  const conditions = []
  if (pageSlug) conditions.push(eq(certifications.pageSlug, pageSlug))
  if (options?.activeOnly) conditions.push(eq(certifications.isActive, true))
  return db
    .select()
    .from(certifications)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(
      asc(certifications.groupKey),
      asc(certifications.sortOrder),
      asc(certifications.id)
    )
}

export async function getCertification(id: number) {
  const rows = await db
    .select()
    .from(certifications)
    .where(eq(certifications.id, id))
    .limit(1)
  return rows[0] ?? null
}

export async function getFormationCertificationIds(formationId: number) {
  const rows = await db
    .select()
    .from(formationCertifications)
    .where(eq(formationCertifications.formationId, formationId))
  return rows.map((row) => row.certificationId)
}

// Badges
export async function getBadges() {
  return db.select().from(badges).orderBy(asc(badges.id))
}

export async function getFormationBadgeIds(formationId: number) {
  const rows = await db
    .select()
    .from(formationBadges)
    .where(eq(formationBadges.formationId, formationId))
  return rows.map((row) => row.badgeId)
}

// Complementary formations / prerequisites
export async function getFormationPrereqIds(formationId: number) {
  const rows = await db
    .select()
    .from(formationsComplementaires)
    .where(
      or(
        eq(formationsComplementaires.formationId, formationId),
        eq(formationsComplementaires.complementaryFormationId, formationId)
      )
    )
  const ids = new Set<number>()
  for (const row of rows) {
    if (row.formationId === formationId) ids.add(row.complementaryFormationId)
    else ids.add(row.formationId)
  }
  return Array.from(ids)
}

// Reviews
export async function getAvis(formationId: number) {
  return db
    .select()
    .from(avis)
    .where(and(eq(avis.formationId, formationId), eq(avis.isActive, true)))
    .orderBy(asc(avis.createdAt))
}

// FAQs and PDFs
export async function getFaqs(filters?: {
  formationId?: number
  domainId?: number
  subCategoryId?: number
  certificationId?: number
  activeOnly?: boolean
}) {
  const conditions = []
  if (filters?.formationId)
    conditions.push(eq(faqs.formationId, filters.formationId))
  if (filters?.domainId) conditions.push(eq(faqs.domainId, filters.domainId))
  if (filters?.subCategoryId)
    conditions.push(eq(faqs.subCategoryId, filters.subCategoryId))
  if (filters?.certificationId)
    conditions.push(eq(faqs.certificationId, filters.certificationId))
  if (filters?.activeOnly) conditions.push(eq(faqs.isActive, true))
  return db
    .select()
    .from(faqs)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(faqs.sortOrder), asc(faqs.id))
}

export async function getPdfResources(filters?: {
  formationId?: number
  domainId?: number
  subCategoryId?: number
  certificationId?: number
  activeOnly?: boolean
}) {
  const conditions = []
  if (filters?.formationId)
    conditions.push(eq(pdfResources.formationId, filters.formationId))
  if (filters?.domainId)
    conditions.push(eq(pdfResources.domainId, filters.domainId))
  if (filters?.subCategoryId)
    conditions.push(eq(pdfResources.subCategoryId, filters.subCategoryId))
  if (filters?.certificationId)
    conditions.push(eq(pdfResources.certificationId, filters.certificationId))
  if (filters?.activeOnly) conditions.push(eq(pdfResources.isActive, true))
  return db
    .select()
    .from(pdfResources)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(pdfResources.sortOrder), asc(pdfResources.id))
}

// Testimonials
export async function getTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(asc(testimonials.sortOrder))
}

// Featured formations
export async function getFeaturedFormations() {
  const rows = await db
    .select()
    .from(featuredFormations)
    .innerJoin(formations, eq(featuredFormations.formationId, formations.id))
    .orderBy(asc(featuredFormations.sortOrder))

  const formationList = rows
    .map((row) => row.formations)
    .filter((formation) => formation.isActive)
  const enhanced = await attachFormationRelations(formationList)

  return rows
    .map((row, index) => ({
      ...row.featured_formations,
      formation: enhanced[index],
    }))
    .filter((item) => Boolean(item.formation))
}

export async function getFeaturedFormationsByDomain(domainSlug: string) {
  const rows = await getFeaturedFormations()
  return rows.filter((row) => row.formation.domain.slug === domainSlug)
}

export type DomainPageData = {
  domain: Domain
  allDomains: Domain[]
  allSubCategories: SubCategory[]
  modalities: Modality[]
  formations: FormationWithRelations[]
  domainSubCategories: SubCategory[]
  formationCounts: Record<number, number>
}

export async function getDomainPageData(
  slug: string
): Promise<DomainPageData | null> {
  const [domain, allDomains, allSubCategories, modalities] = await Promise.all([
    getDomainBySlug(slug),
    getDomains({ activeOnly: true }),
    getSubCategories(undefined, { activeOnly: true }),
    getModalities(),
  ])
  if (!domain || !domain.isActive) return null
  const formations = await getFormations({ domainSlug: slug })
  const domainSubCategories = allSubCategories.filter(
    (s) => s.domainId === domain.id
  )
  const formationCounts: Record<number, number> = {}
  for (const formation of formations) {
    if (formation.subCategoryId != null) {
      formationCounts[formation.subCategoryId] =
        (formationCounts[formation.subCategoryId] ?? 0) + 1
    }
  }
  return {
    domain,
    allDomains,
    allSubCategories,
    modalities,
    formations,
    domainSubCategories,
    formationCounts,
  }
}

// Formations certifiantes marketing page
export async function getFormationsCertifiantes() {
  return getCertifications("formations-certifiantes", { activeOnly: true })
}

// Catalogue requests
export async function getCatalogueRequests() {
  return db
    .select()
    .from(catalogueRequests)
    .orderBy(desc(catalogueRequests.createdAt))
}

export async function getUnreadCatalogueRequestsCount() {
  return db.$count(catalogueRequests, eq(catalogueRequests.isRead, false))
}

export async function getUnreadCatalogueRequests(limit = 10) {
  const rows = await db
    .select()
    .from(catalogueRequests)
    .where(eq(catalogueRequests.isRead, false))
    .orderBy(desc(catalogueRequests.createdAt))
    .limit(limit)

  return rows.map((r) => ({
    id: r.id,
    type: "user",
    title: `Nouvelle demande: ${r.firstName} ${r.lastName}`,
    description: `${r.company} — ${r.catalogueSlugs.join(", ") || "Catalogue non spécifié"}`,
    time: formatRelativeTime(r.createdAt),
    unread: true,
  }))
}

function formatRelativeTime(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "À l'instant"
  if (diffMins < 60) return `Il y a ${diffMins} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  }).format(d)
}

// Dashboard stats
export async function getDashboardStats() {
  const [formationCount, domainCount, testimonialCount, certCount] =
    await Promise.all([
      db.$count(formations, eq(formations.isActive, true)),
      db.$count(domains),
      db.$count(testimonials, eq(testimonials.isActive, true)),
      db.$count(certifications),
    ])
  return {
    formationCount,
    domainCount,
    testimonialCount,
    certCount,
  }
}
