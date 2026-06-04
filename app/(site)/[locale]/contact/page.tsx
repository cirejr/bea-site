import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { BeaContactPage } from "@/components/contact/page"
import { routing } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Contact - B.E.A (Academic Architect)",
  description:
    "Institutional excellence begins with a conversation. Partner with BOSSE ELANPRO AFRIQUE for your consultancy and architectural training needs.",
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BeaContactPage />
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
