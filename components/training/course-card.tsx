import { Star, Clock } from "lucide-react"

export type CourseCardData = {
  title: string
  price: string
  rating: string
  reviews: number
  duration?: string
  modalities: string[]
  badge?: string
  domain?: string
  href?: string
  registerHref?: string
}

type CourseCardProps = {
  course: CourseCardData
}

function StarRating({ rating }: { rating: string }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      <span className="text-xs font-medium">{rating}</span>
    </div>
  )
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group rounded-2xl border border-bea-outline-variant bg-white p-5 transition-all duration-200 hover:border-bea-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          {course.domain && (
            <span className="inline-block rounded-full bg-bea-primary/5 px-2 py-0.5 text-[10px] font-semibold text-bea-primary mb-1.5">
              {course.domain}
            </span>
          )}
          <h3 className="text-sm font-semibold text-bea-on-surface leading-snug">
            {course.title}
          </h3>
        </div>
        {course.badge && (
          <span className="shrink-0 rounded-full bg-bea-primary/10 px-2.5 py-0.5 text-xs font-semibold text-bea-primary">
            {course.badge}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-bea-on-surface-variant mb-3">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-bea-on-surface">{course.price}</span>
        </div>
        <StarRating rating={course.rating} />
        <span>({course.reviews} avis)</span>
        {course.duration && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
        )}
      </div>
      {course.modalities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {course.modalities.map((m) => (
            <span
              key={m}
              className="rounded-full bg-bea-surface px-2 py-0.5 text-xs text-bea-on-surface-variant"
            >
              {m}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center gap-3 pt-3 border-t border-bea-outline-variant">
        {course.href && (
          <a
            href={course.href}
            className="text-xs font-semibold text-bea-primary hover:underline"
          >
            Voir le programme &rarr;
          </a>
        )}
        <a
          href={course.registerHref || "#"}
          className="ml-auto rounded-lg bg-bea-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-bea-primary/90 transition-colors"
        >
          S&rsquo;inscrire
        </a>
      </div>
    </div>
  )
}
