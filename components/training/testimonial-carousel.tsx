"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

type Testimonial = {
  quote: string
  name: string
  role?: string
  rating?: number
}

const placeholderTestimonials: Testimonial[] = [
  {
    quote:
      "Une formation très complète qui m'a permis de monter en compétences rapidement. Les formateurs sont à l'écoute et les cas pratiques très pertinents.",
    name: "Sophie",
    role: "Responsable RH",
    rating: 5,
  },
  {
    quote:
      "Excellent accompagnement pour la préparation à la certification AMF. La plateforme digitale est intuitive et les ressources pédagogiques de grande qualité.",
    name: "Thomas",
    role: "Conseiller financier",
    rating: 5,
  },
  {
    quote:
      "Formation adaptée à mon rythme de travail. Le blended learning m'a permis de combiner cours en ligne et sessions en présentiel. Je recommande.",
    name: "Marie",
    role: "Juriste d'entreprise",
    rating: 4,
  },
  {
    quote:
      "Une équipe pédagogique réactive et des contenus constamment mis à jour. La formation m'a apporté des outils concrets utilisables au quotidien.",
    name: "Alexandre",
    role: "Compliance Officer",
    rating: 5,
  },
]

type TestimonialCarouselProps = {
  testimonials?: Testimonial[]
  title?: string
}

export function TestimonialCarousel({
  testimonials = placeholderTestimonials,
  title = "Ils nous font confiance",
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section className="mb-14">
      <h2 className="text-xl md:text-2xl font-bold text-bea-on-surface font-bea-headline mb-8 text-center">
        {title}
      </h2>
      <div className="relative mx-auto max-w-2xl">
        <div className="rounded-2xl border border-bea-outline-variant bg-white p-8 md:p-10 text-center">
          {t.rating && (
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          )}
          <blockquote className="text-sm md:text-base text-bea-on-surface-variant leading-relaxed mb-6 italic">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div>
            <p className="text-sm font-bold text-bea-on-surface">{t.name}</p>
            {t.role && (
              <p className="text-xs text-bea-on-surface-variant">{t.role}</p>
            )}
          </div>
        </div>
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-bea-outline-variant bg-white text-bea-on-surface hover:bg-bea-surface transition-colors"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-bea-outline-variant bg-white text-bea-on-surface hover:bg-bea-surface transition-colors"
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-bea-primary" : "w-2 bg-bea-outline-variant"
              }`}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
