import { BeaTrainingGridSection } from "./grid-section"
import { BeaTrainingHeroSection } from "./hero-section"
import type {
  Domain,
  FormationWithRelations,
  Modality,
  SubCategory,
} from "@/lib/data"

export function BeaTrainingPage({
  formations,
  domains,
  subCategories,
  modalities,
}: {
  formations: FormationWithRelations[]
  domains: Domain[]
  subCategories: SubCategory[]
  modalities: Modality[]
}) {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <BeaTrainingHeroSection />
        <BeaTrainingGridSection
          activeDomain={null}
          formations={formations}
          domains={domains}
          subCategories={subCategories}
          modalities={modalities}
        />
      </div>
    </div>
  )
}
