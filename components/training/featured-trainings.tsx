import { SectionHeader } from "./section-header"
import { CourseCard, type CourseCardData } from "./course-card"
import { getFeaturedFormations } from "@/lib/data"

type FeaturedTrainingsProps = {
  title?: string
}

export async function FeaturedTrainings({
  title = "Formations du moment",
}: FeaturedTrainingsProps) {
  const rows = await getFeaturedFormations()
  if (rows.length === 0) return null

  const featured: CourseCardData[] = rows.slice(0, 4).map((row) => {
    const formation = row.formation
    const price = formation.priceVisible
      ? formation.salePrice || formation.price || "Sur demande"
      : "Sur demande"
    return {
      title: formation.title,
      price,
      rating: formation.rating ?? "-",
      reviews: formation.reviewsCount ?? 0,
      duration: formation.duration ?? undefined,
      modalities: formation.modalities.map((item) => item.label),
      badge: (formation.badges ?? [])[0]?.name ?? undefined,
      domain: formation.domain.label,
      href: `/formations/${formation.slug}`,
      registerHref: formation.href ?? "/contact",
    }
  })

  return (
    <section className="container mx-auto my-14 max-w-7xl">
      <SectionHeader title={title} />
      <p className="mb-6 max-w-2xl text-sm text-bea-on-surface-variant">
        Découvrez les formations les plus populaires et les nouveautés de notre catalogue.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {featured.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>
    </section>
  )
}
