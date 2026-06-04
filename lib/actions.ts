"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb as _getDb } from "@/db"
import {
  badges as dBadges,
  catalogueRequests as dCatalogueRequests,
  certifications as dCertifications,
  domains as dDomains,
  faqs as dFaqs,
  featuredFormations as dFeaturedFormations,
  formationBadges as dFormationBadges,
  formationCertifications as dFormationCertifications,
  formationModalities as dFormationModalities,
  formations as dFormations,
  formationsComplementaires as dFormationsComplementaires,
  formationsRelated as dFormationsRelated,
  modalites as dModalites,
  pdfResources as dPdfResources,
  subCategories as dSubCategories,
  testimonials as dTestimonials,
} from "@/db/schema"
import { CATALOGUE_SLUGS, ROLE_VALUES } from "@/lib/data/catalogues"

const db = () => _getDb()

function revalidateCatalogue() {
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/formations")
  revalidatePath("/training")
}

// Formations
export async function createFormation(data: {
  domainId: number
  subCategoryId?: number | null
  title: string
  slug: string
  summary?: string | null
  description?: string | null
  objectifs?: string[]
  programmes?: string | null
  pourQui?: string | null
  financement?: string | null
  price?: string | null
  salePrice?: string | null
  currency?: string | null
  taxLabel?: string | null
  priceVisible?: boolean
  rating?: string | null
  reviewsCount?: number
  duration?: string | null
  href?: string | null
  isActive?: boolean
  sortOrder?: number
  modalityIds?: number[]
  certificationIds?: number[]
  badgeIds?: number[]
  prereqIds?: number[]
  relatedFormationIds?: number[]
}) {
  const [formation] = await db()
    .insert(dFormations)
    .values({
      domainId: data.domainId,
      subCategoryId: data.subCategoryId ?? null,
      title: data.title,
      slug: data.slug,
      summary: data.summary ?? null,
      description: data.description ?? null,
      objectifs: (data.objectifs ?? []) as any,
      programmes: data.programmes ?? null,
      pourQui: data.pourQui ?? null,
      financement: data.financement ?? null,
      price: data.price ?? null,
      salePrice: data.salePrice ?? null,
      currency: data.currency || "EUR",
      taxLabel: data.taxLabel || "HT",
      priceVisible: data.priceVisible ?? true,
      rating: data.rating ?? null,
      reviewsCount: data.reviewsCount ?? 0,
      duration: data.duration ?? null,
      href: data.href ?? null,
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 0,
    })
    .returning()

  if (data.modalityIds?.length) {
    await db()
      .insert(dFormationModalities)
      .values(
        data.modalityIds.map((modalityId) => ({
          formationId: formation.id,
          modalityId,
        }))
      )
  }

  if (data.certificationIds?.length) {
    await db()
      .insert(dFormationCertifications)
      .values(
        data.certificationIds.map((certificationId) => ({
          formationId: formation.id,
          certificationId,
        }))
      )
  }

  if (data.badgeIds?.length) {
    await db()
      .insert(dFormationBadges)
      .values(
        data.badgeIds.map((badgeId) => ({ formationId: formation.id, badgeId }))
      )
  }

  if (data.prereqIds?.length) {
    const pairs = data.prereqIds.flatMap((complementaryFormationId) => [
      { formationId: formation.id, complementaryFormationId },
      {
        formationId: complementaryFormationId,
        complementaryFormationId: formation.id,
      },
    ])
    await db().insert(dFormationsComplementaires).values(pairs)
  }

  if (data.relatedFormationIds?.length) {
    await db()
      .insert(dFormationsRelated)
      .values(
        data.relatedFormationIds.map((relatedFormationId, i) => ({
          formationId: formation.id,
          relatedFormationId,
          sortOrder: i,
        }))
      )
  }

  revalidateCatalogue()
  return formation
}

