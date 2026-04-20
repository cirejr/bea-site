import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { BeaHomePage } from "@/components/home/home-page"
import { routing } from "@/lib/routing"

export const metadata: Metadata = {
  title: "B.E.A. - Bosse Elanpro Afrique | Strategic Growth & Certification",
  description:
    "Empowering African enterprises through architectural precision in strategy, leadership mentoring, and financial excellence.",
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BeaHomePage />
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
