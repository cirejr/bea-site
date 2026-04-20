import { BeaConsultancySection } from "./consultancy-section"
import { BeaHeroSection } from "./hero-section"
import { BeaInstitutionalCtaSection } from "./institutional-cta-section"
import { BeaLeadershipSection } from "./leadership-section"
import { BeaTrainingCatalogSection } from "./training-catalog-section"

export type BeaHomePageProps = Readonly<Record<string, never>>

/** Home route content only — header, main padding, and footer come from `app/layout.tsx` via `BeaMarketingShell`. */
export function BeaHomePage(_props: BeaHomePageProps) {
  return (
    <>
      <BeaHeroSection />
      <BeaConsultancySection />
      <BeaLeadershipSection />
      <BeaTrainingCatalogSection />
      <BeaInstitutionalCtaSection />
    </>
  )
}
