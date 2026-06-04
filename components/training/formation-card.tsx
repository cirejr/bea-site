"use client"

import { useLocale } from "next-intl"
import Link from "next/link"
import { Star, Clock } from "lucide-react"
import type { FormationWithRelations } from "@/lib/data"

type FormationCardProps = {
  formation: FormationWithRelations
}

export function FormationCard({ formation }: FormationCardProps) {
  const locale = useLocale()
  const price = formation.priceVisible
    ? (formation.salePrice || formation.price || "Sur demande")
    : "Sur demande"
  const badges = formation.badges ?? []
  const subCategoryLabel = formation.subCategory?.label

  return (
    <div className="group rounded-2xl border border-bea-outline-variant bg-white p-6 transition-all hover:border-bea-primary/30 hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          {badges.length > 0 && (
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: badge.color + "18", color: badge.color }}
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: badge.color }} />
                  {badge.name}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/${locale}/formations/${formation.slug}`}
            className="text-lg font-bold text-bea-on-surface hover:text-bea-primary"
          >
            {formation.title}
          </Link>

          {subCategoryLabel && (
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-bea-on-surface-variant">
              {subCategoryLabel}
            </p>
          )}

          {(formation.summary || formation.description) && (
            <p className="mt-1.5 text-sm leading-relaxed text-bea-on-surface-variant line-clamp-2">
              {formation.summary ?? formation.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-bea-on-surface-variant">
            {formation.duration && (
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {formation.duration}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {formation.rating ?? "-"} ({formation.reviewsCount ?? 0} avis)
            </span>
            {formation.modalities.map((m) => (
              <span key={m.id} className="rounded-full bg-bea-surface-dim px-2 py-0.5">
                {m.label}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 text-left md:text-right">
          <div className="text-xl font-bold text-bea-on-surface">{price}</div>
          <div className="mt-3 flex gap-2">
            <Link
              href={`/${locale}/formations/${formation.slug}`}
              className="rounded-xl border border-bea-outline-variant px-4 py-2 text-xs font-semibold text-bea-on-surface transition-colors hover:border-bea-primary hover:text-bea-primary"
            >
              Détails
            </Link>
            <a
              href={formation.href ?? "/contact"}
              className="rounded-xl bg-bea-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-bea-primary/90"
            >
              S&rsquo;inscrire
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
