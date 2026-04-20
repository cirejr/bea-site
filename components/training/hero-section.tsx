"use client"

import { useTranslations } from "next-intl"

export type BeaTrainingHeroSectionProps = Readonly<Record<string, never>>

export function BeaTrainingHeroSection(_props: BeaTrainingHeroSectionProps) {
  const t = useTranslations("training.hero")

  return (
    <header className="mb-12 max-w-4xl">
      <h1 className="text-5xl font-black text-bea-primary font-bea-headline tracking-tighter mb-4">
        {t("title")}
      </h1>
      <p className="text-xl text-bea-on-surface-variant font-bea-body leading-relaxed max-w-2xl">
        {t("description")}
      </p>
    </header>
  )
}