export async function updateFormation(
  id: number,
  data: {
    domainId?: number
    subCategoryId?: number | null
    title?: string
    slug?: string
    summary?: string | null
    description?: string | null
    objectifs?: string[]
    programmes?: string | null
    pourQui?: string | null
    financement?: string | null
    price?: string | null
    salePrice?: string | null
    currency?: string | null
    taxLabel?: string | null
    priceVisible?: boolean
    rating?: string | null
    reviewsCount?: number
    duration?: string | null
    href?: string | null
    isActive?: boolean
    sortOrder?: number
    modalityIds?: number[]
    certificationIds?: number[]
    badgeIds?: number[]
    prereqIds?: number[]
    relatedFormationIds?: number[]
  }
) {
  const {
    modalityIds,
    certificationIds,
    badgeIds,
    prereqIds,
    relatedFormationIds,
    ...fields
  } = data
  const updateFields: Record<string, unknown> = { ...fields }
  if (data.objectifs !== undefined)
    updateFields.objectifs = data.objectifs as any
  await db()
    .update(dFormations)
    .set(updateFields as any)
    .where(eq(dFormations.id, id))

  if (modalityIds !== undefined) {
    await db()
      .delete(dFormationModalities)
      .where(eq(dFormationModalities.formationId, id))
    if (modalityIds.length > 0) {
      await db()
        .insert(dFormationModalities)
        .values(
          modalityIds.map((modalityId) => ({ formationId: id, modalityId }))
        )
    }
  }

  if (certificationIds !== undefined) {
    await db()
      .delete(dFormationCertifications)
      .where(eq(dFormationCertifications.formationId, id))
    if (certificationIds.length > 0) {
      await db()
        .insert(dFormationCertifications)
        .values(
          certificationIds.map((certificationId) => ({
            formationId: id,
            certificationId,
          }))
        )
    }
  }

  if (badgeIds !== undefined) {
    await db()
      .delete(dFormationBadges)
      .where(eq(dFormationBadges.formationId, id))
    if (badgeIds.length > 0) {
      await db()
        .insert(dFormationBadges)
        .values(badgeIds.map((badgeId) => ({ formationId: id, badgeId })))
    }
  }

  if (prereqIds !== undefined) {
    await db()
      .delete(dFormationsComplementaires)
      .where(eq(dFormationsComplementaires.formationId, id))
    await db()
      .delete(dFormationsComplementaires)
      .where(eq(dFormationsComplementaires.complementaryFormationId, id))
    if (prereqIds.length > 0) {
      const pairs = prereqIds.flatMap((complementaryFormationId) => [
        { formationId: id, complementaryFormationId },
        { formationId: complementaryFormationId, complementaryFormationId: id },
      ])
      await db().insert(dFormationsComplementaires).values(pairs)
    }
  }

  if (relatedFormationIds !== undefined) {
    await db()
      .delete(dFormationsRelated)
      .where(eq(dFormationsRelated.formationId, id))
    if (relatedFormationIds.length > 0) {
      await db()
        .insert(dFormationsRelated)
        .values(
          relatedFormationIds.map((relatedFormationId, i) => ({
            formationId: id,
            relatedFormationId,
            sortOrder: i,
          }))
        )
    }
  }

  revalidateCatalogue()
  revalidatePath(`/training/${fields.slug ?? ""}`)
}

export async function deleteFormation(id: number) {
  await db().delete(dFormations).where(eq(dFormations.id, id))
  revalidateCatalogue()
}

// Domains
export async function createDomain(data: {
  slug: string
  label: string
  description?: string | null
  isActive?: boolean
}) {
  const [domain] = await db()
    .insert(dDomains)
    .values({ ...data, isActive: data.isActive ?? true })
    .returning()
  revalidatePath("/dashboard/domains")
  revalidateCatalogue()
  return domain
}

export async function updateDomain(
  id: number,
  data: {
    slug?: string
    label?: string
    description?: string | null
    isActive?: boolean
  }
) {
  await db().update(dDomains).set(data).where(eq(dDomains.id, id))
  revalidatePath("/dashboard/domains")
  revalidateCatalogue()
}

export async function deleteDomain(id: number) {
  await db().delete(dDomains).where(eq(dDomains.id, id))
  revalidatePath("/dashboard/domains")
  revalidateCatalogue()
}

// Sub-categories
export async function createSubCategory(data: {
  domainId: number
  slug: string
  label: string
  description?: string | null
  isActive?: boolean
}) {
  const [sub] = await db()
    .insert(dSubCategories)
    .values({ ...data, isActive: data.isActive ?? true })
    .returning()
  revalidatePath("/dashboard/domains")
  revalidateCatalogue()
  return sub
}

export async function updateSubCategory(
  id: number,
  data: {
    slug?: string
    label?: string
    description?: string | null
    isActive?: boolean
  }
) {
  await db().update(dSubCategories).set(data).where(eq(dSubCategories.id, id))
  revalidatePath("/dashboard/domains")
  revalidateCatalogue()
}

export async function deleteSubCategory(id: number) {
  await db().delete(dSubCategories).where(eq(dSubCategories.id, id))
  revalidatePath("/dashboard/domains")
  revalidateCatalogue()
}

// Modalities
export async function createModality(data: { slug: string; label: string }) {
  const [m] = await db().insert(dModalites).values(data).returning()
  revalidateCatalogue()
  return m
}

export async function updateModality(
  id: number,
  data: { slug?: string; label?: string }
) {
  await db().update(dModalites).set(data).where(eq(dModalites.id, id))
  revalidatePath("/dashboard/modalities")
  revalidateCatalogue()
}

