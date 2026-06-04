import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { GraduationCap } from "lucide-react"
import { CategoryHero } from "@/components/training/category-hero"
import { BeaTrainingGridSection } from "@/components/training/grid-section"
import { DomainDesignCinematic } from "@/components/training/domain-designs/cinematic"
import { getFormationPageData } from "@/components/formation-page/get-formation-page-data"
import {
  getBadges,
  getDomainBySlug,
  getDomainPageData,
  getDomains,
  getFormationBySlug,
  getFormations,
  getFormationsByCertificationPageSlug,
  getModalities,
  getSubCategories,
} from "@/lib/data"
import { routing } from "@/i18n/routing"
import { Design3 } from "@/components/formation-page/design-3"

const BADGE_SLUG_MAP: Record<string, string> = {
  nouveautes: "nouveaute",
  incontournables: "incontournable",
  "formations-certifiantes": "certifiant",
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [formation, domain] = await Promise.all([
    getFormationBySlug(slug),
    getDomainBySlug(slug),
  ])
  if (formation)
    return {
      title: `B.E.A. | ${formation.title}`,
      description: formation.summary ?? formation.description ?? undefined,
    }
  if (domain)
    return {
      title: `B.E.A. | Formation ${domain.label}`,
      description: domain.description ?? `Formations ${domain.label}`,
    }
  const certs = await getFormationsByCertificationPageSlug(slug)
  if (certs.length > 0)
    return {
      title: "B.E.A. | Certifications AMF",
      description: "Préparez les certifications AMF avec B.E.A.",
    }
  const badges = await getBadges()
  const effectiveSlug = BADGE_SLUG_MAP[slug] || slug
  const matchingBadge = badges.find((b) => b.slug === effectiveSlug)
  if (matchingBadge)
    return {
      title: `B.E.A. | ${matchingBadge.name}`,
      description: `Catalogue des formations "${matchingBadge.name}".`,
    }
  return { title: "Not Found" }
}

export default async function FormationSlugPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const data = await getFormationPageData(slug)

  if (data.formation) {
    return (
      <main className="min-h-screen pt-20">
        <Design3
          formation={data.formation}
          avis={data.avis}
          complementaryFormations={data.complementaryFormations}
          relatedFormations={data.relatedFormations}
        />
      </main>
    )
  }

  const domainPageData = await getDomainPageData(slug)
  if (domainPageData) {
    return (
      <main className="min-h-screen pt-8">
        <DomainDesignCinematic
          slug={slug}
          locale={locale as "fr" | "en"}
          data={domainPageData}
        />
      </main>
    )
  }

  const [domains, subCategories, modalities] = await Promise.all([
    getDomains({ activeOnly: true }),
    getSubCategories(undefined, { activeOnly: true }),
    getModalities(),
  ])

  const certificationFormations =
    await getFormationsByCertificationPageSlug(slug)
  if (certificationFormations.length > 0) {
    return (
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <CategoryHero
            icon={<GraduationCap className="h-4 w-4" />}
            eyebrow="Accès rapide"
            title="Certifications AMF"
            description="Formations liées aux certifications AMF."
          />
          <BeaTrainingGridSection
            activeDomain={null}
            formations={certificationFormations}
            domains={domains}
            subCategories={subCategories}
            modalities={modalities}
          />
        </div>
      </main>
    )
  }

  const badges = await getBadges()
  const effectiveSlug = BADGE_SLUG_MAP[slug] || slug
  const matchingBadge = badges.find((b) => b.slug === effectiveSlug)

  if (matchingBadge) {
    const formations = await getFormations({ badgeSlug: matchingBadge.slug })
    return (
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <CategoryHero
            icon={<GraduationCap className="h-4 w-4" />}
            eyebrow="Accès rapide"
            title={`Formations ${matchingBadge.name}`}
            description="Sélection dynamique issue du catalogue de formations."
          />
          <BeaTrainingGridSection
            activeDomain={null}
            formations={formations}
            domains={domains}
            subCategories={subCategories}
            modalities={modalities}
          />
        </div>
      </main>
    )
  }

  notFound()
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
