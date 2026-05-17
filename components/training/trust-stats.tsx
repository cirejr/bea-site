type TrustStat = {
  value: string
  label: string
}

type TrustStatsProps = {
  stats: TrustStat[]
  className?: string
  columns?: 2 | 3 | 4
}

const gridMap = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
}

export function TrustStats({ stats, className = "", columns = 3 }: TrustStatsProps) {
  return (
    <div className={`grid gap-4 ${gridMap[columns]} ${className}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-bea-outline-variant bg-white p-6 text-center"
        >
          <div className="text-3xl font-black text-bea-primary font-bea-headline mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-bea-on-surface-variant leading-snug">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
