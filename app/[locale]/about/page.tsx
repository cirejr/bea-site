import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { BeaAboutPage } from "@/components/about/page"
import { routing } from "@/lib/routing"

export const metadata: Metadata = {
  title: "About | BOSSE ELANPRO AFRIQUE (B.E.A.)",
  description:
    "Forging the architectural backbone of African business through intellectual rigor and strategic precision.",
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BeaAboutPage />
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}