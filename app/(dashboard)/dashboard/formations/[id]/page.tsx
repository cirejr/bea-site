import { notFound } from "next/navigation"
import { FormationForm } from "@/components/formation-form"
import { getCertifications, getDomains, getFormation, getFormationCertificationIds, getModalities, getSubCategories } from "@/lib/data"

export default async function EditFormationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const formationId = Number(id)
  if (Number.isNaN(formationId)) notFound()

  const [formation, domains, subCategories, modalities, certifications, selectedCertificationIds] = await Promise.all([
    getFormation(formationId),
    getDomains(),
    getSubCategories(),
    getModalities(),
    getCertifications(undefined, { activeOnly: true }),
    getFormationCertificationIds(formationId),
  ])

  if (!formation) notFound()

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold">Modifier la formation</h1>
      <div className="max-w-4xl">
        <FormationForm domains={domains} subCategories={subCategories} modalities={modalities} certifications={certifications} initialData={formation} selectedCertificationIds={selectedCertificationIds} />
      </div>
    </div>
  )
}
