import { CourseCard } from "@/components/training/course-card"
import type { FormationWithRelations } from "@/lib/data"

type RelatedCarouselProps = {
  formations: FormationWithRelations[]
}

export function RelatedCarousel({ formations }: RelatedCarouselProps) {
  if (formations.length === 0) return null

  return (
    <section>
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-bea-on-surface md:text-2xl">
        <span className="h-1 w-8 shrink-0 rounded-full bg-bea-primary" />
        Formations liées
      </h2>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {formations.map((f) => (
          <div key={f.id} className="w-[280px] shrink-0 snap-start md:w-[320px]">
            <CourseCard
              course={{
                title: f.title,
                price: f.priceVisible ? (f.salePrice || f.price || "Sur demande") : "Sur demande",
                rating: f.rating ?? "-",
                reviews: f.reviewsCount ?? 0,
                duration: f.duration ?? undefined,
                modalities: f.modalities.map((m) => m.label),
                badge: (f.badges ?? [])[0]?.name ?? undefined,
                domain: f.domain.label,
                href: f.href ?? undefined,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
