import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { BeaTrainingPage } from "@/components/training/page"
import { routing } from "@/i18n/routing"
import {
  getDomains,
  getFormations,
  getModalities,
  getSubCategories,
} from "@/lib/data"

export const metadata: Metadata = {
  title: "B.E.A. Formations | Excellence Professionnelle",
  description:
    "Découvrez notre catalogue de formations professionnelles. De la conformité SYSCOHADA à la gestion moderne, maîtrisez les cadres qui favorisent l'excellence.",
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [formations, domains, subCategories, modalities] = await Promise.all([
    getFormations(),
    getDomains({ activeOnly: true }),
    getSubCategories(undefined, { activeOnly: true }),
    getModalities(),
  ])

  return (
    <BeaTrainingPage
      formations={formations}
      domains={domains}
      subCategories={subCategories}
      modalities={modalities}
    />
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
