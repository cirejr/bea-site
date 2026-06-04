"use client"

import { useState, useMemo } from "react"
import { Search, GraduationCap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Domain, FormationWithRelations, Modality, SubCategory } from "@/lib/data"
import { FormationCard } from "./formation-card"

type Design1Props = {
  domain: Domain
  subCategory: SubCategory
  formations: FormationWithRelations[]
  domains: Domain[]
  subCategories: SubCategory[]
  modalities: Modality[]
}

export function Design1({ domain, subCategory, formations, modalities }: Design1Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModality, setSelectedModality] = useState("all")

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return formations.filter((f) => {
      if (selectedModality !== "all" && !f.modalities.some((m) => m.slug === selectedModality)) return false
      if (query && !f.title.toLowerCase().includes(query) && !(f.summary ?? "").toLowerCase().includes(query)) return false
      return true
    })
  }, [formations, searchQuery, selectedModality])

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bea-primary via-bea-primary/90 to-bea-primary/70">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {domain.label}
              </span>
              <h1 className="text-3xl font-black text-white md:text-5xl">{subCategory.label}</h1>
              <p className="mt-3 max-w-2xl text-base text-white/80">
                {subCategory.description ?? `Découvrez les formations ${subCategory.label} du domaine ${domain.label}.`}
              </p>
              <p className="mt-2 text-sm text-white/60">{results.length} formation{results.length !== 1 ? "s" : ""} disponible{results.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <GraduationCap className="size-8 text-white" />
              <div>
                <p className="text-sm font-semibold text-white">Domaine</p>
                <p className="text-xs text-white/70">{domain.label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-bea-outline-variant bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 md:px-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bea-on-surface-variant" />
            <Input
              placeholder={`Rechercher dans ${subCategory.label}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-bea-outline-variant bg-bea-surface pl-9"
            />
          </div>
          <Select
            value={selectedModality}
            onValueChange={(v) => v && setSelectedModality(v)}
            items={Object.fromEntries([
              ["all", "Toutes les modalités"],
              ...modalities.map((m) => [m.slug, m.label]),
            ])}
          >
            <SelectTrigger className="w-48 border-bea-outline-variant bg-white">
              <SelectValue placeholder="Modalité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les modalités</SelectItem>
              {modalities.map((m) => (
                <SelectItem key={m.id} value={m.slug}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Expanded list */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        {results.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-bea-on-surface-variant">Aucune formation ne correspond à vos critères.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((f) => (
              <FormationCard key={f.id} formation={f} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
