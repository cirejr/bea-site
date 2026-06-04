import { getDomainVisual, type DomainVisual } from "@/lib/data/domain-visuals"

export function DomainHeroImage({
  slug,
  locale,
  className = "h-72 md:h-96 w-full rounded-2xl object-cover shadow-sm",
}: {
  slug: string
  locale: "fr" | "en"
  className?: string
}) {
  const visual = getDomainVisual(slug)
  if (!visual) return null
  const alt = visual.alt[locale] ?? visual.alt.fr
  return <img src={visual.src} alt={alt} className={className} loading="eager" />
}

export function getDomainVisualForSlug(slug: string): DomainVisual | null {
  return getDomainVisual(slug)
}
