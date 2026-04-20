import { BeaContactFormSection } from "./form-section"
import { BeaContactHeroSection } from "./hero-section"
import { BeaContactInquiriesSection } from "./inquiries-section"
import { BeaContactLocationSection } from "./location-section"

export type BeaContactPageProps = Readonly<Record<string, never>>

export function BeaContactPage(_props: BeaContactPageProps) {
  return (
    <main className="min-h-screen bg-bea-surface font-bea-body text-bea-on-surface antialiased">
      <BeaContactHeroSection />
      <section className="bg-bea-surface-container-low px-8 py-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BeaContactFormSection />
            </div>
            <div>
              <BeaContactLocationSection />
            </div>
          </div>
        </div>
      </section>
      <BeaContactInquiriesSection />
    </main>
  )
}
