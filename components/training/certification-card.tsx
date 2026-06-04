type CertificationCardProps = {
  title: string
  description: string
  badge?: string
  audience?: string
  href?: string
  ctaLabel?: string
}

export function CertificationCard({
  title,
  description,
  badge,
  audience,
  href = "#",
  ctaLabel = "Voir le programme",
}: CertificationCardProps) {
  return (
    <div className="rounded-2xl border border-bea-outline-variant bg-white p-6 transition-all duration-200 hover:border-bea-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-bold text-bea-on-surface font-bea-headline leading-snug">
          {title}
        </h3>
        {badge && (
          <span className="shrink-0 rounded-full bg-bea-primary/10 px-2.5 py-0.5 text-xs font-semibold text-bea-primary">
            {badge}
          </span>
        )}
      </div>
      {audience && (
        <span className="inline-block rounded-full bg-bea-accent/10 px-2.5 py-0.5 text-xs font-medium text-bea-accent mb-3">
          {audience}
        </span>
      )}
      <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-4">
        {description}
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-bea-primary hover:underline"
      >
        {ctaLabel}
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  )
}
