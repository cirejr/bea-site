import { FormationSectionsAccordion } from "@/components/formation-page/sections-accordion"
import { RelatedCarousel } from "@/components/formation-page/related-carousel"
import { TipTapContent } from "@/components/formation-page/tiptap-content"
import type { FormationWithRelations, Avi } from "@/lib/data"
import { Clock, Star, FileDown } from "lucide-react"
import Link from "next/link"

type Design4Props = {
  formation: FormationWithRelations
  avis: Avi[]
  complementaryFormations: FormationWithRelations[]
  relatedFormations: FormationWithRelations[]
}

const navItems = [
  { id: "objectifs", label: "Objectifs", num: "01" },
  { id: "programme", label: "Programme", num: "02" },
  { id: "pourQui", label: "Pour qui ?", num: "03" },
  { id: "financement", label: "Financement", num: "04" },
  { id: "avis", label: "Avis", num: "05" },
]

export function Design4({
  formation,
  avis,
  complementaryFormations,
  relatedFormations,
}: Design4Props) {
  const programmePdfHref =
    formation.href ?? formation.pdfResources?.[0]?.url ?? null
  const badges = formation.badges ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      {/* Compact hero row */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-bea-primary/10 px-3 py-1 text-xs font-semibold text-bea-primary">
              {formation.domain.label}
            </span>
            {badges.map((badge) => (
              <span
                key={badge.id}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: badge.color + "18",
                  color: badge.color,
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: badge.color }}
                />
                {badge.name}
              </span>
            ))}
          </div>

          <h1 className="mb-3 text-3xl leading-tight font-black text-bea-on-surface md:text-4xl">
            {formation.title}
          </h1>

          {formation.summary ? (
            <TipTapContent
              html={formation.summary}
              className="max-w-2xl text-sm leading-relaxed text-bea-on-surface-variant"
            />
          ) : (
            <p className="max-w-2xl text-sm leading-relaxed text-bea-on-surface-variant">
              Formation professionnelle B.E.A.
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-bea-on-surface-variant">
            {formation.duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-bea-primary" />
                {formation.duration}
              </span>
            )}
            {formation.modalities.map((m) => (
              <span
                key={m.id}
                className="rounded-full bg-bea-surface-dim px-2.5 py-0.5 text-xs"
              >
                {m.label}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {formation.rating ?? "-"} ({formation.reviewsCount ?? 0} avis)
            </span>
          </div>
        </div>

        <div className="shrink-0 rounded-2xl border border-bea-outline-variant bg-white p-5 md:w-64">
          <div className="text-2xl font-bold text-bea-on-surface">
            {formation.priceVisible
              ? formation.salePrice || formation.price || "Sur demande"
              : "Sur demande"}
          </div>
          {formation.salePrice && formation.price && (
            <div className="text-sm text-bea-on-surface-variant line-through">
              {formation.price}
            </div>
          )}
          {formation.taxLabel && (
            <div className="text-xs text-bea-on-surface-variant">
              {formation.taxLabel}
            </div>
          )}
          <Link
            href={formation.href || "#"}
            className="mt-3 flex items-center justify-center rounded-xl bg-bea-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bea-primary/90"
          >
            S&rsquo;inscrire
          </Link>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Vertical TOC */}
        <nav className="hidden w-48 shrink-0 md:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-3 text-[10px] font-semibold tracking-wider text-bea-on-surface-variant uppercase">
              Sommaire
            </p>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-bea-on-surface-variant transition-colors hover:bg-bea-primary/5 hover:text-bea-primary"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-bea-primary/5 text-[10px] font-bold text-bea-primary">
                  {item.num}
                </span>
                {item.label}
              </a>
            ))}
            {programmePdfHref && (
              <a
                href={programmePdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-bea-primary transition-colors hover:bg-bea-primary/5"
              >
                <FileDown className="size-4" />
                Programme PDF
              </a>
            )}
          </div>
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-4">
            <TipTapContent html={formation.description as string} />
          </div>
          <FormationSectionsAccordion
            objectifs={(formation.objectifs as string[]) ?? []}
            programmes={formation.programmes}
            pourQui={formation.pourQui}
            financement={formation.financement}
            avis={avis}
            complementaryFormations={complementaryFormations}
            programmePdfHref={programmePdfHref}
          />
        </div>
      </div>

      <div className="mt-16">
        <RelatedCarousel formations={relatedFormations} />
      </div>
    </div>
  )
}
