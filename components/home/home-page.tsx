import { BeaConsultancySection } from "./consultancy-section"
import { BeaHeroSection } from "./hero-section"
import { BeaInstitutionalCtaSection } from "./institutional-cta-section"
import { BeaLeadershipSection } from "./leadership-section"
import { BeaTrainingCatalogSection } from "./training-catalog-section"
import { FeaturedTrainings } from "@/components/training/featured-trainings"
import { TrustStats } from "@/components/training/trust-stats"
import { TestimonialCarousel } from "@/components/training/testimonial-carousel"
import { getTestimonials } from "@/lib/data"

const globalStats = [
  { value: "+1 500", label: "Formations au catalogue" },
  { value: "+100", label: "Parcours de formation" },
  { value: "+120", label: "Formations d'actualité" },
  { value: "+2 000", label: "Intervenants experts" },
  { value: "4,7/5", label: "Note client moyenne" },
]

export type BeaHomePageProps = Readonly<Record<string, never>>

/** Home route content only — header, main padding, and footer come from `app/layout.tsx` via `BeaMarketingShell`. */
export async function BeaHomePage(_props: BeaHomePageProps) {
  const testimonials = (await getTestimonials()).map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role ?? undefined,
    rating: t.rating ?? undefined,
  }))
  return (
    <>
      <BeaHeroSection />
      <FeaturedTrainings />
      <BeaConsultancySection />
      <BeaLeadershipSection />
      <BeaTrainingCatalogSection />
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <TrustStats stats={globalStats} columns={5} />
      </section>
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <TestimonialCarousel testimonials={testimonials} />
      </section>
      <BeaInstitutionalCtaSection />
    </>
  )
}
