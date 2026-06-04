import { getFormationBySlug, getFormationPrereqIds, getFormation, getRelatedFormations, getAvis } from "@/lib/data"
import type { FormationWithRelations, Avi } from "@/lib/data"

export type FormationPageData = {
  formation: FormationWithRelations | null
  avis: Avi[]
  complementaryFormations: FormationWithRelations[]
  relatedFormations: FormationWithRelations[]
}

export async function getFormationPageData(slug: string): Promise<FormationPageData> {
  const formation = await getFormationBySlug(slug)
  if (!formation) return { formation: null, avis: [], complementaryFormations: [], relatedFormations: [] }

  const [prereqIds, relatedFormations, avis] = await Promise.all([
    getFormationPrereqIds(formation.id),
    getRelatedFormations(formation, 6),
    getAvis(formation.id),
  ])

  const complementaryFormations = (
    await Promise.all(prereqIds.map((id) => getFormation(id)))
  ).filter((f): f is FormationWithRelations => f !== null)

  return { formation, avis, complementaryFormations, relatedFormations }
}