export async function deleteModality(id: number) {
  await db().delete(dModalites).where(eq(dModalites.id, id))
  revalidatePath("/dashboard/modalities")
  revalidateCatalogue()
}

// Certifications
export async function createCertification(data: {
  pageSlug?: string
  title: string
  description?: string | null
  badge?: string | null
  audience?: string | null
  href?: string | null
  groupKey?: string | null
  isActive?: boolean
  sortOrder?: number
}) {
  const [cert] = await db()
    .insert(dCertifications)
    .values({
      ...data,
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 0,
    })
    .returning()
  revalidatePath("/dashboard/certifications")
  revalidateCatalogue()
  return cert
}

export async function updateCertification(
  id: number,
  data: {
    pageSlug?: string
    title?: string
    description?: string | null
    badge?: string | null
    audience?: string | null
    href?: string | null
    groupKey?: string | null
    isActive?: boolean
    sortOrder?: number
  }
) {
  await db().update(dCertifications).set(data).where(eq(dCertifications.id, id))
  revalidatePath("/dashboard/certifications")
  revalidateCatalogue()
}

export async function deleteCertification(id: number) {
  await db().delete(dCertifications).where(eq(dCertifications.id, id))
  revalidatePath("/dashboard/certifications")
  revalidateCatalogue()
}

// FAQs
export async function createFaq(data: {
  question: string
  answer: string
  domainId?: number | null
  subCategoryId?: number | null
  formationId?: number | null
  certificationId?: number | null
  isActive?: boolean
  sortOrder?: number
}) {
  const [faq] = await db()
    .insert(dFaqs)
    .values({
      ...data,
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 0,
    })
    .returning()
  revalidatePath("/dashboard/faqs")
  revalidateCatalogue()
  return faq
}

export async function updateFaq(
  id: number,
  data: {
    question?: string
    answer?: string
    domainId?: number | null
    subCategoryId?: number | null
    formationId?: number | null
    certificationId?: number | null
    isActive?: boolean
    sortOrder?: number
  }
) {
  await db().update(dFaqs).set(data).where(eq(dFaqs.id, id))
  revalidatePath("/dashboard/faqs")
  revalidateCatalogue()
}

export async function deleteFaq(id: number) {
  await db().delete(dFaqs).where(eq(dFaqs.id, id))
  revalidatePath("/dashboard/faqs")
  revalidateCatalogue()
}

// PDFs
export async function createPdfResource(data: {
  title: string
  description?: string | null
  url: string
  resourceType?: "brochure" | "program" | "guide" | "certificate" | "other"
  domainId?: number | null
  subCategoryId?: number | null
  formationId?: number | null
  certificationId?: number | null
  isActive?: boolean
  sortOrder?: number
}) {
  const [resource] = await db()
    .insert(dPdfResources)
    .values({
      ...data,
      resourceType: data.resourceType ?? "other",
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 0,
    })
    .returning()
  revalidatePath("/dashboard/pdfs")
  revalidateCatalogue()
  return resource
}

export async function updatePdfResource(
  id: number,
  data: {
    title?: string
    description?: string | null
    url?: string
    resourceType?: "brochure" | "program" | "guide" | "certificate" | "other"
    domainId?: number | null
    subCategoryId?: number | null
    formationId?: number | null
    certificationId?: number | null
    isActive?: boolean
    sortOrder?: number
  }
) {
  await db().update(dPdfResources).set(data).where(eq(dPdfResources.id, id))
  revalidatePath("/dashboard/pdfs")
  revalidateCatalogue()
}

export async function deletePdfResource(id: number) {
  await db().delete(dPdfResources).where(eq(dPdfResources.id, id))
  revalidatePath("/dashboard/pdfs")
  revalidateCatalogue()
}

// Testimonials
export async function createTestimonial(data: {
  quote: string
  name: string
  role?: string | null
  rating?: number
  isActive?: boolean
  sortOrder?: number
}) {
  const [t] = await db().insert(dTestimonials).values(data).returning()
  revalidatePath("/dashboard/testimonials")
  return t
}

export async function updateTestimonial(
  id: number,
  data: {
    quote?: string
    name?: string
    role?: string | null
    rating?: number
    isActive?: boolean
    sortOrder?: number
  }
) {
  await db().update(dTestimonials).set(data).where(eq(dTestimonials.id, id))
  revalidatePath("/dashboard/testimonials")
}

export async function deleteTestimonial(id: number) {
  await db().delete(dTestimonials).where(eq(dTestimonials.id, id))
  revalidatePath("/dashboard/testimonials")
}

