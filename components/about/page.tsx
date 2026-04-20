import { BeaAboutHeroSection } from "./hero-section"
import { BeaAboutInstitutionSection } from "./institution-section"
import { BeaAboutLeadershipSection } from "./leadership-section"
import { BeaAboutMissionStorySections } from "./mission-story-sections"
import { BeaAboutValuesSection } from "./values-section"

export type BeaAboutPageProps = Readonly<Record<string, never>>

/** About route content only — header/footer are supplied by `app/layout.tsx` via `BeaMarketingShell`. */
export function BeaAboutPage(_props: BeaAboutPageProps) {
  return (
    <>
      <BeaAboutHeroSection />
      <BeaAboutMissionStorySections />
      <BeaAboutValuesSection />
      <BeaAboutLeadershipSection />
      <BeaAboutInstitutionSection />
    </>
  )
}
