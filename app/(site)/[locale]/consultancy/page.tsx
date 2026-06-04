import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { BeaConsultancyPage } from "@/components/consultancy/page"
import { routing } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Consultancy & Strategic Advisory | B.E.A.",
  description:
    "Tailored consultancy services designed for sustainable growth, navigating the unique complexities of the regional landscape with academic rigor and architectural precision.",
}

export default async function ConsultancyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BeaConsultancyPage />
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
