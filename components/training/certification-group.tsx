import type { ReactNode } from "react"

type CertificationGroupProps = {
  title: string
  children: ReactNode
}

export function CertificationGroup({ title, children }: CertificationGroupProps) {
  return (
    <section className="mb-14">
      <h2 className="text-xl md:text-2xl font-bold text-bea-on-surface font-bea-headline mb-6 flex items-center gap-2">
        <span className="h-1 w-8 rounded-full bg-bea-primary shrink-0" />
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  )
}
