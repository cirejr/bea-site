import { Sparkles } from "lucide-react"
import {
  CourseCard,
  type CourseCardData,
} from "@/components/training/course-card"
import type { FormationWithRelations } from "@/lib/data"

type FeaturedRowProps = {
  formations: FormationWithRelations[]
}

export function FeaturedRow({ formations }: FeaturedRowProps) {
  if (formations.length === 0) return null
  const items = formations.slice(0, 4)
  return (
    <section className="mb-12">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((formation) => {
          const price = formation.priceVisible
            ? formation.salePrice || formation.price || "Sur demande"
            : "Sur demande"
          const cardData: CourseCardData = {
            title: formation.title,
            price,
            rating: formation.rating ?? "-",
            reviews: formation.reviewsCount ?? 0,
            duration: formation.duration ?? undefined,
            modalities: formation.modalities.map((m) => m.label),
            badge: (formation.badges ?? [])[0]?.name ?? undefined,
            domain: formation.domain.label,
            href: `/formations/${formation.slug}`,
            registerHref: formation.href ?? "/contact",
          }
          return <CourseCard key={formation.id} course={cardData} />
        })}
      </div>
    </section>
  )
}
