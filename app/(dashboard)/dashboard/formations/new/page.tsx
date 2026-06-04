import { FormationForm } from "@/components/formation-form"
import {
  getBadges,
  getCertifications,
  getDomains,
  getFormations,
  getModalities,
  getSubCategories,
} from "@/lib/data"

export default async function NewFormationPage() {
  const [
    domains,
    subCategories,
    modalities,
    certifications,
    badges,
    allFormations,
  ] = await Promise.all([
    getDomains(),
    getSubCategories(),
    getModalities(),
    getCertifications(undefined, { activeOnly: true }),
    getBadges(),
    getFormations({ activeOnly: false }),
  ])

  return (
    <div className="container mx-auto w-full px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Nouvelle formation</h1>
      <div className="max-w-4xl">
        <FormationForm
          domains={domains}
          subCategories={subCategories}
          modalities={modalities}
          certifications={certifications}
          badges={badges}
          allFormations={allFormations}
        />
      </div>
    </div>
  )
}