// Featured formations
export async function addFeaturedFormation(
  formationId: number,
  sortOrder?: number
) {
  const [featured] = await db()
    .insert(dFeaturedFormations)
    .values({ formationId, sortOrder: sortOrder ?? 0 })
    .returning()
  revalidateCatalogue()
  return featured
}

export async function removeFeaturedFormation(id: number) {
  await db().delete(dFeaturedFormations).where(eq(dFeaturedFormations.id, id))
  revalidateCatalogue()
}

export async function reorderFeaturedFormations(
  items: { id: number; sortOrder: number }[]
) {
  for (const item of items) {
    await db()
      .update(dFeaturedFormations)
      .set({ sortOrder: item.sortOrder })
      .where(eq(dFeaturedFormations.id, item.id))
  }
  revalidateCatalogue()
}

// Badges
export async function createBadge(data: {
  name: string
  slug: string
  color?: string
}) {
  const [badge] = await db()
    .insert(dBadges)
    .values({ ...data, color: data.color ?? "#3b82f6" })
    .returning()
  revalidatePath("/dashboard/badges")
  revalidateCatalogue()
  return badge
}

export async function updateBadge(
  id: number,
  data: { name?: string; slug?: string; color?: string }
) {
  await db().update(dBadges).set(data).where(eq(dBadges.id, id))
  revalidatePath("/dashboard/badges")
  revalidateCatalogue()
}

export async function deleteBadge(id: number) {
  await db().delete(dBadges).where(eq(dBadges.id, id))
  revalidatePath("/dashboard/badges")
  revalidateCatalogue()
}

// Catalogue requests
export async function markCatalogueRequestRead(id: number) {
  await db()
    .update(dCatalogueRequests)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(dCatalogueRequests.id, id))
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/catalogue-requests")
}

export async function markAllCatalogueRequestsRead() {
  await db()
    .update(dCatalogueRequests)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(dCatalogueRequests.isRead, false))
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/catalogue-requests")
}

export type CatalogueRequestState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Partial<
    Record<
      | "firstName"
      | "lastName"
      | "email"
      | "phone"
      | "company"
      | "role"
      | "roleOther"
      | "catalogues",
      string
    >
  >
}

export async function submitCatalogueRequest(
  _prev: CatalogueRequestState,
  formData: FormData
): Promise<CatalogueRequestState> {
  const firstName = (formData.get("firstName") as string | null)?.trim() ?? ""
  const lastName = (formData.get("lastName") as string | null)?.trim() ?? ""
  const email = (formData.get("email") as string | null)?.trim() ?? ""
  const phone = (formData.get("phone") as string | null)?.trim() ?? ""
  const company = (formData.get("company") as string | null)?.trim() ?? ""
  const role = (formData.get("role") as string | null)?.trim() ?? ""
  const roleOther = (formData.get("roleOther") as string | null)?.trim() ?? ""
  const catalogues = (formData.getAll("catalogues") as string[])
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
  const locale = (formData.get("locale") as string | null)?.trim() ?? "fr"

  const fieldErrors: CatalogueRequestState["fieldErrors"] = {}

  if (firstName.length < 2) fieldErrors.firstName = "ERR_FIRST_NAME"
  if (lastName.length < 2) fieldErrors.lastName = "ERR_LAST_NAME"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "ERR_EMAIL"
  if (phone && phone.replace(/\D/g, "").length < 6)
    fieldErrors.phone = "ERR_PHONE"
  if (company.length < 2) fieldErrors.company = "ERR_COMPANY"
  if (!ROLE_VALUES.includes(role)) fieldErrors.role = "ERR_ROLE"
  if (role === "other" && roleOther.length < 2)
    fieldErrors.roleOther = "ERR_ROLE_OTHER"
  if (catalogues.length === 0) fieldErrors.catalogues = "ERR_CATALOGUES"
  else {
    const invalid = catalogues.filter((slug) => !CATALOGUE_SLUGS.includes(slug))
    if (invalid.length > 0) fieldErrors.catalogues = "ERR_CATALOGUES"
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "FORM_ERROR",
      fieldErrors,
    }
  }

  try {
    await db()
      .insert(dCatalogueRequests)
      .values({
        firstName,
        lastName,
        email,
        phone: phone || null,
        company,
        role,
        roleOther: role === "other" ? roleOther : null,
        catalogueSlugs: catalogues,
        locale,
      })
    revalidatePath("/dashboard/catalogue-requests")
    return { status: "success", message: "FORM_SUCCESS", fieldErrors: {} }
  } catch (error) {
    return {
      status: "error",
      message: (error as Error).message ?? "FORM_ERROR",
      fieldErrors,
    }
  }
}
