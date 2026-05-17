"use server"

import { revalidatePath } from "next/cache"
import { getDb as _getDb } from "@/db"
import {
  courses as dCourses,
  domains as dDomains,
  subCategories as dSubCategories,
  modalites as dModalites,
  certifications as dCertifications,
  testimonials as dTestimonials,
  featuredCourses as dFeaturedCourses,
  courseModalities as dCourseModalities,
} from "@/db"
import { eq } from "drizzle-orm"

const db = () => _getDb()

// ── Courses ──

export async function createCourse(data: {
  domainId: number
  subCategoryId?: number | null
  title: string
  slug: string
  price?: string | null
  rating?: string | null
  reviewsCount?: number
  duration?: string | null
  badge?: string | null
  href?: string | null
  description?: string | null
  modalityIds?: number[]
}) {
  const [course] = await db()
    .insert(dCourses)
    .values({
      domainId: data.domainId,
      subCategoryId: data.subCategoryId ?? null,
      title: data.title,
      slug: data.slug,
      price: data.price ?? null,
      rating: data.rating ?? null,
      reviewsCount: data.reviewsCount ?? 0,
      duration: data.duration ?? null,
      badge: data.badge as any ?? null,
      href: data.href ?? null,
      description: data.description ?? null,
    })
    .returning()

  if (data.modalityIds?.length) {
    await db()
      .insert(dCourseModalities)
      .values(data.modalityIds.map((modalityId) => ({ courseId: course.id, modalityId })))
  }

  revalidatePath("/dashboard/courses")
  return course
}

export async function updateCourse(
  id: number,
  data: {
    domainId?: number
    subCategoryId?: number | null
    title?: string
    slug?: string
    price?: string | null
    rating?: string | null
    reviewsCount?: number
    duration?: string | null
    badge?: string | null
    href?: string | null
    isActive?: boolean
    description?: string | null
    modalityIds?: number[]
  },
) {
  const { modalityIds, ...fields } = data
  await db().update(dCourses).set(fields as any).where(eq(dCourses.id, id))

  if (modalityIds !== undefined) {
    await db().delete(dCourseModalities).where(eq(dCourseModalities.courseId, id))
    if (modalityIds.length > 0) {
      await db().insert(dCourseModalities).values(modalityIds.map((modalityId) => ({ courseId: id, modalityId })))
    }
  }

  revalidatePath("/dashboard/courses")
}

export async function deleteCourse(id: number) {
  await db().delete(dCourses).where(eq(dCourses.id, id))
  revalidatePath("/dashboard/courses")
}

// ── Domains ──

export async function createDomain(data: {
  slug: string
  label: string
  iconName?: string | null
  sortOrder?: number
}) {
  const [domain] = await db().insert(dDomains).values(data).returning()
  revalidatePath("/dashboard/domains")
  return domain
}

export async function updateDomain(
  id: number,
  data: { slug?: string; label?: string; iconName?: string | null; sortOrder?: number },
) {
  await db().update(dDomains).set(data).where(eq(dDomains.id, id))
  revalidatePath("/dashboard/domains")
}

export async function deleteDomain(id: number) {
  await db().delete(dDomains).where(eq(dDomains.id, id))
  revalidatePath("/dashboard/domains")
}

// ── Sub-categories ──

export async function createSubCategory(data: {
  domainId: number
  slug: string
  label: string
  sortOrder?: number
}) {
  const [sub] = await db().insert(dSubCategories).values(data).returning()
  revalidatePath("/dashboard/domains")
  return sub
}

export async function updateSubCategory(
  id: number,
  data: { slug?: string; label?: string; sortOrder?: number },
) {
  await db().update(dSubCategories).set(data).where(eq(dSubCategories.id, id))
  revalidatePath("/dashboard/domains")
}

export async function deleteSubCategory(id: number) {
  await db().delete(dSubCategories).where(eq(dSubCategories.id, id))
  revalidatePath("/dashboard/domains")
}

// ── Modalities ──

export async function createModality(data: { slug: string; label: string }) {
  const [m] = await db().insert(dModalites).values(data).returning()
  revalidatePath("/dashboard/courses")
  return m
}

// ── Certifications ──

export async function createCertification(data: {
  pageSlug?: string
  title: string
  description?: string | null
  badge?: string | null
  audience?: string | null
  href?: string | null
  groupKey?: string | null
  sortOrder?: number
}) {
  const [cert] = await db().insert(dCertifications).values(data).returning()
  revalidatePath("/dashboard/certifications")
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
    sortOrder?: number
  },
) {
  await db().update(dCertifications).set(data).where(eq(dCertifications.id, id))
  revalidatePath("/dashboard/certifications")
}

export async function deleteCertification(id: number) {
  await db().delete(dCertifications).where(eq(dCertifications.id, id))
  revalidatePath("/dashboard/certifications")
}

// ── Testimonials ──

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
  },
) {
  await db().update(dTestimonials).set(data).where(eq(dTestimonials.id, id))
  revalidatePath("/dashboard/testimonials")
}

export async function deleteTestimonial(id: number) {
  await db().delete(dTestimonials).where(eq(dTestimonials.id, id))
  revalidatePath("/dashboard/testimonials")
}

// ── Featured courses ──

export async function addFeaturedCourse(courseId: number, sortOrder?: number) {
  const [f] = await db().insert(dFeaturedCourses).values({ courseId, sortOrder: sortOrder ?? 0 }).returning()
  revalidatePath("/dashboard/courses")
  return f
}

export async function removeFeaturedCourse(id: number) {
  await db().delete(dFeaturedCourses).where(eq(dFeaturedCourses.id, id))
  revalidatePath("/dashboard/courses")
}

export async function reorderFeaturedCourses(items: { id: number; sortOrder: number }[]) {
  for (const item of items) {
    await db().update(dFeaturedCourses).set({ sortOrder: item.sortOrder }).where(eq(dFeaturedCourses.id, item.id))
  }
  revalidatePath("/dashboard/courses")
}
