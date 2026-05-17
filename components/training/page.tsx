"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { BeaTrainingGridSection } from "./grid-section"
import { BeaTrainingHeroSection } from "./hero-section"

function TrainingPageContent() {
  const searchParams = useSearchParams()
  const domain = searchParams.get("domain") || null

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <BeaTrainingHeroSection />
        <BeaTrainingGridSection activeDomain={domain} />
      </div>
    </div>
  )
}

export type BeaTrainingPageProps = Readonly<Record<string, never>>

export function BeaTrainingPage(_props: BeaTrainingPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16" />
      </div>
    }>
      <TrainingPageContent />
    </Suspense>
  )
}
