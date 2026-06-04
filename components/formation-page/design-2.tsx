import { FormationSectionsAccordion } from "@/components/formation-page/sections-accordion"
import { RelatedCarousel } from "@/components/formation-page/related-carousel"
import { TipTapContent } from "@/components/formation-page/tiptap-content"
import type { FormationWithRelations, Avi } from "@/lib/data"
import { Clock, Star, FileDown, GraduationCap, Check } from "lucide-react"
import Link from "next/link"

type Design2Props = {
  formation: FormationWithRelations
  avis: Avi[]
  complementaryFormations: FormationWithRelations[]
  relatedFormations: FormationWithRelations[]
}

const navItems = [
  { id: "objectifs", label: "Objectifs", icon: "🎯" },
  { id: "programme", label: "Programme", icon: "📖" },
  { id: "pourQui", label: "Pour qui ?", icon: "👤" },
  { id: "financement", label: "Financement", icon: "💳" },
  { id: "avis", label: "Avis", icon: "⭐" },
]

export function Design2({ formation, avis, complementaryFormations, relatedFormations }: Design2Props) {
  const programmePdfHref = formation.href ?? formation.pdfResources?.[0]?.url ?? null
  const badges = formation.badges ?? []

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 md:px-8 md:py-16">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 md:block">
        <div className="sticky top-24 space-y-6">
          {/* Compact hero */}
          <div className="rounded-2xl border border-bea-outline-variant bg-white p-5">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{ backgroundColor: badge.color + "18", color: badge.color }}
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: badge.color }} />
                  {badge.name}
                </span>
              ))}
            </div>
            <span className="mb-1 inline-block rounded-full bg-bea-primary/10 px-2 py-0.5 text-[10px] font-semibold text-bea-primary">
              {formation.domain.label}
            </span>
            <h1 className="mt-2 text-lg font-bold leading-tight text-bea-on-surface">
              {formation.title}
            </h1>
            {formation.summary ? (
              <TipTapContent html={formation.summary} className="mt-2 text-xs leading-relaxed text-bea-on-surface-variant" />
            ) : (
              <p className="mt-2 text-xs leading-relaxed text-bea-on-surface-variant">Formation professionnelle B.E.A.</p>
            )}
            <div className="mt-4 space-y-2 text-xs text-bea-on-surface-variant">
              {formation.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-bea-primary" />
                  {formation.duration}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                {formation.rating ?? "-"} ({formation.reviewsCount ?? 0} avis)
              </span>
              {formation.modalities.map((m) => (
                <span key={m.id} className="block rounded-full bg-bea-surface-dim px-2 py-0.5 text-[10px]">
                  {m.label}
                </span>
              ))}
            </div>
            <div className="mt-4 border-t border-bea-outline-variant pt-4">
              <span className="text-xl font-bold text-bea-on-surface">
                {formation.priceVisible ? (formation.salePrice || formation.price || "Sur demande") : "Sur demande"}
              </span>
              {formation.salePrice && formation.price && (
                <span className="ml-1 text-xs text-bea-on-surface-variant line-through">{formation.price}</span>
              )}
            </div>
            <Link
              href={formation.href || "#"}
              className="mt-3 flex w-full items-center justify-center rounded-xl bg-bea-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bea-primary/90"
            >
              S&rsquo;inscrire
            </Link>
          </div>

          {/* Vertical nav */}
          <nav className="rounded-2xl border border-bea-outline-variant bg-white p-3">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-bea-on-surface-variant">
              Au programme
            </p>
            <div className="space-y-0.5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-bea-on-surface-variant transition-colors hover:bg-bea-primary/5 hover:text-bea-primary"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </a>
              ))}
              {programmePdfHref && (
                <a
                  href={programmePdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-bea-primary transition-colors hover:bg-bea-primary/5"
                >
                  <FileDown className="size-4" />
                  Programme PDF
                </a>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
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

        <div className="mt-16">
          <RelatedCarousel formations={relatedFormations} />
        </div>
      </div>
    </div>
  )
}
