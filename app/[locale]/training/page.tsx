import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { BeaTrainingPage } from "@/components/training/page"
import { routing } from "@/lib/routing"

export const metadata: Metadata = {
  title: "B.E.A. Training Catalog | Professional Excellence",
  description:
    "Elevate your professional trajectory with our accredited certification programs. From SYSCOHADA compliance to modern NGO management, master the frameworks that drive African excellence.",
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BeaTrainingPage />
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
