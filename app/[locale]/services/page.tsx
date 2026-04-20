import { redirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { routing } from "@/lib/routing"

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  redirect(`/${locale}/consultancy`)
}

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
