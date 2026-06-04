import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { FormationsCertifiantesPage } from "@/components/formations-certifiantes/page"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === "fr"
        ? "B.E.A. | Formations certifiantes"
        : "B.E.A. | Certified Training",
    description:
      locale === "fr"
        ? "12 certificats en finance, audit, RH et entrepreneuriat."
        : "12 certificates in finance, audit, HR and entrepreneurship.",
  }
}

export default async function FormationsCertifiantesIndex({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <FormationsCertifiantesPage />
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
