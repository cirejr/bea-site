import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Design3 } from "@/components/formation-page/design-3"
import { getFormationPageData } from "@/components/formation-page/get-formation-page-data"

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function Design3Page({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const data = await getFormationPageData(slug)
  if (!data.formation) notFound()

  return (
    <Design3
      formation={data.formation}
      avis={data.avis}
      complementaryFormations={data.complementaryFormations}
      relatedFormations={data.relatedFormations}
    />
  )
}
