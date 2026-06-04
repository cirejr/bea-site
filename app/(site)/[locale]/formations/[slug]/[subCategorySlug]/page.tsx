import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Design1 } from "@/components/training/design-1"
import { getDomainBySlug, getDomains, getFormations, getModalities, getSubCategories, getSubCategoryBySlug } from "@/lib/data"

type Props = { params: Promise<{ locale: string; slug: string; subCategorySlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subCategorySlug } = await params
  const [domain, subCategory] = await Promise.all([getDomainBySlug(slug), getSubCategoryBySlug(subCategorySlug)])
  if (domain && subCategory && subCategory.domainId === domain.id) {
    return { title: `B.E.A. | ${domain.label} - ${subCategory.label}`, description: `Formations ${domain.label} - ${subCategory.label}` }
  }
  return { title: "Not Found" }
}

export default async function FormationSubCategoryPage({ params }: Props) {
  const { locale, slug, subCategorySlug } = await params
  setRequestLocale(locale)

  const [domain, subCategory, domains, subCategories, modalities] = await Promise.all([
    getDomainBySlug(slug),
    getSubCategoryBySlug(subCategorySlug),
    getDomains({ activeOnly: true }),
    getSubCategories(undefined, { activeOnly: true }),
    getModalities(),
  ])

  if (!domain || !domain.isActive || !subCategory || subCategory.domainId !== domain.id) notFound()

  const formations = await getFormations({ domainSlug: slug, subCategorySlug })

  return (
    <Design1
      domain={domain}
      subCategory={subCategory}
      formations={formations}
      domains={domains}
      subCategories={subCategories}
      modalities={modalities}
    />
  )
}
