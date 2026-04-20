import { BeaConsultancyCoreServicesSection } from "./core-services-section"
import { BeaConsultancyFinalCtaSection } from "./final-cta-section"
import { BeaConsultancyHeroSection } from "./hero-section"
import { BeaConsultancyLeadershipSection } from "./leadership-section"
import { BeaConsultancyMethodologySection } from "./methodology-section"

export type BeaConsultancyPageProps = Readonly<Record<string, never>>

export function BeaConsultancyPage(_props: BeaConsultancyPageProps) {
  return (
    <>
      <BeaConsultancyHeroSection />
      <BeaConsultancyCoreServicesSection />
      <BeaConsultancyLeadershipSection />
      <BeaConsultancyMethodologySection />
      <BeaConsultancyFinalCtaSection />
    </>
  )
}
