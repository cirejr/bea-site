import { FormationSectionsAccordion } from "@/components/formation-page/sections-accordion"
import { RelatedCarousel } from "@/components/formation-page/related-carousel"
import { TipTapContent } from "@/components/formation-page/tiptap-content"
import type { FormationWithRelations, Avi } from "@/lib/data"
import { Clock, Star, FileDown } from "lucide-react"
import Link from "next/link"

type Design1Props = {
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

export function Design1({ formation, avis, complementaryFormations, relatedFormations }: Design1Props) {
  const programmePdfHref = formation.href ?? formation.pdfResources?.[0]?.url ?? null
  const badges = formation.badges ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      {/* Hero */}
      <header className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-bea-primary/5 via-bea-surface to-bea-primary/10 p-8 md:p-12">
        <div className="relative z-10 text-center md:text-left">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <span className="rounded-full bg-bea-primary/10 px-3 py-1 text-xs font-semibold text-bea-primary">
              {formation.domain.label}
            </span>
            {badges.map((badge) => (
              <span
                key={badge.id}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: badge.color + "18", color: badge.color }}
              >
                <span className="size-1.5 rounded-full" style={{ backgroundColor: badge.color }} />
                {badge.name}
              </span>
            ))}
          </div>

          <h1 className="mb-4 text-3xl font-black text-bea-on-surface md:text-5xl md:leading-tight">
            {formation.title}
          </h1>

          {formation.summary ? (
            <TipTapContent html={formation.summary} className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-bea-on-surface-variant md:mx-0" />
          ) : (
            <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-bea-on-surface-variant md:mx-0">
              {formation.description ?? "Formation professionnelle B.E.A."}
            </p>
          )}

          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-bea-on-surface-variant md:justify-start">
            {formation.duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-bea-primary" />
                {formation.duration}
              </span>
            )}
            {formation.modalities.map((m) => (
              <span key={m.id} className="rounded-full bg-bea-surface-dim px-3 py-1 text-xs">
                {m.label}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {formation.rating ?? "-"} ({formation.reviewsCount ?? 0} avis)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold text-bea-on-surface">
              {formation.priceVisible ? (formation.salePrice || formation.price || "Sur demande") : "Sur demande"}
            </span>
            {formation.salePrice && formation.price && (
              <span className="text-sm text-bea-on-surface-variant line-through">{formation.price}</span>
            )}
            {formation.taxLabel && <span className="text-xs text-bea-on-surface-variant">{formation.taxLabel}</span>}
            <Link
              href={formation.href || "#"}
              className="ml-auto rounded-xl bg-bea-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bea-primary/90"
            >
              S&rsquo;inscrire
            </Link>
          </div>
        </div>
      </header>

      {/* Nav tabs */}
      <nav className="sticky top-20 z-30 mb-8 -mx-4 border-b border-bea-outline-variant bg-bea-surface/80 px-4 backdrop-blur-xl md:static md:mx-0 md:px-0 md:backdrop-blur-none">
        <div className="no-scrollbar flex gap-0 overflow-x-auto">
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

      {/* Accordion sections */}
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

      {/* Related carousel */}
      <div className="mt-16">
        <RelatedCarousel formations={relatedFormations} />
      </div>
    </div>
  )
}
