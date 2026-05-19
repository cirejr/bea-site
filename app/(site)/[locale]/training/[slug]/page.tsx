import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Award, Download, GraduationCap } from "lucide-react"
import { BeaTrainingGridSection } from "@/components/training/grid-section"
import { CategoryHero } from "@/components/training/category-hero"
import { SectionHeader } from "@/components/training/section-header"
import { routing } from "@/lib/routing"
import { getDomainBySlug, getDomains, getFormationBySlug, getFormations, getModalities, getRelatedFormations, getSubCategories } from "@/lib/data"

const quickAccessBadges: Record<string, string> = {
  nouveautes: "Nouveauté",
  incontournables: "Incontournable",
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [formation, domain] = await Promise.all([getFormationBySlug(slug), getDomainBySlug(slug)])
  if (formation) return { title: `B.E.A. | ${formation.title}`, description: formation.summary ?? formation.description ?? undefined }
  if (domain) return { title: `B.E.A. | Formation ${domain.label}`, description: domain.description ?? `Formations ${domain.label}` }
  if (quickAccessBadges[slug]) return { title: `B.E.A. | ${quickAccessBadges[slug]}`, description: `Catalogue des formations ${quickAccessBadges[slug].toLowerCase()}.` }
  return { title: "Not Found" }
}

export default async function TrainingSlugPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [formation, domain, domains, subCategories, modalities] = await Promise.all([
    getFormationBySlug(slug),
    getDomainBySlug(slug),
    getDomains({ activeOnly: true }),
    getSubCategories(undefined, { activeOnly: true }),
    getModalities(),
  ])

  if (formation && formation.isActive) {
    const related = await getRelatedFormations(formation)
    return (
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <CategoryHero
            icon={<GraduationCap className="h-4 w-4" />}
            eyebrow={formation.domain.label}
            title={formation.title}
            description={formation.summary ?? formation.description ?? "Formation professionnelle B.E.A."}
          />

          <section className="mb-14 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-bea-outline-variant bg-white p-5"><p className="text-xs font-semibold uppercase text-bea-on-surface-variant">Prix</p><p className="mt-2 font-bold text-bea-on-surface">{formation.priceVisible ? (formation.salePrice || formation.price || "Sur demande") : "Sur demande"}</p></div>
            <div className="rounded-2xl border border-bea-outline-variant bg-white p-5"><p className="text-xs font-semibold uppercase text-bea-on-surface-variant">Durée</p><p className="mt-2 font-bold text-bea-on-surface">{formation.duration ?? "Sur demande"}</p></div>
            <div className="rounded-2xl border border-bea-outline-variant bg-white p-5"><p className="text-xs font-semibold uppercase text-bea-on-surface-variant">Modalités</p><p className="mt-2 font-bold text-bea-on-surface">{formation.modalities.map((item) => item.label).join(", ") || "Sur demande"}</p></div>
            <div className="rounded-2xl border border-bea-outline-variant bg-white p-5"><p className="text-xs font-semibold uppercase text-bea-on-surface-variant">Avis</p><p className="mt-2 font-bold text-bea-on-surface">{formation.rating ?? "-"} {formation.reviewsCount ? `(${formation.reviewsCount})` : ""}</p></div>
          </section>

          {formation.description && <section className="mb-14"><SectionHeader title="Présentation" /><p className="max-w-3xl text-sm leading-relaxed text-bea-on-surface-variant">{formation.description}</p></section>}

          {formation.courses?.length ? <section className="mb-14"><SectionHeader title="Cours inclus" /><div className="grid gap-3 md:grid-cols-2">{formation.courses.map((course) => <div key={course.id} className="rounded-2xl border border-bea-outline-variant bg-white p-5"><h3 className="font-semibold text-bea-on-surface">{course.title}</h3><p className="mt-2 text-sm text-bea-on-surface-variant">{course.summary}</p><p className="mt-3 text-xs text-bea-on-surface-variant">{course.duration} {course.modality ? `- ${course.modality}` : ""}</p></div>)}</div></section> : null}

          {formation.certifications?.length ? <section className="mb-14"><SectionHeader title="Certifications associées" /><div className="grid gap-3 md:grid-cols-2">{formation.certifications.map((certification) => <div key={certification.id} className="rounded-2xl border border-bea-outline-variant bg-white p-5"><Award className="mb-3 h-5 w-5 text-bea-primary" /><h3 className="font-semibold text-bea-on-surface">{certification.title}</h3><p className="mt-2 text-sm text-bea-on-surface-variant">{certification.description}</p></div>)}</div></section> : null}

          {formation.pdfResources?.length ? <section className="mb-14"><SectionHeader title="Documents" /><div className="grid gap-3 md:grid-cols-2">{formation.pdfResources.map((resource) => <a key={resource.id} href={resource.url} className="rounded-2xl border border-bea-outline-variant bg-white p-5 hover:border-bea-primary/30"><Download className="mb-3 h-5 w-5 text-bea-primary" /><h3 className="font-semibold text-bea-on-surface">{resource.title}</h3><p className="mt-2 text-sm text-bea-on-surface-variant">{resource.description}</p></a>)}</div></section> : null}

          {formation.faqs?.length ? <section className="mb-14"><SectionHeader title="FAQ" /><div className="space-y-3">{formation.faqs.map((faq) => <div key={faq.id} className="rounded-2xl border border-bea-outline-variant bg-white p-5"><h3 className="font-semibold text-bea-on-surface">{faq.question}</h3><p className="mt-2 text-sm text-bea-on-surface-variant">{faq.answer}</p></div>)}</div></section> : null}

          {related.length ? <section><SectionHeader title="Formations liées" /><BeaTrainingGridSection activeDomain={formation.domain.slug} formations={related} domains={domains} subCategories={subCategories} modalities={modalities} /></section> : null}
        </div>
      </main>
    )
  }

  if (domain && domain.isActive) {
    const formations = await getFormations({ domainSlug: slug })
    return (
      <main className="min-h-screen pt-20"><div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16"><CategoryHero icon={<GraduationCap className="h-4 w-4" />} eyebrow="Domaine de formation" title={`Formation ${domain.label}`} description={domain.description ?? `Découvrez les formations du domaine ${domain.label}.`} /><BeaTrainingGridSection activeDomain={slug} formations={formations} domains={domains} subCategories={subCategories} modalities={modalities} /></div></main>
    )
  }

  if (quickAccessBadges[slug]) {
    const formations = await getFormations({ badge: quickAccessBadges[slug] })
    return (
      <main className="min-h-screen pt-20"><div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16"><CategoryHero icon={<GraduationCap className="h-4 w-4" />} eyebrow="Accès rapide" title={`Formations ${quickAccessBadges[slug]}`} description="Sélection dynamique issue du catalogue de formations." /><BeaTrainingGridSection activeDomain={null} formations={formations} domains={domains} subCategories={subCategories} modalities={modalities} /></div></main>
    )
  }

  notFound()
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, slug: "training" }))
}
