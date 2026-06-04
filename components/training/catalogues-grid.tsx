import { Download, Mail, FileText } from "lucide-react"
import { getTranslations } from "next-intl/server"
import type { PdfResource } from "@/lib/data"

type CataloguesGridProps = {
  resources: PdfResource[]
}

export async function CataloguesGrid({ resources }: CataloguesGridProps) {
  const t = await getTranslations("catalogues")

  if (resources.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-bea-outline-variant bg-white p-10 text-center">
        <FileText className="mx-auto mb-3 h-8 w-8 text-bea-on-surface-variant" />
        <p className="text-sm text-bea-on-surface-variant">{t("empty")}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource) => {
        const hasUrl = Boolean(resource.url)
        const subject = encodeURIComponent(`Demande de catalogue : ${resource.title}`)
        const mailto = `mailto:contact@bea-afrique.sn?subject=${subject}`
        return (
          <article
            key={resource.id}
            className="flex h-full flex-col rounded-2xl border border-bea-outline-variant bg-white p-5 transition-all duration-200 hover:border-bea-primary/30 hover:shadow-md"
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-bea-primary/5">
                <FileText className="h-5 w-5 text-bea-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-bea-on-surface leading-snug">
                  {resource.title}
                </h3>
              </div>
            </div>
            {resource.description && (
              <p className="mb-5 text-sm text-bea-on-surface-variant leading-relaxed line-clamp-3">
                {resource.description}
              </p>
            )}
            <div className="mt-auto pt-3 border-t border-bea-outline-variant">
              {hasUrl ? (
                <a
                  href={resource.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bea-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bea-primary/90"
                >
                  <Download className="h-4 w-4" />
                  {t("actions.download")}
                </a>
              ) : (
                <a
                  href={mailto}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-bea-primary/30 bg-white px-4 py-2.5 text-sm font-semibold text-bea-primary transition-colors hover:bg-bea-primary/5"
                >
                  <Mail className="h-4 w-4" />
                  {t("actions.request")}
                </a>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}
