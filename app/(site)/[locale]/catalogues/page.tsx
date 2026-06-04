import type { Metadata } from "next"
import { FileText } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { CataloguesGrid } from "@/components/training/catalogues-grid"
import { CatalogueRequestForm } from "@/components/training/catalogue-request-form"
import { getPdfResources } from "@/lib/data"
import { routing } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "catalogues.hero" })
  return {
    title: `B.E.A. | ${t("title")}`,
    description: t("description"),
  }
}

export default async function CataloguesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("catalogues")

  const all = await getPdfResources({ activeOnly: true })
  const brochures = all
    .filter((r) => r.resourceType === "brochure" && r.formationId == null)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <main className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16 space-y-16">
        <header className="max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-bea-primary">
            <FileText className="h-4 w-4" />
            <span>{t("hero.eyebrow")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-bea-primary font-bea-headline tracking-tighter mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-base md:text-lg text-bea-on-surface-variant font-bea-body leading-relaxed">
            {t("hero.description")}
          </p>
        </header>

        <CatalogueRequestForm locale={locale} />

        <CataloguesGrid resources={brochures} />
      </div>
    </main>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
