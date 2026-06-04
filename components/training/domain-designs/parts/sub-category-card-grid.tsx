import { ArrowRight, BookOpen } from "lucide-react"
import type { SubCategory } from "@/lib/data"

type SubCategoryCardGridProps = {
  domainSlug: string
  subCategories: SubCategory[]
  formationCounts: Record<number, number>
  variant?: "default" | "asymmetric" | "compact"
  title?: string
  eyebrow?: string
}

export function SubCategoryCardGrid({
  domainSlug,
  subCategories,
  formationCounts,
  variant = "default",
  title,
  eyebrow,
}: SubCategoryCardGridProps) {
  if (subCategories.length === 0) return null

  const gridClass =
    variant === "compact"
      ? "grid gap-2 sm:grid-cols-2 xl:grid-cols-3"
      : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"

  return (
    <section className="mb-12">
      {(title || eyebrow) && (
        <div className="mb-6">
          {eyebrow && (
            <p className="mb-2 text-xs font-bold tracking-widest text-bea-primary uppercase">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-bea-headline text-2xl font-black tracking-tighter text-bea-primary md:text-3xl">
              {title}
            </h2>
          )}
        </div>
      )}
      <div className={gridClass}>
        {subCategories.map((sub, index) => {
          const count = formationCounts[sub.id] ?? 0
          const href = `/formations/${domainSlug}/${sub.slug}`
          const isFeatured = variant === "asymmetric" && index === 0
          if (variant === "compact") {
            return (
              <a
                key={sub.id}
                href={href}
                className="group inline-flex items-center justify-between gap-2 rounded-full border border-bea-outline-variant bg-white px-4 py-2 text-sm font-medium text-bea-on-surface transition-colors hover:border-bea-primary/40 hover:bg-bea-primary/5"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-bea-primary" />
                  {sub.label}
                </span>
                <span className="text-xs text-bea-on-surface-variant">
                  {count}
                </span>
              </a>
            )
          }
          return (
            <a
              key={sub.id}
              href={href}
              className={`group block rounded-2xl border border-bea-outline-variant bg-white p-5 transition-all duration-200 hover:border-bea-primary/30 hover:shadow-md ${
                isFeatured ? "sm:col-span-2 xl:col-span-2 xl:row-span-2" : ""
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-bea-primary/5">
                  <BookOpen className="h-5 w-5 text-bea-primary" />
                </div>
                <span className="rounded-full bg-bea-primary/5 px-2.5 py-0.5 text-xs font-semibold text-bea-primary">
                  {count} formation{count !== 1 ? "s" : ""}
                </span>
              </div>
              <h3
                className={`mb-1.5 leading-snug font-semibold text-bea-on-surface ${isFeatured ? "text-xl" : "text-base"}`}
              >
                {sub.label}
              </h3>
              {sub.description && (
                <p
                  className={`mb-3 leading-snug text-bea-on-surface-variant ${isFeatured ? "line-clamp-3 text-sm" : "line-clamp-2 text-sm"}`}
                >
                  {sub.description}
                </p>
              )}
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-bea-primary">
                Voir les formations
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
