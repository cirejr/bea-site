"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import {
  CourseCard,
  type CourseCardData,
} from "@/components/training/course-card"
import type { FormationWithRelations, Modality, SubCategory } from "@/lib/data"

type DomainFilterAndGridProps = {
  activeDomain: string
  formations: FormationWithRelations[]
  subCategories: SubCategory[]
  modalities: Modality[]
  showSubCategorySelect?: boolean
  showModalityPills?: boolean
  variant?: "default" | "command-bar" | "stacked"
}

export function DomainFilterAndGrid({
  activeDomain,
  formations,
  subCategories,
  modalities,
  showSubCategorySelect = true,
  showModalityPills = true,
  variant = "default",
}: DomainFilterAndGridProps) {
  const [selectedSub, setSelectedSub] = useState<string>("all")
  const [selectedModality, setSelectedModality] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const visibleSubCategories = subCategories

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return formations.filter((formation) => {
      if (formation.domain.slug !== activeDomain) return false
      if (selectedSub !== "all" && formation.subCategory?.slug !== selectedSub)
        return false
      if (
        selectedModality !== "all" &&
        !formation.modalities.some((m) => m.slug === selectedModality)
      )
        return false
      if (
        query &&
        !formation.title.toLowerCase().includes(query) &&
        !(formation.summary ?? "").toLowerCase().includes(query)
      )
        return false
      return true
    })
  }, [formations, searchQuery, activeDomain, selectedSub, selectedModality])

  const modalityCounts = useMemo(() => {
    const counts: Record<string, number> = { all: formations.length }
    for (const formation of formations) {
      for (const modality of formation.modalities) {
        counts[modality.slug] = (counts[modality.slug] ?? 0) + 1
      }
    }
    return counts
  }, [formations])

  const hasActiveFilters =
    selectedSub !== "all" || selectedModality !== "all" || searchQuery !== ""
  const clearFilters = () => {
    setSelectedSub("all")
    setSelectedModality("all")
    setSearchQuery("")
  }

  return (
    <>
      {variant === "command-bar" ? (
        <div className="rounded-2xl border border-bea-outline-variant bg-white p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-bea-on-surface-variant" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une formation..."
                className="w-full rounded-xl border border-bea-outline-variant bg-white py-2.5 pr-3 pl-10 text-sm outline-none focus:border-bea-primary"
              />
            </div>
          </div>
          {showModalityPills && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-bea-outline-variant pt-3">
              <ModalityPill
                label="Toutes"
                count={modalityCounts.all}
                active={selectedModality === "all"}
                onClick={() => setSelectedModality("all")}
              />
              {modalities.map((m) => (
                <ModalityPill
                  key={m.id}
                  label={m.label}
                  count={modalityCounts[m.slug] ?? 0}
                  active={selectedModality === m.slug}
                  onClick={() => setSelectedModality(m.slug)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="relative max-w-md rounded-2xl">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-bea-on-surface-variant" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une formation..."
                className="w-full rounded-2xl border border-bea-outline-variant bg-white py-2.5 pr-3 pl-9 text-sm outline-none focus:border-bea-primary"
              />
            </div>
            {showSubCategorySelect && (
              <select
                value={selectedSub}
                onChange={(e) => setSelectedSub(e.target.value)}
                className="rounded-2xl border border-bea-outline-variant bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-bea-primary"
              >
                <option value="all">Toutes les sous-catégories</option>
                {visibleSubCategories.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          {showModalityPills && (
            <div className="flex flex-wrap gap-2">
              <ModalityPill
                label="Toutes"
                count={modalityCounts.all}
                active={selectedModality === "all"}
                onClick={() => setSelectedModality("all")}
              />
              {modalities.map((m) => (
                <ModalityPill
                  key={m.id}
                  label={m.label}
                  count={modalityCounts[m.slug] ?? 0}
                  active={selectedModality === m.slug}
                  onClick={() => setSelectedModality(m.slug)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {(selectedModality !== "all" || hasActiveFilters) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {selectedModality !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedModality("all")}
              className="inline-flex items-center gap-1.5 rounded-full bg-bea-primary px-3 py-1 text-xs font-semibold text-white hover:bg-bea-primary/90"
            >
              {modalities.find((m) => m.slug === selectedModality)?.label ??
                selectedModality}
              <X className="h-3 w-3" />
            </button>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-bea-primary hover:underline"
            >
              Effacer tous les filtres
            </button>
          )}
        </div>
      )}

      <p className="mt-6 mb-4 text-sm text-bea-on-surface-variant">
        {results.length} formation{results.length !== 1 ? "s" : ""} trouvée
        {results.length !== 1 ? "s" : ""}
      </p>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-bea-outline-variant py-12 text-center">
          <p className="font-bea-body text-sm text-bea-on-surface-variant">
            Aucune formation ne correspond à vos critères.
          </p>
          <button
            onClick={clearFilters}
            className="mt-3 text-sm font-semibold text-bea-primary hover:underline"
          >
            Effacer les filtres
          </button>
        </div>
      ) : (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((formation) => {
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
      )}
    </>
  )
}

function ModalityPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-bea-primary bg-bea-primary text-white"
          : "border-bea-outline-variant bg-white text-bea-on-surface-variant hover:border-bea-primary/40 hover:text-bea-primary"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-[10px] font-bold ${active ? "bg-white/20 text-white" : "bg-bea-surface text-bea-on-surface-variant"}`}
      >
        {count}
      </span>
    </button>
  )
}
