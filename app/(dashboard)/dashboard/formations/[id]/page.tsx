import { notFound } from "next/navigation"
import { FormationForm } from "@/components/formation-form"
import { getBadges, getCertifications, getDomains, getFormation, getFormationBadgeIds, getFormationCertificationIds, getFormationPrereqIds, getFormations, getRelatedFormationIds, getModalities, getSubCategories } from "@/lib/data"

export default async function EditFormationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const formationId = Number(id)
  if (Number.isNaN(formationId)) notFound()

  const [formation, domains, subCategories, modalities, certifications, selectedCertificationIds, badges, selectedBadgeIds, allFormations, selectedPrereqIds, selectedRelatedIds] = await Promise.all([
    getFormation(formationId),
    getDomains(),
    getSubCategories(),
    getModalities(),
    getCertifications(undefined, { activeOnly: true }),
    getFormationCertificationIds(formationId),
    getBadges(),
    getFormationBadgeIds(formationId),
    getFormations({ activeOnly: false }),
    getFormationPrereqIds(formationId),
    getRelatedFormationIds(formationId),
  ])

  if (!formation) notFound()

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Modifier la formation</h1>
      <div className="max-w-4xl">
        <FormationForm domains={domains} subCategories={subCategories} modalities={modalities} certifications={certifications} badges={badges} allFormations={allFormations} initialData={formation} selectedCertificationIds={selectedCertificationIds} selectedBadgeIds={selectedBadgeIds} selectedPrereqIds={selectedPrereqIds} selectedRelatedIds={selectedRelatedIds} />
      </div>
    </div>
  )
}
