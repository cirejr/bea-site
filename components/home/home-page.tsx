import { BeaConsultancySection } from "./consultancy-section"
import { BeaHeroSection } from "./hero-section"
import { BeaInstitutionalCtaSection } from "./institutional-cta-section"
import { BeaLeadershipSection } from "./leadership-section"
import { BeaTrainingCatalogSection } from "./training-catalog-section"
import { FeaturedTrainings } from "@/components/training/featured-trainings"
import { TrustStats } from "@/components/training/trust-stats"
import { TestimonialCarousel } from "@/components/training/testimonial-carousel"

const globalStats = [
  { value: "+1 500", label: "Formations proposées" },
  { value: "+100", label: "Parcours de formation" },
  { value: "+2 000", label: "Intervenants" },
  { value: "4,7/5", label: "Note moyenne clients" },
]

export type BeaHomePageProps = Readonly<Record<string, never>>

/** Home route content only — header, main padding, and footer come from `app/layout.tsx` via `BeaMarketingShell`. */
export function BeaHomePage(_props: BeaHomePageProps) {
  return (
    <>
      <BeaHeroSection />
      <FeaturedTrainings />
      <BeaConsultancySection />
      <BeaLeadershipSection />
      <BeaTrainingCatalogSection />
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <TrustStats stats={globalStats} columns={4} />
      </section>
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <TestimonialCarousel />
      </section>
      <BeaInstitutionalCtaSection />
    </>
  )
}
