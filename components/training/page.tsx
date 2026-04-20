"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { BeaTrainingGridSection } from "./grid-section"
import { BeaTrainingHeroSection } from "./hero-section"
import { BeaTrainingSidebarSection } from "./sidebar-section"

function TrainingPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || null

  return (
    <div className="flex pt-20 min-h-screen max-w-7xl mx-auto">
      <main className="flex-1 px-8 lg:px-12 py-10 bg-bea-surface font-bea-body text-bea-on-surface antialiased">
        <BeaTrainingHeroSection />
        <BeaTrainingGridSection activeCategory={category as never} />
      </main>
    </div>
  )
}

export type BeaTrainingPageProps = Readonly<Record<string, never>>

export function BeaTrainingPage(_props: BeaTrainingPageProps) {
  return (
    <Suspense fallback={
      <div className="flex pt-20 min-h-screen">
        <div className="w-64 bg-bea-surface hidden md:flex" />
        <div className="flex-1 px-8 lg:px-12 py-10 bg-bea-surface" />
      </div>
    }>
      <TrainingPageContent />
    </Suspense>
  )
}
