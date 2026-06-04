type SectionHeaderProps = {
  title: string
  className?: string
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <h2
      className={`text-xl md:text-2xl font-bold text-bea-on-surface font-bea-headline mb-6 flex items-center gap-2 ${className}`}
    >
      <span className="h-1 w-8 rounded-full bg-bea-primary shrink-0" />
      {title}
    </h2>
  )
}
