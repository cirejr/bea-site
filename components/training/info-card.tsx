import type { ReactNode } from "react"

type InfoCardProps = {
  title: string
  children: ReactNode
  icon?: ReactNode
  className?: string
  id?: string
}

export function InfoCard({ title, children, icon, className = "", id }: InfoCardProps) {
  return (
    <div id={id} className={`rounded-2xl border border-bea-outline-variant bg-white p-6 ${className}`}>
      {icon && (
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-bea-primary/10 text-bea-primary">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-bea-on-surface mb-3">{title}</h3>
      <div className="text-sm text-bea-on-surface-variant leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  )
}
