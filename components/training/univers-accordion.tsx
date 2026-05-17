"use client"

import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { CourseCard, type CourseCardData } from "./course-card"
import {
  filterCourses,
  getModaliteLabel,
  domainConfig,
} from "@/lib/data/courses"

type UniversEntry = {
  title: string
  description: string
  subCategories: string[]
  domainSlug: string
  subCategorySlug?: string
  icon: React.ReactNode
}

type UniversAccordionProps = {
  universList: UniversEntry[]
}

function UniversCollapsibleItem({ entry }: { entry: UniversEntry }) {
  const [open, setOpen] = useState(false)

  const results = useMemo(
    () =>
      filterCourses({
        domain: entry.domainSlug,
        subCategory: entry.subCategorySlug ?? null,
        modalite: null,
        searchQuery: undefined,
      }),
    [entry.domainSlug, entry.subCategorySlug]
  )

  return (
    <div className="rounded-2xl border border-bea-outline-variant bg-white overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 p-5 text-left hover:bg-bea-surface/50 transition-colors"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-bea-primary/10 text-bea-primary">
          {entry.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold text-bea-on-surface font-bea-headline">
              {entry.title}
            </h3>
            <ChevronDown
              className={`size-5 shrink-0 text-bea-on-surface-variant transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
          <p className="text-sm text-bea-on-surface-variant leading-relaxed mt-1">
            {entry.description}
          </p>
          {entry.subCategories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {entry.subCategories.map((sc) => (
                <span
                  key={sc}
                  className="rounded-full bg-bea-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-bea-primary"
                >
                  {sc}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-bea-outline-variant px-5 pb-5 pt-4">
          {results.length === 0 ? (
            <p className="text-sm text-bea-on-surface-variant text-center py-6">
              Aucune formation disponible dans cette catégorie pour le moment.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((course) => {
                const card: CourseCardData = {
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
                return <CourseCard key={course.id} course={card} />
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function UniversAccordion({ universList }: UniversAccordionProps) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-bea-on-surface font-bea-headline mb-2 flex items-center gap-2">
        <span className="h-1 w-8 rounded-full bg-bea-primary shrink-0" />
        Les univers de formations incontournables
      </h2>
      <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-6">
        Sélection de formations populaires et actualisées, couvrant la fiscalité, la paie, le droit
        des affaires, la RSE, les ressources humaines, la comptabilité, le CSE et bien plus.
      </p>
      <div className="flex flex-col gap-3">
        {universList.map((u) => (
          <UniversCollapsibleItem key={u.title} entry={u} />
        ))}
      </div>
    </section>
  )
}
