import type { ReactNode } from "react"

type TwoColSectionProps = {
  title: string
  children: ReactNode
  reversed?: boolean
  image?: ReactNode
  className?: string
}

export function TwoColSection({
  title,
  children,
  reversed = false,
  image,
  className = "",
}: TwoColSectionProps) {
  return (
    <section className={`mb-14 ${className}`}>
      <div
        className={`grid gap-8 md:grid-cols-2 items-center ${
          reversed ? "direction-rtl" : ""
        }`}
      >
        <div className={reversed ? "md:order-2" : ""}>
          <h2 className="text-xl md:text-2xl font-bold text-bea-on-surface font-bea-headline mb-4">
            {title}
          </h2>
          <div className="text-sm text-bea-on-surface-variant leading-relaxed space-y-3">
            {children}
          </div>
        </div>
        <div className={reversed ? "md:order-1" : ""}>
          {image || (
            <div className="aspect-video rounded-2xl bg-bea-surface flex items-center justify-center text-bea-on-surface-variant text-sm">
              Image
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
