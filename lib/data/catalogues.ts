export const CATALOGUE_TOPICS = [
  { slug: "direction-financiere", i18nKey: "directionFinanciere" },
  { slug: "soft-skills-2026", i18nKey: "softSkills2026" },
  { slug: "technologies-numeriques-ia-2026", i18nKey: "technologiesNumeriquesIA2026" },
  { slug: "experts-comptables-2026", i18nKey: "expertsComptables2026" },
  { slug: "formations-2026", i18nKey: "formations2026" },
  { slug: "direction-juridique", i18nKey: "directionJuridique" },
  { slug: "immobilier-construction-urbanisme", i18nKey: "immobilierConstructionUrbanisme" },
  { slug: "banque-assurance-reglementaires", i18nKey: "banqueAssuranceReglementaires" },
  { slug: "secteur-public", i18nKey: "secteurPublic" },
  { slug: "representants-personnel", i18nKey: "representantsPersonnel" },
  { slug: "sante-securite-environnement", i18nKey: "santeSecuriteEnvironnement" },
  { slug: "directions-ressources-humaines", i18nKey: "directionsRessourcesHumaines" },
] as const

export type CatalogueTopic = (typeof CATALOGUE_TOPICS)[number]

export const CATALOGUE_SLUGS = CATALOGUE_TOPICS.map((topic) => topic.slug) as readonly string[]

export const ROLE_OPTIONS = [
  { value: "directeur", i18nKey: "directeur" },
  { value: "drh", i18nKey: "drh" },
  { value: "daf", i18nKey: "daf" },
  { value: "responsable-formation", i18nKey: "responsableFormation" },
  { value: "manager", i18nKey: "manager" },
  { value: "consultant", i18nKey: "consultant" },
  { value: "other", i18nKey: "other" },
] as const

export type RoleOption = (typeof ROLE_OPTIONS)[number]

export const ROLE_VALUES = ROLE_OPTIONS.map((role) => role.value) as readonly string[]

export function isValidCatalogueSlug(value: string): boolean {
  return CATALOGUE_SLUGS.includes(value)
}
