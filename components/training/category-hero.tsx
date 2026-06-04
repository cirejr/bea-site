import type { ReactNode } from "react"

type CategoryHeroProps = {
  eyebrow: string
  title: string
  description: string
  icon?: ReactNode
  image?: ReactNode
}

export function CategoryHero({ eyebrow, title, description, icon, image }: CategoryHeroProps) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-bea-primary font-medium mb-3">
            {icon}
            <span>{eyebrow}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-bea-primary font-bea-headline tracking-tighter mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-bea-on-surface-variant font-bea-body leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
        {image && <div className="hidden lg:block shrink-0">{image}</div>}
      </div>
    </header>
  )
}
