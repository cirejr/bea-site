"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { BeaHugeicon } from "@/components/home/hugeicon"

type ProgramType = "certification" | "short-course"
type Level = "beginner" | "intermediate" | "advanced"

interface TrainingProgram {
  id: string
  icon: string
  progress: number
  category: string
  type: ProgramType
  level: Level
}

const trainingPrograms: TrainingProgram[] = [
  { id: "finance", icon: "account_balance_wallet", progress: 85, category: "finance", type: "certification", level: "intermediate" },
  { id: "hr", icon: "badge", progress: 42, category: "hr", type: "certification", level: "intermediate" },
  { id: "ngo", icon: "diversity_3", progress: 12, category: "ngo", type: "certification", level: "beginner" },
  { id: "entrepreneur", icon: "rocket_launch", progress: 0, category: "entrepreneurship", type: "certification", level: "advanced" },
  { id: "management", icon: "leaderboard", progress: 67, category: "management", type: "short-course", level: "advanced" },
  { id: "legal", icon: "gavel", progress: 25, category: "legal", type: "short-course", level: "intermediate" },
]

export type BeaTrainingGridSectionProps = {
  activeCategory: string | null
}

export function BeaTrainingGridSection({ activeCategory }: BeaTrainingGridSectionProps) {
  const tf = useTranslations("training.filters")
  const tp = useTranslations("training.programs")

  const [activeTab, setActiveTab] = useState<"all" | "certification" | "short-course">("all")
  const [showLevelDropdown, setShowLevelDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [sortBy, setSortBy] = useState<"relevance" | "progress-asc" | "progress-desc" | "name">("relevance")

  const filteredPrograms = trainingPrograms.filter((program) => {
    const matchesCategory = !activeCategory || program.category === activeCategory
    const matchesTab = activeTab === "all" || program.type === activeTab
    const matchesLevel = !selectedLevel || program.level === selectedLevel
    return matchesCategory && matchesTab && matchesLevel
  })

  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch (sortBy) {
      case "progress-desc":
        return b.progress - a.progress
      case "progress-asc":
        return a.progress - b.progress
      case "name":
        return tp(`${a.id}.title`).localeCompare(tp(`${b.id}.title`))
      default:
        return 0
    }
  })

  const tabs = [
    { id: "all" as const, label: tf("all") },
    { id: "certification" as const, label: tf("certifications") },
    { id: "short-course" as const, label: tf("shortCourses") },
  ]

  const levels: { id: Level; label: string }[] = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ]

  const sortOptions: { id: typeof sortBy; label: string }[] = [
    { id: "relevance", label: tf("sortRelevance") },
    { id: "progress-desc", label: "Progress: High to Low" },
    { id: "progress-asc", label: "Progress: Low to High" },
    { id: "name", label: "Name: A to Z" },
  ]

  return (
    <>
      <section className="mb-12 flex flex-col md:flex-row gap-4 items-end justify-between">
        <div className="w-full md:w-auto flex flex-col gap-2">
          <label className="font-bea-label text-xs font-bold text-secondary uppercase tracking-widest ml-1">
            Refine Catalog
          </label>
          <div className="flex gap-2">
            <div className="bg-bea-surface-container-low p-1 rounded-full flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full font-bea-headline font-bold text-xs transition-colors ${
                    activeTab === tab.id
                      ? "bg-bea-surface-container-lowest text-bea-primary shadow-sm"
                      : "text-bea-on-surface-variant hover:bg-bea-surface-container-high"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 relative">
          <div className="relative">
            <button
              onClick={() => setShowLevelDropdown(!showLevelDropdown)}
              className="bg-bea-surface-container-low rounded-xl px-4 py-2 flex items-center gap-2 text-secondary cursor-pointer hover:bg-bea-surface-container-high transition-colors"
            >
              <BeaHugeicon name="filter_list" className="text-sm" />
              <span className="text-xs font-bea-headline font-semibold">
                {selectedLevel ? levels.find(l => l.id === selectedLevel)?.label : tf("filterLevel")}
              </span>
            </button>
            {showLevelDropdown && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-bea-surface-container overflow-hidden z-10">
                <button
                  onClick={() => { setSelectedLevel(null); setShowLevelDropdown(false) }}
                  className="w-full px-4 py-2 text-left text-xs hover:bg-bea-surface-container text-bea-secondary"
                >
                  All Levels
                </button>
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => { setSelectedLevel(level.id); setShowLevelDropdown(false) }}
                    className="w-full px-4 py-2 text-left text-xs hover:bg-bea-surface-container text-bea-secondary"
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="bg-bea-surface-container-low rounded-xl px-4 py-2 flex items-center gap-2 text-secondary cursor-pointer hover:bg-bea-surface-container-high transition-colors"
            >
              <BeaHugeicon name="sort" className="text-sm" />
              <span className="text-xs font-bea-headline font-semibold">{tf("sortRelevance")}</span>
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-bea-surface-container overflow-hidden z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => { setSortBy(option.id); setShowSortDropdown(false) }}
                    className="w-full px-4 py-2 text-left text-xs hover:bg-bea-surface-container text-bea-secondary"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {sortedPrograms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-bea-secondary font-bea-body">No programs match your filters.</p>
          <button
            onClick={() => { setActiveTab("all"); setSelectedLevel(null) }}
            className="mt-4 text-bea-primary font-bea-headline font-bold text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPrograms.map((program) => (
            <article
              key={program.id}
              className="bg-bea-surface-container-lowest rounded-lg p-8 shadow-soft flex flex-col h-full hover:translate-y-[-4px] transition-transform group cursor-pointer"
            >
              <div className="w-14 h-14 bg-bea-surface-container rounded-2xl flex items-center justify-center mb-6 text-bea-primary group-hover:bg-bea-primary group-hover:text-white transition-all duration-300">
                <BeaHugeicon
                  name={program.icon as "account_balance_wallet" | "badge" | "diversity_3" | "rocket_launch" | "leaderboard" | "gavel"}
                  className="text-3xl"
                />
              </div>
              <span className="font-bea-label text-[10px] font-extrabold text-secondary tracking-[0.2em] uppercase mb-2">
                {tp(`${program.id}.category`)}
              </span>
              <h3 className="text-2xl font-bold text-bea-on-surface font-bea-headline mb-3 leading-tight">
                {tp(`${program.id}.title`)}
              </h3>
              <p className="text-bea-on-surface-variant font-bea-body text-sm mb-8 flex-1 leading-relaxed">
                {tp(`${program.id}.description`)}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
