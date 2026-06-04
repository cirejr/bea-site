import type { ReactNode } from "react"

type CtaCardProps = {
  icon?: ReactNode
  title: string
  description?: string
  href?: string
  ctaLabel?: string
  variant?: "default" | "download"
}

export function CtaCard({
  icon,
  title,
  description,
  href = "#",
  ctaLabel = "En savoir plus",
  variant = "default",
}: CtaCardProps) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-bea-outline-variant bg-white p-6 transition-all duration-200 hover:border-bea-primary/30 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-bea-primary/10 text-bea-primary">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-bea-on-surface font-bea-headline mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-bea-on-surface-variant leading-relaxed mb-3">
              {description}
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-bea-primary hover:underline">
            {ctaLabel}
            <span aria-hidden="true">{variant === "download" ? "↓" : "→"}</span>
          </span>
        </div>
      </div>
    </a>
  )
}
