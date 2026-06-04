"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import { CourseCard, type CourseCardData } from "./course-card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type {
  Domain,
  FormationWithRelations,
  Modality,
  SubCategory,
} from "@/lib/data"

type BeaTrainingGridSectionProps = {
  activeDomain: string | null
  activeSubCategory?: string | null
  formations?: FormationWithRelations[]
  domains?: Domain[]
  subCategories?: SubCategory[]
  modalities?: Modality[]
}

export function BeaTrainingGridSection({
  activeDomain,
  activeSubCategory = null,
  formations = [],
  domains = [],
  subCategories = [],
  modalities = [],
}: BeaTrainingGridSectionProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(
    activeDomain
  )
  const [selectedSub, setSelectedSub] = useState<string | null>(
    activeSubCategory
  )
  const [selectedModality, setSelectedModality] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const visibleSubCategories = useMemo(() => {
    if (!selectedDomain) return subCategories
    const domain = domains.find((item) => item.slug === selectedDomain)
    return domain
      ? subCategories.filter((item) => item.domainId === domain.id)
      : []
  }, [domains, selectedDomain, subCategories])

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return formations.filter((formation) => {
      if (selectedDomain && formation.domain.slug !== selectedDomain)
        return false
      if (selectedSub && formation.subCategory?.slug !== selectedSub)
        return false
      if (
        selectedModality !== "all" &&
        !formation.modalities.some((item) => item.slug === selectedModality)
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
  }, [formations, searchQuery, selectedDomain, selectedModality, selectedSub])

  const hasActiveFilters =
    selectedDomain !== activeDomain ||
    selectedSub !== null ||
    selectedModality !== "all" ||
    searchQuery !== ""
  const clearFilters = () => {
    setSelectedDomain(activeDomain)
    setSelectedSub(null)
    setSelectedModality("all")
    setSearchQuery("")
  }

  return (
    <>
      <section className="mx-auto mb-8 flex max-w-7xl flex-col gap-5">
        <div className="relative max-w-md rounded-2xl">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Rechercher une formation..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="border-bea-outline-variant bg-white pl-9"
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest text-bea-on-surface-variant uppercase">
              Domaine
            </label>
            <Select
              value={selectedDomain ?? "all"}
              onValueChange={(value) => {
                setSelectedDomain(value === "all" ? null : value)
                setSelectedSub(null)
              }}
            >
              <SelectTrigger className="min-w-[200px] border-bea-outline-variant bg-white">
                <SelectValue placeholder="Tous les domaines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les domaines</SelectItem>
                {domains.map((domain) => (
                  <SelectItem key={domain.id} value={domain.slug}>
                    {domain.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest text-bea-on-surface-variant uppercase">
              Sous-catégorie
            </label>
            <Select
              value={selectedSub ?? "all"}
              onValueChange={(value) =>
                setSelectedSub(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="min-w-[220px] border-bea-outline-variant bg-white">
                <SelectValue placeholder="Toutes les sous-catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sous-catégories</SelectItem>
                {visibleSubCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.slug}>
                    {subCategory.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 rounded-2xl border border-bea-primary/15 bg-bea-primary/5 px-3 py-2">
            <label className="text-xs font-bold tracking-widest text-bea-primary uppercase">
              Modalité
            </label>
            <Select
              value={selectedModality}
              onValueChange={(value) => setSelectedModality(value ?? "all")}
            >
              <SelectTrigger className="min-w-[200px] border-bea-outline-variant bg-white">
                <SelectValue placeholder="Toutes les modalités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les modalités</SelectItem>
                {modalities.map((modality) => (
                  <SelectItem key={modality.id} value={modality.slug}>
                    {modality.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedModality !== "all" && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-bea-on-surface-variant">
              Filtrer par modalité :
            </span>
            <button
              type="button"
              onClick={() => setSelectedModality("all")}
              className="inline-flex items-center gap-1.5 rounded-full bg-bea-primary px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-bea-primary/90"
            >
              {modalities.find((m) => m.slug === selectedModality)?.label ??
                selectedModality}
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="self-start text-xs font-semibold text-bea-primary hover:underline"
          >
            Effacer tous les filtres
          </button>
        )}
      </section>

      <p className="mb-4 text-sm text-bea-on-surface-variant">
        {results.length} formation{results.length !== 1 ? "s" : ""} trouvée
        {results.length !== 1 ? "s" : ""}
      </p>

      {results.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-bea-body text-sm text-bea-on-surface-variant">
            Aucune formation ne correspond à vos critères.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm font-semibold text-bea-primary hover:underline"
          >
            Effacer les filtres
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
              modalities: formation.modalities.map((item) => item.label),
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
