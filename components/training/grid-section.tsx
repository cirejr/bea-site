"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { CourseCard, type CourseCardData } from "./course-card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  courses,
  domainConfig,
  getSubCategoriesByDomain,
  filterCourses,
  getModaliteLabel,
  type Modalite,
} from "@/lib/data/courses"

type BeaTrainingGridSectionProps = {
  activeDomain: string | null
}

const allModalites: Modalite[] = ["presentiel", "distance", "captation", "blended"]

export function BeaTrainingGridSection({ activeDomain }: BeaTrainingGridSectionProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(activeDomain)
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [selectedModalite, setSelectedModalite] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const subCategories = useMemo(
    () => (selectedDomain ? getSubCategoriesByDomain(selectedDomain) : []),
    [selectedDomain]
  )

  const results = useMemo(
    () =>
      filterCourses({
        domain: selectedDomain,
        subCategory: selectedSub,
        modalite: getModaliteFromValue(selectedModalite),
        searchQuery: searchQuery || undefined,
      }),
    [selectedDomain, selectedSub, selectedModalite, searchQuery]
  )

  const hasActiveFilters =
    selectedDomain !== activeDomain ||
    selectedSub !== null ||
    selectedModalite !== "all" ||
    searchQuery !== ""

  const clearFilters = () => {
    setSelectedDomain(activeDomain)
    setSelectedSub(null)
    setSelectedModalite("all")
    setSearchQuery("")
  }

  return (
    <>
      <section className="mb-8 flex flex-col gap-5">
        <div className="relative max-w-md rounded-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none" />
          <Input
            placeholder="Rechercher une formation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-bea-outline-variant"
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-bea-on-surface-variant uppercase tracking-widest">
              Domaine
            </label>
            <Select
              value={selectedDomain ?? "all"}
              onValueChange={(v) => {
                setSelectedDomain(v === "all" ? null : v)
                setSelectedSub(null)
              }}
            >
              <SelectTrigger className="min-w-[200px] bg-white border-bea-outline-variant">
                <SelectValue placeholder="Tous les domaines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les domaines</SelectItem>
                {Object.entries(domainConfig).map(([slug, c]) => (
                  <SelectItem key={slug} value={slug}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-bea-on-surface-variant uppercase tracking-widest">
              Sous-catégorie
            </label>
            <Select
              value={selectedSub ?? "all"}
              onValueChange={(v) => setSelectedSub(v === "all" ? null : v)}
            >
              <SelectTrigger className="min-w-[220px] bg-white border-bea-outline-variant">
                <SelectValue placeholder="Toutes les sous-catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sous-catégories</SelectItem>
                {subCategories.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-bea-on-surface-variant uppercase tracking-widest">
              Modalité
            </label>
            <Select
              value={selectedModalite}
              onValueChange={(v) => setSelectedModalite(v ?? "all")}
            >
              <SelectTrigger className="min-w-[180px] bg-white border-bea-outline-variant">
                <SelectValue placeholder="Toutes les modalités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les modalités</SelectItem>
                {allModalites.map((m) => (
                  <SelectItem key={m} value={m}>
                    {getModaliteLabel(m)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="self-start text-xs font-semibold text-bea-primary hover:underline"
          >
            Effacer tous les filtres
          </button>
        )}
      </section>

      <p className="text-sm text-bea-on-surface-variant mb-4">
        {results.length} formation{results.length !== 1 ? "s" : ""} trouvée
        {results.length !== 1 ? "s" : ""}
      </p>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-bea-on-surface-variant font-bea-body text-sm">
            Aucune formation ne correspond à vos critères.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-bea-primary font-semibold text-sm hover:underline"
          >
            Effacer les filtres
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((course) => {
            const cardData: CourseCardData = {
              title: course.title,
              price: course.price,
              rating: course.rating,
              reviews: course.reviews,
              duration: course.duration,
              modalities: course.modalities.map((m) => getModaliteLabel(m)),
              badge: course.badge,
              domain: domainConfig[course.domain]?.label ?? course.domain,
              href: course.href,
            }
            return <CourseCard key={course.id} course={cardData} />
          })}
        </div>
      )}
    </>
  )
}

function getModaliteFromValue(v: string): Modalite | null {
  if (v === "all" || v === null) return null
  if (["presentiel", "distance", "captation", "blended"].includes(v)) {
    return v as Modalite
  }
  return null
}
