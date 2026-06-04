import { FormationSectionsAccordion } from "@/components/formation-page/sections-accordion"
import { RelatedCarousel } from "@/components/formation-page/related-carousel"
import { TipTapContent } from "@/components/formation-page/tiptap-content"
import type { FormationWithRelations, Avi } from "@/lib/data"
import { Clock, Star, FileDown } from "lucide-react"
import Link from "next/link"

type Design3Props = {
  formation: FormationWithRelations
  avis: Avi[]
  complementaryFormations: FormationWithRelations[]
  relatedFormations: FormationWithRelations[]
}

const navItems = [
  { id: "objectifs", label: "Objectifs" },
  { id: "programme", label: "Programme" },
  { id: "pourQui", label: "Pour qui ?" },
  { id: "financement", label: "Financement" },
  { id: "avis", label: "Avis" },
]

export function Design3({ formation, avis, complementaryFormations, relatedFormations }: Design3Props) {
  const programmePdfHref = formation.href ?? formation.pdfResources?.[0]?.url ?? null
  const badges = formation.badges ?? []

  return (
    <div className="relative">
      {/* Large hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-gradient-to-br from-bea-primary via-bea-primary/80 to-bea-primary/60">
        <div className="bea-arrow-motif absolute inset-0 opacity-10" />
        <div className="relative z-10 w-full px-4 pb-12 md:px-8 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {formation.domain.label}
              </span>
              {badges.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  style={{ backgroundColor: badge.color + "40" }}
                >
                  <span className="size-1.5 rounded-full bg-white" />
                  {badge.name}
                </span>
              ))}
            </div>

            <h1 className="mb-4 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
              {formation.title}
            </h1>

            {formation.summary ? (
              <TipTapContent html={formation.summary} className="mb-6 max-w-2xl text-lg leading-relaxed text-white/80" />
            ) : (
              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-white/80">Formation professionnelle B.E.A.</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              {formation.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {formation.duration}
                </span>
              )}
              {formation.modalities.map((m) => (
                <span key={m.id} className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-sm">
                  {m.label}
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-300 text-amber-300" />
                {formation.rating ?? "-"} ({formation.reviewsCount ?? 0} avis)
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold text-white">
                {formation.priceVisible ? (formation.salePrice || formation.price || "Sur demande") : "Sur demande"}
              </span>
              <Link
                href={formation.href || "#"}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-bea-primary transition-colors hover:bg-white/90"
              >
                S&rsquo;inscrire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating nav bar */}
      <nav className="sticky top-20 z-30 border-b border-bea-outline-variant bg-bea-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-0 overflow-x-auto px-4 md:px-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-bea-on-surface-variant transition-colors hover:border-bea-primary hover:text-bea-primary"
            >
              {item.label}
            </a>
          ))}
          {programmePdfHref && (
            <a
              href={programmePdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-bea-primary transition-colors hover:border-bea-primary"
            >
              <FileDown className="size-4" />
              Programme PDF
            </a>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <FormationSectionsAccordion
            description={formation.description}
            objectifs={(formation.objectifs as string[]) ?? []}
            programmes={formation.programmes}
            pourQui={formation.pourQui}
            financement={formation.financement}
            avis={avis}
          complementaryFormations={complementaryFormations}
          programmePdfHref={programmePdfHref}
        />
        </div>

        <div className="mt-16">
          <RelatedCarousel formations={relatedFormations} />
        </div>
      </div>
    </div>
  )
}
