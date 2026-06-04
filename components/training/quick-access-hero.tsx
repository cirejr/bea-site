import type { ReactNode } from "react"

type QuickAccessHeroProps = {
  title: string
  description: string
  chips?: string[]
  icon?: ReactNode
}

export function QuickAccessHero({ title, description, chips, icon }: QuickAccessHeroProps) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-2 text-sm text-bea-primary font-medium mb-3">
          {icon}
          <span>{title}</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-bea-primary font-bea-headline tracking-tighter mb-4">
          {title}
        </h1>
        <p className="text-base md:text-lg text-bea-on-surface-variant font-bea-body leading-relaxed">
          {description}
        </p>
      </div>
      {chips && chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-bea-primary/20 bg-bea-primary/5 px-4 py-1.5 text-xs font-semibold text-bea-primary"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
